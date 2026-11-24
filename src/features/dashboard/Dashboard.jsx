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
  Plus,
  Folder,
  FolderPlus,
  Edit3,
  Clock,
  FileCode,
  Download,
  X,
  Check,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  ArrowLeft,
  CheckCircle2,
  Atom
} from 'lucide-react';
import Profile from '../profile/Profile';
import '../../styles/tokens.css';

const COLOR_PRESETS = [
  { id: 'yellow', label: 'Buttercup', bg: '#fef9c3', border: '#fde047', text: '#854d0e', iconBg: '#fef08a' },
  { id: 'coral', label: 'Coral Peach', bg: '#ffe4e6', border: '#fecdd3', text: '#9f1239', iconBg: '#fecdd3' },
  { id: 'blue', label: 'Sky Mist', bg: '#e0f2fe', border: '#bae6fd', text: '#0369a1', iconBg: '#bae6fd' },
  { id: 'mint', label: 'Sage Mint', bg: '#dcfce7', border: '#bbf7d0', text: '#15803d', iconBg: '#bbf7d0' },
  { id: 'lavender', label: 'Lilac Purple', bg: '#f3e8ff', border: '#e9d5ff', text: '#7e22ce', iconBg: '#e9d5ff' },
  { id: 'pink', label: 'Bubblegum', bg: '#fce7f3', border: '#fbcfe8', text: '#be185d', iconBg: '#fbcfe8' },
  { id: 'tangerine', label: 'Sunburst', bg: '#ffedd5', border: '#fed7aa', text: '#c2410c', iconBg: '#fed7aa' },
  { id: 'matcha', label: 'Matcha Green', bg: '#ecfccb', border: '#d9f99d', text: '#4d7c0f', iconBg: '#d9f99d' },
  { id: 'slate', label: 'Cool Smoke', bg: '#f1f5f9', border: '#cbd5e1', text: '#334155', iconBg: '#e2e8f0' },
  { id: 'forest', label: 'Emerald Deep', bg: '#d1fae5', border: '#a7f3d0', text: '#065f46', iconBg: '#a7f3d0' }
];

// Rich, high-yield folders preloaded across subjects
const INITIAL_FOLDERS = [
  { id: 'f-1', name: 'Wave Optics & Mechanics', subject: 'Physics', color: 'blue', date: '26/10/2026', pdfTitle: 'NCERT Ch 10 Optics Derivations' },
  { id: 'f-2', name: 'Organic Reaction Mechanisms', subject: 'Chemistry', color: 'coral', date: '24/10/2026', pdfTitle: 'Aldehydes & Ketones Reaction Handout' },
  { id: 'f-3', name: 'Integral Calculus & Vectors', subject: 'Mathematics', color: 'yellow', date: '21/10/2026', pdfTitle: 'Definite Integrals & 3D Vectors' },
  { id: 'f-4', name: 'Molecular Genetics & Inheritance', subject: 'Biology', color: 'mint', date: '19/10/2026', pdfTitle: 'DNA Replication & Central Dogma' },
  { id: 'f-5', name: 'Data Structures & Algorithms', subject: 'Comp Science', color: 'slate', date: '15/10/2026', pdfTitle: 'Recursion, Stacks & Complexity Classes' },
  { id: 'f-6', name: 'Modern Physics & Dual Nature', subject: 'Physics', color: 'lavender', date: '12/10/2026', pdfTitle: 'Photoelectric Effect & Bohr Atom' }
];

