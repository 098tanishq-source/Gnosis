import React, { useState } from 'react';

const ARCH_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  .gn-arch-root {
    max-width: 1280px;
    margin: 48px auto 96px auto;
    padding: 0 24px;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }

  .gn-arch-hull {
    background: #090A0D;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 32px;
    padding: 56px 48px;
    color: #FFFFFF;
    position: relative;
    box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7);
    box-sizing: border-box;
  }

  .gn-arch-head-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 32px;
    margin-bottom: 44px;
    flex-wrap: wrap;
  }

  .gn-arch-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(190, 28, 53, 0.08);
    border: 1px solid rgba(190, 28, 53, 0.45);
    border-radius: 9999px;
    padding: 6px 16px;
    margin-bottom: 16px;
  }

  .gn-arch-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #be1c35;
    box-shadow: 0 0 10px #be1c35;
  }

  .gn-arch-badge-txt {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #be1c35;
    text-transform: uppercase;
  }

  .gn-arch-main-title {
    font-size: clamp(30px, 4vw, 46px);
    font-weight: 900;
    line-height: 1.12;
    letter-spacing: -0.025em;
    color: #FFFFFF;
    margin: 0;
  }

  .gn-arch-main-title span {
    color: #be1c35;
  }

  .gn-arch-main-desc {
    font-size: 15px;
    line-height: 1.6;
    color: #8E95A5;
    max-width: 440px;
    margin: 0;
  }

  .gn-arch-nav-tabs {
    display: flex;
    gap: 12px;
    margin-bottom: 32px;
    overflow-x: auto;
    padding-bottom: 6px;
  }

  .gn-arch-tab-btn {
    background: #111318;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #8E95A5;
    padding: 12px 20px;
    border-radius: 14px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: all 0.2s ease;
  }

  .gn-arch-tab-btn:hover {
    color: #FFFFFF;
    border-color: rgba(190, 28, 53, 0.4);
  }

  .gn-arch-tab-btn.active {
    background: #be1c35;
    color: #FFFFFF;
    border-color: #be1c35;
    box-shadow: 0 4px 18px rgba(190, 28, 53, 0.35);
  }

  .gn-arch-tab-btn span.num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    opacity: 0.85;
  }

  .gn-arch-cockpit {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 32px;
    background: #111318;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 40px;
    margin-bottom: 48px;
    box-sizing: border-box;
  }

  @media (max-width: 900px) {
    .gn-arch-cockpit {
      grid-template-columns: 1fr;
      padding: 28px 20px;
    }
    .gn-arch-hull {
      padding: 40px 24px;
    }
  }

  .gn-arch-cockpit-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .gn-arch-phase-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    color: #be1c35;
    letter-spacing: 0.1em;
    margin-bottom: 12px;
    display: inline-block;
  }

  .gn-arch-phase-title {
    font-size: 26px;
    font-weight: 800;
    color: #FFFFFF;
    margin: 0 0 16px 0;
    letter-spacing: -0.01em;
  }

  .gn-arch-phase-detail {
    font-size: 15px;
    line-height: 1.65;
    color: #8E95A5;
    margin: 0 0 28px 0;
  }

  .gn-arch-spec-box {
    background: #090A0D;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .gn-arch-spec-key {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: #be1c35;
  }

  .gn-arch-spec-val {
    font-size: 13px;
    font-weight: 600;
    color: #FFFFFF;
  }

  .gn-arch-telemetry-console {
    background: #060709;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: 'JetBrains Mono', monospace;
  }

  .gn-arch-console-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    margin-bottom: 16px;
  }

  .gn-arch-console-top span {
    font-size: 11px;
    color: #8E95A5;
    text-transform: uppercase;
  }

  .gn-arch-live-badge {
    color: #be1c35;
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .gn-arch-live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #be1c35;
    box-shadow: 0 0 8px #be1c35;
  }

  .gn-arch-code-block {
    font-size: 12px;
    line-height: 1.7;
    color: #CBD5E1;
  }

  .gn-arch-code-block .k { color: #be1c35; }
  .gn-arch-code-block .v { color: #FFFFFF; }
  .gn-arch-code-block .s { color: #8E95A5; }

  .gn-arch-console-foot {
    margin-top: 20px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 11px;
    color: #8E95A5;
    display: flex;
    justify-content: space-between;
  }

  .gn-arch-footer-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media (max-width: 768px) {
    .gn-arch-footer-grid {
      grid-template-columns: 1fr;
    }
  }

  .gn-arch-metric-card {
    background: #111318;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 18px;
    padding: 24px;
  }

  .gn-arch-metric-card h5 {
    font-size: 24px;
    font-weight: 800;
    color: #FFFFFF;
    margin: 0 0 6px 0;
  }

  .gn-arch-metric-card p {
    font-size: 13px;
    line-height: 1.5;
    color: #8E95A5;
    margin: 0;
  }

  .gn-arch-metric-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    color: #be1c35;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
    text-transform: uppercase;
  }
`;

const ARCH_STEPS = [
  {
    num: '01',
    tab: 'Pacing Latency',
    phase: 'STAGE // 01 DIAGNOSTIC INGESTION',
    title: 'Precision Pacing & Latency Telemetry',
    detail: 'Monitors millisecond reaction speed and choice modifications per problem. Automatically detects panic points and hesitation anomalies before official tests.',
    engine: 'Worker-Thread Benchmark Observer',
    schema: {
      session: 'NTA_MOCK_11B',
      question_id: 'PHY_KINE_04',
      dwell_time: '1m 48s',
      benchmark: '1m 15s',
      hesitation_anomaly: true,
      toggles_count: 3
    }
  },
  {
    num: '02',
    tab: 'Mistake Vault',
    phase: 'STAGE // 02 COGNITIVE CATALOGING',
    title: 'Automated Root-Cause Classification',
    detail: 'Failed attempts are tagged directly into the Mistake Vault: Calculation Slip, Conceptual Blindspot, or Time Trap for prioritized re-testing.',
    engine: 'Fault Ingestion & Local Sync Matrix',
    schema: {
      vault_entry: 'ERR_9021',
      category: 'CONCEPTUAL_TRAP',
      subject: 'Physics // Work-Energy',
      resolution_status: 'UNRESOLVED',
      priority: 'HIGH'
    }
  },
  {
    num: '03',
    tab: 'Socratic Guiding',
    phase: 'STAGE // 03 GUIDED RESOLUTION',
    title: 'Stepwise Concept Stepping',
    detail: 'Prompts students with foundational inquiry rather than solution dumping, training independent formula synthesis for high-pressure recall.',
    engine: 'Pedagogical Socratic State Graph',
    schema: {
      module: 'SOCRATIC_STEPPER',
      hint_depth: 'LEVEL_2',
      guiding_focus: 'NON_INERTIAL_FRAMES',
      solution_exposed: false,
      student_retention: 'OPTIMAL'
    }
  },
  {
    num: '04',
    tab: 'Review Heatmap',
    phase: 'STAGE // 04 MASTERY SYNTHESIS',
    title: '60-Day Habit Matrix & Velocity',
    detail: 'Continuous score tracking and mistake review sessions dynamically update chapter mastery bars across Physics, Chemistry, and Mathematics.',
    engine: 'Diagnostic Retention Analytics',
    schema: {
      streak_days: 14,
      pacing_improvement: '+22s',
      resolved_ratio: '8 / 12',
      syllabus_mastery: '68%',
      readiness_index: '84/100'
    }
  }
];

export default function ArchitectureSection({ onLaunch }) {
  const [activeStep, setActiveStep] = useState(0);
  const cur = ARCH_STEPS[activeStep];

  return (
    <>
      <style>{ARCH_STYLES}</style>
      <section className="gn-arch-root" id="architecture">
        <div className="gn-arch-hull">
          <div className="gn-arch-head-row">
            <div>
              <div className="gn-arch-badge">
                <span className="gn-arch-badge-dot" />
                <span className="gn-arch-badge-txt">System Architecture</span>
              </div>
              <h2 className="gn-arch-main-title">
                How GNOSIS Diagnoses &amp; <span>Retains.</span>
              </h2>
            </div>
            <p className="gn-arch-main-desc">
              Four unified phases engineered to turn uncalibrated test attempts into measured exam confidence.
            </p>
          </div>

          <div className="gn-arch-nav-tabs">
            {ARCH_STEPS.map((s, idx) => (
              <button
                key={s.num}
                className={`gn-arch-tab-btn ${activeStep === idx ? 'active' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                <span className="num">{s.num}.</span>
                <span>{s.tab}</span>
              </button>
            ))}
          </div>

          <div className="gn-arch-cockpit">
            <div className="gn-arch-cockpit-info">
              <div>
                <span className="gn-arch-phase-tag">{cur.phase}</span>
                <h3 className="gn-arch-phase-title">{cur.title}</h3>
                <p className="gn-arch-phase-detail">{cur.detail}</p>
              </div>

              <div className="gn-arch-spec-box">
                <span className="gn-arch-spec-key">ENGINE:</span>
                <span className="gn-arch-spec-val">{cur.engine}</span>
              </div>
            </div>

            <div className="gn-arch-telemetry-console">
              <div className="gn-arch-console-top">
                <span>Schema Telemetry // live</span>
                <div className="gn-arch-live-badge">
                  <span className="gn-arch-live-dot" />
                  ACTIVE
                </div>
              </div>

              <div className="gn-arch-code-block">
                <div>&#123;</div>
                {Object.entries(cur.schema).map(([k, v]) => (
                  <div key={k} style={{ paddingLeft: '16px' }}>
                    <span className="k">"{k}"</span>: <span className="v">{typeof v === 'boolean' ? String(v) : `"${v}"`}</span>,
                  </div>
                ))}
                <div>&#125;</div>
              </div>

              <div className="gn-arch-console-foot">
                <span>GNOSIS DIAGNOSTIC PROTOCOL</span>
                <span>STATE_OK</span>
              </div>
            </div>
          </div>

          <div className="gn-arch-footer-grid">
            <div className="gn-arch-metric-card">
              <div className="gn-arch-metric-tag">LATENCY TELEMETRY</div>
              <h5>&lt; 30s Threshold</h5>
              <p>Flags excessive question pause times to prevent panic spirals on test day.</p>
            </div>
            <div className="gn-arch-metric-card">
              <div className="gn-arch-metric-tag">SOCRATIC GUIDANCE</div>
              <h5>0 Spoon-Feeding</h5>
              <p>Pedagogical prompts designed to make formulas stick through independent discovery.</p>
            </div>
            <div className="gn-arch-metric-card">
              <div className="gn-arch-metric-tag">NCERT CENTRAL</div>
              <h5>100% Curriculum</h5>
              <p>Fully cached chapter shelf and formula sheets accessible with zero paywalls.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}