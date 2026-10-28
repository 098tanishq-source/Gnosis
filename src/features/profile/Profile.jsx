 import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Check, 
  ShieldCheck, 
  Edit3, 
  Atom, 
  FlaskConical, 
  Calculator, 
  GitCommit, 
  MapPin,
  ChevronRight,
  X,
  Sparkles,
  Layers,
  Image as ImageIcon,
  User,
  CreditCard,
  Shield,
  GraduationCap,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Trash2,
  Target
} from 'lucide-react';

const BASE = import.meta.env.BASE_URL || '/';

// 11 Avatars from public/avatar/
const LOCAL_AVATARS = Array.from({ length: 11 }, (_, i) => ({
  id: `av-${i + 1}`,
  name: `Avatar ${i + 1}`,
  tag: i < 5 ? 'Aesthetic' : 'Classic',
  url: `${BASE}avatar/avatar${i + 1}.jpg`
}));

// 9 Banners from public/banners/
const LOCAL_BANNERS = [
  { id: 'ban-1', name: 'Monochrome Manga', type: 'JPG', url: `${BASE}banners/ban1.jpg` },
  { id: 'ban-2', name: 'Shinchan Splash', type: 'GIF', url: `${BASE}banners/ban2.gif` },
  { id: 'ban-3', name: 'Godzilla Comic', type: 'JPG', url: `${BASE}banners/ban3.jpg` },
  { id: 'ban-4', name: 'Speed Drift', type: 'JPG', url: `${BASE}banners/ban4.jpg` },
  { id: 'ban-5', name: 'Anime Romance', type: 'JPG', url: `${BASE}banners/ban5.jpg` },
  { id: 'ban-6', name: 'Luffy Sunset', type: 'JPG', url: `${BASE}banners/ban6.jpg` },
  { id: 'ban-7', name: 'GOAT Typography', type: 'JPG', url: `${BASE}banners/ban7.jpg` },
  { id: 'ban-8', name: 'Cherry Blossom', type: 'JPG', url: `${BASE}banners/ban8.jpg` },
  { id: 'ban-9', name: 'Summer Meadow', type: 'JPG', url: `${BASE}banners/ban9.jpg` }
];

// Exact GitHub Commit Palette
const GITHUB_GREENS = {
  0: '#161b22',
  1: '#0e4429',
  2: '#006d32',
  3: '#26a641',
  4: '#39d353'
};

const GENERATE_COMMIT_GRID = () => {
  const weeks = [];
  for (let w = 0; w < 32; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const rand = Math.random();
      const level = rand > 0.65 ? (rand > 0.88 ? 4 : (rand > 0.75 ? 3 : 2)) : (rand > 0.4 ? 1 : 0);
      days.push({ day: d, level, count: level * 8 });
    }
    weeks.push(days);
  }
  return weeks;
};