// Rich, preloaded formula sheets & study notes
const INITIAL_NOTES = [
  {
    id: 'n-1',
    folderId: 'f-1',
    title: 'YDSE Fringe Width Derivation',
    subject: 'Physics',
    chapter: 'Ch 10: Wave Optics',
    font: 'var(--font-heading)',
    color: 'yellow',
    date: '26/10/2026',
    time: '11:30 AM, Monday',
    content: `• Path difference: Δx = d·sin(θ) ≈ d·(y/D)\n• Bright fringe: Δx = n·λ\n• Dark fringe: Δx = (2n - 1)·(λ/2)\n• Fringe width: β = (λ·D)/d\n*Note*: Immersing apparatus in medium of index μ contracts fringe width: β' = β/μ.`
  },
  {
    id: 'n-2',
    folderId: 'f-1',
    title: "Brewster's Law & Polarization",
    subject: 'Physics',
    chapter: 'Ch 10: Wave Optics',
    font: 'var(--font-body)',
    color: 'blue',
    date: '25/10/2026',
    time: '02:15 PM, Sunday',
    content: `When light is incident at polarizing angle i_p, reflected and refracted rays are mutually perpendicular.\n\n1. Formula: μ = tan(i_p)\n2. Reflected light is completely plane polarized perpendicular to incidence plane.\n3. Refracted light remains partially polarized.`
  },
  {
    id: 'n-3',
    folderId: 'f-2',
    title: 'Aldol vs Cannizzaro Reaction',
    subject: 'Chemistry',
    chapter: 'Ch 12: Aldehydes & Ketones',
    font: 'var(--font-body)',
    color: 'coral',
    date: '24/10/2026',
    time: '04:15 PM, Saturday',
    content: `• Aldol Condensation:\n  - Requires at least one α-hydrogen atom.\n  - Reagent: Dilute NaOH.\n  - Product: β-hydroxy aldehyde, dehydrates to α,β-unsaturated enal.\n\n• Cannizzaro Reaction:\n  - Requires zero α-hydrogen (HCHO, PhCHO).\n  - Reagent: 50% Concentrated KOH.\n  - Disproportionation into carboxylic acid salt + primary alcohol.`
  },
  {
    id: 'n-4',
    folderId: 'f-2',
    title: 'Markovnikov vs Anti-Markovnikov Rule',
    subject: 'Chemistry',
    chapter: 'Ch 13: Hydrocarbons',
    font: 'var(--font-mono)',
    color: 'pink',
    date: '23/10/2026',
    time: '05:30 PM, Friday',
    content: `• Markovnikov Addition: Electrophile H+ attaches to carbon with more hydrogens to form the more stable carbocation (3° > 2° > 1°).\n• Peroxide Effect (Kharasch): HBr in presence of organic peroxides yields free radical Anti-Markovnikov addition. Only works with HBr, not HCl or HI.`
  },
  {
    id: 'n-5',
    folderId: 'f-3',
    title: 'Integration by Parts (ILATE)',
    subject: 'Mathematics',
    chapter: 'Ch 7: Integrals',
    font: 'var(--font-mono)',
    color: 'lavender',
    date: '22/10/2026',
    time: '08:45 PM, Thursday',
    content: `∫ u·v dx = u·∫ v dx - ∫ [ (du/dx) · ∫ v dx ] dx\n\nPriority: I (Inverse) > L (Log) > A (Algebraic) > T (Trig) > E (Exp)\nKing's Property: ∫_0^a f(x)dx = ∫_0^a f(a - x)dx.\nOdd/Even Property: If f(-x) = -f(x), integral from -a to a is 0.`
  },
  {
    id: 'n-6',
    folderId: 'f-3',
    title: 'Shortest Distance Between Skew Lines',
    subject: 'Mathematics',
    chapter: 'Ch 11: 3D Geometry',
    font: 'var(--font-body)',
    color: 'yellow',
    date: '20/10/2026',
    time: '07:20 PM, Tuesday',
    content: `Lines: r = a1 + λ·b1 and r = a2 + μ·b2\n\nFormula: d = |(b1 × b2) · (a2 - a1)| / |b1 × b2|\nIf lines intersect, d = 0, meaning (b1 × b2) · (a2 - a1) = 0.`
  },
  {
    id: 'n-7',
    folderId: 'f-4',
    title: 'DNA Replication Machinery',
    subject: 'Biology',
    chapter: 'Ch 6: Molecular Inheritance',
    font: 'var(--font-body)',
    color: 'mint',
    date: '19/10/2026',
    time: '03:10 PM, Monday',
    content: `1. Helicase: Unwinds double helix at replication origin.\n2. Primase: Synthesizes short RNA starter primers.\n3. DNA Polymerase III: Elongates continuous leading strand and Okazaki fragments in 5' to 3' polarity.\n4. DNA Ligase: Forms phosphodiester bonds sealing discontinuous lagging fragments.`
  },
  {
    id: 'n-8',
    folderId: 'f-5',
    title: 'Asymptotic Analysis & Big O',
    subject: 'Comp Science',
    chapter: 'Unit 2: Computational Complexity',
    font: 'var(--font-mono)',
    color: 'slate',
    date: '15/10/2026',
    time: '06:30 PM, Wednesday',
    content: `• Hierarchy: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)\n• Binary Search: O(log n)\n• MergeSort: Always O(n log n)\n• QuickSort: Average O(n log n), Worst-case O(n²)\n• Hash Table Lookup: O(1) expected average`
  }
];

const DEFAULT_SUBJECTS = [
  { id: 'all', name: 'All Subjects' },
  { id: 'phy', name: 'Physics' },
  { id: 'chem', name: 'Chemistry' },
  { id: 'math', name: 'Mathematics' },
  { id: 'bio', name: 'Biology' },
  { id: 'cs', name: 'Comp Science' }
];

