import React, { useState, useEffect, useRef } from 'react';
import KeepNotes from '../notes/KeepNotes';
import QuizView from '../quiz/QuizView';
import VideoTunnel from '../player/VideoTunnel';

const SUBJECT_METRICS = {
  Physics: {
    quotaText: '78 / 90',
    quotaTopic: 'Rotational Dynamics',
    pacingIndex: '1.4 min/Q',
    bars: [
      { month: 'Jan', val: 40, highlight: false },
      { month: 'Feb', val: 65, highlight: false },
      { month: 'Mar', val: 52, highlight: false },
      { month: 'Apr', val: 95, highlight: true },
      { month: 'May', val: 74, highlight: false },
      { month: 'Jun', val: 60, highlight: false }
    ],
    courses: [
      {
        id: 'c-phy-1',
        title: 'Class 11 Physics: Mechanics Mastery',
        instructor: 'Prof. H. Verma',
        tag: 'PHY-01',
        tagBg: '#EDE9FE',
        tagColor: '#6D28D9',
        remaining: '8h 45 min',
        progress: 45
      },
      {
        id: 'c-phy-2',
        title: 'Fluid Statics & Surface Tension Numericals',
        instructor: 'Dr. Natalia Varnan',
        tag: 'PHY-02',
        tagBg: '#E0F2FE',
        tagColor: '#0369A1',
        remaining: '4h 10 min',
        progress: 70
      }
    ],
    drills: [
      { name: "Fluid Mechanics: Surface Tension", date: "17 Oct 2026", time: "10:30 PM", status: "Mastered", score: "+4 Marks" },
      { name: "Rotational Dynamics: Inertia Tensors", date: "16 Oct 2026", time: "11:45 PM", status: "Mastered", score: "+4 Marks" },
      { name: "Incline Friction Limiting Angle", date: "15 Oct 2026", time: "09:15 PM", status: "Review Trap", score: "-1 Mark" }
    ]
  },
  Chemistry: {
    quotaText: '64 / 80',
    quotaTopic: 'Electrophilic Addition & Mechanisms',
    pacingIndex: '1.1 min/Q',
    bars: [
      { month: 'Jan', val: 50, highlight: false },
      { month: 'Feb', val: 72, highlight: false },
      { month: 'Mar', val: 68, highlight: false },
      { month: 'Apr', val: 82, highlight: false },
      { month: 'May', val: 94, highlight: true },
      { month: 'Jun', val: 76, highlight: false }
    ],
    courses: [
      {
        id: 'c-chem-1',
        title: 'Organic Chemistry Foundations & Mechanisms',
        instructor: 'Dr. Natalia Varnan',
        tag: 'CHM-01',
        tagBg: '#FFE4E6',
        tagColor: '#BE123C',
        remaining: '18h 12 min',
        progress: 75
      },
      {
        id: 'c-chem-2',
        title: 'Thermodynamics & Equilibrium Curves',
        instructor: 'Prof. K. Sen',
        tag: 'CHM-02',
        tagBg: '#FEF3C7',
        tagColor: '#B45309',
        remaining: '6h 30 min',
        progress: 35
      }
    ],
    drills: [
      { name: "Organic: Nucleophilic Addition", date: "17 Oct 2026", time: "09:40 PM", status: "Mastered", score: "+4 Marks" },
      { name: "Markovnikov Rule & Carbocation Shifts", date: "16 Oct 2026", time: "10:15 PM", status: "Mastered", score: "+4 Marks" },
      { name: "Enthalpy of Formation Traps", date: "14 Oct 2026", time: "08:20 PM", status: "Review Trap", score: "-1 Mark" }
    ]
  },
  Mathematics: {
    quotaText: '52 / 70',
    quotaTopic: 'De Moivre’s Theorem & Complex Roots',
    pacingIndex: '2.0 min/Q',
    bars: [
      { month: 'Jan', val: 35, highlight: false },
      { month: 'Feb', val: 50, highlight: false },
      { month: 'Mar', val: 64, highlight: false },
      { month: 'Apr', val: 70, highlight: false },
      { month: 'May', val: 80, highlight: false },
      { month: 'Jun', val: 92, highlight: true }
    ],
    courses: [
      {
        id: 'c-math-1',
        title: 'Differential Calculus & Limits Integration',
        instructor: 'Prof. R. Sharma',
        tag: 'MTH-01',
        tagBg: '#DCFCE7',
        tagColor: '#15803D',
        remaining: '14h 25 min',
        progress: 60
      },
      {
        id: 'c-math-2',
        title: 'Conic Sections: Parabola & Hyperbola',
        instructor: 'Prof. M. Aggarwal',
        tag: 'MTH-02',
        tagBg: '#F3E8FF',
        tagColor: '#7E22CE',
        remaining: '9h 10 min',
        progress: 25
      }
    ],
    drills: [
      { name: "De Moivre's Theorem & Roots", date: "17 Oct 2026", time: "11:10 PM", status: "Review Trap", score: "-1 Mark" },
      { name: "Standard Limit Trigonometric Forms", date: "16 Oct 2026", time: "08:50 PM", status: "Mastered", score: "+4 Marks" },
      { name: "Indefinite Integral Substitution", date: "15 Oct 2026", time: "10:30 PM", status: "Mastered", score: "+4 Marks" }
    ]
  }
};

