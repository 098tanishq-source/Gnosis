import React, { useState, useEffect } from 'react';

const FAILED_QUESTIONS_LOG = [
  {
    id: 'err-1',
    subject: 'Physics',
    chapter: 'Laws of Motion',
    trapType: 'Sign Convention Trap',
    trapColor: '#EF4444',
    trapBg: 'rgba(239, 68, 68, 0.18)',
    question: 'A 2 kg block rests on a rough horizontal plane (μ_s = 0.5). If horizontal force F = 6 N is applied (g = 10 m/s²), find static friction magnitude.',
    failedChoice: '10 N',
    correctAnswer: '6 N',
    timeSpent: '3 min 45 sec (Time Trap)',
    ruleToRemember: 'Static friction is strictly self-adjusting (f_s ≤ μN). It only reaches μN at impending motion verge.',
    retested: false
  },
  {
    id: 'err-2',
    subject: 'Physics',
    chapter: 'Work, Energy & Power',
    trapType: 'Formula Forgotten',
    trapColor: '#F59E0B',
    trapBg: 'rgba(245, 158, 11, 0.18)',
    question: 'Calculate work done by variable force F(x) = (3x² + 4) from x = 0 to x = 2m.',
    failedChoice: '8 J',
    correctAnswer: '16 J',
    timeSpent: '2 min 10 sec',
    ruleToRemember: 'Never use W = F × d for variable forces. Always integrate: W = ∫ F(x) dx.',
    retested: true
  },
  {
    id: 'err-3',
    subject: 'Chemistry',
    chapter: 'Hydrocarbons',
    trapType: 'Calculation Slip',
    trapColor: '#A855F7',
    trapBg: 'rgba(168, 85, 247, 0.18)',
    question: 'Addition of HBr to propene in the presence of benzoyl peroxide yields 1-bromopropane because of:',
    failedChoice: 'Carbocation mechanism',
    correctAnswer: 'Anti-Markovnikov free radical mechanism',
    timeSpent: '1 min 50 sec',
    ruleToRemember: 'Peroxides induce homolytic fission of HBr, causing free radical addition at the terminal carbon.',
    retested: false
  }
];