export default function Dashboard({ onNavigate, user, onLogout }) {
  const baseUrl = import.meta.env.BASE_URL || '/';

  // Navigation state
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dynamic Avatar State
  const [currentAvatar, setCurrentAvatar] = useState(() => {
    return (
      localStorage.getItem('gnosis_active_avatar') ||
      user?.photoURL ||
      `${baseUrl}avatar/avatar1.jpg`
    );
  });

  useEffect(() => {
    const syncAvatar = () => {
      const saved = localStorage.getItem('gnosis_active_avatar');
      if (saved) setCurrentAvatar(saved);
      else if (user?.photoURL) setCurrentAvatar(user.photoURL);
    };

    window.addEventListener('gnosis_profile_updated', syncAvatar);
    window.addEventListener('storage', syncAvatar);

    return () => {
      window.removeEventListener('gnosis_profile_updated', syncAvatar);
      window.removeEventListener('storage', syncAvatar);
    };
  }, [user]);

  // Notifications State
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'JEE Main 2027 Full Mock Ready', time: '10m ago', unread: true },
    { id: 2, title: 'Wave Optics Telemetry Synced', time: '1h ago', unread: true },
    { id: 3, title: 'Study streak milestone: 12 days continuous', time: '1d ago', unread: false }
  ]);

  // Subjects Filter
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Time Tracker State
  const [trackerSeconds, setTrackerSeconds] = useState(5048);
  const [isTrackerRunning, setIsTrackerRunning] = useState(true);
  const [selectedDate, setSelectedDate] = useState(28);

  // Notes & Folders State with fallback persistence
  const [folders, setFolders] = useState(() => {
    try {
      const s = localStorage.getItem('gnosis_folders_v3');
      return s ? JSON.parse(s) : INITIAL_FOLDERS;
    } catch {
      return INITIAL_FOLDERS;
    }
  });

  const [notes, setNotes] = useState(() => {
    try {
      const s = localStorage.getItem('gnosis_notes_v3');
      return s ? JSON.parse(s) : INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  useEffect(() => {
    localStorage.setItem('gnosis_folders_v3', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('gnosis_notes_v3', JSON.stringify(notes));
  }, [notes]);

  // Upload/Sync preloaded notes & folders to Cloud Firestore if logged in
  useEffect(() => {
    if (!user?.uid) return;

    const syncCloudNotes = async () => {
      try {
        const { db } = await import('../../styles/lib/firebase');
        const { doc, getDoc, setDoc } = await import('firebase/firestore');
        const userRef = doc(db, 'users', user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists() && snap.data().notes && snap.data().notes.length > 0) {
          setNotes(snap.data().notes);
          if (snap.data().folders && snap.data().folders.length > 0) {
            setFolders(snap.data().folders);
          }
        } else {
          // Initialize user document with rich preloaded folders & notes
          await setDoc(userRef, { notes, folders }, { merge: true });
        }
      } catch (e) {
        console.warn('Cloud notes sync fallback:', e);
      }
    };

    syncCloudNotes();
  }, [user?.uid]);

  const [activeFolderId, setActiveFolderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Modal Inputs
  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('Physics');
  const [noteChapter, setNoteChapter] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteFont, setNoteFont] = useState('var(--font-body)');
  const [noteColor, setNoteColor] = useState('yellow');
  const [noteFolderId, setNoteFolderId] = useState('f-1');

  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderSubject, setNewFolderSubject] = useState('Physics');
  const [newFolderColor, setNewFolderColor] = useState('mint');

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
      const clean = name.trim();
      const newSub = { id: `sub_${Date.now()}`, name: clean };
      setSubjects(prev => [...prev, newSub]);
      setSelectedSubject(newSub.id);

      const newF = {
        id: `f_${Date.now()}`,
        name: `${clean} High-Yield Notes`,
        subject: clean,
        color: 'mint',
        date: 'Today',
        pdfTitle: `${clean} Reference Handout`
      };
      setFolders(prev => [newF, ...prev]);

      const newN = {
        id: `n_${Date.now()}`,
        folderId: newF.id,
        title: `${clean} Core Formulas`,
        subject: clean,
        chapter: 'Unit 1: Foundations',
        font: 'var(--font-body)',
        color: 'mint',
        date: 'Today',
        time: 'Just now',
        content: `Foundational study notes, key formulas, and derivations for ${clean}.`
      };
      setNotes(prev => [newN, ...prev]);
    }
  };

  const openNewNoteModal = () => {
    setEditingNote(null);
    setNoteTitle('');
    const curSubObj = subjects.find(s => s.id === selectedSubject);
    setNoteSubject(curSubObj && curSubObj.id !== 'all' ? curSubObj.name : 'Physics');
    setNoteChapter('');
    setNoteContent('');
    setNoteFont('var(--font-body)');
    setNoteColor('yellow');
    setNoteFolderId(activeFolderId || folders[0]?.id || 'f-1');
    setIsNoteModalOpen(true);
  };

  const openEditNote = (note) => {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteSubject(note.subject || 'Physics');
    setNoteChapter(note.chapter || '');
    setNoteContent(note.content || '');
    setNoteFont(note.font || 'var(--font-body)');
    setNoteColor(note.color || 'yellow');
    setNoteFolderId(note.folderId || 'f-1');
    setIsNoteModalOpen(true);
  };

  const insertFormatting = (prefix, suffix = '') => {
    const textarea = document.getElementById('note-editor-box');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const sel = noteContent.substring(start, end);
    const updated = noteContent.substring(0, start) + prefix + (sel || 'text') + suffix + noteContent.substring(end);
    setNoteContent(updated);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length + (sel ? 0 : 4));
    }, 10);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const timeStr = `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, ${now.toLocaleDateString([], { weekday: 'long' })}`;

    if (editingNote) {
      setNotes(prev => prev.map(n => n.id === editingNote.id ? {
        ...n,
        title: noteTitle.trim(),
        subject: noteSubject,
        chapter: noteChapter.trim(),
        content: noteContent.trim(),
        font: noteFont,
        color: noteColor,
        folderId: noteFolderId
      } : n));
    } else {
      const newN = {
        id: `note_${Date.now()}`,
        folderId: noteFolderId,
        title: noteTitle.trim(),
        subject: noteSubject,
        chapter: noteChapter.trim(),
        font: noteFont,
        color: noteColor,
        date: dateStr,
        time: timeStr,
        content: noteContent.trim()
      };
      setNotes(prev => [newN, ...prev]);
    }
    setIsNoteModalOpen(false);
  };

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const newF = {
      id: `f_${Date.now()}`,
      name: newFolderName.trim(),
      subject: newFolderSubject,
      color: newFolderColor,
      date: dateStr,
      pdfTitle: `${newFolderName.trim()} High-Yield Notes`
    };
    setFolders(prev => [newF, ...prev]);
    setNewFolderName('');
    setIsFolderModalOpen(false);
  };

  const currentFolder = folders.find(f => f.id === activeFolderId);
  const activeSubjectName = subjects.find(s => s.id === selectedSubject)?.name || 'All Subjects';

  const filteredFolders = folders.filter(f => {
    if (selectedSubject === 'all') return true;
    return f.subject.toLowerCase() === activeSubjectName.toLowerCase();
  });

  const displayedNotes = notes.filter(n => {
    const matchesSearch = (
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.chapter && n.chapter.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (n.subject && n.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesSubject = (selectedSubject === 'all') || (n.subject.toLowerCase() === activeSubjectName.toLowerCase());

    if (activeFolderId) return matchesSearch && n.folderId === activeFolderId;
    return matchesSearch && matchesSubject;
  });

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const texturedButtonStyle = {
    background: 'linear-gradient(180deg, #1d6a3b 0%, #14532d 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 14px rgba(20, 83, 45, 0.28)',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer'
  };

  if (activeView === 'profile') {
    return (
      <Profile 
        user={user} 
        onBackToDashboard={() => setActiveView('dashboard')} 
        onLogout={onLogout} 
      />
    );
  }

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
                  onClick={() => { setActiveView('dashboard'); setActiveFolderId(null); }}
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
                  onClick={() => { setActiveView('notes'); setActiveFolderId(null); }}
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
                  <span className="num-bold" style={{ marginLeft: 'auto', fontSize: '11px', backgroundColor: '#eef9f2', color: '#14532d', padding: '2px 8px', borderRadius: '9999px' }}>
                    {notes.length}
                  </span>
                </button>

                {/* 1. Live Quiz with SOON badge */}
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
                  <span style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: 800, backgroundColor: '#fef3c7', color: '#b45309', padding: '2px 6px', borderRadius: '9999px' }}>SOON</span>
                </button>

                {/* 2. Socratic AI with SOON badge */}
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
                  <span style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: 800, backgroundColor: '#fef3c7', color: '#b45309', padding: '2px 6px', borderRadius: '9999px' }}>SOON</span>
                </button>
              </nav>
            </div>

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

                {/* 3. Videos with SOON badge */}
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
                  <span style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: 800, backgroundColor: '#fef3c7', color: '#b45309', padding: '2px 6px', borderRadius: '9999px' }}>SOON</span>
                </button>

                <button 
                  onClick={() => {
                    if (onLogout) onLogout();
                    else if (onNavigate) onNavigate('home');
                  }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '16px', backgroundColor: 'transparent', color: '#52525b', border: 'none', fontWeight: 500, fontSize: '13px', textAlign: 'left', cursor: 'pointer' }}
                >
                  <LogOut size={18} color="#a1a1aa" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

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

      {/* ================= 2. MAIN VIEW AREA ================= */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minWidth: 0,
        boxSizing: 'border-box'
      }}>
        
        {/* UNIVERSAL TOP HEADER */}
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
          width: '100%',
          position: 'relative'
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
            {activeView === 'dashboard' ? 'Dashboard' : activeView === 'notes' ? (activeFolderId ? currentFolder?.name : 'Keep Notes') : activeView === 'quiz' ? 'Live Quiz' : activeView === 'socratic' ? 'Socratic AI Engine' : 'Video Tunneling'}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative', width: '280px', display: 'flex', alignItems: 'center' }}>
              <Search size={16} color="#18181b" style={{ position: 'absolute', left: '16px', pointerEvents: 'none' }} />
              <input 
                type="text" 
                placeholder={activeView === 'notes' ? "Search notes or formulas..." : "Search task..."}
                value={activeView === 'notes' ? searchQuery : ''}
                onChange={e => activeView === 'notes' && setSearchQuery(e.target.value)}
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

            {/* Notification Bell Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                style={{ 
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
                }}
              >
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

              {isNotifOpen && (
                <div style={{
                  position: 'absolute',
                  top: '46px',
                  right: '0',
                  width: '280px',
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.14)',
                  border: '1px solid #e2e8f0',
                  padding: '12px',
                  zIndex: 999
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px 8px 8px', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800 }}>Notifications</span>
                    <span 
                      style={{ fontSize: '10px', color: '#15803d', fontWeight: 700, cursor: 'pointer' }} 
                      onClick={() => setNotifications(prev => prev.map(n => ({...n, unread: false})))}
                    >
                      Mark all read
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                    {notifications.map(n => (
                      <div key={n.id} style={{ padding: '8px', borderRadius: '10px', backgroundColor: n.unread ? '#f8fafc' : '#ffffff', border: '1px solid #f1f5f9' }}>
                        <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0f172a' }}>{n.title}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <img 
              onClick={() => setActiveView('profile')}
              src={currentAvatar} 
              alt="User Profile" 
              title="View Candidate Profile"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `${baseUrl}avatar/avatar1.jpg`;
              }}
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

        {/* ================= 3. ACTIVE VIEW CONTENT ================= */}
        {activeView === 'dashboard' ? (
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
            {/* Subject Capsules + Date Range */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', padding: '2px 0' }}>
                {subjects.map((sub) => {
                  const isActive = sub.id === selectedSubject;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubject(sub.id);
                        setActiveFolderId(null);
                      }}
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
                <span>1 Sep 2026 - 31 Oct 2026</span>
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
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#14532d' }}>Notes (Open Studio)</span>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#eef9f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowUpRight size={15} color="#14532d" />
                  </div>
                </div>
                <div>
                  <div className="num-bold" style={{ fontSize: '36px', lineHeight: 1, marginBottom: '6px', color: '#18181b' }}>{notes.length}</div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, backgroundColor: '#fef6e7', color: '#b45309', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <ArrowUp size={11} /> <b className="num-bold">2</b> Increased from last month
                  </span>
                </div>
              </div>

              <div 
                onClick={() => setActiveView('socratic')}
                title="Click to explore Socratic AI Engine"
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
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#14532d' }}>Socratic AI Engine</span>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#eef9f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowUpRight size={15} color="#14532d" />
                  </div>
                </div>
                <div>
                  <div className="num-bold" style={{ fontSize: '36px', lineHeight: 1, marginBottom: '6px', color: '#18181b' }}>PRO</div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, backgroundColor: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Feature will be added soon
                  </span>
                </div>
              </div>
            </section>

            {/* Analytics & Progress Grid */}
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

              {/* Right Column: Assignments & Tracker (Differentiated Data) */}
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
                      cursor: 'pointer'
                    }}>
                      Active
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <BookMarked size={17} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Ray & Wave Optics PYQ
                        </h4>
                        <p style={{ fontSize: '10.5px', color: '#71717a', margin: '1px 0 0 0' }}>Due date: Oct 30, 2026</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#ccfbf1', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Dna size={17} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Biomolecules & DNA Revision
                        </h4>
                        <p style={{ fontSize: '10.5px', color: '#71717a', margin: '1px 0 0 0' }}>Due date: Nov 02, 2026</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#eef9f2', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Binary size={17} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Definite Integrals Set 4
                        </h4>
                        <p style={{ fontSize: '10.5px', color: '#71717a', margin: '1px 0 0 0' }}>Due date: Nov 05, 2026</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#fef6e7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Zap size={17} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Organic Conversions Drill
                        </h4>
                        <p style={{ fontSize: '10.5px', color: '#71717a', margin: '1px 0 0 0' }}>Due date: Nov 08, 2026</p>
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
                    <p style={{ fontSize: '10.5px', color: '#dcfce7', margin: '3px 0 0 0', textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>Topic: Optics & Derivations</p>
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
        ) : activeView === 'notes' ? (
          /* ================= SINGLE NATIVE NOTES VIEW ================= */
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '30px',
            border: '1px solid rgba(0,0,0,0.04)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            boxSizing: 'border-box',
            width: '100%',
            minHeight: '620px'
          }}>
            {activeFolderId && currentFolder ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    onClick={() => setActiveFolderId(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      borderRadius: '12px',
                      backgroundColor: '#f5f5f1',
                      border: 'none',
                      color: '#18181b',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    <ArrowLeft size={16} />
                    <span>Back to All Folders</span>
                  </button>

                  <button
                    onClick={openNewNoteModal}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '9px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--emerald-800)',
                      color: '#ffffff',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={15} />
                    <span>New Note in Folder</span>
                  </button>
                </div>

                <div style={{
                  padding: '22px',
                  borderRadius: '24px',
                  backgroundColor: COLOR_PRESETS.find(c => c.id === currentFolder.color)?.bg || '#fefce8',
                  border: `1px solid ${COLOR_PRESETS.find(c => c.id === currentFolder.color)?.border || '#fef08a'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#ffffff', color: '#18181b', padding: '2px 8px', borderRadius: '9999px' }}>
                        {currentFolder.subject}
                      </span>
                      <span style={{ fontSize: '11px', color: '#71717a' }}>Updated {currentFolder.date}</span>
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0 }}>
                      {currentFolder.name}
                    </h3>
                  </div>
                </div>

                <div style={{
                  padding: '16px 20px',
                  borderRadius: '18px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #ebece6',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileCode size={20} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0 }}>
                        {currentFolder.pdfTitle || 'Official Chapter Resource Book (PDF)'}
                      </h5>
                      <p style={{ fontSize: '11px', color: '#71717a', margin: '2px 0 0 0' }}>Official NCERT Module • High-yield summaries</p>
                    </div>
                  </div>

                  <span style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    backgroundColor: '#fef3c7',
                    border: '1px solid #fde68a',
                    color: '#92400e',
                    fontSize: '11px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-heading)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Download size={13} />
                    <span>Coming Soon</span>
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0 }}>
                    {selectedSubject === 'all' ? 'All Subject Folders' : `${activeSubjectName} Folders`}
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                  {filteredFolders.map(folder => {
                    const colorConfig = COLOR_PRESETS.find(c => c.id === folder.color) || COLOR_PRESETS[0];

                    return (
                      <div
                        key={folder.id}
                        onClick={() => setActiveFolderId(folder.id)}
                        style={{
                          backgroundColor: colorConfig.bg,
                          border: `1px solid ${colorConfig.border}`,
                          borderRadius: '20px',
                          padding: '18px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: '125px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                          cursor: 'pointer',
                          transition: 'transform 0.15s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '12px',
                            backgroundColor: colorConfig.iconBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: colorConfig.text
                          }}>
                            <Folder size={18} />
                          </div>

                          <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: 'rgba(255,255,255,0.7)', color: colorConfig.text, padding: '2px 8px', borderRadius: '9999px' }}>
                            {folder.subject}
                          </span>
                        </div>

                        <div>
                          <h4 style={{ fontSize: '14px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#18181b', margin: '0 0 2px 0' }}>
                            {folder.name}
                          </h4>
                          <span style={{ fontSize: '11px', color: '#71717a' }}>{folder.date}</span>
                        </div>
                      </div>
                    );
                  })}

                  <button
                    onClick={() => setIsFolderModalOpen(true)}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '2px dashed #d4d4d8',
                      borderRadius: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      minHeight: '125px',
                      cursor: 'pointer',
                      color: '#18181b'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#f4f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FolderPlus size={18} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>New folder</span>
                  </button>
                </div>
              </div>
            )}

            {/* NOTES GRID */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0 }}>
                  {activeFolderId ? `Notes in ${currentFolder?.name}` : (selectedSubject === 'all' ? 'All Study Notes' : `${activeSubjectName} Study Notes`)}
                </h3>

                <button
                  onClick={openNewNoteModal}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--emerald-800)',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} />
                  <span>New Note</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                {displayedNotes.map(note => {
                  const colorConfig = COLOR_PRESETS.find(c => c.id === note.color) || COLOR_PRESETS[1];

                  return (
                    <div
                      key={note.id}
                      onClick={() => openEditNote(note)}
                      style={{
                        backgroundColor: colorConfig.bg,
                        border: `1px solid ${colorConfig.border}`,
                        borderRadius: '22px',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '220px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '10.5px', color: '#71717a', fontWeight: 600 }}>{note.date}</span>
                          <div style={{ width: '24px', height: '24px', borderRadius: '7px', backgroundColor: '#18181b', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Edit3 size={12} />
                          </div>
                        </div>

                        <h4 style={{ fontSize: '14.5px', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#18181b', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                          {note.title}
                        </h4>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '9.5px', fontWeight: 800, backgroundColor: '#ffffff', color: colorConfig.text, padding: '2px 7px', borderRadius: '9999px' }}>
                            {note.subject}
                          </span>
                          {note.chapter && (
                            <span style={{ fontSize: '9.5px', fontWeight: 600, backgroundColor: 'rgba(255,255,255,0.7)', color: '#52525b', padding: '2px 7px', borderRadius: '9999px' }}>
                              {note.chapter}
                            </span>
                          )}
                        </div>

                        <p style={{
                          fontSize: '11.5px',
                          lineHeight: 1.5,
                          color: '#52525b',
                          fontFamily: note.font || 'var(--font-body)',
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          whiteSpace: 'pre-line'
                        }}>
                          {note.content}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.05)', color: '#71717a', fontSize: '10px' }}>
                        <Clock size={11} />
                        <span>{note.time}</span>
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={openNewNoteModal}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px dashed #d4d4d8',
                    borderRadius: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    minHeight: '220px',
                    cursor: 'pointer',
                    color: '#18181b'
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#f4f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={18} />
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Add note</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================= COMING SOON SCREENS FOR THE 3 FEATURES ================= */
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '30px',
            padding: '24px',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {/* 1. Live Quiz Coming Soon Screen */}
            {activeView === 'quiz' && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  backgroundColor: '#fef3c7',
                  color: '#b45309',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <HelpCircle size={32} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: '#b45309', backgroundColor: '#fef3c7', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase' }}>
                  Feature In Active Development
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Adaptive Live Quiz & Error Remediation Lab
                </h2>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  Competitive timed PYQ sprints with automatic trap detection, negative marking telemetry, and retest flash-drills. This feature will be added soon.
                </p>
                <button
                  onClick={() => setActiveView('dashboard')}
                  style={{
                    marginTop: '8px',
                    padding: '10px 22px',
                    borderRadius: '14px',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Back to Dashboard
                </button>
              </div>
            )}

            {/* 2. Socratic AI Coming Soon Screen */}
            {activeView === 'socratic' && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  backgroundColor: '#eef9f2',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BrainCircuit size={32} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: '#b45309', backgroundColor: '#fef3c7', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase' }}>
                  Feature In Active Development
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Socratic AI Hint Engine
                </h2>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  Our real-time Socratic hint generator guides aspirants step-by-step through complex numerical roadblocks without immediately revealing answers. This feature will be added soon.
                </p>
                <button
                  onClick={() => setActiveView('dashboard')}
                  style={{
                    marginTop: '8px',
                    padding: '10px 22px',
                    borderRadius: '14px',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Back to Dashboard
                </button>
              </div>
            )}

            {/* 3. Video Tunneling Coming Soon Screen */}
            {activeView === 'player' && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <PlaySquare size={32} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: '#1e40af', backgroundColor: '#dbeafe', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase' }}>
                  Feature In Active Development
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Video Tunneling & Ad-Free Lecture Engine
                </h2>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  Zero-distraction high-speed lecture playback with synced chapter timestamps and derivation note-taking. This feature will be added soon.
                </p>
                <button
                  onClick={() => setActiveView('dashboard')}
                  style={{
                    marginTop: '8px',
                    padding: '10px 22px',
                    borderRadius: '14px',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Back to Dashboard
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* MODAL: RICH NOTE CREATOR & EDITOR */}
      {isNoteModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '620px',
            backgroundColor: '#ffffff',
            borderRadius: '26px',
            padding: '24px 28px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.18)',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0 }}>
                {editingNote ? 'Edit Study Note' : 'Create New Note'}
              </h3>
              <button onClick={() => setIsNoteModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717a' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveNote} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '6px' }}>
                  Note Title *
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Wave Optics Formulae" 
                  value={noteTitle}
                  onChange={e => setNoteTitle(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid #e4e4e7',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '6px' }}>
                    Subject
                  </label>
                  <select 
                    value={noteSubject}
                    onChange={e => setNoteSubject(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '12px',
                      border: '1px solid #e4e4e7',
                      fontSize: '12px',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box'
                    }}
                  >
                    {subjects.filter(s => s.id !== 'all').map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '6px' }}>
                    Chapter (Optional)
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ch 10" 
                    value={noteChapter}
                    onChange={e => setNoteChapter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '12px',
                      border: '1px solid #e4e4e7',
                      fontSize: '12px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '6px' }}>
                    Folder
                  </label>
                  <select 
                    value={noteFolderId}
                    onChange={e => setNoteFolderId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '12px',
                      border: '1px solid #e4e4e7',
                      fontSize: '12px',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box'
                    }}
                  >
                    {folders.map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '6px' }}>
                  Font Style
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {[
                    { label: 'Inter (Clean)', value: 'var(--font-body)' },
                    { label: 'Jakarta (Display)', value: 'var(--font-heading)' },
                    { label: 'JetBrains (Formulas)', value: 'var(--font-mono)' }
                  ].map(f => (
                    <button
                      type="button"
                      key={f.value}
                      onClick={() => setNoteFont(f.value)}
                      style={{
                        padding: '7px 10px',
                        borderRadius: '10px',
                        border: noteFont === f.value ? '2px solid var(--emerald-800)' : '1px solid #e4e4e7',
                        backgroundColor: noteFont === f.value ? '#eef9f2' : '#ffffff',
                        color: noteFont === f.value ? '#14532d' : '#18181b',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '6px' }}>
                  Color Theme ({COLOR_PRESETS.length} colors)
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {COLOR_PRESETS.map(c => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setNoteColor(c.id)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '9999px',
                        backgroundColor: c.bg,
                        border: noteColor === c.id ? `2px solid ${c.text}` : `1px solid ${c.border}`,
                        color: c.text,
                        fontSize: '11px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {noteColor === c.id && <Check size={12} />}
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#71717a' }}>
                    Note Content
                  </label>

                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button type="button" title="Bold" onClick={() => insertFormatting('**', '**')} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e4e4e7', background: '#f4f4f5', cursor: 'pointer' }}>
                      <Bold size={13} />
                    </button>
                    <button type="button" title="Italic" onClick={() => insertFormatting('*', '*')} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e4e4e7', background: '#f4f4f5', cursor: 'pointer' }}>
                      <Italic size={13} />
                    </button>
                    <button type="button" title="Heading" onClick={() => insertFormatting('## ')} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e4e4e7', background: '#f4f4f5', cursor: 'pointer' }}>
                      <Heading2 size={13} />
                    </button>
                    <button type="button" title="Bullet List" onClick={() => insertFormatting('• ')} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e4e4e7', background: '#f4f4f5', cursor: 'pointer' }}>
                      <List size={13} />
                    </button>
                    <button type="button" title="Numbered List" onClick={() => insertFormatting('1. ')} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e4e4e7', background: '#f4f4f5', cursor: 'pointer' }}>
                      <ListOrdered size={13} />
                    </button>
                  </div>
                </div>

                <textarea 
                  id="note-editor-box"
                  rows={6}
                  placeholder="Type derivations, concepts, definitions..."
                  value={noteContent}
                  onChange={e => setNoteContent(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: '1px solid #e4e4e7',
                    fontSize: '13px',
                    fontFamily: noteFont,
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: editingNote ? 'space-between' : 'flex-end', alignItems: 'center', marginTop: '6px' }}>
                {editingNote && (
                  <button
                    type="button"
                    onClick={() => {
                      setNotes(prev => prev.filter(n => n.id !== editingNote.id));
                      setIsNoteModalOpen(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    Delete Note
                  </button>
                )}

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setIsNoteModalOpen(false)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#f4f4f5',
                      border: 'none',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '8px 20px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--emerald-800)',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {editingNote ? 'Save Changes' : 'Create Note'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE FOLDER */}
      {isFolderModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: '#ffffff',
            borderRadius: '26px',
            padding: '24px 26px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.18)',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#18181b', margin: 0 }}>
                Create New Folder
              </h3>
              <button onClick={() => setIsFolderModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717a' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '6px' }}>
                  Folder Name
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Modern Physics PYQs" 
                  value={newFolderName}
                  onChange={e => setNewFolderName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid #e4e4e7',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '6px' }}>
                  Associated Subject
                </label>
                <select 
                  value={newFolderSubject}
                  onChange={e => setNewFolderSubject(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid #e4e4e7',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box'
                  }}
                >
                  {subjects.filter(s => s.id !== 'all').map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '6px' }}>
                  Theme Color
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {COLOR_PRESETS.slice(0, 6).map(c => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setNewFolderColor(c.id)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '9999px',
                        backgroundColor: c.bg,
                        border: newFolderColor === c.id ? `2px solid ${c.text}` : `1px solid ${c.border}`,
                        color: c.text,
                        fontSize: '11px',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsFolderModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    backgroundColor: '#f4f4f5',
                    border: 'none',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--emerald-800)',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}