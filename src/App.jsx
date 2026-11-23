import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import AboutSection from './Aboutsection';
import MissionSection from './MissionSection';
import ArchitectureSection from './ArchitectureSection';
import QnaSection from './Qnasection';
import { ArrowUpRight, ArrowDown, Plus, X, Lock, Mail } from 'lucide-react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ErrorBoundary from './components/ErrorBoundary';
 import Dashboard from './features/dashboard/Dashboard';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged } from './styles/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './styles/index.css';
import './home.css';

const MockTest = lazy(() => import('./features/mock-test/MockTest'));
const SocraticAI = lazy(() => import('./features/socratic/SocraticAI'));
const NcertHub = lazy(() => import('./features/ncert/NcertHub'));
const TunnelPlayer = lazy(() => import('./features/player/VideoTunnel'));

// --- AUTH MODAL COMPONENT ---
function AuthModal({ isOpen, onClose, onGoogleSuccess, defaultMode = 'login' }) {
  const [mode, setMode] = useState(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setMode(defaultMode);
    setErrorMsg('');
  }, [defaultMode, isOpen]);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res?.user) {
        onGoogleSuccess(res.user);
        onClose();
      }
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMsg(err.message.replace('Firebase: ', ''));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      let res;
      if (mode === 'signup') {
        res = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        res = await signInWithEmailAndPassword(auth, email, password);
      }
      if (res?.user) {
        onGoogleSuccess(res.user);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }} 
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#0E1015',
          border: '1px solid rgba(190, 28, 53, 0.35)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '420px',
          padding: '36px 32px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.8), 0 0 32px rgba(190, 28, 53, 0.15)',
          position: 'relative',
          color: '#FFFFFF',
          boxSizing: 'border-box'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: '#8E95A5',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#be1c35' }} />
          <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.12em', color: '#be1c35', textTransform: 'uppercase' }}>
            GNOSIS IDENTITY
          </span>
        </div>

        <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          {mode === 'signup' ? 'Create Candidate Account' : 'Welcome back'}
        </h3>
        <p style={{ fontSize: '13px', color: '#8E95A5', margin: '0 0 24px 0', lineHeight: 1.5 }}>
          Sync your test pacing telemetry, error vaults, and Socratic hints.
        </p>

        {errorMsg && (
          <div style={{
            background: 'rgba(190, 28, 53, 0.12)',
            border: '1px solid #be1c35',
            color: '#FF6B7D',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '12px',
            marginBottom: '16px'
          }}>
            {errorMsg}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '14px 20px',
            borderRadius: '14px',
            backgroundColor: '#FFFFFF',
            color: '#0A0C10',
            border: 'none',
            fontWeight: '700',
            fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 18px rgba(255, 255, 255, 0.1)'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/>
          </svg>
          {loading ? 'Connecting to Google...' : 'Continue with Google'}
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '22px 0 18px 0',
          color: '#4B5565',
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '0.08em'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
          <span>OR WITH EMAIL</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
        </div>

        <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input
              type="email"
              placeholder="candidate@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                background: '#151820',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '13px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                background: '#151820',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '13px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px',
              borderRadius: '12px',
              background: '#be1c35',
              border: 'none',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '14px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '4px',
              boxShadow: '0 4px 16px rgba(190, 28, 53, 0.35)'
            }}
          >
            {mode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#8E95A5' }}>
          {mode === 'signup' ? (
            <>
              Already have an account?{' '}
              <span
                style={{ color: '#be1c35', fontWeight: '700', cursor: 'pointer' }}
                onClick={() => setMode('login')}
              >
                Sign in
              </span>
            </>
          ) : (
            <>
              Need an account?{' '}
              <span
                style={{ color: '#be1c35', fontWeight: '700', cursor: 'pointer' }}
                onClick={() => setMode('signup')}
              >
                Sign up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const StandaloneLoader = ({ label = 'Learning Workspace' }) => (
  <div style={{
    minHeight: '100vh',
    backgroundColor: '#0A0C10',
    color: '#F8FAFC',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      border: '3px solid rgba(255,255,255,0.1)',
      borderTopColor: '#be1c35',
      animation: 'spin 0.8s linear infinite'
    }} />
    <span style={{ fontSize: '13px', fontWeight: 700, color: '#94A3B8' }}>Loading {label}...</span>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

const pages = {
  test: ['Practice with purpose.', 'Three questions. One clearer understanding of physics.'],
  ai: ['Think deeper. Learn better.', 'A guiding question can unlock a difficult concept.'],
  ncert: ['Build your foundations.', 'Your Class 11 physics reading shelf.'],
  player: ['One lesson. Full attention.', 'A quiet space to watch, pause and reflect.'],
};

function StudyApp({ onHome, initialTab = 'test' }) {
  const [tab, setTab] = useState(initialTab);
  const [hint, setHint] = useState('idle');
  const [lowPower, setLowPower] = useState(true);
  const heading = useRef(null);

  useEffect(() => { 
    heading.current?.focus(); 
  }, [tab]);

  return (
    <div className={`app ${tab === 'ai' ? 'theme-chat' : ''} ${lowPower ? 'low-power' : ''}`}>
      <a className="skip-link" href="#content">Skip to content</a>
      <div className="studio-home-bar">
        <button 
          onClick={onHome} 
          style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px' }}
        >
          [Back to Gnosis home]
        </button>
      </div>
      <Header onHome={onHome} lowPower={lowPower} onToggle={() => setLowPower(v => !v)} />
      <main id="content" className="page-container">
        <p className="eyebrow">CLASS 11 PHYSICS / LEARNING STUDIO</p>
        <h1 ref={heading} tabIndex={-1} className="page-title">{pages[tab]?.[0] || 'Learning Studio'}</h1>
        <p className="mb-8 mt-3 text-sm leading-6 text-muted">{pages[tab]?.[1] || 'Focus and deliberate practice.'}</p>
        <ErrorBoundary>
          <Suspense fallback={<p role="status">Loading practice...</p>}>
            <MockTest active={tab === 'test'} />
          </Suspense>
          <Suspense fallback={<div className="card" role="status">Opening your learning space...</div>}>
            {tab === 'ai' && <SocraticAI hint={hint} setHint={setHint} />}
            {tab === 'ncert' && <NcertHub />}
            {tab === 'player' && <TunnelPlayer />}
          </Suspense>
        </ErrorBoundary>
      </main>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}

const HERO_IMAGE = `${import.meta.env.BASE_URL}hero-bg.png`;

function Home({ onOpenDashboard, onOpenStudio, user, onOpenAuth, onLogout }) {
  return (
    <div className="gnosis-home">
      <a className="skip-link" href="#home-main">Skip to content</a>
      <header className="landing-header">
        <span className="wordmark" aria-label="Gnosis home" style={{ cursor: 'pointer' }}>
          GNOSIS<span style={{ color: '#be1c35' }}>.</span>
        </span>
        <nav aria-label="Main navigation" className="landing-links">
          <a href="#about">About</a>
          <a href="#mission">Mission</a>
          <a href="#architecture">Architecture</a>
          <a href="#questions">Q&amp;A</a>
        </nav>
        <div className="landing-account">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 700 }}>
                {user.displayName?.split(' ')[0] || 'Student'}
              </span>
              <button 
                type="button" 
                className="login-link" 
                onClick={onLogout} 
                style={{ color: '#be1c35', border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                Log out
              </button>
              <button 
                type="button" 
                className="signup-link" 
                onClick={onOpenDashboard}
                style={{ background: '#be1c35', borderColor: '#be1c35', color: '#fff' }}
              >
                Dashboard <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button type="button" className="login-link" onClick={() => onOpenAuth('login')}>Log in</button>
              <button 
                type="button" 
                className="signup-link" 
                onClick={() => onOpenAuth('signup')}
                style={{ background: '#be1c35', borderColor: '#be1c35', color: '#fff' }}
              >
                Sign up <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </header>

      <main id="home-main">
        <section className="landing-hero" id="home" aria-labelledby="hero-title">
          <img className="hero-background" src={HERO_IMAGE} width="563" height="398" alt="" fetchPriority="high" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-topline">
            <span><i /> YOUR NEXT CHAPTER STARTS HERE</span>
            <span className="hero-edition">GN / 001 - LEARNING, REIMAGINED</span>
          </div>
          <div className="hero-copy">
            <p className="hero-kicker">LESS MEMORISING. MORE UNDERSTANDING.</p>
            <h1 id="hero-title">BEYOND<br /><span style={{ color: '#be1c35' }}>THE ANSWER.</span></h1>
            <p className="hero-description">
              Ask better questions. Find your own clarity.<br className="desktop-break" /> A focused space to practise, think and learn.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={() => onOpenStudio('test')} 
                className="hero-cta"
                style={{ border: 'none', background: '#be1c35', color: '#fff' }}
              >
                Enter the learning studio <ArrowUpRight size={21} aria-hidden="true" />
              </button>
              <button 
                type="button" 
                onClick={user ? onOpenDashboard : () => onOpenAuth('login')} 
                className="hero-cta" 
                style={{ 
                  background: '#fff', 
                  color: '#101010', 
                  border: 'none', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '10px' 
                }}
              >
                {!user && (
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z"/>
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/>
                  </svg>
                )}
                {user ? 'Go to Dashboard' : 'Continue with Google'} <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="hero-note">Official Google Auth Enabled &bull; Progress Synced</p>
          </div>
          <div className="hero-bottom">
            <a href="#about">SCROLL TO DISCOVER <ArrowDown size={15} aria-hidden="true" /></a>
            <span>STAY CURIOUS. <b style={{ color: '#be1c35' }}>GO DEEPER.</b></span>
          </div>
        </section>

        <div className="capability-strip" aria-label="Explore in the studio">
          <span style={{ cursor: 'pointer' }} onClick={() => onOpenStudio('test')}>01 / MOCK TESTS</span>
          <Plus size={15} aria-hidden="true" />
          <span style={{ cursor: 'pointer' }} onClick={() => onOpenStudio('ai')}>02 / SOCRATIC HINTS</span>
          <Plus size={15} aria-hidden="true" />
          <span style={{ cursor: 'pointer' }} onClick={() => onOpenStudio('ncert')}>03 / NCERT HUB</span>
          <Plus size={15} aria-hidden="true" />
          <span style={{ cursor: 'pointer' }} onClick={() => onOpenStudio('player')}>04 / TUNNEL PLAYER</span>
        </div>

        <div id="about">
          <AboutSection />
        </div>

        <div id="mission">
          <MissionSection onExploreWorkspace={user ? onOpenDashboard : () => onOpenAuth('signup')} />
        </div>

        <div id="architecture">
          <ArchitectureSection onLaunch={() => onOpenStudio('test')} />
        </div>

        <div id="questions">
          <QnaSection />
        </div>
      </main>

      <footer className="landing-footer">
        <span className="wordmark">GNOSIS<span style={{ color: '#be1c35' }}>.</span></span>
        <p>A little curiosity goes a long way.</p>
        <span>SEVA FIRST RYIC 2026</span>
      </footer>
    </div>
  );
}

export default function App() {
  const getRequestedRoute = () => {
    const search = window.location.search;
    const hash = window.location.hash;

    if (search.includes('page=ncert') || hash === '#ncert') return 'standalone-ncert';
    if (search.includes('page=socratic') || hash === '#socratic') return 'standalone-socratic';
    if (search.includes('page=player') || hash === '#player') return 'standalone-player';
    if (search.includes('page=mock-test') || hash === '#mock-test') return 'standalone-mocktest';

    if (hash.startsWith('#studio')) return 'studio';
    if (hash === '#dashboard') return 'dashboard';
    return 'home';
  };

  const [view, setView] = useState(getRequestedRoute);
  const [studioTab, setStudioTab] = useState('test');
  const [currentUser, setCurrentUser] = useState(null);
  const [authModalState, setAuthModalState] = useState({ open: false, mode: 'login' });

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const raw = localStorage.getItem('gnosis_user_prolife_v7');
          const existingProfile = raw ? JSON.parse(raw) : {};
          localStorage.setItem('gnosis_user_prolife_v7', JSON.stringify({
            ...existingProfile,
            name: user.displayName || existingProfile.name || 'Tanishq Sood',
            email: user.email,
            avatarUrl: user.photoURL || existingProfile.avatarUrl
          }));
        } catch (e) {
          console.warn('Profile sync error', e);
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.error(err);
      }
    }
    navigateTo('home');
  };

  useEffect(() => {
    const handleUrlChange = () => {
      const targetRoute = getRequestedRoute();
      setView(targetRoute);

      if (window.location.hash.includes('tab=')) {
        const requestedTab = window.location.hash.split('tab=')[1]?.split('&')[0];
        if (requestedTab) setStudioTab(requestedTab);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const navigateTo = (target, tabParam = 'test') => {
    if (target === 'studio') {
      setStudioTab(tabParam);
      window.location.hash = `#studio?tab=${tabParam}`;
    } else {
      window.location.hash = target;
    }
    setView(target);
  };

  return (
    <ErrorBoundary>
      <AuthModal
        isOpen={authModalState.open}
        defaultMode={authModalState.mode}
        onClose={() => setAuthModalState({ open: false, mode: 'login' })}
        onGoogleSuccess={(user) => {
          navigateTo('dashboard');
        }}
      />

      {view === 'standalone-ncert' && (
        <Suspense fallback={<StandaloneLoader label="NCERT Digital Hub" />}>
          <NcertHub />
        </Suspense>
      )}

      {view === 'standalone-socratic' && (
        <Suspense fallback={<StandaloneLoader label="Socratic AI Stepping Engine" />}>
          <div style={{ minHeight: '100vh', background: '#0F172A', padding: '30px' }}>
            <SocraticAI hint="idle" setHint={() => {}} />
          </div>
        </Suspense>
      )}

      {view === 'standalone-player' && (
        <Suspense fallback={<StandaloneLoader label="Distraction-Free Video Tunnel" />}>
          <div style={{ minHeight: '100vh', background: '#0A0C10', padding: '30px' }}>
            <TunnelPlayer />
          </div>
        </Suspense>
      )}

      {view === 'standalone-mocktest' && (
        <Suspense fallback={<StandaloneLoader label="Mock Test Examination Engine" />}>
          <div style={{ minHeight: '100vh', width: '100vw', background: '#F8FAFC', padding: '24px', boxSizing: 'border-box', overflowY: 'auto' }}>
            <MockTest active={true} />
          </div>
        </Suspense>
      )}

      {view === 'dashboard' && (
        <Dashboard 
          user={currentUser}
          onLogout={handleLogout}
          onNavigate={(target) => {
            if (target === 'home') navigateTo('home');
            else if (['mock-test', 'socratic', 'ncert', 'player'].includes(target)) {
              navigateTo('studio', target === 'mock-test' ? 'test' : target === 'socratic' ? 'ai' : target);
            }
          }} 
        />
      )}

      {view === 'studio' && (
        <StudyApp 
          initialTab={studioTab} 
          onHome={() => navigateTo('home')} 
        />
      )}

      {view === 'home' && (
        <Home 
          user={currentUser}
          onOpenAuth={(mode) => setAuthModalState({ open: true, mode })}
          onLogout={handleLogout}
          onOpenDashboard={() => navigateTo('dashboard')} 
          onOpenStudio={(tab) => navigateTo('studio', tab)} 
        />
      )}
    </ErrorBoundary>
  );
}