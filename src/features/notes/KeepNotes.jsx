 import React, { useState, useEffect, useRef } from 'react';

const KEEP_COLORS = [
  { id: 'default', bg: '#FFFFFF', border: '#E2E8F0', name: 'White' },
  { id: 'coral', bg: '#FAECE7', border: '#F2C4B8', name: 'Coral' },
  { id: 'peach', bg: '#FBF0D9', border: '#F5DCAC', name: 'Peach' },
  { id: 'sand', bg: '#FEF8E0', border: '#FCEB9C', name: 'Sand' },
  { id: 'mint', bg: '#E4F4E8', border: '#BDE4C6', name: 'Mint' },
  { id: 'sage', bg: '#E1F3F2', border: '#BCE2DF', name: 'Sage' },
  { id: 'fog', bg: '#E8EAED', border: '#CBD0D6', name: 'Fog' },
  { id: 'storm', bg: '#E9E4F0', border: '#D1C6DF', name: 'Storm' },
  { id: 'blossom', bg: '#F6E2EA', border: '#E7B8CC', name: 'Blossom' }
];

const FONT_OPTIONS = [
  { id: 'Roboto', label: 'Roboto (Default)', family: '"Roboto", sans-serif' },
  { id: 'Caveat', label: 'Caveat', family: '"Caveat", cursive' },
  { id: 'Patrick Hand', label: 'Patrick Hand', family: '"Patrick Hand", cursive' },
  { id: 'Playpen Sans', label: 'Playpen Sans', family: '"Playpen Sans", cursive' }
];

const STARTER_NOTES = [
  {
    id: 'k-1',
    subject: 'Physics',
    chapterNum: 'Ch 04',
    chapterName: 'Laws of Motion & Friction',
    title: 'Incline Friction Angle Rules',
    content: '1. Before slipping begins: f_s = mg·sin(θ) (strictly self-adjusting with θ).\n2. Limiting verge of motion occurs when tan(θ) = μ_s (Angle of Repose).\n3. After slipping starts: f_k = μ_k·mg·cos(θ) (decreases as θ increases).',
    color: '#FAECE7',
    font: 'Roboto',
    isPinned: true,
    updatedAt: '17 Oct 2026'
  },
  {
    id: 'k-2',
    subject: 'Chemistry',
    chapterNum: 'Ch 08',
    chapterName: 'Hydrocarbons',
    title: 'Markovnikov Addition Shortcuts',
    content: '• Electrophilic addition of HX to asymmetric alkenes.\n• H⁺ proton attacks the carbon holding the greater count of hydrogens.\n• Carbocation stability dictates rearrangement (check for 1,2-hydride or methyl shifts).',
    color: '#E4F4E8',
    font: 'Patrick Hand',
    isPinned: true,
    updatedAt: '16 Oct 2026'
  },
  {
    id: 'k-3',
    subject: 'Mathematics',
    chapterNum: 'Ch 12',
    chapterName: 'Limits & Derivatives',
    title: 'Standard Calculus Limit Forms',
    content: '1. lim(x→0) [sin(x) / x] = 1 (where x is in radians).\n2. lim(x→0) [(e^x - 1) / x] = 1.\n3. lim(x→0) [ln(1 + x) / x] = 1.',
    color: '#FEF8E0',
    font: 'Caveat',
    isPinned: false,
    updatedAt: '15 Oct 2026'
  }
];

