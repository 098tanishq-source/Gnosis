import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import AboutSection from './AboutSection';
import QnaSection from './QnaSection';
import { ArrowUpRight, ArrowDown, Plus, X } from 'lucide-react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './features/Dashboard/Dashboard';
import './home.css';

// Feature Lazy Imports
const MockTest = lazy(() => import('./features/mock-test/MockTest'));
const SocraticAI = lazy(() => import('./features/socratic/SocraticAI'));
const NcertHub = lazy(() => import('./features/ncert/NcertHub'));
const TunnelPlayer = lazy(() => import('./features/player/TunnelPlayer'));

const pages = {
  test: ['Practice with purpose.', 'Three questions. One clearer understanding of physics.'],
  ai: ['Think deeper. Learn better.', 'A guiding question can unlock a difficult concept.'],
  ncert: ['Build your foundations.', 'Your Class 11 physics reading shelf.'],
  player: ['One lesson. Full attention.', 'A quiet space to watch, pause and reflect.'],
};

function StudyApp({ onHome }) {
  const [tab, setTab] = useState('test');
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
        <h1 ref={heading} tabIndex={-1} className="page-title">{pages[tab][0]}</h1>
        <p className="mb-8 mt-3 text-sm leading-6 text-muted">{pages[tab][1]}</p>
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
                onClick={onOpenStudio} 
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
          <span>01 / MOCK TESTS</span>
          <Plus size={15} aria-hidden="true" />
          <span>02 / SOCRATIC HINTS</span>
          <Plus size={15} aria-hidden="true" />
          <span>03 / NCERT HUB</span>
          <Plus size={15} aria-hidden="true" />
          <span>04 / TUNNEL PLAYER</span>
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

export default function App() {
  const [view, setView] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#studio') return 'studio';
    if (hash === '#dashboard') return 'dashboard';
    return 'home';
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#studio') setView('studio');
      else if (hash === '#dashboard') setView('dashboard');
      else if (hash === '#home' || !hash) setView('home');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (target) => {
    window.location.hash = target;
    setView(target);
  };

  return (
    <ErrorBoundary>
      {view === 'dashboard' && (
        <Dashboard 
          onNavigate={(target) => {
            if (target === 'home') navigateTo('home');
            else if (['mock-test', 'socratic', 'ncert', 'player'].includes(target)) {
              navigateTo('studio');
            }
          }} 
        />
      )}
      {view === 'studio' && (
        <StudyApp onHome={() => navigateTo('home')} />
      )}
      {view === 'home' && (
        <Home 
          onOpenDashboard={() => navigateTo('dashboard')} 
          onOpenStudio={() => navigateTo('studio')} 
        />
      )}
    </ErrorBoundary>
  );
}