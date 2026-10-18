import React, { useState, useEffect, useMemo } from 'react';

// Exact color tones from the staggered index tab reference
const TAB_PALETTES = {
  'c11-phy': {
    tabName: 'PHYSICS',
    tabPos: 'right',
    tabColor: '#1F2430',
    bodyColor: '#1F2430',
    accentText: '#A5B4FC',
    subtitle: 'Volume I & II • Mechanics & Waves',
    chaptersCount: 14,
    size: '48.2 MB'
  },
  'c11-chem': {
    tabName: 'CHEMISTRY',
    tabPos: 'left-mid',
    tabColor: '#283868',
    bodyColor: '#283868',
    accentText: '#93C5FD',
    subtitle: 'Physical, Inorganic & Organic',
    chaptersCount: 9,
    size: '42.6 MB'
  },
  'c11-math': {
    tabName: 'MATHEMATICS',
    tabPos: 'mid-right',
    tabColor: '#455A98',
    bodyColor: '#455A98',
    accentText: '#DDD6FE',
    subtitle: 'Calculus, Vectors & Algebra',
    chaptersCount: 14,
    size: '39.1 MB'
  },
  'c11-bio': {
    tabName: 'BIOLOGY',
    tabPos: 'left',
    tabColor: '#C4B79B',
    bodyColor: '#C4B79B',
    accentText: '#2B261D',
    darkText: true,
    subtitle: 'Physiology & Cellular Diversity',
    chaptersCount: 19,
    size: '38.4 MB'
  },
  'c10-sci': {
    tabName: 'SCIENCE',
    tabPos: 'left-mid',
    tabColor: '#283868',
    bodyColor: '#283868',
    accentText: '#93C5FD',
    subtitle: 'Class 10 Integrated Textbook',
    chaptersCount: 13,
    size: '36.5 MB'
  },
  'c10-math': {
    tabName: 'MATHEMATICS',
    tabPos: 'mid-right',
    tabColor: '#455A98',
    bodyColor: '#455A98',
    accentText: '#DDD6FE',
    subtitle: 'Class 10 NCERT Standard',
    chaptersCount: 14,
    size: '32.0 MB'
  },
  'c9-sci': {
    tabName: 'SCIENCE',
    tabPos: 'left-mid',
    tabColor: '#283868',
    bodyColor: '#283868',
    accentText: '#93C5FD',
    subtitle: 'Class 9 Foundations',
    chaptersCount: 12,
    size: '31.4 MB'
  },
  'c9-math': {
    tabName: 'MATHEMATICS',
    tabPos: 'mid-right',
    tabColor: '#455A98',
    bodyColor: '#455A98',
    accentText: '#DDD6FE',
    subtitle: 'Class 9 Standard Core',
    chaptersCount: 12,
    size: '28.4 MB'
  }
};

