import React, { useState, useEffect } from 'react';

const LECTURE_SERIES = [
  {
    id: 'lec-1',
    subject: 'Physics',
    chapter: 'Ch 04: Laws of Motion',
    title: "Newton's Laws of Motion & Friction One-Shot",
    instructor: 'Class 11 Physics',
    duration: '1h 24m',
    embedId: 'glDU96h8A48',
    timestamps: [
      { time: '00:47', seconds: 47, label: 'What Causes Motion?' },
      { time: '14:20', seconds: 860, label: 'First Law of Motion & Inertia' },
      { time: '32:10', seconds: 1930, label: 'Second Law: Momentum & Force Equation' },
      { time: '52:15', seconds: 3135, label: 'Third Law & Free Body Diagrams' },
      { time: '1:08:40', seconds: 4120, label: 'Friction: Static vs Limiting Threshold' }
    ]
  },
  {
    id: 'lec-2',
    subject: 'Chemistry',
    chapter: 'Ch 08: Hydrocarbons',
    title: 'Organic Chemistry IUPAC & Functional Groups',
    instructor: 'Class 11 Chemistry',
    duration: '52m',
    embedId: 'TSG30btSrnA',
    timestamps: [
      { time: '01:10', seconds: 70, label: 'Classification of Functional Groups' },
      { time: '12:40', seconds: 760, label: 'Hydrocarbon Skeleton Analysis' },
      { time: '25:15', seconds: 1515, label: 'IUPAC Priority Rules' },
      { time: '41:30', seconds: 2490, label: 'Common JEE Misconceptions' }
    ]
  },
  {
    id: 'lec-3',
    subject: 'Mathematics',
    chapter: 'Ch 12: Calculus Fundamentals',
    title: 'Essence of Calculus: Derivatives & Limits',
    instructor: '3Blue1Brown',
    duration: '17m',
    embedId: 'WUvTyaaNkzM',
    timestamps: [
      { time: '00:00', seconds: 0, label: 'Intuition Behind Calculus' },
      { time: '03:15', seconds: 195, label: 'Geometry of Changing Areas' },
      { time: '08:40', seconds: 520, label: 'The Derivative Formula' },
      { time: '13:20', seconds: 800, label: 'Approximations and Limits' }
    ]
  }
];

