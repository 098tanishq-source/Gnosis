import React, { useState } from 'react';

const MISSION_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  .gn-mission-root {
    max-width: 1280px;
    margin: 48px auto 96px auto;
    padding: 0 24px;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }

  .gn-mission-hull {
    background: #090A0D;
    border: 1px solid rgba(190, 28, 53, 0.25);
    border-radius: 32px;
    padding: 56px 48px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7);
    box-sizing: border-box;
  }

  .gn-mission-hull::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle at 80% 20%, rgba(190, 28, 53, 0.16) 0%, rgba(9, 10, 13, 0) 70%);
    pointer-events: none;
  }

  .gn-mission-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(190, 28, 53, 0.08);
    border: 1px solid rgba(190, 28, 53, 0.45);
    border-radius: 9999px;
    padding: 6px 16px;
    margin-bottom: 32px;
  }

  .gn-mission-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #be1c35;
    box-shadow: 0 0 10px #be1c35;
  }

  .gn-mission-badge-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #be1c35;
    text-transform: uppercase;
  }

  .gn-mission-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: center;
    margin-bottom: 56px;
    position: relative;
    z-index: 1;
  }

  @media (max-width: 960px) {
    .gn-mission-layout {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .gn-mission-hull {
      padding: 40px 24px;
    }
  }

  .gn-mission-hero-title {
    font-size: clamp(34px, 4.8vw, 54px);
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -0.03em;
    color: #FFFFFF;
    margin-bottom: 24px;
  }

  .gn-mission-hero-title span {
    color: #be1c35;
  }

  .gn-mission-hero-p {
    font-size: 16px;
    line-height: 1.65;
    color: #8E95A5;
    margin-bottom: 36px;
    max-width: 520px;
  }

  .gn-mission-stats-strip {
    display: flex;
    gap: 28px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .gn-mission-stat-item h4 {
    font-size: 26px;
    font-weight: 800;
    color: #FFFFFF;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .gn-mission-stat-item span {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #be1c35;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .gn-mission-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .gn-mission-item {
    background: #111318;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 20px;
    padding: 24px 28px;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
  }

  .gn-mission-item:hover,
  .gn-mission-item.active {
    background: #151820;
    border-color: rgba(190, 28, 53, 0.55);
    transform: translateX(6px);
  }

  .gn-mission-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 20px;
    bottom: 20px;
    width: 3px;
    background: #be1c35;
    border-radius: 0 4px 4px 0;
    box-shadow: 0 0 12px #be1c35;
  }

  .gn-mission-item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .gn-mission-item-top span {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: #be1c35;
    letter-spacing: 0.08em;
  }

  .gn-mission-item h3 {
    font-size: 19px;
    font-weight: 800;
    color: #FFFFFF;
    margin: 0 0 8px 0;
  }

  .gn-mission-item p {
    font-size: 13.5px;
    line-height: 1.6;
    color: #8E95A5;
    margin: 0;
  }

  .gn-mission-cta-shelf {
    background: #111318;
    border: 1px solid rgba(190, 28, 53, 0.35);
    border-radius: 22px;
    padding: 32px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  .gn-mission-cta-title {
    font-size: 22px;
    font-weight: 800;
    color: #FFFFFF;
    margin: 0 0 6px 0;
  }

  .gn-mission-cta-sub {
    font-size: 14px;
    color: #8E95A5;
    margin: 0;
  }

  .gn-mission-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #e01432;
    color: #FFFFFF;
    border: none;
    padding: 14px 30px;
    border-radius: 12px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(190, 28, 53, 0.35);
    transition: transform 0.15s, background 0.15s;
  }

  .gn-mission-cta-btn:hover {
    background: #ba0e28;
    transform: translateY(-2px);
  }
`;

const DIRECTIVES = [
  {
    idx: '01',
    label: 'EQUITY IN ACCESS',
    title: 'Zero-Cost Infrastructure',
    body: 'Complete digital NCERT text chapters, PYQ banks, and official timing tools available for any aspirant without fee barriers.'
  },
  {
    idx: '02',
    label: 'COGNITIVE RESILIENCE',
    title: 'Hesitation & Anomaly Mapping',
    body: 'Measuring reaction delays and multiple toggles per question to surface panic traps before they cost real exam ranks.'
  },
  {
    idx: '03',
    label: 'ACTIVE RETENTION',
    title: 'Socratic Guiding Engine',
    body: 'Replacing answer dumps with progressive pedagogical questions so students independently pinpoint the root formula.'
  }
];

export default function MissionSection({ onExploreWorkspace }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <>
      <style>{MISSION_STYLES}</style>
      <section className="gn-mission-root" id="mission">
        <div className="gn-mission-hull">
          <div className="gn-mission-badge">
            <span className="gn-mission-badge-dot" />
            <span className="gn-mission-badge-text">Mission Architecture</span>
          </div>

          <div className="gn-mission-layout">
            <div>
              <h2 className="gn-mission-hero-title">
                High-Stakes Prep,<br />
                <span>Democratized.</span>
              </h2>
              <p className="gn-mission-hero-p">
                Commercial coaching creates an artificial divide. We build uncompromised diagnostic engines, latency telemetry, and Socratic hints so self-directed students can master Class 11-12, JEE, and NEET on pure grit.
              </p>

              <div className="gn-mission-stats-strip">
                <div className="gn-mission-stat-item">
                  <h4>100%</h4>
                  <span>Open Access</span>
                </div>
                <div className="gn-mission-stat-item">
                  <h4>+4 / -1</h4>
                  <span>Authentic NTA Metric</span>
                </div>
                <div className="gn-mission-stat-item">
                  <h4>30s</h4>
                  <span>Pacing Threshold</span>
                </div>
              </div>
            </div>

            <div className="gn-mission-stack">
              {DIRECTIVES.map((d, i) => (
                <div
                  key={d.idx}
                  className={`gn-mission-item ${activeIdx === i ? 'active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                >
                  <div className="gn-mission-item-top">
                    <span>{d.idx} // {d.label}</span>
                    <span style={{ color: activeIdx === i ? '#e31534' : '#454C5C' }}>↗</span>
                  </div>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="gn-mission-cta-shelf">
            <div>
              <div className="gn-mission-cta-title">SEVA FIRST RYIC 2026 Initiative</div>
              <p className="gn-mission-cta-sub">Built to run smoothly on standard laptops and mobile browsers.</p>
            </div>
            <button className="gn-mission-cta-btn" onClick={onExploreWorkspace}>
              Launch Diagnostics ↗
            </button>
          </div>
        </div>
      </section>
    </>
  );
}