export default function NcertHub() {
  const [selectedClass, setSelectedClass] = useState('11');
  const [activeBook, setActiveBook] = useState(null);
  const [readingChapter, setReadingChapter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [booksCatalog, setBooksCatalog] = useState([]);

  const BASE_URL = import.meta.env.BASE_URL;

 // Dynamically inject Google 'Roboto' font into document head
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Load manifest or use fallback
  useEffect(() => {
    fetch(`${BASE_URL}books/manifest.json`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setBooksCatalog(data))
      .catch(() => {
        setBooksCatalog([
          { id: 'c11-phy', classNum: '11', title: 'Class 11 Physics', zipFile: 'class-11-physics.zip' },
          { id: 'c11-chem', classNum: '11', title: 'Class 11 Chemistry', zipFile: 'class-11-chemistry.zip' },
          { id: 'c11-math', classNum: '11', title: 'Class 11 Mathematics', zipFile: 'class-11-math.zip' },
          { id: 'c11-bio', classNum: '11', title: 'Class 11 Biology', zipFile: 'class-11-biology.zip' },
          { id: 'c10-sci', classNum: '10', title: 'Class 10 Science', zipFile: 'class-10-science.zip' },
          { id: 'c10-math', classNum: '10', title: 'Class 10 Mathematics', zipFile: 'class-10-math.zip' },
          { id: 'c9-sci', classNum: '9', title: 'Class 9 Science', zipFile: 'class-9-science.zip' },
          { id: 'c9-math', classNum: '9', title: 'Class 9 Mathematics', zipFile: 'class-9-math.zip' },
        ]);
      });
  }, [BASE_URL]);

  const activeBooks = useMemo(() => {
    return booksCatalog.filter((b) => b.classNum === selectedClass);
  }, [booksCatalog, selectedClass]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const hits = [];

    const defaultChapters = [
      { num: '01', title: 'Units & Measurements', subject: 'Physics', classNum: '11', pdf: 'https://ncert.nic.in/textbook/pdf/keph101.pdf' },
      { num: '02', title: 'Motion in a Straight Line', subject: 'Physics', classNum: '11', pdf: 'https://ncert.nic.in/textbook/pdf/keph102.pdf' },
      { num: '04', title: 'Laws of Motion', subject: 'Physics', classNum: '11', pdf: 'https://ncert.nic.in/textbook/pdf/keph104.pdf' },
      { num: '01', title: 'Some Basic Concepts of Chemistry', subject: 'Chemistry', classNum: '11', pdf: 'https://ncert.nic.in/textbook/pdf/kech101.pdf' },
      { num: '02', title: 'Structure of Atom', subject: 'Chemistry', classNum: '11', pdf: 'https://ncert.nic.in/textbook/pdf/kech102.pdf' },
      { num: '01', title: 'Sets & Relations', subject: 'Mathematics', classNum: '11', pdf: 'https://ncert.nic.in/textbook/pdf/kemh101.pdf' },
      { num: '03', title: 'Trigonometric Functions', subject: 'Mathematics', classNum: '11', pdf: 'https://ncert.nic.in/textbook/pdf/kemh103.pdf' },
      { num: '01', title: 'Chemical Reactions and Equations', subject: 'Science', classNum: '10', pdf: 'https://ncert.nic.in/textbook/pdf/jesc101.pdf' },
      { num: '01', title: 'Number Systems', subject: 'Mathematics', classNum: '9', pdf: 'https://ncert.nic.in/textbook/pdf/iemh101.pdf' },
    ];

    defaultChapters.forEach((ch) => {
      if (ch.title.toLowerCase().includes(q) || ch.subject.toLowerCase().includes(q)) {
        hits.push(ch);
      }
    });

    return hits;
  }, [searchQuery]);

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      backgroundColor: '#1A1410',
      backgroundImage: `url(${BASE_URL}library-bg.png), url(${BASE_URL}library-bg.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      fontFamily: '"Geo", monospace, -apple-system, sans-serif',
      color: '#FFFFFF',
      overflowX: 'hidden',
      padding: '28px 24px',
      boxSizing: 'border-box'
    }}>
      {/* Light Apple Glass Wash (Lower intensity so warm library art remains crystal clear) */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 12, 10, 0.28)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Hanging Vines */}
      <svg style={{ position: 'fixed', top: 0, left: 0, width: '180px', height: '180px', zIndex: 3, pointerEvents: 'none', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))' }} viewBox="0 0 100 100">
        <path d="M0,0 Q30,10 45,45 Q50,70 30,95" fill="none" stroke="#2D5A27" strokeWidth="2.5" />
        <path d="M0,0 Q15,35 40,30" fill="none" stroke="#1E3F1A" strokeWidth="2" />
        <path d="M20,12 Q32,8 30,22 Q20,20 20,12 Z" fill="#3D7E35" opacity="0.95" />
        <path d="M38,28 Q52,24 48,38 Q36,36 38,28 Z" fill="#4B9B42" opacity="0.95" />
        <path d="M42,50 Q56,52 48,64 Q38,58 42,50 Z" fill="#2E6327" opacity="0.95" />
        <path d="M28,78 Q36,88 28,95 Q22,86 28,78 Z" fill="#58B24E" opacity="0.9" />
      </svg>

      <svg style={{ position: 'fixed', top: 0, right: 0, width: '180px', height: '180px', zIndex: 3, pointerEvents: 'none', transform: 'scaleX(-1)', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))' }} viewBox="0 0 100 100">
        <path d="M0,0 Q30,10 45,45 Q50,70 30,95" fill="none" stroke="#2D5A27" strokeWidth="2.5" />
        <path d="M20,12 Q32,8 30,22 Q20,20 20,12 Z" fill="#3D7E35" opacity="0.95" />
        <path d="M38,28 Q52,24 48,38 Q36,36 38,28 Z" fill="#4B9B42" opacity="0.95" />
      </svg>

      {/* Floating Koi Fish */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}>
        <div className="ambient-fish fish-1" />
        <div className="ambient-fish fish-2" />
      </div>

      <style>{`
        @keyframes swim1 {
          0% { transform: translate(-80px, 120px) rotate(15deg); opacity: 0; }
          20% { opacity: 0.55; }
          80% { opacity: 0.55; }
          100% { transform: translate(110vw, 400px) rotate(25deg); opacity: 0; }
        }
        @keyframes swim2 {
          0% { transform: translate(105vw, 650px) rotate(-165deg); opacity: 0; }
          20% { opacity: 0.45; }
          80% { opacity: 0.45; }
          100% { transform: translate(-100px, 200px) rotate(-155deg); opacity: 0; }
        }
        .ambient-fish {
          position: absolute;
          width: 36px;
          height: 12px;
          background: radial-gradient(ellipse at 40% 50%, rgba(251, 146, 60, 0.85) 0%, rgba(234, 88, 12, 0.45) 75%, transparent 100%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          filter: blur(1px);
        }
        .ambient-fish::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 2px;
          width: 12px;
          height: 8px;
          background: rgba(251, 146, 60, 0.7);
          border-radius: 50%;
        }
        .fish-1 { animation: swim1 25s linear infinite; }
        .fish-2 { animation: swim2 32s linear infinite 5s; }

        .apple-glass-card {
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease, border-color 0.28s ease;
        }
        .apple-glass-card:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.2);
        }
        .apple-glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, transparent 40%, rgba(255, 255, 255, 0.08) 60%, transparent 100%);
          border-radius: inherit;
          pointer-events: none;
          opacity: 0.3;
          transition: opacity 0.25s ease;
        }
        .apple-glass-card:hover::before {
          opacity: 0.75;
        }
      `}</style>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1360px', margin: '0 auto', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '28px' }}>

        {/* ================= APPLE GLASS HEADER ================= */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '14px 22px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1.2px solid rgba(255, 255, 255, 0.24)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.25)'
        }}>
          {/* Left: Back Button & Wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => {
                if (activeBook) {
                  setActiveBook(null);
                } else if (window.opener) {
                  window.close();
                } else {
                  window.location.hash = '#dashboard';
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                border: '1px solid rgba(255, 255, 255, 0.28)',
                borderRadius: '14px',
                color: '#FFFFFF',
                fontFamily: '"Geo", monospace',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.18s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.26)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)'}
            >
              <span>←</span>
              <span>{activeBook ? 'All Books' : 'Back to Dashboard'}</span>
            </button>

            <div>
              <span style={{ fontSize: '13px', letterSpacing: '1.2px', color: '#FDBA74', textTransform: 'uppercase' }}>
                NCERT Curated Archives
              </span>
              <h2 style={{ margin: 0, fontSize: '24px', letterSpacing: '0.5px', color: '#FFF' }}>
                NCERT Digital Hub
              </h2>
            </div>
          </div>

          {/* Right: Search Bar with public search-icon.svg + Class Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {/* Search Input using public/search-icon.svg */}
            <div style={{
              position: 'relative',
              width: '290px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              display: 'flex',
              alignItems: 'center',
              padding: '6px 14px'
            }}>
              <img 
                src={`${BASE_URL}search-icon.svg`} 
                alt="Search" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline';
                }}
                style={{ width: '16px', height: '16px', marginRight: '8px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
              <span style={{ display: 'none', color: '#CBD5E1', marginRight: '8px', fontSize: '14px' }}>🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chapters or topics..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#FFFFFF',
                  fontFamily: '"Geo", monospace',
                  fontSize: '15px',
                  width: '100%',
                  outline: 'none'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '13px' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Class Tabs */}
            <div style={{
              display: 'flex',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              padding: '4px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
              {['9', '10', '11', '12'].map((cls) => (
                <button
                  key={cls}
                  onClick={() => {
                    setSelectedClass(cls);
                    setActiveBook(null);
                  }}
                  style={{
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '12px',
                    fontFamily: '"Geo", monospace',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: selectedClass === cls ? '#FFFFFF' : 'transparent',
                    color: selectedClass === cls ? '#0F172A' : '#CBD5E1',
                    transition: 'all 0.18s'
                  }}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* ================= SEARCH RESULTS OVERLAY ================= */}
        {searchQuery.trim() && (
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            padding: '22px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#38BDF8' }}>
              Search Matches ({searchResults.length} Chapters Found)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {searchResults.map((ch, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setReadingChapter(ch);
                    setSearchQuery('');
                  }}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    cursor: 'pointer',
                    transition: 'all 0.18s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
                >
                  <span style={{ fontSize: '13px', color: '#FDBA74' }}>
                    CLASS {ch.classNum} • {ch.subject.toUpperCase()}
                  </span>
                  <div style={{ fontSize: '17px', color: '#FFF', marginTop: '2px' }}>
                    Ch {ch.num}: {ch.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW A: STAGGERED TABBED INDEX FOLDERS ================= */}
        {!activeBook && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
              <div>
                <span style={{ fontSize: '14px', color: '#FDE047', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Staggered Physical Shelf
                </span>
                <h3 style={{ fontSize: '32px', margin: '2px 0 0 0', color: '#FFF', letterSpacing: '0.4px' }}>
                  Class {selectedClass} Subject Volumes
                </h3>
              </div>
              <span style={{ fontSize: '14px', color: '#E2E8F0', backgroundColor: 'rgba(0,0,0,0.3)', padding: '6px 14px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.15)' }}>
                Click folder tab to open
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
              gap: '40px 28px'
            }}>
              {activeBooks.map((book) => {
                const palette = TAB_PALETTES[book.id] || TAB_PALETTES['c11-phy'];
                const isDark = palette.darkText;

                const getTabStyle = () => {
                  switch (palette.tabPos) {
                    case 'left':
                      return { left: '16px', width: '130px' };
                    case 'left-mid':
                      return { left: '46px', width: '140px' };
                    case 'mid-right':
                      return { right: '46px', width: '145px' };
                    case 'right':
                    default:
                      return { right: '16px', width: '135px' };
                  }
                };

                return (
                  <div
                    key={book.id}
                    onClick={() => setActiveBook({ ...book, ...palette })}
                    className="apple-glass-card"
                    style={{
                      position: 'relative',
                      height: '270px',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    {/* 1. Staggered Folder Tab */}
                    <div style={{
                      position: 'absolute',
                      top: '0px',
                      height: '38px',
                      backgroundColor: palette.tabColor,
                      borderRadius: '16px 16px 0 0',
                      boxShadow: '0 -2px 8px rgba(0,0,0,0.3), inset 0 1.5px 1px rgba(255,255,255,0.4)',
                      borderTop: '1px solid rgba(255,255,255,0.25)',
                      borderLeft: '1px solid rgba(255,255,255,0.2)',
                      borderRight: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 16px',
                      zIndex: 3,
                      boxSizing: 'border-box',
                      ...getTabStyle()
                    }}>
                      <span style={{
                        fontSize: '15px',
                        letterSpacing: '1px',
                        color: isDark ? '#1C1917' : '#FFFFFF',
                        textTransform: 'uppercase'
                      }}>
                        {palette.tabName}
                      </span>
                    </div>

                    {/* 2. Paper Peek Inserts */}
                    <div style={{
                      position: 'absolute',
                      top: '18px',
                      left: '12px',
                      right: '12px',
                      height: '30px',
                      backgroundColor: '#E5E7EB',
                      borderRadius: '12px 12px 0 0',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      zIndex: 2
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '20px',
                      right: '20px',
                      height: '24px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '10px 10px 0 0',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                      zIndex: 1
                    }} />

                    {/* 3. Main Folder Body with Apple Specular Glass Reflection */}
                    <div style={{
                      position: 'absolute',
                      top: '28px',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: palette.bodyColor,
                      borderRadius: '20px',
                      boxShadow: '0 16px 36px -8px rgba(0,0,0,0.5), inset 0 1.5px 1.5px rgba(255,255,255,0.35)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      padding: '24px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      zIndex: 4,
                      boxSizing: 'border-box',
                      overflow: 'hidden'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{
                          fontSize: '13px',
                          backgroundColor: 'rgba(0, 0, 0, 0.25)',
                          color: isDark ? '#1C1917' : palette.accentText,
                          padding: '3px 8px',
                          borderRadius: '8px',
                          letterSpacing: '0.6px'
                        }}>
                          CLASS {selectedClass} • NCERT
                        </span>
                        <span style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: isDark ? '#1C1917' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px'
                        }}>
                          ›
                        </span>
                      </div>

                      <div>
                        <h4 style={{
                          fontSize: '26px',
                          margin: '0 0 4px 0',
                          color: isDark ? '#1C1917' : '#FFFFFF',
                          lineHeight: 1.15
                        }}>
                          {book.title}
                        </h4>
                        <p style={{
                          fontSize: '15px',
                          margin: 0,
                          color: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)',
                          lineHeight: 1.3
                        }}>
                          {palette.subtitle}
                        </p>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: isDark ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.15)',
                        paddingTop: '10px'
                      }}>
                        <span style={{ fontSize: '15px', color: isDark ? '#1C1917' : '#FFFFFF' }}>
                          {palette.chaptersCount} Chapters
                        </span>
                        <span style={{ fontSize: '14px', color: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.65)' }}>
                          ZIP: {palette.size}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= VIEW B: INSIDE FOLDER (CHAPTERS LIST) ================= */}
        {activeBook && (
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '28px',
            border: '1.2px solid rgba(255, 255, 255, 0.24)',
            padding: '30px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <button
                  onClick={() => setActiveBook(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#FFF',
                    padding: '6px 14px',
                    borderRadius: '10px',
                    fontFamily: '"Geo", monospace',
                    fontSize: '15px',
                    cursor: 'pointer',
                    marginBottom: '8px'
                  }}
                >
                  ← Close Folder
                </button>
                <h3 style={{ fontSize: '36px', margin: 0, color: '#FFF' }}>
                  {activeBook.title}
                </h3>
                <span style={{ fontSize: '16px', color: '#94A3B8' }}>
                  {activeBook.subtitle}
                </span>
              </div>

              {/* Download Entire Book ZIP */}
              <a
                href={`${BASE_URL}books/${activeBook.zipFile}`}
                download
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  padding: '10px 22px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.25)'
                }}
              >
                <span>Download Entire Book ZIP ({activeBook.size})</span>
                <span>↓</span>
              </a>
            </div>

            {/* Chapter Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { num: '01', title: 'Units, Dimensions & Errors', pages: 24, pdf: 'https://ncert.nic.in/textbook/pdf/keph101.pdf' },
                { num: '02', title: 'Motion in a Straight Line', pages: 28, pdf: 'https://ncert.nic.in/textbook/pdf/keph102.pdf' },
                { num: '03', title: 'Motion in a Plane & Projectiles', pages: 34, pdf: 'https://ncert.nic.in/textbook/pdf/keph103.pdf' },
                { num: '04', title: 'Newton’s Laws of Motion', pages: 36, pdf: 'https://ncert.nic.in/textbook/pdf/keph104.pdf' },
                { num: '05', title: 'Work, Energy, Power & Collisions', pages: 30, pdf: 'https://ncert.nic.in/textbook/pdf/keph105.pdf' }
              ].map((ch) => (
                <div
                  key={ch.num}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '18px',
                    padding: '16px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    transition: 'all 0.18s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px'
                    }}>
                      {ch.num}
                    </div>
                    <div>
                      <div style={{ fontSize: '19px', color: '#FFF' }}>{ch.title}</div>
                      <div style={{ fontSize: '14px', color: '#94A3B8' }}>{ch.pages} Pages • Official Stream</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {/* READ ONLINE (Working via Google Docs Viewer bridge) */}
                    <button
                      onClick={() => setReadingChapter(ch)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.28)',
                        backgroundColor: 'rgba(255, 255, 255, 0.18)',
                        color: '#FFF',
                        fontFamily: '"Geo", monospace',
                        fontSize: '15px',
                        cursor: 'pointer'
                      }}
                    >
                      Read Online ↗
                    </button>
                    {/* Direct PDF Download */}
                    <a
                      href={ch.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '8px 16px',
                        borderRadius: '10px',
                        backgroundColor: '#38BDF8',
                        color: '#0F172A',
                        fontSize: '15px',
                        textDecoration: 'none'
                      }}
                    >
                      PDF ↓
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= FIXED STREAMING PDF VIEWER (GOOGLE DOCS VIEWER BYPASS) ================= */}
        {readingChapter && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 500,
            padding: '24px'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '1080px',
              height: '90vh',
              backgroundColor: '#1E293B',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 22px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: 'rgba(15, 23, 42, 0.95)'
              }}>
                <div>
                  <span style={{ fontSize: '13px', color: '#38BDF8' }}>IN-BROWSER READER</span>
                  <h3 style={{ margin: 0, fontSize: '20px', color: '#FFF' }}>
                    Ch {readingChapter.num}: {readingChapter.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href={readingChapter.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      backgroundColor: '#38BDF8',
                      color: '#0F172A',
                      fontSize: '14px',
                      textDecoration: 'none'
                    }}
                  >
                    Open Original PDF ↗
                  </a>
                  <button
                    onClick={() => setReadingChapter(null)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#FFF',
                      cursor: 'pointer',
                      fontFamily: '"Geo", monospace',
                      fontSize: '15px'
                    }}
                  >
                    Close ✕
                  </button>
                </div>
              </div>

              {/* Google Docs Viewer embeds the remote NCERT PDF cleanly without CORS/SAMEORIGIN errors */}
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(readingChapter.pdf)}&embedded=true`}
                title={readingChapter.title}
                style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#FFFFFF' }}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}