export default function VideoTunnel({ isFullScreen, onToggleFullScreen }) {
  const [selectedLecture, setSelectedLecture] = useState(LECTURE_SERIES[0]);
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [customUrl, setCustomUrl] = useState('');
  const [lectureNotes, setLectureNotes] = useState('');
  const [pinnedTimestamps, setPinnedTimestamps] = useState([]);
  const [showBottomNotes, setShowBottomNotes] = useState(true);

  // Sync state with native browser fullscreen events
  useEffect(() => {
    const handleFsChange = () => {
      const isCurrentlyFs = Boolean(document.fullscreenElement);
      if (isCurrentlyFs !== isFullScreen && onToggleFullScreen) {
        onToggleFullScreen();
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, [isFullScreen, onToggleFullScreen]);

  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
    if (onToggleFullScreen) onToggleFullScreen();
  };

  const handleLoadCustomUrl = (e) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    let videoId = customUrl.trim();
    if (customUrl.includes('v=')) {
      videoId = customUrl.split('v=')[1]?.split('&')[0];
    } else if (customUrl.includes('youtu.be/')) {
      videoId = customUrl.split('youtu.be/')[1]?.split('?')[0];
    }

    if (videoId) {
      setSelectedLecture({
        id: `custom-${Date.now()}`,
        subject: 'Custom',
        chapter: 'Pasted Stream',
        title: 'Custom YouTube Lecture',
        duration: 'Live',
        embedId: videoId,
        timestamps: [
          { time: '00:00', seconds: 0, label: 'Start of Lecture' }
        ]
      });
      setActiveSeconds(0);
      setCustomUrl('');
    }
  };

  const handleTimestampJump = (seconds) => {
    setActiveSeconds(seconds);
  };

  const handlePinCurrentTime = (label, timeStr) => {
    const entry = {
      id: `ts-${Date.now()}`,
      time: timeStr,
      label
    };
    setPinnedTimestamps((prev) => [entry, ...prev]);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#0f0f0f',
      color: '#f1f1f1',
      borderRadius: isFullScreen ? '0px' : '20px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, sans-serif',
      boxSizing: 'border-box'
    }}>
      
      {/* ================= 1. HEADER CONTROL BAR ================= */}
      <div style={{
        padding: '12px 24px',
        backgroundColor: '#1f1f1f',
        borderBottom: '1px solid #2f2f2f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        flexShrink: 0
      }}>
        {/* Left: Active Chapter Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, backgroundColor: '#3ea6ff', color: '#0f0f0f', padding: '1px 6px', borderRadius: '4px' }}>
              {selectedLecture.subject}
            </span>
            <span style={{ fontSize: '11px', color: '#aaaaaa' }}>{selectedLecture.chapter}</span>
          </div>
          <h2 style={{ fontSize: '14px', fontWeight: 800, margin: '2px 0 0 0', color: '#f1f1f1' }}>
            {selectedLecture.title}
          </h2>
        </div>

        {/* Right: Controls & Fullscreen Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <form onSubmit={handleLoadCustomUrl} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Paste YouTube Link / ID..."
              style={{
                backgroundColor: '#121212',
                border: '1px solid #3f3f3f',
                borderRadius: '6px',
                padding: '5px 10px',
                color: '#f1f1f1',
                fontSize: '11px',
                outline: 'none',
                width: '170px'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#272727',
                border: '1px solid #3f3f3f',
                color: '#f1f1f1',
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Load
            </button>
          </form>

          <select
            value={selectedLecture.id}
            onChange={(e) => {
              const lec = LECTURE_SERIES.find((l) => l.id === e.target.value);
              if (lec) {
                setSelectedLecture(lec);
                setActiveSeconds(0);
              }
            }}
            style={{
              backgroundColor: '#272727',
              border: '1px solid #3f3f3f',
              color: '#f1f1f1',
              borderRadius: '6px',
              padding: '5px 8px',
              fontSize: '11px',
              fontWeight: 700,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {LECTURE_SERIES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.subject}: {l.chapter.split(':')[0]}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowBottomNotes((v) => !v)}
            style={{
              backgroundColor: showBottomNotes ? '#3ea6ff' : '#272727',
              border: '1px solid #3f3f3f',
              color: showBottomNotes ? '#0f0f0f' : '#f1f1f1',
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {showBottomNotes ? 'Hide Notes' : 'Show Notes'}
          </button>

          {/* Native Fullscreen Trigger */}
          <button
            onClick={handleFullScreenToggle}
            style={{
              backgroundColor: isFullScreen ? '#3ea6ff' : '#272727',
              border: '1px solid #3f3f3f',
              color: isFullScreen ? '#0f0f0f' : '#f1f1f1',
              padding: '5px 14px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          </button>
        </div>
      </div>

      {/* ================= 2. UPPER VIDEO PLAYER ================= */}
      <div style={{
        flex: showBottomNotes ? '1 1 60%' : '1 1 100%',
        backgroundColor: '#000000',
        position: 'relative',
        minHeight: '280px',
        overflow: 'hidden'
      }}>
        <iframe
          key={`${selectedLecture.embedId}-${activeSeconds}`}
          src={`https://www.youtube.com/embed/${selectedLecture.embedId}?autoplay=1&start=${activeSeconds}&rel=0&modestbranding=1&playsinline=1`}
          title={selectedLecture.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block'
          }}
        />
      </div>

      {/* ================= 3. LOWER NOTES & TIMESTAMPS CONSOLE ================= */}
      {showBottomNotes && (
        <div style={{
          height: '240px',
          backgroundColor: '#1f1f1f',
          borderTop: '2px solid #2f2f2f',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '16px',
          padding: '14px 20px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          flexShrink: 0
        }}>
          
          {/* Bottom Left: Chapters & Pinned Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#aaaaaa', textTransform: 'uppercase' }}>
                Interactive Timestamps (Click to Jump)
              </span>
              <span style={{ fontSize: '10.5px', color: '#aaaaaa' }}>{selectedLecture.duration}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {selectedLecture.timestamps.map((ts, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#272727',
                    border: '1px solid #333333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}
                >
                  <div
                    onClick={() => handleTimestampJump(ts.seconds)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}
                  >
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#3ea6ff', fontWeight: 800 }}>
                      {ts.time}
                    </span>
                    <span style={{ fontSize: '11px', color: '#f1f1f1', fontWeight: 500 }}>
                      {ts.label}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePinCurrentTime(ts.label, ts.time)}
                    style={{
                      background: 'none',
                      border: '1px solid #3f3f3f',
                      borderRadius: '4px',
                      color: '#aaaaaa',
                      fontSize: '9.5px',
                      padding: '2px 6px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    + Pin
                  </button>
                </div>
              ))}
            </div>

            {pinnedTimestamps.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                {pinnedTimestamps.map((item) => (
                  <span
                    key={item.id}
                    style={{
                      fontSize: '10px',
                      backgroundColor: '#2b2313',
                      border: '1px solid #5a431c',
                      color: '#fef08a',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    [{item.time}] {item.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Right: In-Lecture Formula Scratchpad */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#aaaaaa', textTransform: 'uppercase' }}>
                In-Lecture Formula Scratchpad
              </span>
              <span style={{ fontSize: '10px', color: '#666666' }}>Auto-saves to Keep Notes</span>
            </div>

            <textarea
              value={lectureNotes}
              onChange={(e) => setLectureNotes(e.target.value)}
              placeholder="Write derivations, formulas, or key insights while watching..."
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: '#0f0f0f',
                border: '1px solid #3f3f3f',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '12px',
                color: '#f1f1f1',
                outline: 'none',
                resize: 'none',
                fontFamily: '"Roboto", sans-serif',
                lineHeight: 1.5,
                boxSizing: 'border-box'
              }}
            />

            <button
              onClick={() => {
                if (!lectureNotes.trim()) return;
                try {
                  const existing = JSON.parse(localStorage.getItem('gnosis_keep_notes') || '[]');
                  const newNote = {
                    id: `note-${Date.now()}`,
                    subject: selectedLecture.subject,
                    chapterNum: selectedLecture.chapter.split(':')[0] || 'Ch --',
                    chapterName: selectedLecture.title,
                    title: `Lecture Notes: ${selectedLecture.chapter}`,
                    content: lectureNotes.trim(),
                    color: '#FFFFFF',
                    font: 'Roboto',
                    isPinned: false,
                    updatedAt: 'Just now'
                  };
                  localStorage.setItem('gnosis_keep_notes', JSON.stringify([newNote, ...existing]));
                  alert('Saved directly into your Google Keep Notes board!');
                  setLectureNotes('');
                } catch {
                  alert('Saved to local session.');
                }
              }}
              style={{
                marginTop: '6px',
                width: '100%',
                padding: '7px',
                borderRadius: '6px',
                backgroundColor: '#3ea6ff',
                color: '#0f0f0f',
                border: 'none',
                fontSize: '11.5px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Save to Keep Notes
            </button>
          </div>

        </div>
      )}

    </div>
  );
}