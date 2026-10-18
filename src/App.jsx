import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import AboutSection from './AboutSection';
import QnaSection from './QnaSection';
import { ArrowUpRight, ArrowDown, Plus, X } from 'lucide-react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './features/Dashboard/Dashboard';
import './home.css';

// ==========================================
// FUTURE-PROOF LAZY-LOADED MODULE ARCHITECTURE
// ==========================================
const MockTest = lazy(() => import('./features/mock-test/MockTest'));
const SocraticAI = lazy(() => import('./features/socratic/SocraticAI'));
const NcertHub = lazy(() => import('./features/ncert/NcertHub'));
const TunnelPlayer = lazy(() => import('./features/player/TunnelPlayer'));

// Loading screen fallback for standalone new-tab windows
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
      borderTopColor: '#38BDF8',
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

// ==========================================
// LEARNING STUDIO (EMBEDDED MULTI-TAB VIEW)
// ==========================================
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
          ← Back to Gnosis home
        </button>
      </div>
      <Header onHome={onHome} lowPower={lowPower} onToggle={() => setLowPower(v => !v)} />
      <main id="content" className="page-container">
        <p className="eyebrow">CLASS 11 PHYSICS / LEARNING STUDIO</p>
        <h1 ref={heading} tabIndex={-1} className="page-title">{pages[tab]?.[0] || 'Learning Studio'}</h1>
        <p className="mb-8 mt-3 text-sm leading-6 text-muted">{pages[tab]?.[1] || 'Focus and deliberate practice.'}</p>
        <ErrorBoundary>
          <Suspense fallback={<p role="status">Loading practice…</p>}>
            <MockTest active={tab === 'test'} />
          </Suspense>
          <Suspense fallback={<div className="card" role="status">Opening your learning space…</div>}>
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

// ==========================================
// LANDING PAGE (HOME)
// ==========================================
function Home({ onOpenDashboard, onOpenStudio }) {
  const [auth, setAuth] = useState(null);
  const dialog = useRef(null);
  const closeButton = useRef(null);

  useEffect(() => {
    if (auth) { 
      dialog.current?.showModal(); 
      closeButton.current?.focus(); 
    } else {
      dialog.current?.close();
    }
  }, [auth]);

  return (
    <div className="gnosis-home">
      <a className="skip-link" href="#home-main">Skip to content</a>
      <header className="landing-header">
        <span className="wordmark" aria-label="Gnosis home" style={{ cursor: 'pointer' }}>
          GNOSIS<span>.</span>
        </span>
        <nav aria-label="Main navigation" className="landing-links">
          <a href="#about">About</a>
          <a href="#questions">Q&A</a>
        </nav>
        <div className="landing-account">
          <button type="button" className="login-link" onClick={onOpenDashboard}>Log in</button>
          <button type="button" className="signup-link" onClick={onOpenDashboard}>
            Sign up <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="home-main">
        <section className="landing-hero" id="home" aria-labelledby="hero-title">
          <img className="hero-background" src={HERO_IMAGE} width="563" height="398" alt="" fetchPriority="high" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-topline">
            <span><i /> YOUR NEXT CHAPTER STARTS HERE</span>
            <span className="hero-edition">GN / 001 — LEARNING, REIMAGINED</span>
          </div>
          <div className="hero-copy">
            <p className="hero-kicker">LESS MEMORISING. MORE UNDERSTANDING.</p>
            <h1 id="hero-title">BEYOND<br /><span>THE ANSWER.</span></h1>
            <p className="hero-description">
              Ask better questions. Find your own clarity.<br className="desktop-break" /> A focused space to practise, think and learn.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={() => onOpenStudio('test')} 
                className="hero-cta"
                style={{ border: 'none' }}
              >
                Enter the learning studio <ArrowUpRight size={21} aria-hidden="true" />
              </button>
              <button 
                type="button" 
                onClick={onOpenDashboard}
                className="hero-cta" 
                style={{ background: '#fff', color: '#101010', border: 'none' }}
              >
                Go to Dashboard <ArrowUpRight size={21} aria-hidden="true" />
              </button>
            </div>
            <p className="hero-note">Explore the prototype. No account required.</p>
          </div>
          <div className="hero-bottom">
            <a href="#about">SCROLL TO DISCOVER <ArrowDown size={15} aria-hidden="true" /></a>
            <span>STAY CURIOUS. <b>GO DEEPER.</b></span>
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

        <AboutSection />
        <QnaSection />
      </main>

      <footer className="landing-footer">
        <span className="wordmark">GNOSIS<span>.</span></span>
        <p>A little curiosity goes a long way.</p>
        <span>PROTOTYPE / 2026</span>
      </footer>

      {/* Auth Preview Modal */}
      <dialog 
        ref={dialog} 
        className="auth-preview" 
        onCancel={() => setAuth(null)} 
        onClose={() => setAuth(null)} 
        aria-labelledby="auth-title" 
        aria-describedby="auth-description"
      >
        <button ref={closeButton} type="button" className="dialog-close" onClick={() => setAuth(null)} aria-label="Close">
          <X size={22} />
        </button>
        <p className="section-label">ACCOUNT PREVIEW</p>
        <h2 id="auth-title">{auth}</h2>
        <p id="auth-description">
          Click below to jump straight into your candidate portal dashboard.
        </p>
        <button 
          className="hero-cta" 
          onClick={() => { setAuth(null); onOpenDashboard(); }}
        >
          Enter Dashboard <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      </dialog>
    </div>
  );
}