export default function KeepNotes() {
  // Dynamically load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Patrick+Hand&family=Playpen+Sans:wght@500;700&family=Roboto:wght@400;500;700;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('gnosis_keep_notes');
      return saved ? JSON.parse(saved) : STARTER_NOTES;
    } catch {
      return STARTER_NOTES;
    }
  });

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Editor State
  const [editingId, setEditingId] = useState(null); // null = new note, string = existing note being edited
  const [subject, setSubject] = useState('Physics');
  const [chapterNum, setChapterNum] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFont, setSelectedFont] = useState('Roboto');
  const [color, setColor] = useState('#FFFFFF');
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Card On-Hover Popover state
  const [activeCardColorPicker, setActiveCardColorPicker] = useState(null);

  // Maximize Note Modal
  const [maximizedNote, setMaximizedNote] = useState(null);

  const textareaRef = useRef(null);
  const editorBottomRef = useRef(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('gnosis_keep_notes', JSON.stringify(notes));
  }, [notes]);

  // SMART KEYDOWN: Enter key continues bullets or increments numbers (1. -> 2. -> 3.)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const cursor = textarea.selectionStart;
      const textBefore = content.substring(0, cursor);
      const lines = textBefore.split('\n');
      const currentLine = lines[lines.length - 1];

      // Bullet List
      if (currentLine.startsWith('• ')) {
        e.preventDefault();
        // If current bullet is blank, pressing enter terminates list
        if (currentLine.trim() === '•') {
          const newText = textBefore.slice(0, -2) + '\n' + content.substring(cursor);
          setContent(newText);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = cursor - 1;
          }, 0);
          return;
        }
        const insertText = '\n• ';
        const nextContent = content.substring(0, cursor) + insertText + content.substring(cursor);
        setContent(nextContent);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = cursor + insertText.length;
        }, 0);
        return;
      }

      // Numbered List (Calculates current number and increments to next)
      const numMatch = currentLine.match(/^(\d+)\.\s/);
      if (numMatch) {
        e.preventDefault();
        const currentNum = parseInt(numMatch[1], 10);
        // If numbered line is blank (e.g. just "2. "), pressing enter terminates list
        if (currentLine.trim() === `${currentNum}.`) {
          const sliceLen = `${currentNum}. `.length;
          const newText = textBefore.slice(0, -sliceLen) + '\n' + content.substring(cursor);
          setContent(newText);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = cursor - sliceLen + 1;
          }, 0);
          return;
        }
        const nextNum = currentNum + 1;
        const insertText = `\n${nextNum}. `;
        const nextContent = content.substring(0, cursor) + insertText + content.substring(cursor);
        setContent(nextContent);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = cursor + insertText.length;
        }, 0);
      }
    }
  };

  // Click toolbar buttons to insert smart lists without duplicating tags
  const handleBulletClick = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursor = textarea.selectionStart;
    const textBefore = content.substring(0, cursor);
    const lines = textBefore.split('\n');
    const currentLine = lines[lines.length - 1];

    if (currentLine.startsWith('• ')) return; // Already a bullet

    let insertText = '• ';
    if (content.length > 0 && !content.endsWith('\n')) {
      insertText = '\n• ';
    }

    const nextContent = content.substring(0, cursor) + insertText + content.substring(cursor);
    setContent(nextContent);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = cursor + insertText.length;
    }, 10);
  };

  const handleNumberedClick = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursor = textarea.selectionStart;
    const textBefore = content.substring(0, cursor);
    const lines = textBefore.split('\n');
    const currentLine = lines[lines.length - 1];

    if (/^\d+\.\s/.test(currentLine)) return; // Already numbered

    // Count how many previous numbers exist in the document to increment intelligently
    const prevMatches = content.match(/^\d+\.\s/gm);
    const nextNumber = prevMatches ? prevMatches.length + 1 : 1;

    let insertText = `${nextNumber}. `;
    if (content.length > 0 && !content.endsWith('\n')) {
      insertText = `\n${nextNumber}. `;
    }

    const nextContent = content.substring(0, cursor) + insertText + content.substring(cursor);
    setContent(nextContent);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = cursor + insertText.length;
    }, 10);
  };

  const handleBoldClick = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);

    const replacement = `**${selected || 'bold text'}**`;
    const nextContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(nextContent);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + 2;
      textarea.selectionEnd = start + replacement.length - 2;
    }, 10);
  };

  // Load existing note into Editor for editing
  const handleStartEdit = (note) => {
    setEditingId(note.id);
    setSubject(note.subject || 'Physics');
    setChapterNum(note.chapterNum || '');
    setChapterName(note.chapterName || '');
    setTitle(note.title || '');
    setContent(note.content || '');
    setColor(note.color || '#FFFFFF');
    setSelectedFont(note.font || 'Roboto');

    editorBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => textareaRef.current?.focus(), 250);
  };

  // Save new note or update existing note
  const handleSaveNote = () => {
    if (!title.trim() && !content.trim() && !chapterName.trim()) {
      alert('Please write a title, chapter, or note content before saving.');
      return;
    }

    if (editingId) {
      // Update existing
      setNotes(notes.map((n) => {
        if (n.id === editingId) {
          return {
            ...n,
            subject,
            chapterNum: chapterNum.trim() || 'Ch --',
            chapterName: chapterName.trim() || 'General Notes',
            title: title.trim() || 'Untitled Note',
            content: content.trim(),
            color,
            font: selectedFont,
            updatedAt: 'Edited just now'
          };
        }
        return n;
      }));
      setEditingId(null);
    } else {
      // Create new
      const created = {
        id: `note-${Date.now()}`,
        subject,
        chapterNum: chapterNum.trim() || 'Ch --',
        chapterName: chapterName.trim() || 'General Notes',
        title: title.trim() || 'Untitled Note',
        content: content.trim(),
        color,
        font: selectedFont,
        isPinned: false,
        updatedAt: 'Just now'
      };
      setNotes([created, ...notes]);
    }

    // Reset Form
    setTitle('');
    setContent('');
    setChapterNum('');
    setChapterName('');
    setColor('#FFFFFF');
    setShowColorPicker(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setChapterNum('');
    setChapterName('');
    setColor('#FFFFFF');
    setShowColorPicker(false);
  };

  const togglePin = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const updateCardColor = (id, newColorHex) => {
    setNotes(notes.map(n => n.id === id ? { ...n, color: newColorHex } : n));
    setActiveCardColorPicker(null);
  };

  // Filter & Search
  const filteredNotes = notes.filter((n) => {
    const matchSubject = activeFilter === 'All' || n.subject === activeFilter;
    const q = (searchQuery || '').toLowerCase().trim();
    if (!q) return matchSubject;

    const t = (n.title || '').toLowerCase();
    const c = (n.content || '').toLowerCase();
    const cn = (n.chapterName || '').toLowerCase();
    const cnum = (n.chapterNum || '').toLowerCase();

    return matchSubject && (t.includes(q) || c.includes(q) || cn.includes(q) || cnum.includes(q));
  });

  const pinnedNotes = filteredNotes.filter((n) => n.isPinned);
  const otherNotes = filteredNotes.filter((n) => !n.isPinned);

  const getFontFamily = (fontName) => {
    const f = FONT_OPTIONS.find(opt => opt.id === fontName);
    return f ? f.family : '"Roboto", sans-serif';
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#FAF9F6',
      borderRadius: '24px',
      padding: '24px 32px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      overflowY: 'auto',
      fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      
      {/* ================= 1. HEADER & SEARCH BAR ================= */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            Notebook Workspace
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: '2px 0 0 0' }}>
            Keep Notes & Summaries
          </h2>
        </div>

        {/* Search */}
        <div style={{
          width: '320px',
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1.5px solid #E2E8F0',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <span style={{ fontSize: '13px', color: '#94A3B8' }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, chapters, formulas..."
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '13px',
              fontFamily: '"Roboto", sans-serif',
              color: '#0F172A'
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '12px' }}>✕</button>
          )}
        </div>
      </div>

      {/* ================= 2. CITATION PILLS (SUBJECT FILTER) ================= */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
          {['All', 'Physics', 'Chemistry', 'Mathematics', 'Error Trap'].map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveFilter(sub)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                border: 'none',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: activeFilter === sub ? '#0F172A' : '#FFFFFF',
                color: activeFilter === sub ? '#FFFFFF' : '#475569',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                transition: 'all 0.15s ease'
              }}
            >
              {sub}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            handleCancelEdit();
            editorBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            padding: '7px 16px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#0F172A',
            color: '#FFF',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>+</span> Create New Note
        </button>
      </div>

      {/* ================= 3. PINNED NOTES ================= */}
      {pinnedNotes.length > 0 && (
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', display: 'block' }}>
            PINNED NOTES ({pinnedNotes.length})
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '16px' }}>
            {pinnedNotes.map((note) => renderNoteCard(note))}
          </div>
        </div>
      )}

      {/* ================= 4. OTHER NOTES ================= */}
      <div>
        <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', display: 'block' }}>
          {pinnedNotes.length > 0 ? `OTHER NOTES (${otherNotes.length})` : `ALL NOTES (${otherNotes.length})`}
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '16px' }}>
          {otherNotes.map((note) => renderNoteCard(note))}
        </div>
      </div>

      {/* ================= 5. EDITOR DOCK (BOTTOM POSITION) ================= */}
      <div ref={editorBottomRef} style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', paddingTop: '20px', borderTop: '1.5px solid #E2E8F0' }}>
        <div style={{
          width: '100%',
          maxWidth: '720px',
          backgroundColor: color,
          borderRadius: '20px',
          border: editingId ? '2px solid #2563EB' : '2px solid #CBD5E1',
          boxShadow: editingId ? '0 12px 36px rgba(37, 99, 235, 0.12)' : '0 8px 30px rgba(0,0,0,0.06)',
          padding: '20px 24px',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s ease'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 900, color: editingId ? '#2563EB' : '#0F172A' }}>
              {editingId ? '✎ Editing Saved Note' : '+ Create New Note'}
            </span>
            {editingId && (
              <button
                onClick={handleCancelEdit}
                style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}
              >
                Cancel Edit
              </button>
            )}
          </div>

          {/* Metadata Row: Subject, Ch No, Ch Name */}
          <div style={{ display: 'grid', gridTemplateColumns: '130px 90px 1fr', gap: '8px', marginBottom: '12px' }}>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                borderRadius: '10px',
                padding: '7px 10px',
                fontSize: '12px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Error Trap">Error Trap</option>
            </select>

            <input
              type="text"
              value={chapterNum}
              onChange={(e) => setChapterNum(e.target.value)}
              placeholder="e.g. Ch 04"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                borderRadius: '10px',
                padding: '7px 10px',
                fontSize: '12px',
                fontWeight: 700,
                outline: 'none'
              }}
            />

            <input
              type="text"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              placeholder="Chapter Name (e.g. Laws of Motion)"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                borderRadius: '10px',
                padding: '7px 10px',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          </div>

          {/* Note Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title / Core Concept..."
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '16px',
              fontWeight: 800,
              color: '#0F172A',
              marginBottom: '10px',
              fontFamily: getFontFamily(selectedFont)
            }}
          />

          {/* Note Body Textarea */}
          <textarea
            ref={textareaRef}
            rows={5}
            value={content}
            onKeyDown={handleKeyDown}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your study notes... (Click '• Bullets' or '1. List' and press Enter to keep adding points automatically!)"
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '14px',
              color: '#334155',
              resize: 'vertical',
              fontFamily: getFontFamily(selectedFont),
              lineHeight: 1.65,
              minHeight: '110px'
            }}
          />

          {/* Bottom Toolbar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '12px',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            paddingTop: '12px',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleBulletClick}
                title="Start or add bullet points"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                • Bullets
              </button>

              <button
                type="button"
                onClick={handleNumberedClick}
                title="Start or increment numbered list"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                1. List
              </button>

              <button
                type="button"
                onClick={handleBoldClick}
                title="Bold Selection"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '12px',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                B
              </button>

              {/* Font Selection Dropdown */}
              <select
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '5px 8px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {FONT_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>

              {/* Card Background Color */}
              <button
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                🎨 Card Color
              </button>

              {/* Color Palette Popover */}
              {showColorPicker && (
                <div style={{
                  position: 'absolute',
                  top: '38px',
                  left: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '8px',
                  display: 'flex',
                  gap: '6px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  zIndex: 25,
                  border: '1px solid #CBD5E1'
                }}>
                  {KEEP_COLORS.map(c => (
                    <div
                      key={c.id}
                      title={c.name}
                      onClick={() => {
                        setColor(c.bg);
                        setShowColorPicker(false);
                      }}
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: c.bg,
                        border: `1.5px solid ${c.border}`,
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Save Action Button */}
            <button
              type="button"
              onClick={handleSaveNote}
              style={{
                backgroundColor: editingId ? '#2563EB' : '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '8px 22px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
              }}
            >
              {editingId ? '✓ Update Note' : '+ Save Note'}
            </button>
          </div>
        </div>
      </div>

      {/* ================= 6. MAXIMIZE MODAL (POP-OUT FULL VIEW) ================= */}
      {maximizedNote && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '820px',
            backgroundColor: maximizedNote.color || '#FFFFFF',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontFamily: getFontFamily(maximizedNote.font),
            maxHeight: '85vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: 'rgba(0,0,0,0.06)', padding: '3px 10px', borderRadius: '6px', color: '#1E293B', marginRight: '8px' }}>
                  {maximizedNote.subject}
                </span>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>
                  {maximizedNote.chapterNum} • {maximizedNote.chapterName}
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: '8px 0 0 0' }}>
                  {maximizedNote.title}
                </h2>
              </div>
              <button
                onClick={() => setMaximizedNote(null)}
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', backgroundColor: 'rgba(0,0,0,0.08)', cursor: 'pointer', fontSize: '15px', fontWeight: 800 }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7, whiteSpace: 'pre-line', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '16px' }}>
              {maximizedNote.content}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '12px' }}>
              <span style={{ fontSize: '11px', color: '#64748B' }}>{maximizedNote.updatedAt}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    handleStartEdit(maximizedNote);
                    setMaximizedNote(null);
                  }}
                  style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  ✎ Edit Note
                </button>
                <button
                  onClick={() => setMaximizedNote(null)}
                  style={{ padding: '6px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#0F172A', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  // Note Card Renderer with Maximize, Edit, Color Switcher & Pin
  function renderNoteCard(note) {
    const cardFont = getFontFamily(note.font);

    return (
      <div
        key={note.id}
        style={{
          backgroundColor: note.color || '#FFFFFF',
          borderRadius: '18px',
          border: '1.5px solid rgba(0,0,0,0.07)',
          padding: '18px 20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '170px',
          position: 'relative',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          fontFamily: cardFont
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
        }}
      >
        <div>
          {/* Top Row: Meta Tags, Maximize & Pin Action */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 800,
                backgroundColor: 'rgba(0,0,0,0.06)',
                padding: '2px 8px',
                borderRadius: '6px',
                color: '#1E293B',
                fontFamily: '"Roboto", sans-serif'
              }}>
                {note.subject}
              </span>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', fontFamily: '"Roboto", sans-serif' }}>
                {note.chapterNum}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Maximize Button */}
              <button
                onClick={() => setMaximizedNote(note)}
                title="Maximize Note / Fullscreen"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#64748B' }}
              >
                ⤢
              </button>

              {/* Pin Button */}
              <button
                onClick={() => togglePin(note.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: note.isPinned ? '#2563EB' : '#94A3B8'
                }}
                title={note.isPinned ? "Unpin note" : "Pin note"}
              >
                📌
              </button>
            </div>
          </div>

          {/* Chapter Subtitle */}
          {note.chapterName && (
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, marginBottom: '4px', fontFamily: '"Roboto", sans-serif' }}>
              {note.chapterName}
            </div>
          )}

          {/* Title */}
          {note.title && (
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', lineHeight: 1.3 }}>
              {note.title}
            </h4>
          )}

          {/* Content */}
          <p style={{
            fontSize: '13px',
            color: '#334155',
            margin: 0,
            whiteSpace: 'pre-line',
            lineHeight: 1.55
          }}>
            {note.content}
          </p>
        </div>

        {/* Card Footer: Date, Edit, Color Switcher & Delete */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '8px', position: 'relative' }}>
          <span style={{ fontSize: '10px', color: '#94A3B8', fontFamily: '"Roboto", sans-serif' }}>
            {note.updatedAt}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Edit Button */}
            <button
              onClick={() => handleStartEdit(note)}
              title="Edit Note"
              style={{
                background: 'none',
                border: 'none',
                color: '#2563EB',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: '"Roboto", sans-serif'
              }}
            >
              ✎ Edit
            </button>

            {/* Change Color on Saved Note */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setActiveCardColorPicker(activeCardColorPicker === note.id ? null : note.id)}
                title="Change Color"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                🎨
              </button>

              {activeCardColorPicker === note.id && (
                <div style={{
                  position: 'absolute',
                  bottom: '26px',
                  right: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '6px',
                  display: 'flex',
                  gap: '5px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  zIndex: 20,
                  border: '1px solid #CBD5E1'
                }}>
                  {KEEP_COLORS.map(c => (
                    <div
                      key={c.id}
                      title={c.name}
                      onClick={() => updateCardColor(note.id, c.bg)}
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: c.bg,
                        border: `1.5px solid ${c.border}`,
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteNote(note.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#EF4444',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 700,
                fontFamily: '"Roboto", sans-serif'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}