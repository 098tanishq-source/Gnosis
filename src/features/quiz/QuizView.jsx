import React, { useState } from 'react';

const QUIZ_QUESTIONS = [
  // --- PHYSICS (Questions 1 - 7) ---
  {
    id: 1,
    subject: 'Physics',
    topic: 'Laws of Motion & Friction',
    question: 'A block of mass 2 kg rests on a rough horizontal plane with coefficient of static friction μ_s = 0.5. A horizontal force of 6 N is applied on the block (take g = 10 m/s²). The frictional force exerted by the plane on the block is:',
    options: ['10 N', '6 N', '4 N', '0 N'],
    correctIndex: 1,
    explanation: 'Limiting friction f_max = μ_s·N = 0.5 × (2 × 10) = 10 N. Because applied force (6 N) < 10 N, the block does not slip. Static friction is self-adjusting to match the applied force: f_s = 6 N.'
  },
  {
    id: 2,
    subject: 'Physics',
    topic: 'Work, Energy & Power',
    question: 'A variable force F = (3x² + 4) N acts on a body of mass 1 kg, displacing it from x = 0 to x = 2 m. The total work done by the force is:',
    options: ['12 J', '16 J', '24 J', '8 J'],
    correctIndex: 1,
    explanation: 'Work done by a variable force is the integral W = ∫₀² (3x² + 4) dx = [x³ + 4x]₀² = (8 + 8) - 0 = 16 Joules.'
  },
  {
    id: 3,
    subject: 'Physics',
    topic: 'Rotational Motion',
    question: 'A solid cylinder and a hollow cylinder of the same mass and radius roll down an inclined plane without slipping from the same height. Which reaches the bottom first?',
    options: ['Solid cylinder', 'Hollow cylinder', 'Both reach simultaneously', 'Depends on angle of inclination'],
    correctIndex: 0,
    explanation: 'Acceleration down an incline is a = g·sin(θ) / (1 + I/mR²). The solid cylinder has a smaller radius of gyration (I = 0.5 mR² vs I = mR² for hollow), producing higher acceleration and shorter transit time.'
  },
  {
    id: 4,
    subject: 'Physics',
    topic: 'Gravitation',
    question: 'If the radius of the Earth contracts by 1% while its mass remains constant, the acceleration due to gravity on its surface will:',
    options: ['Increase by approximately 2%', 'Decrease by approximately 2%', 'Increase by 1%', 'Remain unchanged'],
    correctIndex: 0,
    explanation: 'Since g = GM/R², taking differentials gives dg/g = -2(dR/R). A 1% decrease in radius results in approximately a +2% increase in surface gravity.'
  },
  {
    id: 5,
    subject: 'Physics',
    topic: 'Mechanical Properties of Fluids',
    question: 'Water flows through a horizontal pipe of varying cross-section. At a point where the velocity of flow is maximum, the static pressure of water is:',
    options: ['Minimum', 'Maximum', 'Zero', 'Independent of velocity'],
    correctIndex: 0,
    explanation: 'By Bernoulli\'s Principle for horizontal streamline flow: P + 0.5ρv² = constant. Where flow speed v is highest, static pressure P drops to its minimum.'
  },
  {
    id: 6,
    subject: 'Physics',
    topic: 'Thermodynamics',
    question: 'In an adiabatic expansion of an ideal gas, the work done by the gas is at the expense of its:',
    options: ['Internal energy', 'Heat absorbed from surroundings', 'Potential energy', 'Enthalpy of combustion'],
    correctIndex: 0,
    explanation: 'By the First Law of Thermodynamics: ΔQ = ΔU + W. For an adiabatic process, ΔQ = 0, so W = -ΔU. Work performed during expansion directly reduces the gas\'s internal energy and temperature.'
  },
  {
    id: 7,
    subject: 'Physics',
    topic: 'Oscillations',
    question: 'A simple pendulum is suspended from the roof of an elevator accelerating upwards with acceleration a = g/2. Its new time period relative to stationary period T₀ is:',
    options: ['T₀ · √(2/3)', 'T₀ · √(3/2)', '2 · T₀', 'T₀ / 2'],
    correctIndex: 0,
    explanation: 'Effective gravity inside the upward accelerating frame is g_eff = g + a = 1.5g. Since T = 2π√(L/g_eff), the ratio is T/T₀ = √(g / 1.5g) = √(2/3).'
  },

  // --- CHEMISTRY (Questions 8 - 14) ---
  {
    id: 8,
    subject: 'Chemistry',
    topic: 'Atomic Structure',
    question: 'The total number of nodes (radial + angular) in a 4d orbital is equal to:',
    options: ['3', '2', '4', '1'],
    correctIndex: 0,
    explanation: 'Total nodes = n - 1. For a 4d subshell, n = 4. Total nodes = 4 - 1 = 3 (comprising n - l - 1 = 4 - 2 - 1 = 1 radial node and l = 2 angular nodes).'
  },
  {
    id: 9,
    subject: 'Chemistry',
    topic: 'Chemical Bonding & Molecular Structure',
    question: 'Which of the following molecules has a square planar geometry according to VSEPR theory?',
    options: ['XeF₄', 'SF₄', 'SiF₄', 'BF₄⁻'],
    correctIndex: 0,
    explanation: 'XeF₄ contains 8 valence electrons from Xenon + 4 from Fluorine = 12 electrons (6 pairs: 4 bonding pairs and 2 lone pairs). The octahedral electronic arrangement positions the two lone pairs opposite each other, creating a square planar molecular shape.'
  },
  {
    id: 10,
    subject: 'Chemistry',
    topic: 'Thermodynamics',
    question: 'For a spontaneous reaction at all temperatures, the thermodynamic criteria are:',
    options: ['ΔH < 0 and ΔS > 0', 'ΔH > 0 and ΔS < 0', 'ΔH > 0 and ΔS > 0', 'ΔH < 0 and ΔS < 0'],
    correctIndex: 0,
    explanation: 'From the Gibbs-Helmholtz relation ΔG = ΔH - TΔS, when enthalpy is exothermic (ΔH < 0) and entropy increases (ΔS > 0), ΔG remains strictly negative regardless of temperature T.'
  },
  {
    id: 11,
    subject: 'Chemistry',
    topic: 'Equilibrium',
    question: 'For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), what will be the effect of increasing total pressure on the equilibrium state?',
    options: ['Shifts in the forward direction', 'Shifts in the reverse direction', 'Equilibrium constant increases', 'No change in composition'],
    correctIndex: 0,
    explanation: 'By Le Chatelier\'s Principle, increasing external pressure causes the system to shift toward the side with fewer moles of gas (from 4 moles of reactants to 2 moles of products).'
  },
  {
    id: 12,
    subject: 'Chemistry',
    topic: 'Organic Chemistry: Hydrocarbons',
    question: 'Addition of HBr to propene in the presence of benzoyl peroxide yields 1-bromopropane because of:',
    options: ['Anti-Markovnikov free radical mechanism', 'Carbocation intermediate formation', 'Electrophilic addition via cyclic bromonium', 'Nucleophilic substitution'],
    correctIndex: 0,
    explanation: 'Peroxides induce homolytic fission of HBr to generate bromine free radicals (Kharasch effect), attacking the terminal carbon to form the more stable secondary carbon radical intermediate.'
  },
  {
    id: 13,
    subject: 'Chemistry',
    topic: 'Redox Reactions',
    question: 'In the reaction 2KMnO₄ + 5H₂C₂O₄ + 3H₂SO₄ → K₂SO₄ + 2MnSO₄ + 10CO₂ + 8H₂O, the equivalent weight of KMnO₄ (Molar mass M) is:',
    options: ['M / 5', 'M / 3', 'M / 2', 'M / 1'],
    correctIndex: 0,
    explanation: 'In acidic media, Mn changes oxidation state from +7 in MnO₄⁻ to +2 in Mn²⁺, representing a net gain of 5 electrons. Thus, equivalent weight = Molar mass / n-factor = M / 5.'
  },
  {
    id: 14,
    subject: 'Chemistry',
    topic: 'Classification of Elements',
    question: 'Which of the following sets of elements exhibits the correct order of increasing first ionization enthalpy?',
    options: ['B < C < O < N', 'B < C < N < O', 'O < N < C < B', 'C < B < N < O'],
    correctIndex: 0,
    explanation: 'Ionization enthalpy increases across a period, but Nitrogen (2p³) possesses a half-filled, extra-stable electronic configuration, giving it a higher first ionization enthalpy than Oxygen (2p⁴).'
  },

  // --- MATHEMATICS (Questions 15 - 20) ---
  {
    id: 15,
    subject: 'Mathematics',
    topic: 'Complex Numbers',
    question: 'If z = x + iy such that |z - 1| = |z + 1|, then the locus of z in the Argand plane is:',
    options: ['The imaginary axis (x = 0)', 'The real axis (y = 0)', 'A circle with radius 1', 'A line inclined at 45 degrees'],
    correctIndex: 0,
    explanation: '|z - 1|² = |z + 1|² expands to (x - 1)² + y² = (x + 1)² + y². Simplifying: -2x = 2x → 4x = 0 → x = 0, which is the imaginary y-axis.'
  },
  {
    id: 16,
    subject: 'Mathematics',
    topic: 'Sequences & Series',
    question: 'The sum of the infinite geometric series 1 + 1/3 + 1/9 + 1/27 + ... is equal to:',
    options: ['3 / 2', '4 / 3', '2', '5 / 3'],
    correctIndex: 0,
    explanation: 'For an infinite geometric progression with first term a = 1 and common ratio r = 1/3: S_inf = a / (1 - r) = 1 / (1 - 1/3) = 1 / (2/3) = 3/2.'
  },
  {
    id: 17,
    subject: 'Mathematics',
    topic: 'Straight Lines',
    question: 'The perpendicular distance between the parallel lines 3x + 4y - 9 = 0 and 6x + 8y + 15 = 0 is:',
    options: ['3.3 units', '2.4 units', '1.8 units', '0.6 units'],
    correctIndex: 0,
    explanation: 'Multiply the first line by 2 to equate coefficients: 6x + 8y - 18 = 0. Distance formula d = |c₁ - c₂| / √(a² + b²) = |15 - (-18)| / √(36 + 64) = 33 / 10 = 3.3 units.'
  },
  {
    id: 18,
    subject: 'Mathematics',
    topic: 'Conic Sections',
    question: 'The eccentricity of the hyperbola 9x² - 16y² = 144 is equal to:',
    options: ['5 / 4', '4 / 3', '5 / 3', '7 / 4'],
    correctIndex: 0,
    explanation: 'Dividing by 144 yields x²/16 - y²/9 = 1, where a² = 16 and b² = 9. Eccentricity e = √(1 + b²/a²) = √(1 + 9/16) = √(25/16) = 5/4.'
  },
  {
    id: 19,
    subject: 'Mathematics',
    topic: 'Limits & Derivatives',
    question: 'The value of lim(x → 0) [(1 - cos(2x)) / x²] is:',
    options: ['2', '1', '0', '4'],
    correctIndex: 0,
    explanation: 'Using the trigonometric identity 1 - cos(2x) = 2 sin²(x), the limit becomes 2 · [lim(x→0) (sin x / x)]² = 2 · (1)² = 2.'
  },
  {
    id: 20,
    subject: 'Mathematics',
    topic: 'Binomial Theorem',
    question: 'The total number of terms in the algebraic expansion of (x + a)¹⁰⁰ + (x - a)¹⁰⁰ after collecting like terms is:',
    options: ['51', '101', '50', '200'],
    correctIndex: 0,
    explanation: 'Expanding both binomials cancels out all odd-power terms. The remaining terms correspond to even powers: r = 0, 2, 4, ..., 100, yielding exactly (100 / 2) + 1 = 51 non-zero terms.'
  }
];