// ==========================================
// ROOT APP CONTAINER WITH UNIVERSAL DISPATCHER
// ==========================================
export default function App() {
  // Helper to detect what page was requested via query params or hash
  const getRequestedRoute = () => {
    const search = window.location.search;
    const hash = window.location.hash;

    // Check for direct standalone launches (e.g. ?page=ncert or #ncert)
    if (search.includes('page=ncert') || hash === '#ncert') return 'standalone-ncert';
    if (search.includes('page=socratic') || hash === '#socratic') return 'standalone-socratic';
    if (search.includes('page=player') || hash === '#player') return 'standalone-player';
    if (search.includes('page=mock-test') || hash === '#mock-test') return 'standalone-mocktest';

    // Standard views
    if (hash.startsWith('#studio')) return 'studio';
    if (hash === '#dashboard') return 'dashboard';
    return 'home';
  };

  const [view, setView] = useState(getRequestedRoute);
  const [studioTab, setStudioTab] = useState('test');

  useEffect(() => {
    const handleUrlChange = () => {
      const targetRoute = getRequestedRoute();
      setView(targetRoute);

      // Check if a specific tab was requested for the studio (e.g., #studio?tab=ncert)
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
      {/* 1. STANDALONE FULL-SCREEN TOOLS (Opened in dedicated new tabs) */}
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
          <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '24px' }}>
            <MockTest active={true} />
          </div>
        </Suspense>
      )}

      {/* 2. DASHBOARD VIEW */}
      {view === 'dashboard' && (
        <Dashboard 
          onNavigate={(target) => {
            if (target === 'home') navigateTo('home');
            else if (['mock-test', 'socratic', 'ncert', 'player'].includes(target)) {
              navigateTo('studio', target === 'mock-test' ? 'test' : target === 'socratic' ? 'ai' : target);
            }
          }} 
        />
      )}

      {/* 3. LEARNING STUDIO (Embedded Multi-Tab App) */}
      {view === 'studio' && (
        <StudyApp 
          initialTab={studioTab} 
          onHome={() => navigateTo('home')} 
        />
      )}

      {/* 4. HOME VIEW */}
      {view === 'home' && (
        <Home 
          onOpenDashboard={() => navigateTo('dashboard')} 
          onOpenStudio={(tab) => navigateTo('studio', tab)} 
        />
      )}
    </ErrorBoundary>
  );
}