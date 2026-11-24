import React, { useState, useEffect } from 'react';
import { 
  User, Edit3, CreditCard, Target, Shield, ArrowLeft, 
  MapPin, Check, Save, Sparkles, Flame, BookOpen, Clock, 
  Award, CheckCircle2, AlertCircle, Bookmark
} from 'lucide-react';
import { auth, db } from '../../styles/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const BASE = import.meta.env.BASE_URL || '/';
const getAsset = (path) => `${BASE}${path.startsWith('/') ? path.slice(1) : path}`;

const AVATAR_COLLECTION = [
  getAsset('avatar/avatar1.jpg'),
  getAsset('avatar/avatar2.jpg'),
  getAsset('avatar/avatar3.jpg'),
  getAsset('avatar/avatar4.jpg'),
  getAsset('avatar/avatar5.jpg'),
  getAsset('avatar/avatar6.jpg'),
  getAsset('avatar/avatar7.jpg'),
  getAsset('avatar/avatar8.jpg'),
  getAsset('avatar/avatar9.jpg'),
  getAsset('avatar/avatar10.jpg'),
  getAsset('avatar/avatar11.jpg')
];

const BANNER_COLLECTION = [
  { name: 'Monochrome Manga', url: getAsset('banners/ban1.jpg') },
  { name: 'Shinchan Splash', url: getAsset('banners/ban2.gif') },
  { name: 'Godzilla Comic', url: getAsset('banners/ban3.jpg') },
  { name: 'Speed Drift', url: getAsset('banners/ban4.jpg') },
  { name: 'Cyber Neon', url: getAsset('banners/ban5.jpg') },
  { name: 'Tokyo Dusk', url: getAsset('banners/ban6.jpg') },
  { name: 'Vapor Wave', url: getAsset('banners/ban7.jpg') },
  { name: 'Retro Grid', url: getAsset('banners/ban8.jpg') },
  { name: 'Dark Nebula', url: getAsset('banners/ban9.jpg') }
];

const getInitialUserData = (user) => {
  const emailPrefix = user?.email ? user.email.split('@')[0] : '';
  const formattedName = user?.displayName || (emailPrefix ? emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1) : 'Candidate');
  const formattedHandle = emailPrefix ? emailPrefix.toLowerCase() : 'candidate';
  const avatar = user?.photoURL || AVATAR_COLLECTION[0];

  return {
    name: formattedName,
    handle: formattedHandle,
    location: '',
    academicClass: 'Class 11 PCM',
    streamTrack: 'PCM Track',
    targetExam: 'JEE Advanced 2027',
    subTarget: 'CBSE Class 11',
    focusTopic: '',
    rating: '4.8',
    durationDays: 180,
    percentile: '99.4 %/oile',
    pyqsCommitted: 540,
    avatar: avatar,
    banner: BANNER_COLLECTION[0].url,
    bio: '',
    stats: {
      testsCompleted: 18,
      questionsPracticed: 540,
      accuracyRate: '78%',
      studyStreakDays: 14
    }
  };
};

