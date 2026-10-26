import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  BookOpen, 
  FileText, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';

const CHAPTER_TREE = [
  {
    id: 'ch-01',
    number: '01',
    title: 'Units & Measurements',
    status: 'completed',
    subtopics: [
      { id: 'sub-01', title: 'Dimensional Analysis & Applications', duration: '24 min', progress: 100, completed: true },
      { id: 'sub-02', title: 'Significant Figures & Error Propagation', duration: '18 min', progress: 100, completed: true }
    ]
  },
  {
    id: 'ch-02',
    number: '02',
    title: 'Kinematics in 1D & 2D',
    status: 'active',
    subtopics: [
      { id: 'sub-03', title: 'Calculus-Based Equation Derivations', duration: '32 min', progress: 100, completed: true },
      { id: 'sub-04', title: 'Projectile Motion on Inclined Planes', duration: '44 min', progress: 65, completed: false },
      { id: 'sub-05', title: 'Relative Velocity in River-Swimmer Cases', duration: '28 min', progress: 0, completed: false }
    ]
  },
  {
    id: 'ch-03',
    number: '03',
    title: 'Laws of Motion & Friction',
    status: 'upcoming',
    subtopics: [
      { id: 'sub-06', title: 'Free Body Diagrams & Pseudo Forces', duration: '40 min', progress: 0, completed: false },
      { id: 'sub-07', title: 'Two-Block Friction Threshold Problems', duration: '36 min', progress: 0, completed: false }
    ]
  },
  {
    id: 'ch-04',
    number: '04',
    title: 'Work, Energy & Power',
    status: 'upcoming',
    subtopics: [
      { id: 'sub-08', title: 'Work-Energy Theorem with Variable Forces', duration: '35 min', progress: 0, completed: false },
      { id: 'sub-09', title: 'Vertical Circular Motion Limiting Velocities', duration: '42 min', progress: 0, completed: false }
    ]
  }
];

