import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Image as ImageIcon, 
  Check, 
  Mail, 
  ShieldCheck, 
  User, 
  BookOpen, 
  Target, 
  Clock, 
  Building2, 
  Save, 
  Sparkles, 
  Upload, 
  RefreshCw, 
  X, 
  Trophy, 
  Flame, 
  Palette,
  CreditCard,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  Gift
} from 'lucide-react';

const baseUrl = import.meta.env.BASE_URL || '/';

// References files inside public/banners/ and public/
const LOCAL_BANNERS = [
  { id: 'b-local-1', name: 'Banner 01', url: `${baseUrl}banners/banner1.jpg`, fallback: `${baseUrl}banners/banner1.png` },
  { id: 'b-local-2', name: 'Banner 02', url: `${baseUrl}banners/banner2.jpg`, fallback: `${baseUrl}banners/banner2.png` },
  { id: 'b-local-3', name: 'Banner 03', url: `${baseUrl}banners/banner3.jpg`, fallback: `${baseUrl}banners/banner3.png` },
  { id: 'b-mock', name: 'Mock Test Grid', url: `${baseUrl}mock-test-bg.jpg`, fallback: `${baseUrl}mock-test-bg.png` },
  { id: 'b-hero', name: 'Gnosis Cyber Red', url: `${baseUrl}hero-bg.png`, fallback: `${baseUrl}green01.jpg` },
  { id: 'b-green', name: 'Forest Mesh', url: `${baseUrl}green002.jpg`, fallback: `${baseUrl}green01.jpg` }
];

// References files inside public/avatar/
const LOCAL_AVATARS = [
  { id: 'av-1', name: 'Avatar 01', url: `${baseUrl}avatar/avatar1.png`, fallback: `${baseUrl}avatar/avatar1.jpg` },
  { id: 'av-2', name: 'Avatar 02', url: `${baseUrl}avatar/avatar2.png`, fallback: `${baseUrl}avatar/avatar2.jpg` },
  { id: 'av-3', name: 'Avatar 03', url: `${baseUrl}avatar/avatar3.png`, fallback: `${baseUrl}avatar/avatar3.jpg` },
  { id: 'av-4', name: 'Avatar 04', url: `${baseUrl}avatar/avatar4.png`, fallback: `${baseUrl}avatar/avatar4.jpg` },
  { id: 'av-5', name: 'Avatar 05', url: `${baseUrl}avatar/avatar5.png`, fallback: `${baseUrl}avatar/avatar5.jpg` },
  { id: 'av-6', name: 'Avatar 06', url: `${baseUrl}avatar/avatar6.png`, fallback: `${baseUrl}avatar/avatar6.jpg` }
];