export default function QuizView() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [showSolution, setShowSolution] = useState(false);
  const [filterSubject, setFilterSubject] = useState('All');
  const [quizFinished, setQuizFinished] = useState(false);

  const BASE_URL = import.meta.env.BASE_URL;
  const q = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIndex
    }));
  };

  const toggleReview = () => {
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(currentIdx)) {
        next.delete(currentIdx);
      } else {
        next.add(currentIdx);
      }
      return next;
    });
  };

  // Jump to first question of the selected subject
  const handleSubjectFilter = (sub) => {
    setFilterSubject(sub);
    setShowSolution(false);
    setQuizFinished(false);

    if (sub === 'All') {
      setCurrentIdx(0);
    } else {
      const firstIndex = QUIZ_QUESTIONS.findIndex((item) => item.subject === sub);
      if (firstIndex !== -1) {
        setCurrentIdx(firstIndex);
      }
    }
  };

  const calculateScore = () => {
    let marks = 0;
    Object.entries(selectedAnswers).forEach(([idxStr, ansIndex]) => {
      const questionItem = QUIZ_QUESTIONS[parseInt(idxStr, 10)];
      if (ansIndex === questionItem.correctIndex) {
        marks += 4;
      } else {
        marks -= 1;
      }
    });
    return marks;
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalMarks = QUIZ_QUESTIONS.length * 4;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#FAF9F6',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxSizing: 'border-box'
    }}>
      
      {/* ================= 1. WARM TEST CARD HEADER (NO BACK BUTTON) ================= */}
      <div style={{
        backgroundColor: '#EA580C',
        backgroundImage: `url(${BASE_URL}mock-test-bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '16px 28px',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 900, margin: 0, letterSpacing: '0.4px' }}>
            NTA JEE MAINS SIMULATION TEST 03
          </h2>
          <span style={{ fontSize: '10.5px', opacity: 0.9 }}>
            Class 11 Science • Standard (+4 / -1 Marking Pattern)
          </span>
        </div>

        {/* Live Telemetry Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: '5px 12px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 800
          }}>
            Answered: {answeredCount} / {QUIZ_QUESTIONS.length}
          </div>
          <div style={{
            backgroundColor: '#FFFFFF',
            color: '#EA580C',
            padding: '5px 14px',
            borderRadius: '9999px',
            fontSize: '11.5px',
            fontWeight: 900
          }}>
            Live Score: {calculateScore()} / {totalMarks}
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN SPLIT INTERACTIVE WORKSPACE ================= */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 310px',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        
        {/* CENTER QUESTION CANVAS */}
        <div style={{
          padding: '24px 32px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}>
          {!quizFinished ? (
            <div style={{ maxWidth: '780px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Question Meta Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 900,
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}>
                    QUESTION {currentIdx + 1} OF {QUIZ_QUESTIONS.length}
                  </span>
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    backgroundColor: '#E2E8F0',
                    color: '#334155',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    {q.subject}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                    {q.topic}
                  </span>
                </div>

                {/* Flag for Review */}
                <button
                  onClick={toggleReview}
                  style={{
                    backgroundColor: markedForReview.has(currentIdx) ? '#FEF3C7' : '#FFFFFF',
                    border: markedForReview.has(currentIdx) ? '1.5px solid #F59E0B' : '1px solid #CBD5E1',
                    color: markedForReview.has(currentIdx) ? '#B45309' : '#64748B',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {markedForReview.has(currentIdx) ? 'Flagged for Review' : 'Flag Question'}
                </button>
              </div>

              {/* Question Statement */}
              <div style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#0F172A',
                lineHeight: 1.6,
                backgroundColor: '#FFFFFF',
                padding: '18px 22px',
                borderRadius: '16px',
                border: '1.5px solid #E2E8F0',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                {q.question}
              </div>

              {/* Options Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {q.options.map((opt, i) => {
                  const isSelected = selectedAnswers[currentIdx] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      style={{
                        backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                        border: isSelected ? '2px solid #2563EB' : '1.5px solid #E2E8F0',
                        borderRadius: '12px',
                        padding: '12px 18px',
                        textAlign: 'left',
                        fontSize: '13.5px',
                        fontWeight: isSelected ? 800 : 600,
                        color: isSelected ? '#1D4ED8' : '#334155',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>
                        <span style={{ marginRight: '10px', opacity: 0.6 }}>{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </div>
                      {isSelected && (
                        <span style={{ fontSize: '10.5px', fontWeight: 900, color: '#2563EB' }}>
                          [Selected]
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Solution Drawer */}
              {showSolution && (
                <div style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  border: '1.5px solid #CBD5E1'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#0F172A' }}>
                      DERIVATION & TIME TRAP ANALYSIS:
                    </span>
                    <span style={{ fontSize: '11px', color: '#15803D', fontWeight: 800 }}>
                      Correct: Option {String.fromCharCode(65 + q.correctIndex)}
                    </span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#334155', margin: 0, lineHeight: 1.55 }}>
                    {q.explanation}
                  </p>
                </div>
              )}

              {/* Navigation Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    disabled={currentIdx === 0}
                    onClick={() => {
                      setCurrentIdx((c) => Math.max(0, c - 1));
                      setShowSolution(false);
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      color: currentIdx === 0 ? '#94A3B8' : '#334155',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: currentIdx === 0 ? 'default' : 'pointer'
                    }}
                  >
                    Previous
                  </button>

                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      backgroundColor: showSolution ? '#0F172A' : '#FFFFFF',
                      color: showSolution ? '#FFFFFF' : '#334155',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {showSolution ? 'Hide Solution' : 'Inspect Solution'}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {currentIdx + 1 < QUIZ_QUESTIONS.length ? (
                    <button
                      onClick={() => {
                        setCurrentIdx((c) => c + 1);
                        setShowSolution(false);
                      }}
                      style={{
                        padding: '8px 22px',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: '#0F172A',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={() => setQuizFinished(true)}
                      style={{
                        padding: '8px 22px',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: '#16A34A',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 900,
                        cursor: 'pointer'
                      }}
                    >
                      Submit Mock Test
                    </button>
                  )}
                </div>
              </div>

            </div>
          ) : (
            /* COMPLETED RESULT SUMMARY VIEW */
            <div style={{ maxWidth: '600px', width: '100%', margin: 'auto', textAlign: 'center', backgroundColor: '#FFFFFF', padding: '36px', borderRadius: '20px', border: '1.5px solid #E2E8F0' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#16A34A', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                Test Evaluation Completed
              </span>
              <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', margin: '6px 0' }}>
                Exam Scorecard Generated
              </h2>
              <div style={{ fontSize: '38px', fontWeight: 900, color: '#0F172A', margin: '14px 0' }}>
                {calculateScore()} <span style={{ fontSize: '18px', color: '#64748B' }}>/ {totalMarks} Marks</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: '0 0 20px 0' }}>
                Attempted: {answeredCount} questions | Flagged for Review: {markedForReview.size}
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setMarkedForReview(new Set());
                    setCurrentIdx(0);
                    setShowSolution(false);
                    setQuizFinished(false);
                  }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '12.5px',
                    cursor: 'pointer'
                  }}
                >
                  Restart Test Drill
                </button>
                <button
                  onClick={() => setQuizFinished(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    backgroundColor: '#F1F5F9',
                    color: '#334155',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '12.5px',
                    cursor: 'pointer'
                  }}
                >
                  Review Answers
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= 3. RIGHT PALETTE DOCK WITH FUNCTIONAL SUBJECT SWITCHER ================= */}
        <aside style={{
          backgroundColor: '#FFFFFF',
          borderLeft: '1.5px solid #EDEDED',
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 900, color: '#0F172A' }}>
                Question Palette (20)
              </span>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#16A34A', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '6px' }}>
                NTA Pattern
              </span>
            </div>

            {/* Functional Subject Filter Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
              {['All', 'Physics', 'Chemistry', 'Mathematics'].map((s) => {
                const isActive = filterSubject === s;
                return (
                  <button
                    key={s}
                    onClick={() => handleSubjectFilter(s)}
                    style={{
                      padding: '6px 2px',
                      borderRadius: '6px',
                      border: isActive ? '1.5px solid #0F172A' : '1px solid #E2E8F0',
                      backgroundColor: isActive ? '#0F172A' : '#F8FAFC',
                      color: isActive ? '#FFFFFF' : '#64748B',
                      fontSize: '10px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {s === 'Mathematics' ? 'Math' : s.slice(0, 4)}
                  </button>
                );
              })}
            </div>

            {/* Interactive Number Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '6px',
              paddingTop: '6px'
            }}>
              {QUIZ_QUESTIONS.map((item, idx) => {
                const isCurrent = currentIdx === idx;
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isReview = markedForReview.has(idx);
                const matchesFilter = filterSubject === 'All' || item.subject === filterSubject;

                let bg = '#F8FAFC';
                let border = '#E2E8F0';
                let colorText = '#334155';

                if (isReview) {
                  bg = '#FEF3C7';
                  border = '#F59E0B';
                  colorText = '#B45309';
                } else if (isAnswered) {
                  bg = '#DCFCE7';
                  border = '#22C55E';
                  colorText = '#15803D';
                }

                if (isCurrent) {
                  border = '#0F172A';
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentIdx(idx);
                      setShowSolution(false);
                      setQuizFinished(false);
                    }}
                    style={{
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: bg,
                      border: `1.5px solid ${border}`,
                      color: colorText,
                      fontWeight: isCurrent ? 900 : 700,
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isCurrent ? '0 0 0 1px #0F172A' : 'none',
                      opacity: matchesFilter ? 1 : 0.35,
                      transition: 'opacity 0.2s ease, transform 0.1s ease'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend Guide */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '10.5px', color: '#64748B', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#DCFCE7', border: '1px solid #22C55E' }} />
                <span>Answered ({answeredCount})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#FEF3C7', border: '1px solid #F59E0B' }} />
                <span>Marked for Review ({markedForReview.size})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }} />
                <span>Unattempted ({QUIZ_QUESTIONS.length - answeredCount})</span>
              </div>
            </div>

          </div>

          {/* Auto-Solve for Presentation */}
          <button
            onClick={() => {
              const demoAnswers = {};
              QUIZ_QUESTIONS.forEach((item, index) => {
                demoAnswers[index] = item.correctIndex;
              });
              setSelectedAnswers(demoAnswers);
            }}
            style={{
              padding: '8px',
              borderRadius: '10px',
              backgroundColor: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#334155',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            Auto-Fill Demo Solutions
          </button>
        </aside>

      </div>

    </div>
  );
}