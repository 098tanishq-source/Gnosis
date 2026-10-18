import React, { useState, useRef, useEffect } from 'react';

export default function SocraticAI({ onHome }) {
  const BASE_URL = import.meta.env.BASE_URL;
  const chatBottomRef = useRef(null);
  const fileInputRef = useRef(null);

  // Left Panel Modes & Active Filter
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'notes', 'error-booklet', 'pyqs', 'mock-test'
  
  // Chat History Sessions (Gemini-style thread history)
  const [chatThreads, setChatThreads] = useState([
    { id: 't-1', title: 'Friction on Incline θ Trap', category: 'error-booklet', time: 'Today' },
    { id: 't-2', title: 'JEE 2024 Rotational PYQ 14', category: 'pyqs', time: 'Yesterday' },
    { id: 't-3', title: 'Mock Test 3: Sign Error Review', category: 'mock-test', time: '2d ago' },
    { id: 't-4', title: 'Thermodynamics Carnot Cycle', category: 'notes', time: '3d ago' }
  ]);
  const [activeThreadId, setActiveThreadId] = useState('t-1');

  // Chat message stream
  const [inputMessage, setInputMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      sender: 'ai',
      time: '3:30 PM',
      text: `Hello! I'm your Socratic AI Coach.

You can ask any doubt, paste a mock test question, discuss your notes, or **upload a diagram/screenshot** using the attachment button below. I will guide you step-by-step through the principles without giving away the answer immediately.`
    }
  ]);

  // Right panel - Pinned Revision Cards & Errors
  const [errorBooklet, setErrorBooklet] = useState([
    {
      id: 'err-1',
      title: 'Incline Friction Miscalculation',
      category: 'Error Booklet',
      trap: 'Static friction is self-adjusting (f_s ≤ μN). It only equals μN at impending motion verge.',
      date: 'Today • 3:32 PM'
    },
    {
      id: 'err-2',
      title: 'Work by Variable Force Integration',
      category: 'PYQ Trap',
      trap: 'Do not multiply F × d. Must integrate ∫ F(x) dx between position limits.',
      date: 'Yesterday'
    }
  ]);
  const [searchNotes, setSearchNotes] = useState('');

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Image Upload handler
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Socratic Response Engine
  const handleSendMessage = (e) => {
    e?.preventDefault();
    const query = inputMessage.trim();
    if (!query && !selectedImage) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query || 'Uploaded question image for step-by-step Socratic breakdown.',
      image: selectedImage
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    const currentImg = selectedImage;
    setSelectedImage(null);
    setIsThinking(true);

    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (currentImg) {
        reply = `I have inspected your uploaded diagram/question:

1. **Free-Body Setup**:
   Identify the primary contact forces first: normal reaction perpendicular to the surface, tension (if connected by strings), and gravity acting vertically downwards.

2. **Socratic Checkpoint**:
   Along which axis is there net acceleration? What equation of motion applies along that axis?`;
      } else if (lower.includes('friction') || lower.includes('incline') || lower.includes('angle')) {
        reply = `Let's break down this friction doubt:

1. **Equilibrium Check**:
   Along the incline: Gravity component pulling downward = **mg sin(θ)**.
   Perpendicular: Normal reaction = **mg cos(θ)**.

2. **Socratic Question**:
   Before the block moves, what must static friction *f_s* balance? Does it equal μN yet?`;
      } else if (lower.includes('mock') || lower.includes('quiz') || lower.includes('test') || lower.includes('wrong')) {
        reply = `Reviewing your test slip:

• Was this an algebraic slip, an overlooked negative sign, or misinterpreting whether kinetic vs static friction applies?
• State your intermediate equation where you think you went off-track!`;
      } else if (lower.includes('pyq')) {
        reply = `Analyzing past year question trends for this concept:

• In JEE Mains/Advanced, questions on this topic test whether you account for the angle of repose condition **tan(θ) = μ_s**.
• What is the next logical constraint given in your problem statement?`;
      } else {
        reply = `Understood. Let's solve this without spoilers:

1. What known variables are given in the problem statement?
2. Which fundamental conservation law or kinematic equation applies here first?`;
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: reply
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 700);
  };

  // Pin message to Error Booklet
  const handlePinError = (text) => {
    const lines = text.split('\n').filter((l) => l.trim().length > 0);
    const title = lines[0]?.replace(/[*#]/g, '').slice(0, 36) || 'Pinned Question Trap';
    const trapSnippet = lines[1] || text.slice(0, 90);

    const newEntry = {
      id: `err-${Date.now()}`,
      title,
      category: activeCategory === 'all' ? 'Error Booklet' : activeCategory.toUpperCase(),
      trap: trapSnippet.replace(/[*#]/g, ''),
      date: 'Just now'
    };

    setErrorBooklet((prev) => [newEntry, ...prev]);
  };

  // Filtered threads by active category
  const filteredThreads = chatThreads.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '860px',
      backgroundColor: '#FAF9F6',
      borderRadius: '26px',
      display: 'grid',
      gridTemplateColumns: '270px 1fr 310px',
      overflow: 'hidden',
      border: '1px solid #E5E7EB',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.05)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxSizing: 'border-box'
    }}>

      {/* ================= COLUMN 1: GEMINI-STYLE LEFT PANEL ================= */}
      <aside style={{
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #EAEAEA',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* New Chat Primary Action Button */}
          <button
            onClick={() => {
              setActiveThreadId(`t-${Date.now()}`);
              setMessages([{
                id: `m-${Date.now()}`,
                sender: 'ai',
                time: 'Just now',
                text: 'New Socratic session started. Ask any doubt, paste a mock test question, or upload a problem diagram below.'
              }]);
            }}
            style={{
              width: '100%',
              padding: '11px 16px',
              borderRadius: '14px',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)'
            }}
          >
            <span>+ New chat</span>
            <span style={{ fontSize: '11px', opacity: 0.7 }}>Ctrl + K</span>
          </button>

          {/* Quick Hub Jump (NCERT Hub shortcut) */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => {
                const baseUrl = window.location.href.split('?')[0].split('#')[0];
                window.open(`${baseUrl}?page=ncert#ncert`, '_blank');
              }}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              NCERT Hub ↗
            </button>
            <button
              onClick={() => onHome ? onHome() : window.history.back()}
              style={{
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#64748B',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Dashboard
            </button>
          </div>

          {/* Core Doubt Categories / Modes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Study Context Modes
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {[
                { id: 'all', label: 'All Doubts' },
                { id: 'notes', label: 'Notes' },
                { id: 'error-booklet', label: 'Error Booklet' },
                { id: 'pyqs', label: 'PYQs' },
                { id: 'mock-test', label: 'Mock Tests' }
              ].map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      padding: '7px 10px',
                      borderRadius: '8px',
                      border: isActive ? '1.5px solid #0F172A' : '1px solid #E2E8F0',
                      backgroundColor: isActive ? '#0F172A' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#475569',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gemini-Style Chat History Threads */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid #F1F3F5', paddingTop: '14px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Recent Sessions ({filteredThreads.length})
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {filteredThreads.map((t) => {
                const isSelected = activeThreadId === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setActiveThreadId(t.id)}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#F1F5F9' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      transition: 'background-color 0.15s'
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: isSelected ? 800 : 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t.title}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8' }}>
                      <span style={{ textTransform: 'capitalize' }}>{t.category.replace('-', ' ')}</span>
                      <span>{t.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* User Account Capsule */}
        <div style={{
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          padding: '10px 12px',
          border: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0F172A' }}>Class 11 PCM</div>
            <div style={{ fontSize: '10px', color: '#64748B' }}>Online Grounding Active</div>
          </div>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
        </div>
      </aside>

      {/* ================= COLUMN 2: CENTER CHAT MESSENGER ================= */}
      <main style={{
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* Chat Header */}
        <div style={{
          padding: '14px 28px',
          borderBottom: '1px solid #F1F3F5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Mode: {activeCategory.toUpperCase()}
            </span>
            <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0F172A', margin: '2px 0 0 0' }}>
              Interactive Problem Stepper
            </h3>
          </div>

          <button
            onClick={() => {
              setMessages([{
                id: `m-${Date.now()}`,
                sender: 'ai',
                time: 'Just now',
                text: 'Chat cleared. Ready for your next numerical doubt or test slip.'
              }]);
            }}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: '#F1F5F9',
              border: 'none',
              color: '#475569',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Clear Messages
          </button>
        </div>

        {/* Message Stream */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isAi ? 'flex-start' : 'flex-end',
                  maxWidth: '85%',
                  alignSelf: isAi ? 'flex-start' : 'flex-end'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: isAi ? '#2563EB' : '#475569' }}>
                    {isAi ? 'Socratic Tutor' : 'Candidate'}
                  </span>
                  <span style={{ fontSize: '9.5px', color: '#94A3B8' }}>{msg.time}</span>
                </div>

                {/* Uploaded Image Preview in Bubble */}
                {msg.image && (
                  <div style={{ marginBottom: '8px' }}>
                    <img
                      src={msg.image}
                      alt="Question attachment"
                      style={{
                        maxWidth: '280px',
                        maxHeight: '200px',
                        borderRadius: '12px',
                        border: '1.5px solid #E2E8F0',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                )}

                {/* Text Bubble */}
                <div style={{
                  backgroundColor: isAi ? '#F8FAFC' : '#0F172A',
                  color: isAi ? '#1E293B' : '#FFFFFF',
                  padding: '14px 18px',
                  borderRadius: isAi ? '4px 18px 18px 18px' : '18px 18px 4px 18px',
                  border: isAi ? '1.5px solid #E2E8F0' : 'none',
                  fontSize: '13.5px',
                  lineHeight: '1.65',
                  whiteSpace: 'pre-wrap',
                  boxShadow: isAi ? '0 2px 8px rgba(0,0,0,0.02)' : '0 4px 14px rgba(15,23,42,0.18)'
                }}>
                  {msg.text}
                </div>

                {/* Pin Action on AI replies */}
                {isAi && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <button
                      onClick={() => handlePinError(msg.text)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#FFFFFF',
                        color: '#334155',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      + Pin to Error Booklet
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(msg.text)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#F1F5F9',
                        color: '#64748B',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Copy
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {isThinking && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '12px', fontWeight: 600 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
              <span>Socratic Coach is analyzing your doubt...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar with Image Upload */}
        <div style={{
          padding: '16px 28px 24px 28px',
          borderTop: '1px solid #F1F3F5',
          backgroundColor: '#FFFFFF'
        }}>
          {/* Active Image Preview before sending */}
          {selectedImage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#F1F5F9',
              padding: '6px 12px',
              borderRadius: '10px',
              marginBottom: '10px',
              width: 'fit-content'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#334155' }}>Attached Question Image</span>
              <button
                onClick={() => setSelectedImage(null)}
                style={{ background: 'none', border: 'none', color: '#EF4444', fontWeight: 800, cursor: 'pointer', fontSize: '12px' }}
              >
                ✕
              </button>
            </div>
          )}

          <form
            onSubmit={handleSendMessage}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: '1.5px solid #CBD5E1',
              padding: '6px 14px',
              gap: '10px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}
          >
            {/* Hidden File Input for Image Upload */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageSelect}
            />

            {/* Upload Attachment Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload question screenshot or diagram"
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px'
              }}
            >
              📎
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask your doubt, discuss test errors, or upload a diagram..."
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontSize: '13.5px',
                color: '#0F172A',
                outline: 'none',
                padding: '8px 0'
              }}
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() && !selectedImage}
              style={{
                backgroundColor: inputMessage.trim() || selectedImage ? '#0F172A' : '#94A3B8',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '8px 18px',
                fontSize: '12.5px',
                fontWeight: 800,
                cursor: inputMessage.trim() || selectedImage ? 'pointer' : 'default',
                transition: 'background-color 0.15s'
              }}
            >
              Ask Coach
            </button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '11px', color: '#94A3B8' }}>
            <span>Attach diagrams or screenshots directly via 📎</span>
            <span>Shift + Enter for new line</span>
          </div>
        </div>
      </main>

      {/* ================= COLUMN 3: RIGHT ERROR BOOKLET & PINNED ITEMS ================= */}
      <aside style={{
        backgroundColor: '#FFFFFF',
        borderLeft: '1px solid #EAEAEA',
        padding: '24px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 900, color: '#0F172A' }}>
              Pinned Traps & Errors
            </span>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#EF4444', backgroundColor: '#FEE2E2', padding: '2px 8px', borderRadius: '6px' }}>
              {errorBooklet.length}
            </span>
          </div>

          {/* Search bar */}
          <input
            type="text"
            value={searchNotes}
            onChange={(e) => setSearchNotes(e.target.value)}
            placeholder="Search pinned traps..."
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              fontSize: '11.5px',
              outline: 'none'
            }}
          />

          {/* Cards stream */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {errorBooklet
              .filter((item) => item.title.toLowerCase().includes(searchNotes.toLowerCase()) || item.trap.toLowerCase().includes(searchNotes.toLowerCase()))
              .map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #F1F5F9',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#DC2626', backgroundColor: '#FEF2F2', padding: '2px 6px', borderRadius: '4px' }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '9.5px', color: '#94A3B8' }}>{item.date}</span>
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                    {item.title}
                  </div>

                  <p style={{ fontSize: '11px', color: '#475569', margin: '2px 0 0 0', lineHeight: 1.45 }}>
                    {item.trap}
                  </p>
                </div>
              ))}
          </div>

        </div>

        {/* Quick Review Action */}
        <button
          onClick={() => alert('Starting a targeted 5-minute revision drill based on your pinned error items...')}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '12px',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
          }}
        >
          Review Pinned Traps Drill →
        </button>
      </aside>

    </div>
  );
}