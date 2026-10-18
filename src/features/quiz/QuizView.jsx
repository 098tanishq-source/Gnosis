import React, { useState } from 'react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    subject: 'Physics',
    topic: 'Laws of Motion & Friction',
    question: 'A block of mass 2 kg rests on a rough horizontal plane with coefficient of static friction μ_s = 0.5. A horizontal force of 6 N is applied on the block (take g = 10 m/s²). The magnitude of the frictional force exerted by the plane on the block is:',
    options: ['10 N', '6 N', '4 N', '0 N'],
    correctIndex: 1,
    explanation: 'Limiting friction is f_max = μ_s·N = 0.5 × (2 × 10) = 10 N. Since the applied force (6 N) is less than 10 N, the block does not slip. Static friction is self-adjusting and exactly balances the applied force: f_s = 6 N.'
  },
  {
    id: 2,
    subject: 'Physics',
    topic: 'Work, Energy & Power',
    question: 'A variable force F = (3x² + 4) N acts on a body of mass 1 kg, displacing it from x = 0 to x = 2 m. The total work done by the force is:',
    options: ['12 J', '16 J', '24 J', '8 J'],
    correctIndex: 1,
    explanation: 'Work done by variable force is W = ∫ F dx = ∫₀² (3x² + 4) dx = [x³ + 4x]₀² = (8 + 8) - 0 = 16 Joules.'
  },
  {
    id: 3,
    subject: 'Chemistry',
    topic: 'Atomic Structure',
    question: 'The total number of nodes (radial + angular) in a 4d orbital is equal to:',
    options: ['3', '2', '4', '1'],
    correctIndex: 0,
    explanation: 'Total nodes = n - 1. For 4d, principal quantum number n = 4. Hence, total nodes = 4 - 1 = 3 (comprising n - l - 1 = 1 radial node and l = 2 angular nodes).'
  }
];

export default function QuizView() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const q = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === q.correctIndex) {
      setScore(prev => prev + 4);
    } else {
      setScore(prev => prev - 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#FAF9F6',
      borderRadius: '24px',
      padding: '32px 40px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflowY: 'auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            JEE Practice Drill (+4 / -1 Scheme)
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: '2px 0 0 0' }}>
            Class 11 Science Quiz
          </h2>
        </div>
        <div style={{
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '6px 16px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 800
        }}>
          Score: {score} Marks
        </div>
      </div>

      {!quizFinished ? (
        <div style={{ maxWidth: '720px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Question Tag */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '3px 10px', borderRadius: '6px' }}>
              Question {currentIdx + 1} of {QUIZ_QUESTIONS.length} • {q.subject}
            </span>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>{q.topic}</span>
          </div>

          {/* Question Text */}
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', lineHeight: 1.6 }}>
            {q.question}
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {q.options.map((opt, i) => {
              let optBg = '#FFFFFF';
              let optBorder = '#E2E8F0';
              let optColor = '#0F172A';

              if (isAnswered) {
                if (i === q.correctIndex) {
                  optBg = '#DCFCE7';
                  optBorder = '#22C55E';
                  optColor = '#15803D';
                } else if (i === selectedOption) {
                  optBg = '#FEE2E2';
                  optBorder = '#EF4444';
                  optColor = '#B91C1C';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  style={{
                    backgroundColor: optBg,
                    border: `1.5px solid ${optBorder}`,
                    borderRadius: '14px',
                    padding: '12px 18px',
                    textAlign: 'left',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    color: optColor,
                    cursor: isAnswered ? 'default' : 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ marginRight: '10px', opacity: 0.6 }}>{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '14px',
              padding: '14px 18px',
              border: '1.5px solid #E2E8F0'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                EXPLANATION & DERIVATION:
              </span>
              <p style={{ fontSize: '12.5px', color: '#334155', margin: 0, lineHeight: 1.5 }}>
                {q.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <button
              onClick={nextQuestion}
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                alignSelf: 'flex-end',
                width: '140px'
              }}
            >
              {currentIdx + 1 === QUIZ_QUESTIONS.length ? 'View Result →' : 'Next Question →'}
            </button>
          )}
        </div>
      ) : (
        /* Results View */
        <div style={{ textAlign: 'center', margin: 'auto 0' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A' }}>Practice Drill Completed!</h3>
          <p style={{ fontSize: '14px', color: '#64748B', marginTop: '6px' }}>
            Final Score: <strong>{score}</strong> out of {QUIZ_QUESTIONS.length * 4} Marks
          </p>
          <button
            onClick={restartQuiz}
            style={{
              marginTop: '18px',
              padding: '10px 24px',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Retake Quiz
          </button>
        </div>
      )}

      <div style={{ fontSize: '11px', color: '#94A3B8', textAlign: 'center' }}>
        Handcoded Practice Set • Automatic AI Generation Coming Soon
      </div>
    </div>
  );
}