export default function StudyWorkspace({ onBack }) {
  // Navigation & Collapse States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSubtopic, setActiveSubtopic] = useState(CHAPTER_TREE[1].subtopics[1]);
  const [rightTab, setRightTab] = useState('ncert'); // 'ncert' | 'notes'
  
  // Progress tracker state (Overall subtopic progress 0 to 100)
  const [overallProgress, setOverallProgress] = useState(65);

  // Player & Bookmark Controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(14 * 60 + 22); // 14:22
  const [bookmarks, setBookmarks] = useState([
    { id: 1, time: '06:45', label: 'Maximum Range Condition derivation' },
    { id: 2, time: '12:10', label: 'Cosine angle decomposition on incline' }
  ]);
  const [newBookmarkText, setNewBookmarkText] = useState('');

  // Personal Markdown Notes State (Persisted in localStorage)
  const [notesContent, setNotesContent] = useState(() => {
    return localStorage.getItem('gnosis_workspace_notes') || 
`# Projectile Motion on Inclined Planes

### Core Axioms
- Align the coordinate axes along the incline ($x$-axis) and perpendicular to the incline ($y$-axis).
- Gravitational acceleration decomposes into:
  - $g_x = g \\sin(\\alpha)$ (down the slope)
  - $g_y = g \\cos(\\alpha)$ (normal into the plane)

### Critical Trap
Watch out for the sign of initial velocity along the slope. When thrown up the incline, $a_x = -g \\sin(\\alpha)$ opposes motion throughout the entire ascent!`;
  });

  const handleNotesChange = (e) => {
    setNotesContent(e.target.value);
    localStorage.setItem('gnosis_workspace_notes', e.target.value);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const addBookmark = () => {
    if (!newBookmarkText.trim()) return;
    setBookmarks(prev => [
      ...prev, 
      { id: Date.now(), time: formatTime(playbackTime), label: newBookmarkText.trim() }
    ]);
    setNewBookmarkText('');
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#090D16',
      color: '#F8FAFC',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, sans-serif",
      overflow: 'hidden',
      userSelect: 'none'
    }}>
      {/* ================= TOP PERSISTENT PROGRESS TRACKER ================= */}
      <div style={{
        height: '4px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        position: 'relative',
        zIndex: 100
      }}>
        <div style={{
          height: '100%',
          width: `${overallProgress}%`,
          background: 'linear-gradient(90deg, #6366F1 0%, #06B6D4 100%)',
          boxShadow: '0 0 12px rgba(6, 182, 212, 0.8), 0 0 4px #6366F1',
          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }} />
      </div>

      {/* ================= TOP HEADER BAR ================= */}
      <header style={{
        height: '56px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        flexShrink: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#F8FAFC',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ← Exit Workspace
          </button>
          
          <div style={{ height: '18px', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 700,
              color: '#06B6D4',
              backgroundColor: 'rgba(6, 182, 212, 0.12)',
              padding: '2px 8px',
              borderRadius: '6px'
            }}>
              NCERT CH-02
            </span>
            <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>
              {activeSubtopic.title}
            </span>
          </div>
        </div>

        {/* Live Completion Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 500 }}>Module Mastery:</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 700, color: '#F8FAFC' }}>
              {overallProgress}%
            </span>
          </div>
          <button 
            onClick={() => setOverallProgress(prev => Math.min(100, prev + 10))}
            style={{
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              border: 'none',
              borderRadius: '8px',
              color: '#FFF',
              padding: '6px 14px',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(99, 102, 241, 0.4)'
            }}
          >
            Sync Progress +
          </button>
        </div>
      </header>

      {/* ================= MAIN THREE-PANE BODY ================= */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
        
        {/* ================= PANE 1: LEFT CHAPTER TREE (COLLAPSIBLE) ================= */}
        <aside style={{
          width: isSidebarOpen ? '300px' : '0px',
          minWidth: isSidebarOpen ? '300px' : '0px',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(11, 15, 25, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Tree Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.6px', color: '#94A3B8', fontFamily: "'JetBrains Mono', monospace" }}>
              CURRICULUM TREE
            </span>
            <span style={{ fontSize: '10.5px', color: '#6366F1', fontWeight: 700 }}>CLASS 11 PCM</span>
          </div>

          {/* Chapter Tree Node Items */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
            {CHAPTER_TREE.map(ch => (
              <div key={ch.id} style={{ marginBottom: '18px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                  color: ch.status === 'active' ? '#FFFFFF' : '#64748B'
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 800,
                    color: ch.status === 'active' ? '#6366F1' : '#475569'
                  }}>
                    {ch.number}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>
                    {ch.title}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '18px' }}>
                  {ch.subtopics.map(sub => {
                    const isSelected = activeSubtopic.id === sub.id;
                    return (
                      <div
                        key={sub.id}
                        onClick={() => setActiveSubtopic(sub)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                          border: isSelected ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.18s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CheckCircle2 size={13} color={sub.completed ? '#10B981' : isSelected ? '#6366F1' : '#334155'} />
                          <span style={{
                            fontSize: '12px',
                            fontWeight: isSelected ? 700 : 500,
                            color: isSelected ? '#F8FAFC' : '#94A3B8'
                          }}>
                            {sub.title}
                          </span>
                        </div>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#64748B' }}>
                          {sub.duration}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Sidebar Toggle Handle */}
        <button
          onClick={() => setIsSidebarOpen(v => !v)}
          title={isSidebarOpen ? "Collapse Tree" : "Expand Tree"}
          style={{
            alignSelf: 'center',
            zIndex: 60,
            marginLeft: '-12px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#1E293B',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}
        >
          {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* ================= PANE 2: CENTER VIDEO PLAYER & BOOKMARKS ================= */}
        <main style={{
          flex: 1.2,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#070A11',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          overflowY: 'auto'
        }}>
          {/* Crisp Video Container */}
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            backgroundColor: '#000000',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
          }}>
            {/* Visual Simulated Incline Lecture Canvas */}
            <svg viewBox="0 0 640 360" style={{ width: '100%', height: '100%', opacity: 0.85 }}>
              <defs>
                <linearGradient id="planeG" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <line x1="80" y1="280" x2="560" y2="280" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
              <polygon points="120,280 500,120 500,280" fill="url(#planeG)" stroke="#6366F1" strokeWidth="2" />
              <circle cx="280" cy="210" r="14" fill="#06B6D4" />
              <line x1="280" y1="210" x2="280" y2="265" stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#arrow)" />
              <text x="290" y="255" fill="#EF4444" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">mg</text>
              <line x1="280" y1="210" x2="230" y2="190" stroke="#10B981" strokeWidth="2.5" />
              <text x="215" y="180" fill="#10B981" fontSize="12" fontFamily="JetBrains Mono">mg sin(θ)</text>
              <text x="170" y="270" fill="#94A3B8" fontSize="13" fontFamily="Inter">Incline Angle θ = 30°</text>
            </svg>

            {/* In-Video Overlay Playhead */}
            <div style={{
              position: 'absolute',
              bottom: '14px',
              left: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(10px)',
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button 
                  onClick={() => setIsPlaying(v => !v)}
                  style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button 
                  onClick={() => setPlaybackTime(0)}
                  style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <RotateCcw size={15} />
                </button>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#F8FAFC' }}>
                  {formatTime(playbackTime)} / 32:45
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#06B6D4', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>1080p 60fps</span>
              </div>
            </div>
          </div>

          {/* Video Metadata & Bookmarks Bar */}
          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFF', margin: '0 0 4px 0' }}>
                {activeSubtopic.title}
              </h2>
              <span style={{ fontSize: '12px', color: '#64748B' }}>
                Lecturer: Prof. H. Verma • Class 11 Mechanics Series
              </span>
            </div>

            {/* Quick Bookmark Logger */}
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Bookmark size={15} color="#6366F1" />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#F8FAFC' }}>
                    Lecture Bookmarks ({bookmarks.length})
                  </span>
                </div>
                <span style={{ fontSize: '10px', color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}>
                  AUTO-PAUSE TIMESTAMP
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input 
                  type="text" 
                  value={newBookmarkText}
                  onChange={(e) => setNewBookmarkText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addBookmark()}
                  placeholder={`Add marker at ${formatTime(playbackTime)}...`}
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    color: '#FFF',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={addBookmark}
                  style={{
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    color: '#A5B4FC',
                    borderRadius: '8px',
                    padding: '0 14px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Save Pin
                </button>
              </div>

              {/* Bookmark Pins List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {bookmarks.map(bm => (
                  <div key={bm.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '6px',
                    fontSize: '11.5px'
                  }}>
                    <span style={{ color: '#CBD5E1' }}>{bm.label}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#06B6D4', fontWeight: 700 }}>
                      {bm.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* ================= PANE 3: RIGHT DUAL TAB (NCERT READER / NOTES) ================= */}
        <section style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0B0F19',
          overflow: 'hidden'
        }}>
          {/* Tab Selector Header */}
          <div style={{
            height: '46px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            backgroundColor: 'rgba(15, 23, 42, 0.4)'
          }}>
            <button
              onClick={() => setRightTab('ncert')}
              style={{
                flex: 1,
                border: 'none',
                borderBottom: rightTab === 'ncert' ? '2px solid #06B6D4' : '2px solid transparent',
                backgroundColor: rightTab === 'ncert' ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
                color: rightTab === 'ncert' ? '#06B6D4' : '#64748B',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <BookOpen size={14} /> NCERT Source Text
            </button>

            <button
              onClick={() => setRightTab('notes')}
              style={{
                flex: 1,
                border: 'none',
                borderBottom: rightTab === 'notes' ? '2px solid #8B5CF6' : '2px solid transparent',
                backgroundColor: rightTab === 'notes' ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                color: rightTab === 'notes' ? '#A5B4FC' : '#64748B',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <FileText size={14} /> Keep Notes (Markdown)
            </button>
          </div>

          {/* Tab Content 1: NCERT Digital Reader */}
          {rightTab === 'ncert' && (
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', lineHeight: 1.7, fontSize: '13.5px', color: '#CBD5E1' }}>
              <div style={{
                backgroundColor: 'rgba(6, 182, 212, 0.08)',
                borderLeft: '3px solid #06B6D4',
                padding: '10px 14px',
                borderRadius: '0 8px 8px 0',
                marginBottom: '18px'
              }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#06B6D4', display: 'block', marginBottom: '2px', fontFamily: "'JetBrains Mono', monospace" }}>
                  NCERT SECTION 4.10 EXTRACT
                </span>
                <span style={{ fontSize: '12px', color: '#E2E8F0' }}>
                  Motion in a Plane: Projectile Trajectory over Inclined Surfaces
                </span>
              </div>

              <h4 style={{ color: '#FFF', fontSize: '15px', fontWeight: 700, margin: '14px 0 8px 0' }}>
                4.10.2 Coordinate System Rotation
              </h4>
              <p>
                When tackling projectiles projected from the foot of an inclined plane of inclination $\alpha$ with velocity $u$ at an angle $\theta$ with the horizontal, it is mathematically more convenient to choose the coordinate axes parallel and perpendicular to the inclined plane rather than using horizontal and vertical directions.
              </p>

              <div style={{
                background: 'rgba(0, 0, 0, 0.35)',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11.5px',
                color: '#38BDF8',
                margin: '14px 0'
              }}>
                T = (2 · u · sin(θ - α)) / (g · cos(α))
              </div>

              <h4 style={{ color: '#FFF', fontSize: '15px', fontWeight: 700, margin: '14px 0 8px 0' }}>
                Maximum Range Condition
              </h4>
              <p>
                For a given projection velocity $u$, the range up the plane reaches its mathematical maximum when the projection angle bisects the angle between the inclined plane and the vertical axis:
              </p>
              <p style={{ fontStyle: 'italic', color: '#94A3B8' }}>
                "The direction of projection for maximum range along the inclined plane is along the angle bisector of the vertical and the plane."
              </p>
            </div>
          )}

          {/* Tab Content 2: Markdown Keep Notes Editor */}
          {rightTab === 'notes' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '10.5px', color: '#A5B4FC', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                  AUTO-SYNCED TO LOCAL BOOKLET
                </span>
                <span style={{ fontSize: '10px', color: '#64748B' }}>Markdown Supported</span>
              </div>

              <textarea
                value={notesContent}
                onChange={handleNotesChange}
                placeholder="Write revision notes, key vector equations, and error reflections..."
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  padding: '16px',
                  color: '#F8FAFC',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12.5px',
                  lineHeight: 1.6,
                  resize: 'none',
                  outline: 'none',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)'
                }}
              />
            </div>
          )}
        </section>

      </div>
    </div>
  );
}