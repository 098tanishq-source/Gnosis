 // src/features/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  LayoutGrid, 
  FileEdit, 
  HelpCircle, 
  BrainCircuit, 
  BookOpen, 
  PlaySquare, 
  LogOut, 
  Smartphone, 
  Search, 
  Bell, 
  ArrowUpRight, 
  ArrowUp, 
  Calendar as CalendarIcon, 
  Video, 
  Pause, 
  Play, 
  Square, 
  ChevronLeft, 
  ChevronRight, 
  BookMarked, 
  Dna, 
  Binary, 
  Zap, 
  Sparkles, 
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Plus
} from 'lucide-react';
import KeepNotes from '../notes/KeepNotes';
import MockTest from '../mock-test/MockTest';
import NcertHub from '../ncert/NcertHub';
import VideoTunnel from '../player/VideoTunnel';
import SocraticAI from '../socratic/SocraticAI';
import '../../styles/tokens.css';

const DEFAULT_SUBJECTS = [
  { id: 'phy', name: 'Physics' },
  { id: 'chem', name: 'Chemistry' },
  { id: 'math', name: 'Mathematics' },
  { id: 'bio', name: 'Biology' },
  { id: 'cs', name: 'Comp Science' }
];

export default function Dashboard({ onNavigate }) {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [selectedSubject, setSelectedSubject] = useState('phy');

  const [trackerSeconds, setTrackerSeconds] = useState(5048);
  const [isTrackerRunning, setIsTrackerRunning] = useState(true);
  const [selectedDate, setSelectedDate] = useState(28);

  const baseUrl = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    let timer = null;
    if (isTrackerRunning) {
      timer = setInterval(() => setTrackerSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isTrackerRunning]);

  const formatTimer = (total) => {
    const hrs = String(Math.floor(total / 3600)).padStart(2, '0');
    const mins = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const secs = String(total % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const openNcertTab = () => {
    const origin = window.location.href.split('?')[0].split('#')[0];
    window.open(`${origin}?page=ncert#ncert`, '_blank');
  };

  const handleAddBooklet = () => {
    const name = window.prompt('Enter new subject / booklet title:');
    if (name && name.trim()) {
      const newSub = { id: `booklet_${Date.now()}`, name: name.trim() };
      setSubjects(prev => [...prev, newSub]);
      setSelectedSubject(newSub.id);
    }
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const texturedButtonStyle = {
    background: 'linear-gradient(180deg, #1d6a3b 0%, #14532d 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 14px rgba(20, 83, 45, 0.28)',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer'
  };

  return (
    <div style={{ 
      backgroundColor: '#e9ede9', 
      width: '100vw',
      minHeight: '100vh',
      padding: '16px 18px', 
      margin: '0',
      display: 'flex', 
      flexDirection: 'row',
      gap: '18px',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      
      {/* ================= 1. SIDEBAR ================= */}
      {isSidebarOpen ? (
        <aside style={{ 
          width: '240px', 
          flexShrink: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          backgroundColor: '#ffffff', 
          borderRadius: '28px',
          border: '1px solid rgba(0,0,0,0.04)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
          padding: '22px 16px',
          boxSizing: 'border-box',
          minHeight: 'calc(100vh - 32px)',
          transition: 'all 0.25s ease'
        }}>
          <div>
            {/* Top Brand Logo */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', marginBottom: '24px' }}>
              <div 
                onClick={() => { setActiveView('dashboard'); onNavigate && onNavigate('home'); }} 
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--emerald-800)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 14px rgba(20, 83, 45, 0.25)'
                }}>
                  <GraduationCap size={22} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#18181b', letterSpacing: '-0.5px' }}>
                    Gnosis
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#eef9f2', color: '#14532d', padding: '2px 7px', borderRadius: '9999px' }}>
                    EDU
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsSidebarOpen(false)}
                title="Collapse sidebar"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '10px',
                  backgroundColor: '#f5f5f1',
                  border: 'none',
                  color: '#71717a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <PanelLeftClose size={16} />
              </button>
            </div>

            {/* Menu Links */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#a1a1aa', padding: '0 8px', marginBottom: '8px' }}>
                Menu
              </p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <button 
                  onClick={() => setActiveView('dashboard')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 14px',
                    borderRadius: '16px',
                    backgroundColor: activeView === 'dashboard' ? '#f5f5f1' : 'transparent',
                    color: activeView === 'dashboard' ? '#14532d' : '#52525b',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '13px',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <LayoutGrid size={18} color={activeView === 'dashboard' ? '#15803d' : '#a1a1aa'} />
                  <span>Dashboard</span>
                  {activeView === 'dashboard' && (
                    <span style={{ marginLeft: 'auto', width: '5px', height: '18px', borderRadius: '9999px', backgroundColor: '#15803d' }}></span>
                  )}
                </button>

                <button 
                  onClick={() => setActiveView('notes')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 14px',
                    borderRadius: '16px',
                    backgroundColor: activeView === 'notes' ? '#f5f5f1' : 'transparent',
                    color: activeView === 'notes' ? '#14532d' : '#52525b',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <FileEdit size={18} color={activeView === 'notes' ? '#15803d' : '#a1a1aa'} />
                  <span>Keep notes</span>
                  <span className="num-bold" style={{ marginLeft: 'auto', fontSize: '11px', backgroundColor: '#eef9f2', color: '#14532d', padding: '2px 8px', borderRadius: '9999px' }}>12+</span>
                </button>

                <button 
                  onClick={() => setActiveView('quiz')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 14px',
                    borderRadius: '16px',
                    backgroundColor: activeView === 'quiz' ? '#f5f5f1' : 'transparent',
                    color: activeView === 'quiz' ? '#14532d' : '#52525b',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <HelpCircle size={18} color={activeView === 'quiz' ? '#15803d' : '#a1a1aa'} />
                  <span>Live Quiz</span>
                </button>

                <button 
                  onClick={() => setActiveView('socratic')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 14px',
                    borderRadius: '16px',
                    backgroundColor: activeView === 'socratic' ? '#f5f5f1' : 'transparent',
                    color: activeView === 'socratic' ? '#14532d' : '#52525b',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <BrainCircuit size={18} color={activeView === 'socratic' ? '#15803d' : '#a1a1aa'} />
                  <span>Socratic AI</span>
                  <span style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: 800, backgroundColor: 'var(--emerald-800)', color: '#ffffff', padding: '2px 7px', borderRadius: '9999px' }}>PRO</span>
                </button>
              </nav>
            </div>

            {/* General Section */}
            <div style={{ marginTop: '54px' }}>
              <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#a1a1aa', padding: '0 8px', marginBottom: '8px' }}>
                General
              </p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <button 
                  onClick={() => setActiveView('profile')}
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '10px 14px', 
                    borderRadius: '16px', 
                    backgroundColor: activeView === 'profile' ? '#f5f5f1' : 'transparent', 
                    color: activeView === 'profile' ? '#14532d' : '#52525b', 
                    border: 'none', 
                    fontWeight: 600, 
                    fontSize: '13px', 
                    textAlign: 'left', 
                    cursor: 'pointer' 
                  }}
                >
                  <User size={18} color={activeView === 'profile' ? '#14532d' : '#a1a1aa'} />
                  <span>Profile</span>
                </button>

                <button 
                  onClick={openNcertTab}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '16px', backgroundColor: 'transparent', color: '#52525b', border: 'none', fontWeight: 500, fontSize: '13px', textAlign: 'left', cursor: 'pointer' }}
                >
                  <BookOpen size={18} color="#a1a1aa" />
                  <span>NCERT Hub</span>
                  <ArrowUpRight size={14} color="#a1a1aa" style={{ marginLeft: 'auto' }} />
                </button>

                <button 
                  onClick={() => setActiveView('player')}
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '10px 14px', 
                    borderRadius: '16px', 
                    backgroundColor: activeView === 'player' ? '#f5f5f1' : 'transparent', 
                    color: activeView === 'player' ? '#14532d' : '#52525b', 
                    border: 'none', 
                    fontWeight: 500, 
                    fontSize: '13px', 
                    textAlign: 'left', 
                    cursor: 'pointer' 
                  }}
                >
                  <PlaySquare size={18} color="#a1a1aa" />
                  <span>Videos</span>
                </button>

                <button 
                  onClick={() => onNavigate && onNavigate('home')}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '16px', backgroundColor: 'transparent', color: '#52525b', border: 'none', fontWeight: 500, fontSize: '13px', textAlign: 'left', cursor: 'pointer' }}
                >
                  <LogOut size={18} color="#a1a1aa" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Download App Bottom Card */}
          <div style={{
            color: '#ffffff',
            padding: '18px',
            borderRadius: '24px',
            backgroundImage: `url('${baseUrl}green001.jpg'), url('${baseUrl}green001.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#14532d',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '20px'
          }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smartphone size={17} color="#ffffff" />
            </div>
            <h4 style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'var(--font-heading)', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Download our Mobile App</h4>
            <p style={{ fontSize: '11px', color: '#f1f5f9', lineHeight: 1.35, margin: 0, textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>Practice PYQs anywhere and anytime.</p>
            <button style={{
              marginTop: '4px',
              width: '100%',
              padding: '9px',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              color: '#0d381e',
              border: 'none',
              fontWeight: 800,
              fontSize: '11.5px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              cursor: 'pointer'
            }}>
              Download
            </button>
          </div>
        </aside>
      ) : (
        <button
          onClick={() => setIsSidebarOpen(true)}
          title="Open sidebar"
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 40,
            width: '40px',
            height: '40px',
            borderRadius: '14px',
            backgroundColor: '#ffffff',
            border: 'none',
            color: '#18181b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
          }}
        >
          <PanelLeftOpen size={18} />
        </button>
      )}

      {/* ================= 2. MAIN CONTENT AREA ================= */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minWidth: 0,
        boxSizing: 'border-box'
      }}>
        
        {/* Render standard Dashboard ONLY when activeView === 'dashboard' */}
        {activeView === 'dashboard' ? (
          <>
            {/* Top Search Bar */}
            <header style={{
              backgroundColor: '#ffffff',
              borderRadius: '26px',
              border: '1px solid rgba(0,0,0,0.04)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              padding: '12px 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              boxSizing: 'border-box',
              width: '100%'
            }}>
              <h1 style={{ 
                fontSize: '24px', 
                fontWeight: 900, 
                fontFamily: 'var(--font-heading)', 
                color: '#18181b', 
                letterSpacing: '-0.5px', 
                margin: 0,
                flexShrink: 0
              }}>
                Dashboard
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative', width: '280px', display: 'flex', alignItems: 'center' }}>
                  <Search size={16} color="#18181b" style={{ position: 'absolute', left: '16px', pointerEvents: 'none' }} />
                  <input 
                    type="text" 
                    placeholder="Search task..." 
                    style={{
                      width: '100%',
                      padding: '9px 18px 9px 42px',
                      backgroundColor: '#f5f5f1',
                      border: 'none',
                      borderRadius: '9999px',
                      outline: 'none',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: '#18181b'
                    }}
                  />
                </div>

                <button style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%', 
                  backgroundColor: '#f5f5f1', 
                  border: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#18181b', 
                  cursor: 'pointer', 
                  position: 'relative'
                }}>
                  <Bell size={17} />
                  <span style={{ 
                    position: 'absolute', 
                    top: '8px', 
                    right: '8px', 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    backgroundColor: '#ef4444' 
                  }}></span>
                </button>

                <img 
                  onClick={() => setActiveView('profile')}
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="User Profile" 
                  title="View Profile"
                  style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    border: '2px solid #ffffff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </header>

            {/* Dashboard Container Box */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '30px',
              border: '1px solid rgba(0,0,0,0.04)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              boxSizing: 'border-box',
              width: '100%'
            }}>
              {/* Subject pills + Date */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', padding: '2px 0' }}>
                  {subjects.map((sub) => {
                    const isActive = sub.id === selectedSubject;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSubject(sub.id)}
                        style={{
                          padding: '7px 16px',
                          borderRadius: '9999px',
                          border: 'none',
                          backgroundColor: isActive ? '#18181b' : '#f5f5f1',
                          color: isActive ? '#ffffff' : '#18181b',
                          fontSize: '12px',
                          fontWeight: isActive ? 800 : 700,
                          fontFamily: 'var(--font-heading)',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                          boxShadow: isActive ? '0 3px 10px rgba(0,0,0,0.18)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {sub.name}
                      </button>
                    );
                  })}

                  <button
                    onClick={handleAddBooklet}
                    title="Add New Booklet"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '7px 14px',
                      borderRadius: '9999px',
                      backgroundColor: '#ffffff',
                      border: '1px dashed #14532d',
                      color: '#14532d',
                      fontSize: '12px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-heading)',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <Plus size={14} />
                    <span>Add Booklet</span>
                  </button>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  backgroundColor: '#f5f5f1',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#18181b',
                  fontFamily: 'var(--font-heading)'
                }}>
                  <CalendarIcon size={14} color="#18181b" />
                  <span>1 Sep 2024 - 31 Sep 2024</span>
                </div>
              </div>

              {/* Top 4 Stat Blocks */}
              <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #14532d 0%, #0d381e 60%, #051f11 100%)',
                  color: '#ffffff',
                  padding: '18px 20px',
                  borderRadius: '24px',
                  boxShadow: '0 10px 24px -4px rgba(20, 83, 45, 0.28)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '140px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--emerald-100)' }}>Daily PYQ Solved</span>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowUpRight size={15} color="#ffffff" />
                    </div>
                  </div>
                  <div>
                    <div className="num-bold" style={{ fontSize: '36px', lineHeight: 1, marginBottom: '6px' }}>24</div>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, backgroundColor: 'rgba(22, 163, 74, 0.45)', color: '#ffffff', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <ArrowUp size={11} /> <b className="num-bold">5</b> Increased from yesterday
                    </span>
                  </div>
                </div>

                <div style={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #ebece6',
                  padding: '18px 20px', 
                  borderRadius: '24px', 
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  minHeight: '140px' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#71717a' }}>Solved PYQ</span>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f5f5f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowUpRight size={15} color="#18181b" />
                    </div>
                  </div>
                  <div>
                    <div className="num-bold" style={{ fontSize: '36px', lineHeight: 1, marginBottom: '6px', color: '#18181b' }}>10</div>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, backgroundColor: '#eef9f2', color: '#15803d', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <ArrowUp size={11} /> <b className="num-bold">6</b> Increased from last month
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveView('notes')}
                  title="Click to open Keep Notes studio"
                  style={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #ebece6',
                    padding: '18px 20px', 
                    borderRadius: '24px', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between', 
                    minHeight: '140px', 
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#14532d' }}>Notes (Open Studio)</span>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#eef9f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowUpRight size={15} color="#14532d" />
                    </div>
                  </div>
                  <div>
                    <div className="num-bold" style={{ fontSize: '36px', lineHeight: 1, marginBottom: '6px', color: '#18181b' }}>12</div>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, backgroundColor: '#fef6e7', color: '#b45309', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <ArrowUp size={11} /> <b className="num-bold">2</b> Increased from last month
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveView('socratic')}
                  title="Click to open Socratic AI"
                  style={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #ebece6',
                    padding: '18px 20px', 
                    borderRadius: '24px', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between', 
                    minHeight: '140px', 
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#14532d' }}>Socratic AI (Launch)</span>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#eef9f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowUpRight size={15} color="#14532d" />
                    </div>
                  </div>
                  <div>
                    <div className="num-bold" style={{ fontSize: '36px', lineHeight: 1, marginBottom: '6px', color: '#18181b' }}>2</div>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, backgroundColor: '#fdf2f2', color: '#b91c1c', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span> On Discuss / Analysis
                    </span>
                  </div>
                </div>
              </section>

              {/* Analytics & Progress grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '16px', alignItems: 'start', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0, width: '100%' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.85fr 1fr', gap: '16px' }}>
                    <div style={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #ebece6',
                      borderRadius: '24px', 
                      padding: '20px 22px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between', 
                      boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                      minHeight: '245px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h3 style={{ fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0 }}>Engagement Analytics</h3>
                          <p style={{ fontSize: '11px', color: '#71717a', margin: '2px 0 0 0' }}>Weekly activity & problem solving pace</p>
                        </div>
                        <span className="num-bold" style={{ fontSize: '10.5px', backgroundColor: '#eef9f2', color: '#14532d', padding: '3px 8px', borderRadius: '9999px' }}>
                          74% Avg
                        </span>
                      </div>

                      <div style={{ height: '155px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', paddingTop: '8px' }}>
                        <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '6px' }}>
                          <div className="striped-pattern" style={{ width: '100%', maxWidth: '42px', height: '62%', borderRadius: '9999px', border: '1px solid #cbd5e1' }} />
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a' }}>S</span>
                        </div>
                        <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '100%', maxWidth: '42px', height: '84%', borderRadius: '9999px', backgroundColor: 'var(--emerald-700)' }} />
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a' }}>M</span>
                        </div>
                        <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', position: 'relative' }}>
                          <span className="num-bold" style={{ position: 'absolute', top: '-10px', fontSize: '9px', backgroundColor: '#18181b', color: '#ffffff', padding: '1px 5px', borderRadius: '5px' }}>74%</span>
                          <div style={{ width: '100%', maxWidth: '42px', height: '72%', borderRadius: '9999px', backgroundColor: 'var(--emerald-400)' }} />
                          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--emerald-700)' }}>T</span>
                        </div>
                        <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '100%', maxWidth: '42px', height: '98%', borderRadius: '9999px', backgroundColor: 'var(--emerald-900)' }} />
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a' }}>W</span>
                        </div>
                        <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '6px' }}>
                          <div className="striped-pattern" style={{ width: '100%', maxWidth: '42px', height: '54%', borderRadius: '9999px', border: '1px solid #cbd5e1' }} />
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a' }}>T</span>
                        </div>
                        <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '6px' }}>
                          <div className="striped-pattern" style={{ width: '100%', maxWidth: '42px', height: '65%', borderRadius: '9999px', border: '1px solid #cbd5e1' }} />
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a' }}>F</span>
                        </div>
                        <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '6px' }}>
                          <div className="striped-pattern" style={{ width: '100%', maxWidth: '42px', height: '78%', borderRadius: '9999px', border: '1px solid #cbd5e1' }} />
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a' }}>S</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #ebece6',
                      borderRadius: '24px', 
                      padding: '20px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between', 
                      boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                      minHeight: '245px'
                    }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <h3 style={{ fontSize: '14.5px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0 }}>Reminders</h3>
                          <CalendarIcon size={16} color="#71717a" />
                        </div>
                        <div>
                          <h4 style={{ fontSize: '14.5px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#18181b', lineHeight: 1.3, margin: '0 0 4px 0' }}>
                            NCERT Live Doubt Clearing Session
                          </h4>
                          <p style={{ fontSize: '11px', color: '#52525b', margin: 0 }}>
                            Time : <b className="num-bold">02.00</b> pm - <b className="num-bold">04.00</b> pm
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveView('player')}
                        style={{
                          ...texturedButtonStyle,
                          width: '100%',
                          padding: '10px',
                          borderRadius: '14px',
                          fontWeight: 700,
                          fontSize: '11.5px',
                          fontFamily: 'var(--font-heading)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Video size={15} />
                        <span>Start Session</span>
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '16px' }}>
                    <div style={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #ebece6',
                      borderRadius: '24px', 
                      padding: '20px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between', 
                      boxShadow: '0 2px 10px rgba(0,0,0,0.02)', 
                      minHeight: '265px'
                    }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CalendarIcon size={15} color="#15803d" />
                            <h3 style={{ fontSize: '14px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0 }}>
                              October 2026
                            </h3>
                          </div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button style={{ width: '24px', height: '24px', borderRadius: '7px', border: 'none', background: '#f5f5f1', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                              <ChevronLeft size={12} color="#18181b" />
                            </button>
                            <button style={{ width: '24px', height: '24px', borderRadius: '7px', border: 'none', background: '#f5f5f1', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                              <ChevronRight size={12} color="#18181b" />
                            </button>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '10.5px', fontWeight: 700, color: '#71717a', marginBottom: '6px' }}>
                          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                          <span /><span /><span /><span />
                          {daysInMonth.map((day) => {
                            const isSelected = day === selectedDate;
                            const hasEvent = [17, 28, 30].includes(day);

                            return (
                              <button
                                key={day}
                                onClick={() => setSelectedDate(day)}
                                style={{
                                  padding: '5px 0',
                                  borderRadius: '7px',
                                  border: 'none',
                                  backgroundColor: isSelected ? 'var(--emerald-800)' : hasEvent ? '#eef9f2' : 'transparent',
                                  color: isSelected ? '#ffffff' : hasEvent ? '#15803d' : '#18181b',
                                  fontWeight: isSelected || hasEvent ? 800 : 600,
                                  fontSize: '11px',
                                  fontFamily: 'var(--font-heading)',
                                  cursor: 'pointer',
                                  position: 'relative'
                                }}
                              >
                                {day}
                                {hasEvent && !isSelected && (
                                  <span style={{ position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#15803d' }} />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div style={{ marginTop: '10px', padding: '8px 12px', borderRadius: '14px', backgroundColor: '#f5f5f1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h5 style={{ fontSize: '11.5px', fontWeight: 800, color: '#18181b', margin: 0 }}>
                            {selectedDate === 28 ? 'Physics Optics Review' : selectedDate === 30 ? 'Organic Mechanism Drill' : 'Derivation Practice'}
                          </h5>
                          <span style={{ fontSize: '10px', color: '#71717a' }}>10:00 AM • Aspirant Track</span>
                        </div>
                        <span style={{ fontSize: '9.5px', fontWeight: 800, backgroundColor: '#eef9f2', color: '#15803d', padding: '2px 7px', borderRadius: '9999px' }}>
                          Oct {selectedDate}
                        </span>
                      </div>
                    </div>

                    <div style={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #ebece6',
                      borderRadius: '24px', 
                      padding: '20px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      textAlign: 'center', 
                      boxShadow: '0 2px 10px rgba(0,0,0,0.02)', 
                      minHeight: '265px'
                    }}>
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '14.5px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0 }}>Pacing Progress</h3>
                      </div>

                      <div style={{ position: 'relative', width: '210px', height: '115px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <svg viewBox="0 0 200 115" style={{ width: '100%', height: '100%' }}>
                          <defs>
                            <pattern id="gaugeHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                              <line x1="0" y1="0" x2="0" y2="6" stroke="#a1a1aa" strokeWidth="2.5" />
                            </pattern>
                          </defs>

                          <path 
                            d="M 22 105 A 78 78 0 0 1 125 28" 
                            fill="none" 
                            stroke="#14532d" 
                            strokeWidth="24" 
                            strokeLinecap="round" 
                          />

                          <path 
                            d="M 132 32 A 78 78 0 0 1 168 62" 
                            fill="none" 
                            stroke="#15803d" 
                            strokeWidth="24" 
                            strokeLinecap="round" 
                          />

                          <path 
                            d="M 174 72 A 78 78 0 0 1 178 105" 
                            fill="none" 
                            stroke="url(#gaugeHatch)" 
                            strokeWidth="24" 
                            strokeLinecap="round" 
                          />
                        </svg>

                        <div style={{ position: 'absolute', bottom: '2px', textAlign: 'center' }}>
                          <span className="num-bold" style={{ fontSize: '30px', color: '#18181b', display: 'block', lineHeight: 1 }}>41%</span>
                          <span style={{ fontSize: '9px', fontWeight: 700, color: '#71717a', textTransform: 'capitalize' }}>Project Ended</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', fontSize: '10.5px', color: '#52525b', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#14532d' }}></span>
                          <span>Completed</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#15803d' }}></span>
                          <span>In Progress</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#a1a1aa' }}></span>
                          <span>Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Assignments & Tracker */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px', flexShrink: 0 }}>
                  <div style={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #ebece6',
                    borderRadius: '24px', 
                    padding: '18px 16px', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between', 
                    width: '100%', 
                    boxSizing: 'border-box' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', width: '100%' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0 }}>Assignments</h3>
                      <button style={{ 
                        padding: '3px 9px', 
                        borderRadius: '9px', 
                        backgroundColor: '#eef9f2', 
                        border: 'none', 
                        fontSize: '10.5px', 
                        fontWeight: 800, 
                        color: '#14532d', 
                        cursor: 'pointer',
                        boxShadow: '0 1px 3px rgba(20, 83, 45, 0.08)'
                      }}>
                        + New
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <BookMarked size={17} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Develop API Endpoints
                          </h4>
                          <p style={{ fontSize: '10.5px', color: '#71717a', margin: '1px 0 0 0' }}>Due date: Nov 26, 2024</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#ccfbf1', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Dna size={17} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Onboarding Flow
                          </h4>
                          <p style={{ fontSize: '10.5px', color: '#71717a', margin: '1px 0 0 0' }}>Due date: Nov 28, 2024</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#eef9f2', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Binary size={17} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Build Dashboard
                          </h4>
                          <p style={{ fontSize: '10.5px', color: '#71717a', margin: '1px 0 0 0' }}>Due date: Nov 30, 2024</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#fef6e7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Zap size={17} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Optimize Page Load
                          </h4>
                          <p style={{ fontSize: '10.5px', color: '#71717a', margin: '1px 0 0 0' }}>Due date: Dec 5, 2024</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#f3e8ff', color: '#7e22ce', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Sparkles size={17} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Cross-Browser Testing
                          </h4>
                          <p style={{ fontSize: '10.5px', color: '#71717a', margin: '1px 0 0 0' }}>Due date: Dec 6, 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    borderRadius: '24px',
                    color: '#ffffff',
                    padding: '20px 22px',
                    backgroundColor: '#041208',
                    backgroundImage: `url('${baseUrl}green002.jpg'), url('${baseUrl}green002.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '220px',
                    width: '100%',
                    boxSizing: 'border-box',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.18)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10.5px', fontWeight: 800, fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#ffffff', textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>TIME TRACKER</span>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 8px #4ade80' }}></span>
                    </div>

                    <div style={{ textAlign: 'center', margin: '10px 0' }}>
                      <div className="num-bold" style={{ fontSize: '38px', fontFamily: 'var(--font-mono)', letterSpacing: '-0.5px', color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
                        {formatTimer(trackerSeconds)}
                      </div>
                      <p style={{ fontSize: '10.5px', color: '#dcfce7', margin: '3px 0 0 0', textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>Topic: Organic Reaction Mechanism</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button 
                        onClick={() => setIsTrackerRunning(!isTrackerRunning)} 
                        style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#ffffff', color: '#092211', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 3px 10px rgba(0,0,0,0.3)' }}
                      >
                        {isTrackerRunning ? <Pause size={17} /> : <Play size={17} />}
                      </button>
                      <button 
                        onClick={() => { setTrackerSeconds(0); setIsTrackerRunning(false); }} 
                        style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#dc2626', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 3px 10px rgba(220, 38, 38, 0.4)' }}
                      >
                        <Square size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* ================= ACTIVE TOOL SUBVIEW (NO DUPLICATE HEADER) ================= */
          <div style={{ width: '100%' }}>
            {activeView === 'notes' && <KeepNotes />}
            {activeView === 'quiz' && <MockTest active={true} onBackToDashboard={() => setActiveView('dashboard')} />}
            {activeView === 'player' && <VideoTunnel onBackToDashboard={() => setActiveView('dashboard')} />}
            {activeView === 'socratic' && <SocraticAI hint="idle" setHint={() => {}} onBackToDashboard={() => setActiveView('dashboard')} />}
            {activeView === 'profile' && (
              <div style={{ padding: '24px', backgroundColor: '#ffffff', borderRadius: '24px', color: '#18181b', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>Candidate Details</h2>
                <p style={{ color: '#52525b', fontSize: '13px' }}>Class 11 PCM Aspirant • Directorate of Education Track</p>
                <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f5f5f1', borderRadius: '16px' }}>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Stream:</strong> Physics, Chemistry, Mathematics</p>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Target:</strong> JEE & NEET Preparation Platform</p>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Storage:</strong> Local Device Workspace</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}