export default function Dashboard({ onNavigate }) {
  const [activeNavIndex, setActiveNavIndex] = useState(1);
  const [hoveredNavIndex, setHoveredNavIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Physics');
  const [currentView, setCurrentView] = useState('dashboard');

  const [leftPanelExpanded, setLeftPanelExpanded] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [isTunnelFullScreen, setIsTunnelFullScreen] = useState(false);

  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [courseFilter, setCourseFilter] = useState('Active');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignmentsList, setAssignmentsList] = useState([
    {
      id: 1,
      title: "Fluid Mechanics Formulae",
      subject: "Physics",
      dueDate: "17 Oct 2026, 10:30 AM",
      status: "In progress",
      badgeColor: "#EDE9FE",
      badgeText: "#6D28D9",
      description: "Derive terminal velocity equations and compile standard values of surface tension coefficients for water and mercury.",
      progress: 60
    },
    {
      id: 2,
      title: "Organic Synthesis PYQ",
      subject: "Chemistry",
      dueDate: "16 Oct 2026, 12:45 AM",
      status: "Completed",
      badgeColor: "#DCFCE7",
      badgeText: "#15803D",
      description: "Complete 25 previous years' questions on electrophilic addition mechanisms and Markovnikov additions.",
      progress: 100
    },
    {
      id: 3,
      title: "Rotational Dynamics Set",
      subject: "Physics",
      dueDate: "18 Oct 2026, 03:00 PM",
      status: "Upcoming",
      badgeColor: "#FFEDD5",
      badgeText: "#C2410C",
      description: "Moment of inertia derivation drills for non-symmetric bodies using parallel and perpendicular axis theorems.",
      progress: 15
    }
  ]);

  const [fullscreenGraph, setFullscreenGraph] = useState(null);

  const [customAccent, setCustomAccent] = useState(() => {
    return localStorage.getItem('gnosis_custom_accent') || '#2E285C';
  });

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [rgbValues, setRgbValues] = useState({ r: 46, g: 40, b: 92 });
  const [hexInput, setHexInput] = useState('2E285C');
  const [hue, setHue] = useState(247);
  const [crosshairPos, setCrosshairPos] = useState({ x: 190, y: 40 });

  const spectrumCanvasRef = useRef(null);
  const hueStripRef = useRef(null);

  const BASE_URL = import.meta.env.BASE_URL;
  const HERO_IMAGE = `${BASE_URL}hero-bg.png`;

  const updatePersistentColor = (colorHex) => {
    setCustomAccent(colorHex);
    localStorage.setItem('gnosis_custom_accent', colorHex);
  };

  const openStandaloneTool = (toolKey) => {
    const baseUrl = window.location.href.split('?')[0].split('#')[0];
    const targetUrl = `${baseUrl}?page=${toolKey}#${toolKey}`;
    window.open(targetUrl, '_blank');
  };

  const navItems = [
    { id: 'Home', iconFile: 'home-icon.png', label: 'Home', route: 'home', standalone: false },
    { id: 'Overview', iconFile: 'dashboard-icon.png', label: 'Dashboard', route: 'dashboard', standalone: false },
    { id: 'Notes', iconFile: 'notes-icon.png', label: 'Keep Notes', route: 'notes', standalone: false },
    { id: 'Quiz', iconFile: 'quiz-icon.png', label: 'Live Quiz', route: 'quiz', standalone: false },
    { id: 'Analytics', iconFile: 'analytics-icon.png', label: 'Mock Drills', route: 'mock-test', standalone: true, toolKey: 'mock-test' },
    { id: 'NCERT', iconFile: 'ncert-icon.png', label: 'NCERT Hub', route: 'ncert', standalone: true, toolKey: 'ncert' },
    { id: 'Socratic', iconFile: 'socratic-icon.png', label: 'Socratic AI', route: 'socratic', standalone: true, toolKey: 'socratic' },
    { id: 'Player', iconFile: 'player-icon.png', label: 'Video Tunnel', route: 'player', standalone: false },
    { id: 'Settings', iconFile: 'setting-icon.png', label: 'Settings', route: 'settings', standalone: false },
  ];

  const [selectedDay, setSelectedDay] = useState(17);
  const activeMonthDays = [1, 2, 4, 5, 8, 9, 10, 12, 14, 15, 16, 17];
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const [secondsSpent, setSecondsSpent] = useState(16338);
  useEffect(() => {
    const timer = setInterval(() => setSecondsSpent((p) => p + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const activeData = SUBJECT_METRICS[activeFilter] || SUBJECT_METRICS.Physics;

  useEffect(() => {
    if (!showColorPicker || !spectrumCanvasRef.current) return;
    const canvas = spectrumCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const horizGrad = ctx.createLinearGradient(0, 0, w, 0);
    horizGrad.addColorStop(0, '#FFFFFF');
    horizGrad.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
    ctx.fillStyle = horizGrad;
    ctx.fillRect(0, 0, w, h);

    const vertGrad = ctx.createLinearGradient(0, 0, 0, h);
    vertGrad.addColorStop(0, 'rgba(0,0,0,0)');
    vertGrad.addColorStop(1, '#000000');
    ctx.fillStyle = vertGrad;
    ctx.fillRect(0, 0, w, h);
  }, [showColorPicker, hue]);

  const handleSpectrumClick = (e) => {
    const canvas = spectrumCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(canvas.width - 1, e.clientX - rect.left));
    const y = Math.max(0, Math.min(canvas.height - 1, e.clientY - rect.top));

    setCrosshairPos({ x, y });
    const ctx = canvas.getContext('2d');
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const nextRgb = { r: pixel[0], g: pixel[1], b: pixel[2] };
    const nextHex = ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase();

    setRgbValues(nextRgb);
    setHexInput(nextHex);
    updatePersistentColor(`#${nextHex}`);
  };

  const handleHueClick = (e) => {
    const rect = hueStripRef.current.getBoundingClientRect();
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    const nextHue = Math.round((y / rect.height) * 360);
    setHue(nextHue);

    setTimeout(() => {
      if (spectrumCanvasRef.current) {
        const ctx = spectrumCanvasRef.current.getContext('2d');
        const pixel = ctx.getImageData(crosshairPos.x, crosshairPos.y, 1, 1).data;
        const nextRgb = { r: pixel[0], g: pixel[1], b: pixel[2] };
        const nextHex = ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase();
        setRgbValues(nextRgb);
        setHexInput(nextHex);
        updatePersistentColor(`#${nextHex}`);
      }
    }, 10);
  };

  const itemHeight = 60;
  const capsuleHeight = 48;
  const filletRadius = 18;
  const capsuleOffsetTop = activeNavIndex * itemHeight + (itemHeight - capsuleHeight) / 2;

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      backgroundColor: customAccent,
      backgroundImage: `radial-gradient(at 0% 0%, rgba(255,255,255,0.14) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(0,0,0,0.22) 0px, transparent 60%)`,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#0F172A',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      boxSizing: 'border-box',
      transition: 'background-color 0.3s ease'
    }}>
      {/* ================= 1. LEFT PANEL (84px RESTORED) ================= */}
      {!isTunnelFullScreen && (
        <aside
          onMouseEnter={() => setLeftPanelExpanded(true)}
          onMouseLeave={() => setLeftPanelExpanded(false)}
          style={{
            width: leftPanelExpanded ? '230px' : '84px',
            height: '100%',
            transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            padding: '20px 0',
            flexShrink: 0,
            userSelect: 'none',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 40
          }}
        >
          {/* Brand Header */}
          <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: leftPanelExpanded ? 'flex-start' : 'center',
            paddingLeft: leftPanelExpanded ? '22px' : '0',
            marginBottom: '16px',
            boxSizing: 'border-box'
          }}>
            <div 
              onClick={() => {
                setCurrentView('dashboard');
                if (onNavigate) onNavigate('home');
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img 
                  src={`${BASE_URL}gnosis.png`} 
                  alt=""
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                />
              </div>

              {leftPanelExpanded && (
                <span style={{ fontSize: '16px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>
                  Gnosis
                </span>
              )}
            </div>
          </div>

          {/* Navigation with Half-Cut Capsule + Overlap Bleed */}
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Top Fillet */}
            <div style={{
              position: 'absolute',
              right: '-1px',
              top: `${capsuleOffsetTop - filletRadius + 1}px`,
              width: `${filletRadius + 2}px`,
              height: `${filletRadius}px`,
              transition: 'top 0.32s cubic-bezier(0.34, 1.35, 0.64, 1)',
              pointerEvents: 'none',
              zIndex: 15
            }}>
              <svg width={filletRadius + 2} height={filletRadius} viewBox={`0 0 ${filletRadius + 2} ${filletRadius}`} fill="none">
                <path
                  d={`M 0 ${filletRadius} C ${filletRadius * 0.55} ${filletRadius}, ${filletRadius * 0.45}, ${filletRadius} 0 L ${filletRadius + 2} 0 L ${filletRadius + 2} ${filletRadius} Z`}
                  fill="#F8FAFC"
                />
              </svg>
            </div>

            {/* Half-Cut White Capsule */}
            <div style={{
              position: 'absolute',
              right: '-2px',
              left: leftPanelExpanded ? '14px' : '10px',
              top: `${capsuleOffsetTop}px`,
              height: `${capsuleHeight}px`,
              borderTopLeftRadius: '9999px',
              borderBottomLeftRadius: '9999px',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              backgroundColor: '#F8FAFC',
              transition: 'top 0.32s cubic-bezier(0.34, 1.35, 0.64, 1), left 0.25s ease',
              pointerEvents: 'none',
              zIndex: 10
            }} />

            {/* Bottom Fillet */}
            <div style={{
              position: 'absolute',
              right: '-1px',
              top: `${capsuleOffsetTop + capsuleHeight - 1}px`,
              width: `${filletRadius + 2}px`,
              height: `${filletRadius + 2}px`,
              transition: 'top 0.32s cubic-bezier(0.34, 1.35, 0.64, 1)',
              pointerEvents: 'none',
              zIndex: 15
            }}>
              <svg width={filletRadius + 2} height={filletRadius + 2} viewBox={`0 0 ${filletRadius + 2} ${filletRadius + 2}`} fill="none">
                <path
                  d={`M ${filletRadius + 2} 0 L 0 0 C ${filletRadius * 0.55} 0, ${filletRadius} ${filletRadius * 0.45}, ${filletRadius} ${filletRadius} L ${filletRadius + 2} ${filletRadius} Z`}
                  fill="#F8FAFC"
                />
              </svg>
            </div>

            {navItems.map((item, idx) => {
              const isActive = activeNavIndex === idx;
              const isHovered = hoveredNavIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNavIndex(idx);

                    if (item.route === 'notes') {
                      setCurrentView('notes');
                      return;
                    }
                    if (item.route === 'quiz') {
                      setCurrentView('quiz');
                      return;
                    }
                    if (item.route === 'player') {
                      setCurrentView('player');
                      return;
                    }
                    if (item.route === 'dashboard') {
                      setCurrentView('dashboard');
                      return;
                    }

                    if (item.standalone && item.toolKey) {
                      openStandaloneTool(item.toolKey);
                      return;
                    }

                    if (onNavigate && item.route !== 'dashboard') {
                      onNavigate(item.route);
                    }
                  }}
                  onMouseEnter={() => setHoveredNavIndex(idx)}
                  onMouseLeave={() => setHoveredNavIndex(null)}
                  style={{
                    width: '100%',
                    height: `${itemHeight}px`,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: leftPanelExpanded ? 'flex-start' : 'center',
                    padding: leftPanelExpanded ? '0 0 0 24px' : '0',
                    gap: '14px',
                    backgroundColor: 'transparent',
                    color: isActive ? customAccent : (isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)'),
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    zIndex: 25
                  }}
                >
                  <span style={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isHovered && !isActive ? 'scale(1.15)' : 'none',
                    transition: 'transform 0.2s',
                    flexShrink: 0
                  }}>
                    <img 
                      src={`${BASE_URL}${item.iconFile}`} 
                      alt=""
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      style={{
                        width: '20px',
                        height: '20px',
                        objectFit: 'contain',
                        filter: isActive ? 'none' : 'brightness(0) invert(1)'
                      }}
                    />
                  </span>
                  {leftPanelExpanded && (
                    <span style={{ fontSize: '13.5px', fontWeight: isActive ? 800 : 600, whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Exit Button */}
          <div style={{ width: '100%', display: 'flex', justifyContent: leftPanelExpanded ? 'flex-start' : 'center', paddingLeft: leftPanelExpanded ? '20px' : '0' }}>
            <button 
              onClick={() => onNavigate && onNavigate('home')}
              title="Exit Portal"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '10px',
                padding: leftPanelExpanded ? '8px 16px' : '10px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              <span>[←]</span>
              {leftPanelExpanded && <span>Exit App</span>}
            </button>
          </div>
        </aside>
      )}

      {/* ================= 2. MAIN INNER CANVAS (RESTORED TOP/RIGHT/BOTTOM MARGINS) ================= */}
      <div style={{
        flex: 1,
        height: isTunnelFullScreen ? '100vh' : 'calc(100vh - 28px)',
        margin: isTunnelFullScreen ? '0' : '14px 14px 14px 0',
        backgroundColor: '#F8FAFC',
        borderRadius: isTunnelFullScreen ? '0px' : '32px',
        boxShadow: isTunnelFullScreen ? 'none' : '-10px 0 35px -5px rgba(0, 0, 0, 0.16), 0 10px 30px rgba(0, 0, 0, 0.12), inset 1px 1px 0 rgba(255, 255, 255, 0.8)',
        padding: isTunnelFullScreen ? '0px' : '26px 30px',
        display: 'flex',
        gap: '20px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* VIEW SWITCHER: KEEP NOTES */}
        {currentView === 'notes' && (
          <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
            <KeepNotes />
          </div>
        )}

        {/* VIEW SWITCHER: LIVE QUIZ */}
        {currentView === 'quiz' && (
          <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
            <QuizView onBack={() => setCurrentView('dashboard')} />
          </div>
        )}

        {/* VIEW SWITCHER: VIDEO TUNNEL */}
        {currentView === 'player' && (
          <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
            <VideoTunnel 
              isFullScreen={isTunnelFullScreen}
              onToggleFullScreen={() => setIsTunnelFullScreen((prev) => !prev)}
              onBack={() => {
                setIsTunnelFullScreen(false);
                setCurrentView('dashboard');
              }} 
            />
          </div>
        )}

        {/* VIEW SWITCHER: DEFAULT DASHBOARD OVERVIEW */}
        {currentView === 'dashboard' && (
          <>
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '4px' }}>
              {/* Top Bar with Live Subject Switchers */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px' }}>
                    Candidate Learning Dashboard
                  </span>
                  <div style={{ display: 'flex', gap: '6px', backgroundColor: '#EDF2F7', padding: '3px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700 }}>
                    {['Physics', 'Chemistry', 'Mathematics'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setActiveFilter(s)}
                        style={{
                          border: 'none',
                          padding: '5px 14px',
                          borderRadius: '9999px',
                          cursor: 'pointer',
                          backgroundColor: activeFilter === s ? customAccent : 'transparent',
                          color: activeFilter === s ? '#FFF' : '#64748B',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Session Timer & RainRGB Trigger */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '9999px',
                    padding: '6px 14px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#475569'
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                    <span>Daily Study:</span>
                    <span style={{ fontFamily: 'monospace', color: '#0F172A' }}>{formatTimer(secondsSpent)}</span>
                  </div>

                  <button
                    onClick={() => setShowColorPicker(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(14px)',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '11px',
                      color: '#0F172A'
                    }}
                  >
                    <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: customAccent, border: '1px solid #888' }} />
                    RainRGB Theme
                  </button>
                </div>
              </div>

              {/* Dynamic Graphs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', gap: '16px' }}>
                {/* Target Card */}
                <div style={{
                  background: `linear-gradient(135deg, ${customAccent}EE 0%, ${customAccent} 100%)`,
                  borderRadius: '22px',
                  padding: '20px',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: `0 14px 28px -6px ${customAccent}55, 0 8px 12px -4px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.25)`,
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  transition: 'background-color 0.3s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, opacity: 0.9 }}>DAILY SOLVE QUOTA</div>
                      <div style={{ fontSize: '10px', opacity: 0.75 }}>JEE Pacing Standard</div>
                    </div>
                    <button 
                      onClick={() => setFullscreenGraph('goal')}
                      title="Fullscreen"
                      style={{ background: 'rgba(255,255,255,0.22)', border: 'none', borderRadius: '50%', width: '26px', height: '26px', color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}
                    >
                      [+]
                    </button>
                  </div>

                  <div style={{ margin: '10px 0' }}>
                    <div style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.5px' }}>
                      {activeData.quotaText}
                    </div>
                    <div style={{ fontSize: '11px', opacity: 0.85 }}>Questions Mastered Today</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', fontWeight: 700 }}>
                    <span>{activeData.quotaTopic}</span>
                    <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '6px' }}>{activeFilter}</span>
                  </div>
                </div>

                {/* Engagement Rate Bars with dynamic data */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(14px)',
                  borderRadius: '22px',
                  padding: '18px 20px',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Engagement Rate</span>
                      <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>Monthly {activeFilter} accuracy distribution</span>
                    </div>
                    <button 
                      onClick={() => setFullscreenGraph('engagement')}
                      title="Fullscreen"
                      style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}
                    >
                      [+]
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '105px', padding: '8px 4px 0 4px' }}>
                    {activeData.bars.map((bar, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', flex: 1 }}>
                        <div style={{
                          width: '32px',
                          height: `${bar.val}%`,
                          borderRadius: '9999px',
                          backgroundColor: bar.highlight ? customAccent : `${customAccent}40`,
                          backgroundImage: bar.highlight ? 'none' : `repeating-linear-gradient(45deg, ${customAccent}20, ${customAccent}20 3px, transparent 3px, transparent 6px)`,
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          paddingTop: '6px',
                          boxSizing: 'border-box',
                          transition: 'height 0.4s ease, background-color 0.3s'
                        }}>
                          {bar.highlight && <span style={{ fontSize: '8.5px', fontWeight: 900, color: '#FFF' }}>+17%</span>}
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B' }}>{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wave Chart */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(14px)',
                  borderRadius: '22px',
                  padding: '18px 20px',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>Time Pacing Index</div>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>
                        {activeData.pacingIndex}
                      </div>
                    </div>
                    <button 
                      onClick={() => setFullscreenGraph('wave')}
                      title="Fullscreen"
                      style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}
                    >
                      [+]
                    </button>
                  </div>

                  <div style={{ width: '100%', height: '65px', margin: '4px 0' }}>
                    <svg viewBox="0 0 200 65" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="waveG" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={customAccent} stopOpacity="0.35" />
                          <stop offset="100%" stopColor={customAccent} stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,45 Q25,10 50,35 T100,20 T150,50 T200,15" fill="none" stroke={customAccent} strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M0,45 Q25,10 50,35 T100,20 T150,50 T200,15 L200,65 L0,65 Z" fill="url(#waveG)" />
                    </svg>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => setCurrentView('quiz')}
                      style={{ flex: 1, padding: '6px 0', borderRadius: '8px', backgroundColor: customAccent, color: '#FFF', border: 'none', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Scorecard
                    </button>
                    <button 
                      onClick={() => openStandaloneTool('socratic')}
                      style={{ flex: 1, padding: '6px 0', borderRadius: '8px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Socratic AI
                    </button>
                  </div>
                </div>
              </div>

              {/* Course You're Taking Section */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(14px)',
                borderRadius: '24px',
                padding: '22px 24px',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', position: 'relative' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    {activeFilter} Modules You’re Taking
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ position: 'relative' }}>
                      <div 
                        onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#475569',
                          backgroundColor: '#F1F5F9',
                          padding: '5px 12px',
                          borderRadius: '9999px',
                          cursor: 'pointer',
                          userSelect: 'none',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <span>{courseFilter}</span>
                        <span style={{
                          fontSize: '8px',
                          transition: 'transform 0.25s ease',
                          transform: isFilterDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}>
                          ▼
                        </span>
                      </div>

                      {isFilterDropdownOpen && (
                        <div style={{
                          position: 'absolute',
                          right: 0,
                          top: '32px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '14px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                          border: '1px solid #E2E8F0',
                          padding: '6px',
                          zIndex: 50,
                          minWidth: '110px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px'
                        }}>
                          {['Active', 'Completed', 'All Modules'].map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setCourseFilter(option);
                                setIsFilterDropdownOpen(false);
                              }}
                              style={{
                                background: courseFilter === option ? '#F1F5F9' : 'transparent',
                                border: 'none',
                                padding: '6px 10px',
                                textAlign: 'left',
                                fontSize: '11px',
                                fontWeight: courseFilter === option ? 800 : 600,
                                color: '#0F172A',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setIsAddCourseOpen(!isAddCourseOpen)}
                      title={isAddCourseOpen ? "Close panel" : "Add/Expand course"}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: '#A3E635',
                        color: '#1E293B',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        outline: 'none',
                        boxShadow: '0 2px 8px rgba(163, 230, 53, 0.45)',
                        transform: isAddCourseOpen ? 'rotate(135deg) scale(1.08)' : 'rotate(0deg) scale(1)',
                        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s',
                        userSelect: 'none'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Inline Drawer */}
                <div style={{
                  maxHeight: isAddCourseOpen ? '220px' : '0px',
                  opacity: isAddCourseOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin-bottom 0.3s ease',
                  marginBottom: isAddCourseOpen ? '16px' : '0px'
                }}>
                  <div style={{
                    padding: '16px 20px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '18px',
                    border: `1.5px dashed ${customAccent}55`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A' }}>
                        Queue a New {activeFilter} Topic
                      </span>
                      <span style={{ fontSize: '10px', color: '#64748B' }}>NCERT Class 11 PCM</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr auto', gap: '10px' }}>
                      <input 
                        type="text" 
                        placeholder={`e.g. ${activeFilter}: Advanced Numericals`} 
                        style={{
                          padding: '8px 14px',
                          borderRadius: '10px',
                          border: '1px solid #CBD5E1',
                          fontSize: '11.5px',
                          outline: 'none',
                          backgroundColor: '#FFFFFF'
                        }}
                      />
                      <input 
                        type="text" 
                        placeholder="Instructor Name" 
                        style={{
                          padding: '8px 14px',
                          borderRadius: '10px',
                          border: '1px solid #CBD5E1',
                          fontSize: '11.5px',
                          outline: 'none',
                          backgroundColor: '#FFFFFF'
                        }}
                      />
                      <button
                        onClick={() => setIsAddCourseOpen(false)}
                        style={{
                          padding: '8px 18px',
                          backgroundColor: customAccent,
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: `0 4px 12px ${customAccent}40`
                        }}
                      >
                        Add Module
                      </button>
                    </div>
                  </div>
                </div>

                {/* Course Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {activeData.courses.map((course) => (
                    <div 
                      key={course.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 18px',
                        borderRadius: '18px',
                        backgroundColor: '#FFFFFF',
                        border: '1.5px solid #F1F5F9',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '14px',
                          backgroundColor: course.tagBg,
                          color: course.tagColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11.5px',
                          fontWeight: 900
                        }}>
                          {course.tag}
                        </div>
                        <div>
                          <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>{course.title}</div>
                          <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                            <span>Prof.</span> {course.instructor}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        <div>
                          <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>Remaining</div>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{course.remaining}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: '3px solid #E2E8F0',
                            borderTopColor: '#22C55E',
                            borderRightColor: '#22C55E',
                            borderBottomColor: course.progress > 50 ? '#22C55E' : 'transparent',
                            transform: 'rotate(45deg)'
                          }} />
                          <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{course.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assignment Detail View */}
              {selectedAssignment && (
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '24px',
                  border: `2px solid ${customAccent}`,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: customAccent, backgroundColor: `${customAccent}18`, padding: '3px 10px', borderRadius: '6px' }}>
                          {selectedAssignment.subject}
                        </span>
                        <span style={{ fontSize: '9.5px', fontWeight: 700, backgroundColor: selectedAssignment.badgeColor, color: selectedAssignment.badgeText, padding: '3px 8px', borderRadius: '9999px' }}>
                          {selectedAssignment.status}
                        </span>
                      </div>
                      <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                        {selectedAssignment.title}
                      </h2>
                      <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                        Due Date: {selectedAssignment.dueDate}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedAssignment(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#F1F5F9',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '10px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      Close View
                    </button>
                  </div>

                  <div style={{ backgroundColor: '#F8FAFC', borderRadius: '16px', padding: '16px', marginBottom: '18px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', marginBottom: '6px' }}>ASSIGNMENT BRIEF</div>
                    <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                      {selectedAssignment.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '130px', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: `${selectedAssignment.progress}%`, height: '100%', backgroundColor: customAccent, borderRadius: '9999px' }} />
                      </div>
                      <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0F172A' }}>
                        {selectedAssignment.progress}% Complete
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => openStandaloneTool('ncert')}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#F1F5F9',
                          color: '#334155',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Open Reference Notes
                      </button>
                      <button 
                        onClick={() => openStandaloneTool('mock-test')}
                        style={{
                          padding: '8px 18px',
                          backgroundColor: customAccent,
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: `0 4px 12px ${customAccent}40`
                        }}
                      >
                        Start Submission Drill
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Performance Drill Log */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(14px)',
                borderRadius: '22px',
                padding: '18px 22px',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                    Recent {activeFilter} Mock Drills
                  </span>
                  <span 
                    onClick={() => setCurrentView('quiz')}
                    style={{ fontSize: '11px', fontWeight: 700, color: customAccent, cursor: 'pointer' }}
                  >
                    View All History
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeData.drills.map((row, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #F1F5F9'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: row.score.includes('+') ? customAccent : '#EF4444' }} />
                        <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A' }}>{row.name}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '20px', fontSize: '10.5px', color: '#64748B' }}>
                        <span>{row.date}</span>
                        <span>{row.time}</span>
                        <span style={{ fontWeight: 800, color: row.score.includes('+') ? customAccent : '#EF4444' }}>{row.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>

            {/* Right Panel */}
            <aside style={{
              width: rightPanelOpen ? '320px' : '46px',
              transition: 'width 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
              borderLeft: `2px solid ${customAccent}33`,
              paddingLeft: rightPanelOpen ? '18px' : '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flexShrink: 0,
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: rightPanelOpen ? 'space-between' : 'center', marginBottom: '14px' }}>
                {rightPanelOpen && (
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Candidate Schedule</div>
                )}
                <button 
                  onClick={() => setRightPanelOpen(!rightPanelOpen)}
                  title={rightPanelOpen ? "Shrink panel" : "Expand panel"}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: `1.5px solid ${customAccent}`,
                    backgroundColor: '#FFFFFF',
                    color: customAccent,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 800
                  }}
                >
                  {rightPanelOpen ? '<<' : '>>'}
                </button>
              </div>

              {rightPanelOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                  {/* Hero Card */}
                  <div style={{
                    position: 'relative',
                    borderRadius: '22px',
                    overflow: 'hidden',
                    padding: '20px',
                    color: '#FFFFFF',
                    boxShadow: `0 10px 25px ${customAccent}35`
                  }}>
                    <img 
                      src={HERO_IMAGE} 
                      alt="" 
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                    />
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.78)', zIndex: 2 }} />

                    <div style={{ position: 'relative', zIndex: 3 }}>
                      <div style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.5px', color: '#38BDF8' }}>GNOSIS PRO</div>
                      <div style={{ fontSize: '19px', fontWeight: 900, margin: '4px 0 6px 0' }}>Go Deeper</div>
                      <p style={{ fontSize: '11px', color: '#CBD5E1', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                        Unlock full 15-year Class 11 PYQ sets with Socratic AI stepping.
                      </p>
                      <button 
                        onClick={() => openStandaloneTool('mock-test')}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#A3E635',
                          color: '#1E293B',
                          borderRadius: '12px',
                          border: 'none',
                          fontSize: '11px',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        Get Access
                      </button>
                    </div>
                  </div>

                  {/* Calendar */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '16px',
                    border: `1.5px solid ${customAccent}22`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ cursor: 'pointer', color: '#94A3B8', fontSize: '14px' }}>&lt;</span>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>October, 2026</span>
                      <span style={{ cursor: 'pointer', color: '#94A3B8', fontSize: '14px' }}>&gt;</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '9.5px', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>
                      {daysOfWeek.map((d, idx) => <span key={idx}>{d}</span>)}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px 0', textAlign: 'center', fontSize: '11px', fontWeight: 600, color: '#334155' }}>
                      {calendarDays.slice(0, 31).map((d) => {
                        const isSelected = selectedDay === d;
                        const isUsed = activeMonthDays.includes(d);
                        return (
                          <div key={d} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span 
                              onClick={() => setSelectedDay(d)}
                              style={{
                                width: '26px',
                                height: '26px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                backgroundColor: isSelected ? customAccent : (isUsed ? `${customAccent}25` : 'transparent'),
                                color: isSelected ? '#FFFFFF' : (isUsed ? customAccent : '#334155'),
                                fontWeight: isSelected || isUsed ? 800 : 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {d}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Assignments List Header & Items */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>Assignments</span>
                      <button 
                        onClick={() => setSelectedAssignment({
                          id: Date.now(),
                          title: "New Study Assignment",
                          subject: "Class 11 PCM",
                          dueDate: "Upcoming",
                          status: "In progress",
                          badgeColor: "#EDE9FE",
                          badgeText: "#6D28D9",
                          description: "Configure custom homework tasks, NCERT question sets, or test revisions.",
                          progress: 0
                        })}
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: '#A3E635',
                          color: '#1E293B',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(163, 230, 53, 0.4)'
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {assignmentsList.map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => setSelectedAssignment(item)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 12px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '14px',
                            border: '1.5px solid #F1F5F9',
                            cursor: 'pointer',
                            transition: 'transform 0.18s ease, border-color 0.18s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.borderColor = customAccent;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0px)';
                            e.currentTarget.style.borderColor = '#F1F5F9';
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A' }}>{item.title}</div>
                            <div style={{ fontSize: '9px', color: '#94A3B8', marginTop: '2px' }}>{item.dueDate}</div>
                          </div>
                          <span style={{ fontSize: '9px', fontWeight: 700, backgroundColor: item.badgeColor, color: item.badgeText, padding: '2px 8px', borderRadius: '9999px' }}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </aside>
          </>
        )}
      </div>

      {/* ================= 4. FULLSCREEN GRAPH MODAL ================= */}
      {fullscreenGraph && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: '40px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1020px',
            backgroundColor: '#FFFFFF',
            borderRadius: '26px',
            padding: '28px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                  High-Resolution Graph Analysis
                </h2>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0 0' }}>
                  Full window inspection of JEE mock test metrics and time traps
                </p>
              </div>
              <button 
                onClick={() => setFullscreenGraph(null)}
                style={{ width: '34px', height: '34px', borderRadius: '50%', border: 'none', backgroundColor: '#F1F5F9', cursor: 'pointer', fontSize: '14px', fontWeight: 800 }}
              >
                X
              </button>
            </div>

            <div style={{ width: '100%', height: '380px', backgroundColor: '#F8FAFC', borderRadius: '20px', padding: '24px', boxSizing: 'border-box' }}>
              <svg viewBox="0 0 800 320" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="modalG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={customAccent} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={customAccent} stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0,220 Q100,50 200,160 T400,90 T600,240 T800,60" fill="none" stroke={customAccent} strokeWidth="4" strokeLinecap="round" />
                <path d="M0,220 Q100,50 200,160 T400,90 T600,240 T800,60 L800,320 L0,320 Z" fill="url(#modalG)" />
                <circle cx="200" cy="160" r="6" fill={customAccent} />
                <circle cx="400" cy="90" r="6" fill={customAccent} />
                <circle cx="800" cy="60" r="7" fill="#FFFFFF" stroke={customAccent} strokeWidth="4" />
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setFullscreenGraph(null)}
                style={{ padding: '10px 22px', backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', border: 'none', fontWeight: 700, cursor: 'pointer' }}
              >
                Close Fullscreen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 5. RAINRGB COLOR MIXER ================= */}
      {showColorPicker && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300
        }}>
          <div style={{
            width: '320px',
            backgroundColor: '#F0F0F0',
            border: '1px solid #707070',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
            padding: '12px 14px',
            fontFamily: 'Segoe UI, Tahoma, sans-serif',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', fontWeight: 600 }}>
                <span style={{ color: '#E11D48', fontWeight: 900 }}>r</span> RainRGB
              </div>
              <button 
                onClick={() => setShowColorPicker(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#555' }}
              >
                X
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', height: '170px', marginBottom: '10px' }}>
              <div style={{ position: 'relative', flex: 1, border: '1px solid #7F7F7F', overflow: 'hidden' }}>
                <canvas 
                  ref={spectrumCanvasRef}
                  width={250}
                  height={170}
                  onClick={handleSpectrumClick}
                  style={{ width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }}
                />
                <div style={{
                  position: 'absolute',
                  left: `${crosshairPos.x}px`,
                  top: `${crosshairPos.y}px`,
                  width: '12px',
                  height: '12px',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none'
                }}>
                  <div style={{ position: 'absolute', left: '5px', top: '0', width: '2px', height: '12px', backgroundColor: '#000' }} />
                  <div style={{ position: 'absolute', left: '0', top: '5px', width: '12px', height: '2px', backgroundColor: '#000' }} />
                </div>
              </div>

              <div 
                ref={hueStripRef}
                onClick={handleHueClick}
                style={{
                  width: '18px',
                  height: '100%',
                  position: 'relative',
                  border: '1px solid #7F7F7F',
                  background: 'linear-gradient(to bottom, #FF0000 0%, #FF00FF 17%, #0000FF 33%, #00FFFF 50%, #00FF00 67%, #FFFF00 83%, #FF0000 100%)',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: '-6px',
                  top: `${(hue / 360) * 100}%`,
                  width: 0,
                  height: 0,
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                  borderLeft: '5px solid #000',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }} />
                <div style={{
                  position: 'absolute',
                  right: '-6px',
                  top: `${(hue / 360) * 100}%`,
                  width: 0,
                  height: 0,
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                  borderRight: '5px solid #000',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }} />
              </div>
            </div>

            <div style={{
              width: '100%',
              height: '40px',
              backgroundColor: customAccent,
              border: '1px solid #7F7F7F',
              marginBottom: '10px'
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', fontSize: '11px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 600, width: '12px' }}>R:</span>
                <input 
                  type="number" 
                  value={rgbValues.r} 
                  onChange={(e) => {
                    const r = Math.min(255, Math.max(0, parseInt(e.target.value) || 0));
                    setRgbValues((p) => ({ ...p, r }));
                    const nextHex = ((1 << 24) + (r << 16) + (rgbValues.g << 8) + rgbValues.b).toString(16).slice(1).toUpperCase();
                    setHexInput(nextHex);
                    updatePersistentColor(`#${nextHex}`);
                  }}
                  style={{ width: '45px', padding: '2px 4px', border: '1px solid #999', fontSize: '11px', backgroundColor: '#FFF' }} 
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 600 }}>RGB:</span>
                <input 
                  type="text" 
                  readOnly 
                  value={`${rgbValues.r},${rgbValues.g},${rgbValues.b}`}
                  style={{ width: '74px', padding: '2px 4px', border: '1px solid #999', fontSize: '10px', backgroundColor: '#FFF' }} 
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 600, width: '12px' }}>G:</span>
                <input 
                  type="number" 
                  value={rgbValues.g} 
                  onChange={(e) => {
                    const g = Math.min(255, Math.max(0, parseInt(e.target.value) || 0));
                    setRgbValues((p) => ({ ...p, g }));
                    const nextHex = ((1 << 24) + (rgbValues.r << 16) + (g << 8) + rgbValues.b).toString(16).slice(1).toUpperCase();
                    setHexInput(nextHex);
                    updatePersistentColor(`#${nextHex}`);
                  }}
                  style={{ width: '45px', padding: '2px 4px', border: '1px solid #999', fontSize: '11px', backgroundColor: '#FFF' }} 
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 600 }}>HEX:</span>
                <input 
                  type="text" 
                  value={hexInput} 
                  onChange={(e) => {
                    setHexInput(e.target.value);
                    if (/^[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                      updatePersistentColor(`#${e.target.value}`);
                    }
                  }}
                  style={{ width: '74px', padding: '2px 4px', border: '1px solid #999', fontSize: '11px', backgroundColor: '#FFF' }} 
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 600, width: '12px' }}>B:</span>
                <input 
                  type="number" 
                  value={rgbValues.b} 
                  onChange={(e) => {
                    const b = Math.min(255, Math.max(0, parseInt(e.target.value) || 0));
                    setRgbValues((p) => ({ ...p, b }));
                    const nextHex = ((1 << 24) + (rgbValues.r << 16) + (rgbValues.g << 8) + b).toString(16).slice(1).toUpperCase();
                    setHexInput(nextHex);
                    updatePersistentColor(`#${nextHex}`);
                  }}
                  style={{ width: '45px', padding: '2px 4px', border: '1px solid #999', fontSize: '11px', backgroundColor: '#FFF' }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button 
                onClick={() => setShowColorPicker(false)}
                style={{ width: '65px', padding: '3px 0', border: '1px solid #0078D7', background: '#E1E1E1', fontSize: '11px', cursor: 'pointer' }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}