const PROFILE_STYLES = `
  .gn-prof-root {
    max-width: 1100px;
    margin: 0 auto;
    color: #FFFFFF;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    padding-bottom: 60px;
  }

  .gn-prof-hero-card {
    background: #0D0F14;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 28px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
    margin-bottom: 24px;
  }

  .gn-prof-banner-area {
    height: 230px;
    width: 100%;
    position: relative;
    background: #111318;
    overflow: hidden;
  }

  .gn-prof-banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .gn-prof-banner-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(9, 10, 13, 0.15) 0%, rgba(13, 15, 20, 0.95) 100%);
  }

  .gn-prof-banner-ctrls {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    gap: 8px;
    z-index: 5;
  }

  .gn-prof-btn-glass {
    background: rgba(13, 15, 20, 0.8);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #FFFFFF;
    padding: 8px 16px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
  }

  .gn-prof-btn-glass:hover {
    background: #be1c35;
    border-color: #be1c35;
  }

  .gn-prof-hero-body {
    padding: 0 32px 28px 32px;
    margin-top: -65px;
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    flex-wrap: wrap;
  }

  .gn-prof-avatar-wrap {
    position: relative;
    width: 124px;
    height: 124px;
  }

  .gn-prof-avatar {
    width: 124px;
    height: 124px;
    border-radius: 50%;
    border: 4px solid #0D0F14;
    object-fit: cover;
    background: #14171F;
    box-shadow: 0 0 24px rgba(190, 28, 53, 0.4);
  }

  .gn-prof-avatar-fallback {
    width: 124px;
    height: 124px;
    border-radius: 50%;
    border: 4px solid #0D0F14;
    background: #151820;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    font-weight: 900;
    color: #FFFFFF;
    box-shadow: 0 0 24px rgba(190, 28, 53, 0.4);
  }

  .gn-prof-avatar-cam-badge {
    position: absolute;
    bottom: 4px;
    right: 4px;
    background: #be1c35;
    color: #FFFFFF;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 3px solid #0D0F14;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .gn-prof-avatar-cam-badge:hover {
    transform: scale(1.1);
  }

  .gn-prof-tab-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 8px;
    overflow-x: auto;
  }

  .gn-prof-tab-btn {
    background: transparent;
    border: none;
    color: #8E95A5;
    padding: 10px 18px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
  }

  .gn-prof-tab-btn:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.04);
  }

  .gn-prof-tab-btn.active {
    color: #FFFFFF;
    background: #14171F;
    border: 1px solid rgba(190, 28, 53, 0.5);
    box-shadow: 0 2px 10px rgba(190, 28, 53, 0.2);
  }

  .gn-prof-panel {
    background: #0D0F14;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 28px;
    box-sizing: border-box;
  }

  .gn-prof-field-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  @media (max-width: 600px) {
    .gn-prof-field-grid {
      grid-template-columns: 1fr;
    }
  }

  .gn-prof-label {
    display: block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
  }

  .gn-prof-input,
  .gn-prof-select {
    width: 100%;
    padding: 12px 14px;
    background: #14171F;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: #FFFFFF;
    font-size: 13.5px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }

  .gn-prof-input:focus,
  .gn-prof-select:focus {
    border-color: #be1c35;
  }

  .gn-prof-input[disabled] {
    background: #090A0E;
    color: #64748B;
    border-color: rgba(255, 255, 255, 0.04);
    cursor: not-allowed;
  }

  .gn-prof-save-btn {
    background: #be1c35;
    color: #FFFFFF;
    border: none;
    padding: 12px 28px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 4px 18px rgba(190, 28, 53, 0.35);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.15s, background 0.15s;
    margin-top: 10px;
  }

  .gn-prof-save-btn:hover {
    background: #a6182e;
    transform: translateY(-2px);
  }

  /* Subscription Cards */
  .gn-sub-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 760px) {
    .gn-sub-grid {
      grid-template-columns: 1fr;
    }
  }

  .gn-sub-card {
    background: #12141A;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 28px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .gn-sub-card.current {
    border-color: #be1c35;
    background: radial-gradient(circle at 90% 10%, rgba(190, 28, 53, 0.12) 0%, #12141A 60%);
  }

  /* Modal Styles */
  .gn-prof-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .gn-prof-modal-box {
    background: #0D0F14;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 24px;
    width: 100%;
    max-width: 680px;
    padding: 28px;
    box-sizing: border-box;
    color: #FFFFFF;
    max-height: 90vh;
    overflow-y: auto;
  }

  .gn-prof-thumb-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 16px 0;
  }

  @media (max-width: 500px) {
    .gn-prof-thumb-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .gn-prof-thumb-item {
    border-radius: 14px;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.1);
    background: #14171F;
    cursor: pointer;
    position: relative;
    aspect-ratio: 16 / 10;
    transition: all 0.15s ease;
  }

  .gn-prof-thumb-item:hover,
  .gn-prof-thumb-item.selected {
    border-color: #be1c35;
    transform: scale(1.02);
  }

  .gn-prof-thumb-avatar {
    aspect-ratio: 1 / 1;
    border-radius: 50%;
  }
`;