export default function Profile({ onBackToDashboard }) {
  const activeUser = auth.currentUser;
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState('');
  const [resendingEmail, setResendingEmail] = useState(false);
  const [emailNotice, setEmailNotice] = useState('');

  const storageKey = activeUser?.uid 
    ? `gnosis_profile_${activeUser.uid}` 
    : 'gnosis_profile_guest';

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return { ...getInitialUserData(activeUser), ...JSON.parse(saved) };
      return getInitialUserData(activeUser);
    } catch {
      return getInitialUserData(activeUser);
    }
  });

  const [formData, setFormData] = useState({ ...profile });

  useEffect(() => {
    if (!activeUser?.uid) return;

    const pullPassport = async () => {
      try {
        const docRef = doc(db, 'users', activeUser.uid);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists() && snapshot.data().profile) {
          const cloudData = snapshot.data().profile;
          const merged = { ...getInitialUserData(activeUser), ...cloudData };
          setProfile(merged);
          setFormData(merged);
          localStorage.setItem(`gnosis_profile_${activeUser.uid}`, JSON.stringify(merged));
          localStorage.setItem('gnosis_active_avatar', merged.avatar);
          window.dispatchEvent(new Event('gnosis_profile_updated'));
        } else {
          const fresh = getInitialUserData(activeUser);
          setProfile(fresh);
          setFormData(fresh);
          localStorage.setItem(`gnosis_profile_${activeUser.uid}`, JSON.stringify(fresh));
          localStorage.setItem('gnosis_active_avatar', fresh.avatar);
          await setDoc(docRef, { profile: fresh }, { merge: true });
        }
      } catch (err) {
        console.warn('Firestore sync fallback:', err);
      }
    };

    pullPassport();
  }, [activeUser?.uid]);

  const persistProfile = async (updates) => {
    const safeUpdated = {
      ...profile,
      ...updates,
      stats: {
        ...(profile.stats || {}),
        ...(updates.stats || {})
      }
    };

    setProfile(safeUpdated);
    setFormData(safeUpdated);

    try {
      localStorage.setItem(storageKey, JSON.stringify(safeUpdated));
      localStorage.setItem('gnosis_user_profile_v7', JSON.stringify(safeUpdated));
      if (safeUpdated.avatar) {
        localStorage.setItem('gnosis_active_avatar', safeUpdated.avatar);
      }
      // Broadcast update so Dashboard navbar and header avatar immediately sync
      window.dispatchEvent(new Event('gnosis_profile_updated'));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    if (activeUser?.uid) {
      setSaveStatus('syncing');
      try {
        const docRef = doc(db, 'users', activeUser.uid);
        await setDoc(docRef, { profile: safeUpdated }, { merge: true });
        setSaveStatus('synced');
        setTimeout(() => setSaveStatus(''), 2500);
      } catch (err) {
        console.error('Firestore save failed:', err);
        setSaveStatus('error');
      }
    }
  };

  const handleFormSave = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    persistProfile(formData);
    setActiveTab('profile');
  };

  const selectAvatar = (url) => {
    persistProfile({ avatar: url });
  };

  const selectBanner = (url) => {
    persistProfile({ banner: url });
  };

  const handleResendVerification = async () => {
    if (!activeUser || activeUser.emailVerified) return;
    setResendingEmail(true);
    try {
      const { sendEmailVerification } = await import('../../styles/lib/firebase');
      await sendEmailVerification(activeUser, {
        url: window.location.origin + window.location.pathname + '#dashboard',
        handleCodeInApp: false
      });
      setEmailNotice('Verification link sent! Check your inbox.');
    } catch (e) {
      setEmailNotice('Failed: ' + e.message);
    }
    setResendingEmail(false);
    setTimeout(() => setEmailNotice(''), 4000);
  };

  const heatmapSquares = Array.from({ length: 160 }, (_, i) => {
    const intensity = (i * 7 + 13) % 5;
    if (intensity === 0) return '#161b22';
    if (intensity === 1) return '#0e4429';
    if (intensity === 2) return '#006d32';
    if (intensity === 3) return '#26a641';
    return '#39d353';
  });

  return (
    <div className="gnosis-candidate-passport-page">
      <style>{`
        .gnosis-candidate-passport-page {
          width: 100%;
          min-height: 100vh;
          background: #fbfbf9; /* Warm cream background */
          padding: 24px 20px 60px 20px;
          box-sizing: border-box;
          color: #0f172a;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .gnosis-candidate-passport-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* Top Bar */
        .cp-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }
        .cp-btn-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #000000;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .cp-btn-back:hover {
          opacity: 0.85;
        }

        .cp-tab-group {
          display: flex;
          align-items: center;
          background: #ffffff;
          padding: 4px;
          border-radius: 24px;
          gap: 2px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.06);
          overflow-x: auto;
        }
        .cp-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          border: none;
          background: transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .cp-tab-btn.active {
          background: #000000;
          color: #ffffff;
        }

        /* Verification Alert */
        .cp-verify-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 14px;
          padding: 12px 18px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 12px;
          color: #991b1b;
        }
        .cp-verify-btn {
          background: #dc2626;
          color: #fff;
          border: none;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        /* Grid */
        .cp-dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 390px;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 1040px) {
          .cp-dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        /* White Profile Hero Card */
        .cp-white-card {
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          color: #0f172a;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.04);
          margin-bottom: 24px;
        }
        .cp-hero-banner-wrap {
          height: 220px;
          width: 100%;
          position: relative;
          background: #e2e8f0;
          overflow: hidden;
        }
        .cp-hero-banner-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .cp-bookmark-badge {
          position: absolute;
          top: 16px;
          right: 18px;
          width: 32px;
          height: 32px;
          background: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }

        .cp-hero-card-body {
          padding: 0 32px 32px 32px;
          position: relative;
        }
        .cp-avatar-floater {
          width: 105px;
          height: 105px;
          border-radius: 50%;
          border: 4px solid #ffffff;
          background: #000000;
          overflow: hidden;
          margin-top: -52px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cp-avatar-floater img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cp-hero-details-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          margin-top: 16px;
          flex-wrap: wrap;
        }
        .cp-candidate-title {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #0f172a;
          margin: 0 0 4px 0;
        }
        .cp-candidate-meta {
          font-size: 13px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .cp-candidate-class {
          font-size: 12px;
          color: #64748b;
          margin-top: 4px;
        }

        .cp-target-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: right;
        }
        @media (max-width: 640px) {
          .cp-target-box {
            text-align: left;
          }
        }
        .cp-track-pill-container {
          display: flex;
          justify-content: flex-end;
        }
        @media (max-width: 640px) {
          .cp-track-pill-container {
            justify-content: flex-start;
          }
        }
        .cp-pill-track {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #334155;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .cp-target-label {
          font-size: 10px;
          font-weight: 800;
          color: #94a3b8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .cp-target-pill-group {
          display: flex;
          align-items: center;
          gap: 6px;
          justify-content: flex-end;
        }
        @media (max-width: 640px) {
          .cp-target-pill-group {
            justify-content: flex-start;
          }
        }
        .cp-target-pill-green {
          font-size: 11px;
          font-weight: 700;
          background: #ecfdf5;
          color: #059669;
          padding: 3px 10px;
          border-radius: 8px;
        }
        .cp-target-pill-grey {
          font-size: 11px;
          font-weight: 600;
          background: #f1f5f9;
          color: #475569;
          padding: 3px 10px;
          border-radius: 8px;
        }
        .cp-focus-val {
          font-size: 11px;
          font-weight: 600;
          background: #f8fafc;
          padding: 2px 8px;
          border-radius: 6px;
          color: #475569;
          display: inline-block;
        }

        .cp-hero-bottom-bar {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-top: 1px solid #f1f5f9;
          margin-top: 24px;
          padding-top: 20px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .cp-stat-row {
          display: flex;
          gap: 32px;
        }
        .cp-num-stat {
          display: flex;
          flex-direction: column;
        }
        .cp-num-stat-val {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .cp-num-stat-label {
          font-size: 10px;
          font-weight: 800;
          color: #94a3b8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .cp-btn-edit-action {
          background: #111418;
          color: #ffffff;
          border: none;
          padding: 10px 24px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .cp-btn-edit-action:hover {
          opacity: 0.9;
        }

        /* Question Solving Heatmap Card */
        .cp-heatmap-card {
          background: #080c14;
          border-radius: 20px;
          padding: 20px 24px;
          color: #ffffff;
        }
        .cp-heatmap-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .cp-heatmap-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cp-heatmap-count {
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
        }
        .cp-heatmap-grid {
          display: grid;
          grid-template-columns: repeat(32, 1fr);
          grid-template-rows: repeat(5, 12px);
          gap: 4px;
        }
        .cp-heat-cell {
          border-radius: 2px;
          width: 100%;
          height: 100%;
        }

        /* Sidebar Cards */
        .cp-sidebar-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 20px;
          color: #0f172a;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.04);
          margin-bottom: 20px;
        }
        .cp-sidebar-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .cp-sidebar-title-group {
          display: flex;
          flex-direction: column;
        }
        .cp-sidebar-subtag {
          font-size: 9px;
          font-weight: 800;
          color: #059669;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .cp-sidebar-title {
          font-size: 12px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0;
        }
        .cp-sidebar-viewall {
          font-size: 10px;
          font-weight: 800;
          color: #334155;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .cp-sidebar-subcaption {
          font-size: 10px;
          color: #94a3b8;
          margin: 10px 0 0 0;
        }

        .cp-avatar-thumbs {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .cp-avatar-thumb-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 2px solid transparent;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
          background: #f1f5f9;
        }
        .cp-avatar-thumb-btn.active {
          border-color: #dc2626;
          box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
        }
        .cp-avatar-thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cp-banner-thumbs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .cp-banner-thumb-btn {
          height: 64px;
          border-radius: 10px;
          border: 2px solid transparent;
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          background: #0f172a;
          position: relative;
        }
        .cp-banner-thumb-btn.active {
          border-color: #dc2626;
        }
        .cp-banner-thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .cp-banner-thumb-label {
          position: absolute;
          bottom: 4px;
          left: 6px;
          font-size: 9px;
          font-weight: 800;
          color: #fff;
          text-shadow: 0 1px 3px rgba(0,0,0,0.9);
        }

        .cp-telemetry-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 16px 20px;
          color: #0f172a;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          border: 1px solid rgba(0, 0, 0, 0.04);
        }
        .cp-telemetry-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .cp-telemetry-title {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0f172a;
        }
        .cp-telemetry-badge {
          font-size: 9px;
          font-weight: 800;
          color: #047857;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .cp-telemetry-desc {
          font-size: 11px;
          color: #64748b;
          margin: 0;
        }

        .cp-tab-content-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 32px;
          color: #0f172a;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          border: 1px solid rgba(0, 0, 0, 0.04);
        }
        .cp-edit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media(max-width: 640px) {
          .cp-edit-grid {
            grid-template-columns: 1fr;
          }
        }
        .cp-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cp-form-group.full {
          grid-column: 1 / -1;
        }
        .cp-form-group label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #64748b;
        }
        .cp-form-group input, .cp-form-group textarea {
          padding: 10px 14px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 13px;
          color: #0f172a;
          outline: none;
          background: #f8fafc;
        }
        .cp-form-group input:focus, .cp-form-group textarea:focus {
          border-color: #0f172a;
          background: #fff;
        }
      `}</style>

      <div className="gnosis-candidate-passport-container">
        {/* Top Header & Tabs Bar */}
        <div className="cp-top-bar">
          <button 
            type="button" 
            onClick={onBackToDashboard || (() => window.history.back())} 
            className="cp-btn-back"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>

          <div className="cp-tab-group">
            <button 
              type="button" 
              onClick={() => setActiveTab('profile')} 
              className={`cp-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            >
              <User size={13} /> 1. Profile
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('edit')} 
              className={`cp-tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
            >
              <Edit3 size={13} /> 2. Edit Details
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('subscription')} 
              className={`cp-tab-btn ${activeTab === 'subscription' ? 'active' : ''}`}
            >
              <CreditCard size={13} /> 3. Subscription & AI
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('target')} 
              className={`cp-tab-btn ${activeTab === 'target' ? 'active' : ''}`}
            >
              <Target size={13} /> 4. Academic Target
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('security')} 
              className={`cp-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            >
              <Shield size={13} /> 5. Security & Data
            </button>
          </div>
        </div>

        {/* Verification Alert Banner */}
        {activeUser && !activeUser.emailVerified && (
          <div className="cp-verify-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} />
              <span>
                Your email address ({activeUser.email}) is not verified yet. Check your inbox.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {emailNotice && <span style={{ color: '#047857' }}>{emailNotice}</span>}
              <button 
                type="button" 
                onClick={handleResendVerification} 
                disabled={resendingEmail}
                className="cp-verify-btn"
              >
                {resendingEmail ? 'Sending...' : 'Resend Link'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: Main Profile View */}
        {activeTab === 'profile' && (
          <div className="cp-dashboard-grid">
            <div>
              <div className="cp-white-card">
                <div className="cp-hero-banner-wrap">
                  <img src={profile.banner} alt="Candidate Banner" />
                  <div className="cp-bookmark-badge">
                    <Bookmark size={14} color="#000" />
                  </div>
                </div>

                <div className="cp-hero-card-body">
                  <div className="cp-avatar-floater">
                    <img src={profile.avatar} alt={profile.name} />
                  </div>

                  <div className="cp-hero-details-row">
                    <div>
                      <h1 className="cp-candidate-title">{profile.name}</h1>
                      <div className="cp-candidate-meta">
                        <span>📍 {profile.location || 'Location unset'}</span>
                        <span>•</span>
                        <span>@{profile.handle}</span>
                      </div>
                      <div className="cp-candidate-class">{profile.academicClass}</div>
                    </div>

                    <div className="cp-target-box">
                      <div className="cp-track-pill-container">
                        <span className="cp-pill-track">
                          <span>⚛️ 🧪 🧮</span> {profile.streamTrack}
                        </span>
                      </div>
                      <div>
                        <div className="cp-target-label">Target Exam</div>
                        <div className="cp-target-pill-group">
                          <span className="cp-target-pill-green">{profile.targetExam}</span>
                          {profile.subTarget && (
                            <span className="cp-target-pill-grey">{profile.subTarget}</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="cp-target-label">Focus Topic</div>
                        <div className="cp-focus-val">{profile.focusTopic || 'General Revision'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="cp-hero-bottom-bar">
                    <div className="cp-stat-row">
                      <div className="cp-num-stat">
                        <span className="cp-num-stat-val">★ {profile.rating || '4.8'}</span>
                        <span className="cp-num-stat-label">Rating</span>
                      </div>
                      <div className="cp-num-stat">
                        <span className="cp-num-stat-val">{profile.durationDays || 180} Days</span>
                        <span className="cp-num-stat-label">Duration</span>
                      </div>
                      <div className="cp-num-stat">
                        <span className="cp-num-stat-val">{profile.percentile || '99.4 %/oile'}</span>
                        <span className="cp-num-stat-label">Percentile</span>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => setActiveTab('edit')} 
                      className="cp-btn-edit-action"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Question Solving Repository Heatmap */}
              <div className="cp-heatmap-card">
                <div className="cp-heatmap-header">
                  <div className="cp-heatmap-title">
                    <span style={{ color: '#26a641' }}>✦</span> Question Solving Repository ({profile.durationDays || 180} Days)
                  </div>
                  <div className="cp-heatmap-count">{profile.pyqsCommitted || 540} PYQs Commits</div>
                </div>

                <div className="cp-heatmap-grid">
                  {heatmapSquares.map((color, idx) => (
                    <div key={idx} className="cp-heat-cell" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Avatar Collection + Banner Collection + Cloud Status */}
            <div>
              <div className="cp-sidebar-card">
                <div className="cp-sidebar-head">
                  <div className="cp-sidebar-title-group">
                    <span className="cp-sidebar-subtag">Public/Avatar Collection</span>
                    <h3 className="cp-sidebar-title">Avatar Collection</h3>
                  </div>
                  <span className="cp-sidebar-viewall">View All (11) &gt;</span>
                </div>

                <div className="cp-avatar-thumbs">
                  {AVATAR_COLLECTION.map((url, i) => (
                    <button 
                      key={i} 
                      type="button" 
                      onClick={() => selectAvatar(url)}
                      className={`cp-avatar-thumb-btn ${profile.avatar === url ? 'active' : ''}`}
                    >
                      <img src={url} alt={`Avatar ${i + 1}`} />
                    </button>
                  ))}
                </div>
                <p className="cp-sidebar-subcaption">Instant auto-save: click any avatar icon to apply immediately.</p>
              </div>

              <div className="cp-sidebar-card">
                <div className="cp-sidebar-head">
                  <div className="cp-sidebar-title-group">
                    <span className="cp-sidebar-subtag">Public/Banners Collection</span>
                    <h3 className="cp-sidebar-title">Banner Collection</h3>
                  </div>
                  <span className="cp-sidebar-viewall">View All (9) &gt;</span>
                </div>

                <div className="cp-banner-thumbs">
                  {BANNER_COLLECTION.map((ban, i) => (
                    <button 
                      key={i} 
                      type="button" 
                      onClick={() => selectBanner(ban.url)}
                      className={`cp-banner-thumb-btn ${profile.banner === ban.url ? 'active' : ''}`}
                    >
                      <img src={ban.url} alt={ban.name} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="cp-telemetry-card">
                <div className="cp-telemetry-head">
                  <span className="cp-telemetry-title">Cloud Telemetry</span>
                  <span className="cp-telemetry-badge">
                    {saveStatus === 'synced' ? '✓ Synced to Cloud' : saveStatus === 'syncing' ? 'Syncing...' : 'Firebase Auth'}
                  </span>
                </div>
                <p className="cp-telemetry-desc">
                  Profile modifications are saved automatically to local memory and your candidate passport.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Edit Details View */}
        {activeTab === 'edit' && (
          <div className="cp-tab-content-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 4px 0' }}>Edit Candidate Details</h2>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Update your handle, target credentials, and active preparation topic.</p>
              </div>

              <button 
                type="button" 
                onClick={handleFormSave} 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#000000',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 22px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                <Save size={15} /> Save Changes
              </button>
            </div>

            <form onSubmit={handleFormSave} className="cp-edit-grid">
              <div className="cp-form-group">
                <label>Candidate Name</label>
                <input 
                  type="text" 
                  value={formData.name || ''} 
                  placeholder="Enter candidate name"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                />
              </div>

              <div className="cp-form-group">
                <label>Candidate Handle</label>
                <input 
                  type="text" 
                  value={formData.handle || ''} 
                  placeholder="handle"
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value.replace('@', '') })} 
                />
              </div>

              <div className="cp-form-group">
                <label>Target Examination</label>
                <input 
                  type="text" 
                  value={formData.targetExam || ''} 
                  placeholder="e.g. JEE Advanced 2027"
                  onChange={(e) => setFormData({ ...formData, targetExam: e.target.value })} 
                />
              </div>

              <div className="cp-form-group">
                <label>Secondary Target</label>
                <input 
                  type="text" 
                  value={formData.subTarget || ''} 
                  placeholder="e.g. CBSE Class 11"
                  onChange={(e) => setFormData({ ...formData, subTarget: e.target.value })} 
                />
              </div>

              <div className="cp-form-group">
                <label>Focus Topic</label>
                <input 
                  type="text" 
                  value={formData.focusTopic || ''} 
                  placeholder="e.g. Physics - Optics"
                  onChange={(e) => setFormData({ ...formData, focusTopic: e.target.value })} 
                />
              </div>

              <div className="cp-form-group">
                <label>Academic Class / Stream</label>
                <input 
                  type="text" 
                  value={formData.academicClass || ''} 
                  placeholder="e.g. Class 11 PCM"
                  onChange={(e) => setFormData({ ...formData, academicClass: e.target.value })} 
                />
              </div>

              <div className="cp-form-group full">
                <label>Location</label>
                <input 
                  type="text" 
                  value={formData.location || ''} 
                  placeholder="e.g. Delhi, India"
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                />
              </div>

              <div className="cp-form-group full">
                <label>Candidate Objective & Motto</label>
                <textarea 
                  rows={3} 
                  value={formData.bio || ''} 
                  placeholder="Write your study goals or test pacing strategy..."
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })} 
                />
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: Subscription & AI */}
        {activeTab === 'subscription' && (
          <div className="cp-tab-content-card">
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 8px 0' }}>Subscription & Socratic AI Engine</h2>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Active tier and telemetry parameters.</p>
            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#047857' }}>ASPIRANT PASS • ACTIVE</div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>Unlimited step-by-step hints, custom mock generations, and telemetry tracking.</div>
            </div>
          </div>
        )}

        {/* TAB 4: Academic Target */}
        {activeTab === 'target' && (
          <div className="cp-tab-content-card">
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 8px 0' }}>Academic Target & Syllabus Matrix</h2>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Tracking weightage and revision pacing across Physics, Chemistry, and Math.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#dc2626' }}>PHYSICS</div>
                <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}>Optics & Modern</div>
              </div>
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#2563eb' }}>CHEMISTRY</div>
                <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}>Organic Mechanisms</div>
              </div>
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#059669' }}>MATHEMATICS</div>
                <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}>Calculus & Vectors</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Security & Data (without database path) */}
        {activeTab === 'security' && (
          <div className="cp-tab-content-card">
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 8px 0' }}>Security & Telemetry Credentials</h2>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Manage your authenticated session and candidate credentials.</p>
            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0', fontSize: 13 }}>
              <div><strong>UID:</strong> {activeUser?.uid || 'Not signed in'}</div>
              <div style={{ marginTop: 6 }}><strong>Email:</strong> {activeUser?.email || 'N/A'}</div>
              <div style={{ marginTop: 6 }}>
                <strong>Email Verified:</strong> {activeUser?.emailVerified ? '✓ Verified' : '✗ Unverified'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}