export default function MockDrillView({ isFullScreen, onToggleFullScreen }) {
  const [activeTab, setActiveTab] = useState('ErrorBooklet'); // 'ErrorBooklet' or 'ActiveDrill'
  const [filterTrap, setFilterTrap] = useState('All');
  const [errorsList, setErrorsList] = useState(FAILED_QUESTIONS_LOG);

  const [activeDrillIndex, setActiveDrillIndex] = useState(0);
  const [userRetestAttempt, setUserRetestAttempt] = useState('');
  const [retestFeedback, setRetestFeedback] = useState(null);

  const BASE_URL = import.meta.env.BASE_URL;

  // Sync state with native browser fullscreen events
  useEffect(() => {
    const handleFsChange = () => {
      const isCurrentlyFs = Boolean(document.fullscreenElement);
      if (isCurrentlyFs !== isFullScreen && onToggleFullScreen) {
        onToggleFullScreen();
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, [isFullScreen, onToggleFullScreen]);

  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
    if (onToggleFullScreen) onToggleFullScreen();
  };

  const filteredErrors = errorsList.filter((item) => {
    if (filterTrap === 'All') return true;
    return item.trapType === filterTrap;
  });

  const handleRunRetest = (e) => {
    e.preventDefault();
    const currentQ = errorsList[activeDrillIndex];
    if (!userRetestAttempt.trim()) return;

    if (userRetestAttempt.trim().toLowerCase().includes(currentQ.correctAnswer.toLowerCase().split(' ')[0])) {
      setRetestFeedback({
        correct: true,
        text: 'Correct! You successfully broke the trap and cleared this error.'
      });
      setErrorsList(errorsList.map((err, i) => (i === activeDrillIndex ? { ...err, retested: true } : err)));
    } else {
      setRetestFeedback({
        correct: false,
        text: `Incorrect. Remember: ${currentQ.ruleToRemember}`
      });
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#EA580C',
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.82)), url(${BASE_URL}mock-test-bg.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: '#FFFFFF',
      borderRadius: isFullScreen ? '0px' : '24px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, sans-serif',
      boxSizing: 'border-box'
    }}>
      
      {/* ================= 1. TRANSLUCENT TOP HEADER ================= */}
      <div style={{
        padding: '16px 28px',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div>
          <span style={{ fontSize: '10.5px', fontWeight: 900, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            Defensive Learning Engine
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 900, margin: '2px 0 0 0', color: '#FFFFFF' }}>
            Mock Drills & Error Remediation Lab
          </h2>
        </div>

        {/* View Switchers & Fullscreen */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => { setActiveTab('ErrorBooklet'); setRetestFeedback(null); }}
            style={{
              padding: '7px 16px',
              borderRadius: '9999px',
              border: activeTab === 'ErrorBooklet' ? '1.5px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: activeTab === 'ErrorBooklet' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)',
              color: activeTab === 'ErrorBooklet' ? '#0F172A' : '#E2E8F0',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Error Booklet ({errorsList.filter((e) => !e.retested).length} Unsolved)
          </button>
          
          <button
            onClick={() => { setActiveTab('ActiveDrill'); setRetestFeedback(null); }}
            style={{
              padding: '7px 16px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: activeTab === 'ActiveDrill' ? '#EA580C' : 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Start Retest Sprint
          </button>

          <button
            onClick={handleFullScreenToggle}
            style={{
              padding: '7px 16px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              backgroundColor: isFullScreen ? '#FFFFFF' : 'rgba(0, 0, 0, 0.3)',
              color: isFullScreen ? '#0F172A' : '#FFFFFF',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          </button>
        </div>
      </div>

      {/* ================= 2. VIEW 1: ERROR BOOKLET ================= */}
      {activeTab === 'ErrorBooklet' && (
        <div style={{
          flex: 1,
          padding: '24px 32px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#CBD5E1', textTransform: 'uppercase' }}>
              Filter by Trap:
            </span>
            {['All', 'Sign Convention Trap', 'Formula Forgotten', 'Calculation Slip'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterTrap(t)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: filterTrap === t ? '1.5px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: filterTrap === t ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)',
                  color: filterTrap === t ? '#0F172A' : '#E2E8F0',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Cards Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredErrors.map((err, idx) => (
              <div
                key={err.id}
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.65)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 900,
                      backgroundColor: err.trapBg,
                      color: err.trapColor,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      border: `1px solid ${err.trapColor}44`
                    }}>
                      {err.trapType}
                    </span>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#FFFFFF' }}>
                      {err.subject} • {err.chapter}
                    </span>
                  </div>

                  <span style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 600 }}>
                    Pacing: {err.timeSpent}
                  </span>
                </div>

                <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#F8FAFC', lineHeight: 1.55 }}>
                  {err.question}
                </div>

                {/* Marked vs Correct Box */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '12px'
                }}>
                  <div>
                    <span style={{ color: '#F87171', fontWeight: 800 }}>Marked Under Exam Pressure: </span>
                    <span style={{ textDecoration: 'line-through', color: '#94A3B8' }}>{err.failedChoice}</span>
                  </div>
                  <div>
                    <span style={{ color: '#4ADE80', fontWeight: 800 }}>Correct Derivation Value: </span>
                    <span style={{ fontWeight: 800, color: '#FFFFFF' }}>{err.correctAnswer}</span>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: 1.5 }}>
                  <strong style={{ color: '#F97316' }}>Key Takeaway:</strong> {err.ruleToRemember}
                </div>

                {/* Card Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '6px' }}>
                  <button
                    onClick={() => {
                      const notes = JSON.parse(localStorage.getItem('gnosis_keep_notes') || '[]');
                      const newNote = {
                        id: `trap-${Date.now()}`,
                        subject: err.subject,
                        chapterNum: 'Ch Trap',
                        chapterName: err.chapter,
                        title: `${err.trapType}: ${err.chapter}`,
                        content: `• Question: ${err.question}\n• Avoid: ${err.failedChoice}\n• Rule: ${err.ruleToRemember}`,
                        color: '#FAECE7',
                        font: 'Roboto',
                        isPinned: true,
                        updatedAt: 'Just now'
                      };
                      localStorage.setItem('gnosis_keep_notes', JSON.stringify([newNote, ...notes]));
                      alert('Trap pinned to Keep Notes as a high-priority revision card!');
                    }}
                    style={{
                      padding: '7px 16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Save to Keep Notes
                  </button>

                  <button
                    onClick={() => {
                      setActiveDrillIndex(idx);
                      setActiveTab('ActiveDrill');
                      setUserRetestAttempt('');
                      setRetestFeedback(null);
                    }}
                    style={{
                      padding: '7px 18px',
                      backgroundColor: '#EA580C',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(234, 88, 12, 0.4)'
                    }}
                  >
                    Retest This Numerical
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 3. VIEW 2: ACTIVE RETEST SPRINT ================= */}
      {activeTab === 'ActiveDrill' && (
        <div style={{
          flex: 1,
          padding: '28px 36px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}>
          {errorsList[activeDrillIndex] ? (
            <div style={{ maxWidth: '760px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Back to Error Booklet + Status Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    setActiveTab('ErrorBooklet');
                    setRetestFeedback(null);
                    setUserRetestAttempt('');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  ← Back to Error Booklet
                </button>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, backgroundColor: '#EA580C', color: '#FFF', padding: '4px 12px', borderRadius: '6px' }}>
                    RE-SOLVE {activeDrillIndex + 1} OF {errorsList.length}
                  </span>
                  <span style={{ fontSize: '11.5px', color: '#CBD5E1', fontWeight: 700 }}>
                    Zero Options Mode
                  </span>
                </div>
              </div>

              {/* Translucent Retest Statement Card */}
              <div style={{
                fontSize: '15.5px',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.65,
                backgroundColor: 'rgba(15, 23, 42, 0.72)',
                backdropFilter: 'blur(16px)',
                padding: '24px 28px',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)'
              }}>
                {errorsList[activeDrillIndex].question}
              </div>

              {/* Form Input Container */}
              <form onSubmit={handleRunRetest} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(16px)',
                padding: '20px 24px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}>
                <label style={{ fontSize: '12.5px', fontWeight: 800, color: '#E2E8F0' }}>
                  Enter your recalculated answer or formula setup:
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={userRetestAttempt}
                    onChange={(e) => setUserRetestAttempt(e.target.value)}
                    placeholder="e.g. 6 N or Anti-Markovnikov..."
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      backgroundColor: 'rgba(0, 0, 0, 0.35)',
                      color: '#FFFFFF',
                      fontSize: '13.5px',
                      outline: 'none',
                      fontFamily: '"Roboto", sans-serif'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#EA580C',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(234, 88, 12, 0.4)'
                    }}
                  >
                    Validate Recalculation
                  </button>
                </div>

                {retestFeedback && (
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    backgroundColor: retestFeedback.correct ? 'rgba(34, 197, 94, 0.25)' : 'rgba(239, 68, 68, 0.25)',
                    border: retestFeedback.correct ? '1px solid #22C55E' : '1px solid #EF4444',
                    color: retestFeedback.correct ? '#86EFAC' : '#FCA5A5',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    lineHeight: 1.45
                  }}>
                    {retestFeedback.text}
                  </div>
                )}
              </form>

              {/* Steppers & Stats */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                <button
                  disabled={activeDrillIndex === 0}
                  onClick={() => {
                    setActiveDrillIndex((i) => Math.max(0, i - 1));
                    setUserRetestAttempt('');
                    setRetestFeedback(null);
                  }}
                  style={{
                    padding: '8px 18px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: activeDrillIndex === 0 ? 'default' : 'pointer',
                    color: activeDrillIndex === 0 ? '#64748B' : '#FFFFFF'
                  }}
                >
                  Previous
                </button>

                <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#CBD5E1' }}>
                  Cleared: {errorsList.filter((e) => e.retested).length} / {errorsList.length}
                </div>

                <button
                  disabled={activeDrillIndex + 1 === errorsList.length}
                  onClick={() => {
                    setActiveDrillIndex((i) => i + 1);
                    setUserRetestAttempt('');
                    setRetestFeedback(null);
                  }}
                  style={{
                    padding: '8px 18px',
                    backgroundColor: '#FFFFFF',
                    color: '#0F172A',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    cursor: activeDrillIndex + 1 === errorsList.length ? 'default' : 'pointer'
                  }}
                >
                  Next Error Item
                </button>
              </div>

            </div>
          ) : null}
        </div>
      )}

    </div>
  );
}