export default function Prolife({ onBackToDashboard }) {
  useEffect(() => {
    const fontId = 'michroma-google-font';
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Michroma&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const michromaStyle = { fontFamily: "'Michroma', sans-serif" };

  // Tabs: 'profile' | 'subscription' | 'academic' | 'security' | 'edit_details'
  const [activeTab, setActiveTab] = useState('profile');
  const [viewAllType, setViewAllType] = useState(null); // 'avatars' | 'banners' | null
  const [commitGrid] = useState(GENERATE_COMMIT_GRID);

  const [profileData, setProfileData] = useState(() => {
    try {
      const s = localStorage.getItem('gnosis_user_prolife_v7');
      return s ? JSON.parse(s) : {
        name: 'Tanishq Sood',
        handle: 'tanishq_098',
        location: 'Delhi, India',
        role: 'Class 11 PCM Aspirant • Target AIR < 500',
        description: 'Class 11 PCM student focused on JEE Advanced 2027. Speed problem-solving in Classical Mechanics, Optics, and Organic Reaction Mechanisms.',
        targetExam: 'JEE Advanced 2027',
        targetPercentile: '99.4 %ile',
        weakSubject: 'Physics - Mechanics',
        rating: '4.8',
        duration: '180 Days',
        pyqsSolved: 540,
        coverUrl: LOCAL_BANNERS[0].url,
        avatarUrl: LOCAL_AVATARS[0].url,
        isBookmarked: true
      };
    } catch {
      return {
        name: 'Tanishq Sood',
        handle: 'tanishq_098',
        location: 'Delhi, India',
        role: 'Class 11 PCM Aspirant • Target AIR < 500',
        description: 'Class 11 PCM student focused on JEE Advanced 2027. Speed problem-solving in Classical Mechanics, Optics, and Organic Reaction Mechanisms.',
        targetExam: 'JEE Advanced 2027',
        targetPercentile: '99.4 %ile',
        weakSubject: 'Physics - Mechanics',
        rating: '4.8',
        duration: '180 Days',
        pyqsSolved: 540,
        coverUrl: LOCAL_BANNERS[0].url,
        avatarUrl: LOCAL_AVATARS[0].url,
        isBookmarked: true
      };
    }
  });

  // Dedicated Form State for the Edit Details Tab
  const [formName, setFormName] = useState(profileData.name);
  const [formHandle, setFormHandle] = useState(profileData.handle);
  const [formRole, setFormRole] = useState(profileData.role);
  const [formLocation, setFormLocation] = useState(profileData.location);
  const [formExam, setFormExam] = useState(profileData.targetExam);
  const [formWeakSubject, setFormWeakSubject] = useState(profileData.weakSubject);
  const [formDesc, setFormDesc] = useState(profileData.description);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync edits if profileData updates externally
  useEffect(() => {
    setFormName(profileData.name);
    setFormHandle(profileData.handle);
    setFormRole(profileData.role);
    setFormLocation(profileData.location);
    setFormExam(profileData.targetExam);
    setFormWeakSubject(profileData.weakSubject);
    setFormDesc(profileData.description);
  }, [profileData]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('gnosis_user_prolife_v7', JSON.stringify(profileData));
  }, [profileData]);

  const selectAvatar = (url) => {
    setProfileData(prev => ({ ...prev, avatarUrl: url }));
  };

  const selectBanner = (url) => {
    setProfileData(prev => ({ ...prev, coverUrl: url }));
  };

  const handleSaveDetails = (e) => {
    e.preventDefault();
    setProfileData(prev => ({
      ...prev,
      name: formName.trim() || prev.name,
      handle: formHandle.trim().replace('@', '') || prev.handle,
      role: formRole.trim() || prev.role,
      location: formLocation.trim() || prev.location,
      targetExam: formExam.trim() || prev.targetExam,
      weakSubject: formWeakSubject,
      description: formDesc.trim() || prev.description
    }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetForm = () => {
    setFormName(profileData.name);
    setFormHandle(profileData.handle);
    setFormRole(profileData.role);
    setFormLocation(profileData.location);
    setFormExam(profileData.targetExam);
    setFormWeakSubject(profileData.weakSubject);
    setFormDesc(profileData.description);
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#f5f5f1',
      padding: '0',
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      
      {/* ================= 1. FLUSH TOP APP BAR ================= */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e7e8e1',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <button
          onClick={onBackToDashboard}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '12px',
            backgroundColor: '#18181b',
            color: '#ffffff',
            border: 'none',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            ...michromaStyle
          }}
        >
          <ArrowLeft size={14} />
          <span>BACK TO DASHBOARD</span>
        </button>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: '4px',
          backgroundColor: '#f5f5f1',
          padding: '4px',
          borderRadius: '9999px',
          border: '1px solid #e7e8e1'
        }}>
          {[
            { id: 'profile', label: '1. Profile', icon: User },
            { id: 'edit_details', label: '2. Edit Details', icon: Edit3 },
            { id: 'subscription', label: '3. Subscription & AI', icon: CreditCard },
            { id: 'academic', label: '4. Academic Target', icon: GraduationCap },
            { id: 'security', label: '5. Security & Data', icon: Shield }
          ].map(t => {
            const isActive = activeTab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: isActive ? '#18181b' : 'transparent',
                  color: isActive ? '#ffffff' : '#71717a',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  ...michromaStyle
                }}
              >
                <Icon size={13} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= 2. MAIN 2-COLUMN VIEW ================= */}
      <div style={{
        padding: '10px 14px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(360px, 1fr)',
        gap: '12px',
        width: '100%',
        boxSizing: 'border-box',
        alignItems: 'start'
      }}>
        
        {/* ================= LEFT MAIN COLUMN ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
          
          {/* TAB 1: PROFILE OVERVIEW (CARD + COMMIT MATRIX) */}
          {activeTab === 'profile' && (
            <>
              {/* Profile Card */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '26px',
                border: '1px solid #e7e8e1',
                overflow: 'hidden',
                boxSizing: 'border-box',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
              }}>
                {/* Scenic Cover Banner */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '220px',
                  backgroundImage: `url('${profileData.coverUrl}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#18181b'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 20%, rgba(255,255,255,0.7) 85%, #ffffff 100%)'
                  }} />

                  <button
                    onClick={() => setProfileData(p => ({ ...p, isBookmarked: !p.isBookmarked }))}
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.92)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: profileData.isBookmarked ? '#14532d' : '#71717a',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  >
                    <Bookmark size={16} fill={profileData.isBookmarked ? '#14532d' : 'none'} />
                  </button>
                </div>

                <div style={{ padding: '0 24px 22px 24px' }}>
                  <div style={{
                    position: 'relative',
                    marginTop: '-56px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    marginBottom: '14px'
                  }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      border: '4px solid #ffffff',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                      overflow: 'hidden',
                      backgroundColor: '#fed7aa',
                      flexShrink: 0
                    }}>
                      <img 
                        src={profileData.avatarUrl} 
                        alt="PFP" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#f5f5f1',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      border: '1px solid #e7e8e1'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Atom size={11} color="#1d4ed8" />
                        </span>
                        <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FlaskConical size={11} color="#be185d" />
                        </span>
                        <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Calculator size={11} color="#b45309" />
                        </span>
                      </div>
                      <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#18181b', ...michromaStyle }}>
                        PCM Track
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr',
                    gap: '20px',
                    alignItems: 'start',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#18181b', margin: 0, ...michromaStyle }}>
                        {profileData.name}
                      </h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#71717a', fontSize: '11.5px', margin: '4px 0' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <MapPin size={12} color="#15803d" />
                          {profileData.location}
                        </span>
                        <span>•</span>
                        <span style={{ color: '#15803d', fontWeight: 800 }}>@{profileData.handle}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#52525b', lineHeight: 1.45, margin: '6px 0 0 0' }}>
                        {profileData.description}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#8e9089', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: '4px', ...michromaStyle }}>
                          TARGET EXAM
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#eef9f2', color: '#14532d', padding: '4px 10px', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                            {profileData.targetExam}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#f4f4f5', color: '#52525b', padding: '4px 10px', borderRadius: '8px' }}>
                            CBSE Class 11
                          </span>
                        </div>
                      </div>

                      <div>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#8e9089', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: '4px', ...michromaStyle }}>
                          FOCUS TOPIC
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          <span style={{ fontSize: '10.5px', fontWeight: 600, backgroundColor: '#f4f4f5', color: '#3f3f46', padding: '3px 8px', borderRadius: '6px' }}>
                            {profileData.weakSubject}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid #ebece6'
                  }}>
                    <div style={{ paddingRight: '20px', borderRight: '1px solid #ebece6' }}>
                      <div style={{ fontSize: '16px', color: '#18181b', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px', ...michromaStyle }}>
                        <span style={{ color: '#eab308' }}>★</span> {profileData.rating}
                      </div>
                      <span style={{ fontSize: '10px', color: '#a1a1aa', fontWeight: 700, ...michromaStyle }}>RATING</span>
                    </div>

                    <div style={{ paddingRight: '20px', borderRight: '1px solid #ebece6' }}>
                      <div style={{ fontSize: '16px', color: '#18181b', fontWeight: 900, ...michromaStyle }}>
                        {profileData.duration}
                      </div>
                      <span style={{ fontSize: '10px', color: '#a1a1aa', fontWeight: 700, ...michromaStyle }}>DURATION</span>
                    </div>

                    <div>
                      <div style={{ fontSize: '16px', color: '#18181b', fontWeight: 900, ...michromaStyle }}>
                        {profileData.targetPercentile}
                      </div>
                      <span style={{ fontSize: '10px', color: '#a1a1aa', fontWeight: 700, ...michromaStyle }}>PERCENTILE</span>
                    </div>

                    <button
                      onClick={() => setActiveTab('edit_details')}
                      style={{
                        marginLeft: 'auto',
                        padding: '11px 26px',
                        borderRadius: '9999px',
                        backgroundColor: '#18181b',
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 800,
                        fontSize: '12px',
                        cursor: 'pointer',
                        ...michromaStyle
                      }}
                    >
                      EDIT DETAILS
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity Commit Matrix */}
              <div style={{
                backgroundColor: '#0d1117',
                borderRadius: '24px',
                border: '1px solid #30363d',
                padding: '18px 22px',
                boxSizing: 'border-box',
                color: '#c9d1d9'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GitCommit size={16} color="#39d353" />
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#f0f6fc', margin: 0, ...michromaStyle }}>
                      QUESTION SOLVING REPOSITORY (180 DAYS)
                    </h4>
                  </div>
                  <span style={{ fontSize: '10.5px', color: '#8b949e', ...michromaStyle }}>
                    {profileData.pyqsSolved} PYQs Commits
                  </span>
                </div>

                <div style={{ overflowX: 'auto', paddingBottom: '4px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {commitGrid.map((week, wIdx) => (
                      <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {week.map((d, dIdx) => (
                          <div
                            key={dIdx}
                            title={`Day activity: ${d.count} questions committed`}
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '2.5px',
                              backgroundColor: GITHUB_GREENS[d.level],
                              border: d.level === 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                              cursor: 'pointer'
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', marginTop: '10px', fontSize: '10px', color: '#8b949e' }}>
                  <span style={{ ...michromaStyle, fontSize: '9px' }}>LESS</span>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: GITHUB_GREENS[0] }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: GITHUB_GREENS[1] }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: GITHUB_GREENS[2] }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: GITHUB_GREENS[3] }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: GITHUB_GREENS[4] }} />
                  <span style={{ ...michromaStyle, fontSize: '9px' }}>MORE</span>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: EDIT DETAILS (USER FORM) */}
          {activeTab === 'edit_details' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '26px',
              border: '1px solid #e7e8e1',
              padding: '24px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#15803d', ...michromaStyle }}>STUDENT LEDGER</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#18181b', margin: '2px 0 0 0', ...michromaStyle }}>
                    EDIT CANDIDATE DETAILS
                  </h3>
                </div>
                {saveSuccess && (
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#15803d', backgroundColor: '#eef9f2', padding: '4px 12px', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '4px', ...michromaStyle }}>
                    <CheckCircle2 size={13} /> SAVED
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveDetails} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', display: 'block', marginBottom: '4px', ...michromaStyle }}>
                      FULL NAME
                    </label>
                    <input 
                      type="text"
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      placeholder="e.g. Tanishq Sood"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        backgroundColor: '#f5f5f1',
                        border: '1px solid #e7e8e1',
                        outline: 'none',
                        fontSize: '13px',
                        color: '#18181b',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', display: 'block', marginBottom: '4px', ...michromaStyle }}>
                      USERNAME
                    </label>
                    <input 
                      type="text"
                      value={formHandle}
                      onChange={e => setFormHandle(e.target.value)}
                      placeholder="e.g. tanishq_098"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        backgroundColor: '#f5f5f1',
                        border: '1px solid #e7e8e1',
                        outline: 'none',
                        fontSize: '13px',
                        color: '#18181b',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', display: 'block', marginBottom: '4px', ...michromaStyle }}>
                      LOCATION
                    </label>
                    <input 
                      type="text"
                      value={formLocation}
                      onChange={e => setFormLocation(e.target.value)}
                      placeholder="e.g. Delhi, India"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        backgroundColor: '#f5f5f1',
                        border: '1px solid #e7e8e1',
                        outline: 'none',
                        fontSize: '13px',
                        color: '#18181b',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', display: 'block', marginBottom: '4px', ...michromaStyle }}>
                      TARGET EXAM
                    </label>
                    <input 
                      type="text"
                      value={formExam}
                      onChange={e => setFormExam(e.target.value)}
                      placeholder="e.g. JEE Advanced 2027"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        backgroundColor: '#f5f5f1',
                        border: '1px solid #e7e8e1',
                        outline: 'none',
                        fontSize: '13px',
                        color: '#18181b',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', display: 'block', marginBottom: '4px', ...michromaStyle }}>
                    HEADLINE / ROLE
                  </label>
                  <input 
                    type="text"
                    value={formRole}
                    onChange={e => setFormRole(e.target.value)}
                    placeholder="e.g. Class 11 PCM Aspirant"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      backgroundColor: '#f5f5f1',
                      border: '1px solid #e7e8e1',
                      outline: 'none',
                      fontSize: '13px',
                      color: '#18181b',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', display: 'block', marginBottom: '4px', ...michromaStyle }}>
                    REVISION FOCUS TOPIC
                  </label>
                  <select
                    value={formWeakSubject}
                    onChange={e => setFormWeakSubject(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      backgroundColor: '#f5f5f1',
                      border: '1px solid #e7e8e1',
                      outline: 'none',
                      fontSize: '13px',
                      color: '#18181b',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Physics - Mechanics">Physics - Mechanics & Rotational Motion</option>
                    <option value="Physics - Optics">Physics - Wave Optics & Ray Optics</option>
                    <option value="Chemistry - Organic">Chemistry - Reaction Mechanisms & Functional Groups</option>
                    <option value="Chemistry - Physical">Chemistry - Thermodynamics & Equilibrium</option>
                    <option value="Maths - Calculus">Maths - Differential & Integral Calculus</option>
                    <option value="Maths - Vectors & 3D">Maths - Vectors & 3D Geometry</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', display: 'block', marginBottom: '4px', ...michromaStyle }}>
                    BIO / DESCRIPTION
                  </label>
                  <textarea 
                    rows={4}
                    value={formDesc}
                    onChange={e => setFormDesc(e.target.value)}
                    placeholder="Write a brief student intro..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      backgroundColor: '#f5f5f1',
                      border: '1px solid #e7e8e1',
                      outline: 'none',
                      fontSize: '13px',
                      color: '#18181b',
                      resize: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 18px',
                      borderRadius: '12px',
                      backgroundColor: '#f5f5f1',
                      border: '1px solid #e7e8e1',
                      color: '#18181b',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      ...michromaStyle
                    }}
                  >
                    <RotateCcw size={13} />
                    <span>RESET</span>
                  </button>

                  <button
                    type="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 24px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--emerald-800)',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      ...michromaStyle
                    }}
                  >
                    <Save size={13} />
                    <span>SAVE CHANGES</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: SUBSCRIPTION & AI */}
          {activeTab === 'subscription' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '26px',
              border: '1px solid #e7e8e1',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div>
                <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#15803d', ...michromaStyle }}>TIER STATUS</span>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#18181b', margin: '2px 0 0 0', ...michromaStyle }}>
                  AI DOUBTS & MEMBERSHIP
                </h3>
              </div>

              <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: '#eef9f2', border: '1px solid #bbf7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '9px', fontWeight: 900, color: '#14532d', ...michromaStyle }}>CURRENT PASS</span>
                  <div style={{ fontSize: '14px', fontWeight: 900, color: '#14532d', ...michromaStyle }}>GNOSIS PRO - ASPIRANT PASS</div>
                  <span style={{ fontSize: '11px', color: '#15803d' }}>Renews Nov 27, 2026</span>
                </div>
                <ShieldCheck size={32} color="#15803d" />
              </div>

              <div style={{ padding: '14px', borderRadius: '14px', backgroundColor: '#f5f5f1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, marginBottom: '6px' }}>
                  <span style={{ color: '#18181b', ...michromaStyle }}>DAILY SOCRATIC HINTS</span>
                  <span style={{ color: '#15803d', ...michromaStyle }}>18 / 25 USED</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e4e4e7', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '72%', height: '100%', backgroundColor: '#15803d', borderRadius: '9999px' }} />
                </div>
                <span style={{ fontSize: '9.5px', color: '#71717a', marginTop: '4px', display: 'block' }}>Resets at midnight IST daily</span>
              </div>

              <div style={{ padding: '14px', borderRadius: '14px', backgroundColor: '#f5f5f1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, marginBottom: '6px' }}>
                  <span style={{ color: '#18181b', ...michromaStyle }}>DEEP IMAGE SCANS (OCR)</span>
                  <span style={{ color: '#0369a1', ...michromaStyle }}>3 / 5 REMAINING</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e4e4e7', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '60%', height: '100%', backgroundColor: '#0284c7', borderRadius: '9999px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#18181b',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  ...michromaStyle
                }}>
                  UPGRADE PLAN • ₹199/MO
                </button>
                <button style={{
                  padding: '12px 18px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  color: '#18181b',
                  border: '1px solid #e4e4e7',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  ...michromaStyle
                }}>
                  INVOICES
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: ACADEMIC TARGET */}
          {activeTab === 'academic' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e7e8e1',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div>
                <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#15803d', ...michromaStyle }}>RADAR</span>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#18181b', margin: '2px 0 0 0', ...michromaStyle }}>
                  ACADEMIC GOALS
                </h3>
              </div>

              <div style={{
                padding: '16px',
                borderRadius: '16px',
                backgroundColor: '#18181b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '9px', color: '#a1a1aa', ...michromaStyle }}>EXAM COUNTDOWN</span>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#39d353', marginTop: '2px', ...michromaStyle }}>
                    450 DAYS REMAINING
                  </div>
                  <span style={{ fontSize: '11px', color: '#d4d4d8' }}>To {profileData.targetExam}</span>
                </div>
                <Target size={34} color="#39d353" />
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & DATA */}
          {activeTab === 'security' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e7e8e1',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div>
                <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#b91c1c', ...michromaStyle }}>SECURITY</span>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#18181b', margin: '2px 0 0 0', ...michromaStyle }}>
                  AUDIT & CONTROLS
                </h3>
              </div>

              <div style={{ padding: '14px', borderRadius: '14px', backgroundColor: '#f5f5f1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#18181b', ...michromaStyle }}>GOOGLE SIGN-IN</span>
                  <div style={{ fontSize: '11px', color: '#71717a' }}>{profileData.email}</div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#15803d', ...michromaStyle }}>CONNECTED</span>
              </div>

              <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b91c1c', fontWeight: 900, fontSize: '12px', ...michromaStyle }}>
                  <AlertTriangle size={15} />
                  <span>CLEAR MISTAKE VAULT HISTORY</span>
                </div>
                <p style={{ fontSize: '11px', color: '#7f1d1d', margin: '4px 0 12px 0' }}>
                  Wipes your incorrect attempts, time-tracker history, and test telemetry.
                </p>
                <button
                  onClick={() => {
                    localStorage.removeItem('gnosis_mistake_vault');
                    alert('Mistake vault cleared!');
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    ...michromaStyle
                  }}
                >
                  RESET STATISTICS
                </button>
              </div>

              <button
                onClick={onBackToDashboard}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #fee2e2',
                  color: '#dc2626',
                  fontSize: '11.5px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  ...michromaStyle
                }}
              >
                <LogOut size={15} />
                <span>SIGN OUT OF GNOSIS</span>
              </button>
            </div>
          )}

        </div>

        {/* ================= RIGHT COLUMN: BROWSE ALL CAROUSELS ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* AVATARS CAROUSEL */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '26px',
            border: '1px solid #e7e8e1',
            padding: '20px',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#15803d', ...michromaStyle }}>PUBLIC/AVATAR</span>
                <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#18181b', margin: '2px 0 0 0', ...michromaStyle }}>
                  AVATAR COLLECTION
                </h4>
              </div>
              <button
                onClick={() => setViewAllType('avatars')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#f5f5f1',
                  border: '1px solid #e7e8e1',
                  borderRadius: '9999px',
                  padding: '5px 12px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#18181b',
                  cursor: 'pointer',
                  ...michromaStyle
                }}
              >
                <span>VIEW ALL (11)</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {/* Quick Strip Preview (First 5) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {LOCAL_AVATARS.slice(0, 5).map(av => {
                const isSelected = profileData.avatarUrl === av.url;
                return (
                  <div
                    key={av.id}
                    onClick={() => selectAvatar(av.url)}
                    title="Click to apply"
                    style={{
                      aspectRatio: '1/1',
                      borderRadius: '50%',
                      border: isSelected ? '3px solid #15803d' : '2px solid #e4e4e7',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundColor: '#f5f5f1',
                      boxShadow: isSelected ? '0 2px 10px rgba(20, 83, 45, 0.35)' : 'none',
                      transition: 'transform 0.15s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <img src={av.url} alt={av.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                );
              })}
            </div>
            <span style={{ fontSize: '10px', color: '#71717a', marginTop: '10px', display: 'block' }}>
              Instant auto-save: click any avatar icon to apply immediately.
            </span>
          </div>

          {/* BANNERS CAROUSEL */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '26px',
            border: '1px solid #e7e8e1',
            padding: '20px',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#15803d', ...michromaStyle }}>PUBLIC/BANNERS</span>
                <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#18181b', margin: '2px 0 0 0', ...michromaStyle }}>
                  BANNER COLLECTION
                </h4>
              </div>
              <button
                onClick={() => setViewAllType('banners')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#f5f5f1',
                  border: '1px solid #e7e8e1',
                  borderRadius: '9999px',
                  padding: '5px 12px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#18181b',
                  cursor: 'pointer',
                  ...michromaStyle
                }}
              >
                <span>VIEW ALL (9)</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {/* Quick Strip Preview (First 4) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {LOCAL_BANNERS.slice(0, 4).map(ban => {
                const isSelected = profileData.coverUrl === ban.url;
                return (
                  <div
                    key={ban.id}
                    onClick={() => selectBanner(ban.url)}
                    title="Click to apply"
                    style={{
                      height: '75px',
                      borderRadius: '14px',
                      backgroundImage: `url('${ban.url}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      cursor: 'pointer',
                      border: isSelected ? '3px solid #15803d' : '1px solid #e7e8e1',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.15s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '4px', right: '4px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#15803d', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={11} />
                      </div>
                    )}
                    <span style={{ position: 'absolute', bottom: '4px', left: '6px', fontSize: '9px', color: '#ffffff', fontWeight: 800, textShadow: '0 1px 3px rgba(0,0,0,0.9)', ...michromaStyle }}>
                      {ban.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TELEMETRY CARD */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '26px',
            border: '1px solid #e7e8e1',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#18181b', ...michromaStyle }}>CLOUD TELEMETRY</span>
              <span style={{ fontSize: '10px', color: '#15803d', fontWeight: 800 }}>FIREBASE AUTH</span>
            </div>
            <p style={{ fontSize: '11px', color: '#71717a', margin: 0, lineHeight: 1.4 }}>
              Profile modifications are saved automatically to local memory and your candidate passport.
            </p>
          </div>

        </div>

      </div>

      {/* ================= MODAL: VIEW ALL (AMAZON-STYLE MODAL) ================= */}
      {viewAllType && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '680px',
            maxHeight: '85vh',
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            padding: '24px 28px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflow: 'hidden'
          }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e7e8e1', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#15803d', ...michromaStyle }}>AMAZON-STYLE BROWSER</span>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#18181b', margin: '2px 0 0 0', ...michromaStyle }}>
                  {viewAllType === 'avatars' ? 'ALL 11 AVATARS (/public/avatar/)' : 'ALL 9 BANNERS (/public/banners/)'}
                </h3>
              </div>
              <button 
                onClick={() => setViewAllType(null)} 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: '#f5f5f1', 
                  border: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer',
                  color: '#18181b'
                }}
              >
                <X size={17} />
              </button>
            </div>

            <div style={{ overflowY: 'auto', paddingRight: '4px', flex: 1 }}>
              {viewAllType === 'avatars' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                  {LOCAL_AVATARS.map(av => {
                    const isSelected = profileData.avatarUrl === av.url;
                    return (
                      <div
                        key={av.id}
                        onClick={() => { selectAvatar(av.url); setViewAllType(null); }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '10px',
                          borderRadius: '16px',
                          border: isSelected ? '3px solid #15803d' : '1px solid #e7e8e1',
                          backgroundColor: isSelected ? '#eef9f2' : '#ffffff',
                          cursor: 'pointer',
                          transition: 'transform 0.15s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <div style={{
                          width: '74px',
                          height: '74px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: isSelected ? '3px solid #15803d' : '1px solid #d4d4d8',
                          boxShadow: isSelected ? '0 4px 12px rgba(20, 83, 45, 0.3)' : 'none'
                        }}>
                          <img src={av.url} alt={av.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#18181b', ...michromaStyle }}>
                          {av.name}
                        </span>
                        {isSelected && (
                          <span style={{ fontSize: '9px', fontWeight: 800, color: '#15803d', backgroundColor: '#ffffff', padding: '2px 8px', borderRadius: '9999px' }}>
                            ACTIVE
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {LOCAL_BANNERS.map(ban => {
                    const isSelected = profileData.coverUrl === ban.url;
                    return (
                      <div
                        key={ban.id}
                        onClick={() => { selectBanner(ban.url); setViewAllType(null); }}
                        style={{
                          height: '110px',
                          borderRadius: '16px',
                          backgroundImage: `url('${ban.url}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          cursor: 'pointer',
                          border: isSelected ? '3px solid #15803d' : '1px solid #e7e8e1',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: isSelected ? '0 4px 16px rgba(20, 83, 45, 0.35)' : 'none',
                          transition: 'transform 0.15s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        {isSelected && (
                          <div style={{ position: 'absolute', top: '6px', right: '6px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#15803d', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={12} />
                          </div>
                        )}
                        <span style={{ position: 'absolute', bottom: '6px', left: '8px', fontSize: '10px', color: '#ffffff', fontWeight: 900, textShadow: '0 1px 4px rgba(0,0,0,0.9)', ...michromaStyle }}>
                          {ban.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
              <button
                onClick={() => setViewAllType(null)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  backgroundColor: '#18181b',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  ...michromaStyle
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}