export default function CandidateProfile({ user }) {
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'subscription' | 'stats'
  
  // Profile state with fallback to Google info or previous storage
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('gnosis_user_profile_v7');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return {
      fullName: user?.displayName || 'Tanishq Sood',
      email: user?.email || '098tanishq@gmail.com',
      avatarUrl: user?.photoURL || LOCAL_AVATARS[0].url,
      bannerUrl: LOCAL_BANNERS[0].url,
      username: 'tanishq_098',
      stream: 'Class 11 - PCM',
      targetExam: 'JEE Main & Advanced 2027',
      school: 'Government School, Delhi',
      rollNo: '23',
      dailyGoalHours: '4.5',
      motto: 'BEYOND THE ANSWER.',
      plan: 'SEVA Scholar (Free Tier)',
      planExpiry: 'Lifetime / SEVA FIRST 2026 Grant'
    };
  });

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync Google Account Details whenever logged in
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || 'Tanishq Sood',
        email: user.email || prev.email,
        avatarUrl: prev.avatarUrl || user.photoURL || LOCAL_AVATARS[0].url
      }));
    }
  }, [user]);

  // Upload local avatar from computer
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile(prev => ({ ...prev, avatarUrl: reader.result }));
      setIsAvatarModalOpen(false);
    };
    reader.readAsDataURL(file);
  };

  // Upload local banner from computer
  const handleBannerUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile(prev => ({ ...prev, bannerUrl: reader.result }));
      setIsBannerModalOpen(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSyncGooglePhoto = () => {
    if (user?.photoURL) {
      setProfile(prev => ({ ...prev, avatarUrl: user.photoURL }));
      setIsAvatarModalOpen(false);
    } else {
      alert("No Google Profile Photo found on this active session.");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('gnosis_user_profile_v7', JSON.stringify(profile));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const candidateInitials = (profile.fullName || 'User')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <>
      <style>{PROFILE_STYLES}</style>
      <div className="gn-prof-root">
        
        {/* ================= 1. BANNER & HEADER HERO ================= */}
        <div className="gn-prof-hero-card">
          <div className="gn-prof-banner-area">
            <img 
              src={profile.bannerUrl || LOCAL_BANNERS[0].url} 
              alt="Profile Banner" 
              className="gn-prof-banner-img"
              onError={(e) => {
                // Fallback to hero-bg or green if local banner path is missing
                e.currentTarget.src = `${baseUrl}hero-bg.png`;
              }} 
            />
            <div className="gn-prof-banner-overlay" />

            <div className="gn-prof-banner-ctrls">
              <button 
                type="button" 
                className="gn-prof-btn-glass"
                onClick={() => setIsBannerModalOpen(true)}
              >
                <Palette size={14} />
                <span>Banners Gallery</span>
              </button>
            </div>
          </div>

          <div className="gn-prof-hero-body">
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '22px', flexWrap: 'wrap' }}>
              <div className="gn-prof-avatar-wrap">
                {profile.avatarUrl ? (
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.fullName} 
                    className="gn-prof-avatar" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `${baseUrl}avatar/avatar1.png`;
                    }}
                  />
                ) : (
                  <div className="gn-prof-avatar-fallback">
                    {candidateInitials}
                  </div>
                )}
                <div 
                  className="gn-prof-avatar-cam-badge" 
                  onClick={() => setIsAvatarModalOpen(true)}
                  title="Change Avatar"
                >
                  <Camera size={16} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h2 style={{ fontSize: '26px', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
                    {profile.fullName}
                  </h2>
                  <span style={{ 
                    background: 'rgba(190, 28, 53, 0.15)', 
                    border: '1px solid rgba(190, 28, 53, 0.4)', 
                    color: '#FF6B7D', 
                    padding: '2px 8px', 
                    borderRadius: '9999px', 
                    fontSize: '11px', 
                    fontWeight: 800,
                    fontFamily: 'JetBrains Mono'
                  }}>
                    @{profile.username || 'aspirant'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#8E95A5', fontSize: '13px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Mail size={13} style={{ color: '#be1c35' }} />
                    {user?.email || profile.email}
                  </span>
                  <span>&bull;</span>
                  <span style={{ color: '#CBD5E1' }}>{profile.stream}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                className="gn-prof-btn-glass"
                onClick={() => setIsAvatarModalOpen(true)}
              >
                <Camera size={14} />
                <span>Avatars</span>
              </button>
              {user?.photoURL && (
                <button 
                  type="button" 
                  className="gn-prof-btn-glass"
                  onClick={handleSyncGooglePhoto}
                  style={{ borderColor: '#be1c35', color: '#FF6B7D' }}
                  title="Restore Google Account Photo"
                >
                  <RefreshCw size={13} />
                  <span>Google Photo</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= 2. SECTION TABS ================= */}
        <div className="gn-prof-tab-bar">
          <button 
            type="button" 
            className={`gn-prof-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={15} />
            <span>Identity &amp; Goals</span>
          </button>
          <button 
            type="button" 
            className={`gn-prof-tab-btn ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscription')}
          >
            <CreditCard size={15} />
            <span>Subscription &amp; Grants</span>
          </button>
          <button 
            type="button" 
            className={`gn-prof-tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <Trophy size={15} />
            <span>Testing Badges</span>
          </button>
        </div>

        {/* ================= 3. ACTIVE TAB VIEWS ================= */}
        
        {/* TAB 1: IDENTITY & PROFILE EDIT */}
        {activeTab === 'profile' && (
          <div className="gn-prof-panel">
            <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} style={{ color: '#be1c35' }} />
              Aspirant Identity Configuration
            </h3>
            <p style={{ fontSize: '13px', color: '#8E95A5', margin: '0 0 24px 0' }}>
              Calibrate your target examinations, institution details, and daily study velocity.
            </p>

            <form onSubmit={handleSave}>
              <div className="gn-prof-field-grid">
                <div>
                  <label className="gn-prof-label">Candidate Name</label>
                  <input 
                    type="text" 
                    className="gn-prof-input" 
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="gn-prof-label">Aspirant Handle</label>
                  <input 
                    type="text" 
                    className="gn-prof-input" 
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="gn-prof-label">Connected Google Account (Email)</label>
                <input 
                  type="text" 
                  disabled 
                  className="gn-prof-input" 
                  value={user?.email || profile.email}
                />
              </div>

              <div className="gn-prof-field-grid">
                <div>
                  <label className="gn-prof-label">Current Academic Stream</label>
                  <select 
                    className="gn-prof-select"
                    value={profile.stream}
                    onChange={(e) => setProfile({ ...profile, stream: e.target.value })}
                  >
                    <option value="Class 11 - PCM">Class 11 - PCM</option>
                    <option value="Class 11 - PCB">Class 11 - PCB</option>
                    <option value="Class 12 - PCM">Class 12 - PCM</option>
                    <option value="Class 12 - PCB">Class 12 - PCB</option>
                    <option value="JEE / NEET Dropper">JEE / NEET Dropper</option>
                  </select>
                </div>

                <div>
                  <label className="gn-prof-label">Target Examination</label>
                  <select 
                    className="gn-prof-select"
                    value={profile.targetExam}
                    onChange={(e) => setProfile({ ...profile, targetExam: e.target.value })}
                  >
                    <option value="JEE Main & Advanced 2027">JEE Main &amp; Advanced 2027</option>
                    <option value="NEET UG 2027">NEET UG 2027</option>
                    <option value="CBSE Class 11 Annuals">CBSE Class 11 Annuals</option>
                    <option value="CBSE Class 12 Boards">CBSE Class 12 Boards</option>
                  </select>
                </div>
              </div>

              <div className="gn-prof-field-grid">
                <div>
                  <label className="gn-prof-label">School / Institution</label>
                  <input 
                    type="text" 
                    className="gn-prof-input" 
                    value={profile.school}
                    onChange={(e) => setProfile({ ...profile, school: e.target.value })}
                  />
                </div>
                <div>
                  <label className="gn-prof-label">Section &amp; Roll Number</label>
                  <input 
                    type="text" 
                    className="gn-prof-input" 
                    value={profile.rollNo}
                    onChange={(e) => setProfile({ ...profile, rollNo: e.target.value })}
                  />
                </div>
              </div>

              <div className="gn-prof-field-grid">
                <div>
                  <label className="gn-prof-label">Daily Goal (Hours)</label>
                  <input 
                    type="number" 
                    step="0.5"
                    className="gn-prof-input" 
                    value={profile.dailyGoalHours}
                    onChange={(e) => setProfile({ ...profile, dailyGoalHours: e.target.value })}
                  />
                </div>
                <div>
                  <label className="gn-prof-label">Candidate Motto</label>
                  <input 
                    type="text" 
                    className="gn-prof-input" 
                    value={profile.motto}
                    onChange={(e) => setProfile({ ...profile, motto: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="gn-prof-save-btn">
                {savedSuccess ? (
                  <>
                    <Check size={16} /> Saved Changes!
                  </>
                ) : (
                  <>
                    <Save size={16} /> Save Identity Profile
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: SUBSCRIPTION & GRANTS */}
        {activeTab === 'subscription' && (
          <div className="gn-prof-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={18} style={{ color: '#be1c35' }} />
                  Candidate Subscription &amp; Grant Status
                </h3>
                <p style={{ fontSize: '13px', color: '#8E95A5', margin: 0 }}>
                  Gnosis is built for equal access under the SEVA FIRST RYIC 2026 Innovation Grant.
                </p>
              </div>

              <div style={{ 
                background: 'rgba(34, 197, 94, 0.12)', 
                border: '1px solid rgba(34, 197, 94, 0.4)', 
                padding: '6px 14px', 
                borderRadius: '9999px',
                color: '#4ADE80',
                fontSize: '12px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <CheckCircle2 size={14} />
                <span>SEVA SCHOLARSHIP ACTIVE</span>
              </div>
            </div>

            <div className="gn-sub-grid">
              {/* CURRENT ACTIVE PLAN */}
              <div className="gn-sub-card current">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#be1c35', fontWeight: 800, letterSpacing: '0.08em' }}>
                      CURRENT ACTIVE TIER
                    </span>
                    <span style={{ background: '#be1c35', color: '#FFF', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '6px' }}>
                      ACTIVE
                    </span>
                  </div>

                  <h4 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 6px 0' }}>SEVA Free Scholar</h4>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', marginBottom: '16px' }}>
                    ₹0 <span style={{ fontSize: '14px', color: '#8E95A5', fontWeight: 500 }}>/ perpetual access</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#CBD5E1', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={16} color="#be1c35" />
                      <span>Full NCERT Digital Physics &amp; Chemistry Shelf</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={16} color="#be1c35" />
                      <span>Standard NTA Latency &amp; Hesitation Telemetry</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={16} color="#be1c35" />
                      <span>Local Mistake Vault Sync &amp; Keep Notes</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={16} color="#be1c35" />
                      <span>Socratic Guidance Engine (Free Daily Quota)</span>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', fontSize: '12px', color: '#8E95A5' }}>
                  Sponsored by Government School Education Grant • Never expires.
                </div>
              </div>

              {/* GNOSIS PRO / INSTITUTIONAL TIER */}
              <div className="gn-sub-card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#8E95A5', fontWeight: 800, letterSpacing: '0.08em' }}>
                      ADVANCED DIAGNOSTICS
                    </span>
                    <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFF', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '6px' }}>
                      GRANT PASS
                    </span>
                  </div>

                  <h4 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 6px 0' }}>Gnosis Pro / SEVA Fellow</h4>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', marginBottom: '16px' }}>
                    ₹0 <span style={{ fontSize: '14px', color: '#8E95A5', fontWeight: 500 }}>/ waived for Govt students</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#8E95A5', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={16} color="#be1c35" />
                      <span>Unlimited Socratic AI Deep Thinking Cycles</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={16} color="#be1c35" />
                      <span>Millisecond Reaction Latency &amp; Hesitation Curve</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={16} color="#be1c35" />
                      <span>Automated Error Classification into PDFs</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={16} color="#be1c35" />
                      <span>Priority Support &amp; Offline Cache Mode</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => alert("Your Govt School Student profile already entitles you to full SEVA grant benefits at zero charge!")}
                  style={{
                    background: '#151820',
                    border: '1px solid rgba(190, 28, 53, 0.5)',
                    color: '#FF6B7D',
                    padding: '12px',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Gift size={15} />
                  <span>Verified via SEVA 2026 Grant</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TESTING BADGES & STATS */}
        {activeTab === 'stats' && (
          <div className="gn-prof-panel">
            <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={18} style={{ color: '#be1c35' }} />
              Aspirant Diagnostic Badges
            </h3>
            <p style={{ fontSize: '13px', color: '#8E95A5', margin: '0 0 24px 0' }}>
              Earned credentials from NTA mock completions, speed thresholds, and Socratic hint resolutions.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ background: '#12141A', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(190, 28, 53, 0.15)', color: '#be1c35', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <Flame size={20} />
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 4px 0' }}>Kinematics Sprint</h4>
                <p style={{ fontSize: '12px', color: '#8E95A5', margin: 0 }}>Resolved 3 questions in under 3m 45s without formula lookup.</p>
              </div>

              <div style={{ background: '#12141A', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <ShieldCheck size={20} />
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 4px 0' }}>Verified Candidate</h4>
                <p style={{ fontSize: '12px', color: '#8E95A5', margin: 0 }}>Google Identity verified for official test score logging.</p>
              </div>

              <div style={{ background: '#12141A', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <BookOpen size={20} />
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 4px 0' }}>Optics Scholar</h4>
                <p style={{ fontSize: '12px', color: '#8E95A5', margin: 0 }}>Saved YDSE Fringe Derivation notes to personal keep drawer.</p>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL: LOCAL AVATARS & UPLOAD ================= */}
        {isAvatarModalOpen && (
          <div className="gn-prof-modal-backdrop" onClick={() => setIsAvatarModalOpen(false)}>
            <div className="gn-prof-modal-box" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Choose Aspirant Avatar</h3>
                <button onClick={() => setIsAvatarModalOpen(false)} style={{ background: 'none', border: 'none', color: '#8E95A5', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <p style={{ fontSize: '13px', color: '#8E95A5', margin: '0 0 16px 0' }}>
                Select an avatar from your local <code>public/avatar/</code> folder, restore your official Google photo, or upload any file from your computer.
              </p>

              {/* Upload & Google Actions */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <button 
                  type="button" 
                  className="gn-prof-btn-glass"
                  onClick={() => avatarInputRef.current?.click()}
                  style={{ background: '#be1c35', borderColor: '#be1c35' }}
                >
                  <Upload size={14} />
                  <span>Upload Image from PC</span>
                </button>
                <input 
                  ref={avatarInputRef} 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarUpload} 
                  style={{ display: 'none' }} 
                />

                {user?.photoURL && (
                  <button 
                    type="button" 
                    className="gn-prof-btn-glass"
                    onClick={handleSyncGooglePhoto}
                  >
                    <RefreshCw size={14} />
                    <span>Sync Google Profile Photo</span>
                  </button>
                )}
              </div>

              <div className="gn-prof-label">Local Public Avatars (/public/avatar/)[cite: 17]</div>
              <div className="gn-prof-thumb-grid">
                {LOCAL_AVATARS.map((av) => (
                  <div 
                    key={av.id}
                    className={`gn-prof-thumb-item ${profile.avatarUrl === av.url ? 'selected' : ''}`}
                    onClick={() => {
                      setProfile({ ...profile, avatarUrl: av.url });
                      setIsAvatarModalOpen(false);
                    }}
                  >
                    <img 
                      src={av.url} 
                      alt={av.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      onError={(e) => {
                        e.currentTarget.src = av.fallback;
                      }}
                    />
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      right: 0, 
                      background: 'rgba(0,0,0,0.7)', 
                      padding: '4px 8px', 
                      fontSize: '10px', 
                      fontWeight: 700, 
                      color: '#FFFFFF' 
                    }}>
                      {av.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL: LOCAL BANNERS & UPLOAD ================= */}
        {isBannerModalOpen && (
          <div className="gn-prof-modal-backdrop" onClick={() => setIsBannerModalOpen(false)}>
            <div className="gn-prof-modal-box" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Choose Profile Banner</h3>
                <button onClick={() => setIsBannerModalOpen(false)} style={{ background: 'none', border: 'none', color: '#8E95A5', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <p style={{ fontSize: '13px', color: '#8E95A5', margin: '0 0 16px 0' }}>
                Pick from your local <code>public/banners/</code> images[cite: 17] or upload any custom header from your computer.
              </p>

              <div style={{ marginBottom: '20px' }}>
                <button 
                  type="button" 
                  className="gn-prof-btn-glass"
                  onClick={() => bannerInputRef.current?.click()}
                  style={{ background: '#be1c35', borderColor: '#be1c35' }}
                >
                  <Upload size={14} />
                  <span>Upload Custom Banner</span>
                </button>
                <input 
                  ref={bannerInputRef} 
                  type="file" 
                  accept="image/*" 
                  onChange={handleBannerUpload} 
                  style={{ display: 'none' }} 
                />
              </div>

              <div className="gn-prof-label">Local Public Banners (/public/banners/)[cite: 17]</div>
              <div className="gn-prof-thumb-grid">
                {LOCAL_BANNERS.map((b) => (
                  <div 
                    key={b.id}
                    className={`gn-prof-thumb-item ${profile.bannerUrl === b.url ? 'selected' : ''}`}
                    onClick={() => {
                      setProfile({ ...profile, bannerUrl: b.url });
                      setIsBannerModalOpen(false);
                    }}
                  >
                    <img 
                      src={b.url} 
                      alt={b.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      onError={(e) => {
                        e.currentTarget.src = b.fallback;
                      }}
                    />
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      right: 0, 
                      background: 'rgba(0,0,0,0.7)', 
                      padding: '4px 8px', 
                      fontSize: '10px', 
                      fontWeight: 700, 
                      color: '#FFFFFF' 
                    }}>
                      {b.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}