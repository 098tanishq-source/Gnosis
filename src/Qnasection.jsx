 import { useEffect, useRef, useState } from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';
const faqs = [
 ['What is Gnosis, and who is it for?', 'Gnosis is a learning prototype for students who want to understand concepts, practise deliberately and review how they solve problems. The current learning studio focuses on Class 11 physics.', 'Explore a mock test, a sample Socratic hint, an NCERT chapter shelf and a focused video player from one place.', 'START HERE / CLASS 11 PHYSICS'],
 ['How does the mock test work?', 'The current test has three multiple-choice questions. Select an option, use Previous and Next to move between questions, and submit when you are ready. You can revisit a question before submitting.', 'The prototype awards +4 for a correct response, −1 for an incorrect response and 0 for an unanswered question. After submission, review your score, answers and time spent on each question.', 'PRACTICE / THREE QUESTIONS'],
 ['What does “Time-Trap Detected” mean?', 'A question receives this badge when its accumulated active time exceeds 30 seconds. Returning to the same question adds to its earlier time.', 'The timer pauses when you leave the Mock Test tab or hide the browser tab. Use the badge as a prompt to review your approach; it does not measure your ability or prove that an answer is wrong.', 'REVIEW / ACTIVE TIME > 30 SECONDS'],
 ['Will Socratic AI give me the final answer?', 'The current demo gives a conceptual hint after a short simulated typing delay. It encourages you to identify the relevant physics principle and check your notes instead of revealing the final numerical answer.', 'The hint is prewritten for the sample problem. A live AI model and open-ended chat are not connected yet.', 'GUIDANCE / SIMULATED HINT'],
 ['Are NCERT chapters available offline?', 'The current NCERT Hub contains three Class 11 physics chapter entries with expandable topic summaries. It is a browsing prototype, not a complete digital textbook.', 'The “Available Offline” badges are illustrative. This version does not download chapters or guarantee that the app works without a connection.', 'RESOURCES / OFFLINE SUPPORT PLANNED'],
 ['Can I use Gnosis on a basic phone or laptop?', 'The interface adapts to smaller screens, learning tools load on demand, and the video embed loads only after you choose to open it. Lite mode is enabled by default in the learning studio.', 'These choices reduce unnecessary work, but performance on physical low-end devices has not yet been measured. Video playback still depends on your connection and device.', 'ACCESS / RESPONSIVE LAYOUT'],
 ['Do I need to sign up? Is my progress saved?', 'You do not need an account to explore the current prototype. Log in and Sign up open preview notices; they do not create an account or collect credentials.', 'Test answers are kept in memory while the learning studio stays open. Returning to the home page or refreshing resets the session. Persistent progress and account syncing are not implemented yet.', 'ACCOUNTS / PREVIEW ONLY'],
 ['How does the Tunnel Player help me focus?', 'The Tunnel Player gives a lesson its own viewing space. You choose when to load the YouTube player, then use its playback controls to pause, replay and take notes.', 'YouTube controls the embedded player and may still show recommendations or other platform content. The prototype cannot remove all of those elements.', 'VIDEO / LOAD ON DEMAND'],
];
function RotatingToggle({ expanded }) {
 const icon = useRef(null);
 const previous = useRef(expanded);
 useEffect(() => {
  if (previous.current === expanded) return;
  const wasExpanded = previous.current;
  previous.current = expanded;
  const node = icon.current;
  if (!node || !node.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Capture an interrupted spin before cancelling it, so rapid taps stay continuous.
  const transform = getComputedStyle(node).transform;
  const matrix = new DOMMatrixReadOnly(transform === 'none' ? undefined : transform);
  const angle = node.getAnimations().length
   ? Math.atan2(matrix.b, matrix.a) * 180 / Math.PI
   : (wasExpanded ? 45 : 0);
  node.getAnimations().forEach(animation => animation.cancel());
  const destination = expanded ? 45 : 0;
  const turn = ((destination - angle) % 360 + 360) % 360;
  node.animate([
   { transform: `rotate(${angle}deg)`, filter: 'blur(0px)', offset: 0 },
   { filter: 'blur(0.8px)', offset: 0.2 },
   { filter: 'blur(0.5px)', offset: 0.65 },
   { transform: `rotate(${angle + 720 + turn}deg)`, filter: 'blur(0px)', offset: 1 },
  ], { duration: 650, easing: 'cubic-bezier(.2,.65,.25,1)' });
 }, [expanded]);
 useEffect(() => {
  const node = icon.current;
  return () => node?.getAnimations().forEach(animation => animation.cancel());
 }, []);
 return <span className="gn-qna-toggle"><span ref={icon} className="gn-qna-spinner" style={{transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)'}}><Plus size={17} aria-hidden="true" /></span></span>;
}
export default function QnaSection() {
 const [open,setOpen] = useState(0);
 return <section id="questions" className="gn-qna" aria-labelledby="gn-qna-title"><style>{styles}</style>
  <div className="gn-qna-archive"><span>GNOSIS / <b>KNOWLEDGE DESK</b></span><p>YOUR QUESTIONS. A CLEARER START.</p></div>
  <div className="gn-qna-card"><header><span className="gn-qna-badge">02 <b>•</b> Q&A</span><h2 id="gn-qna-title">Common Questions</h2><p>Get to know the learning studio, understand how its tools work, and see what is available in this prototype.</p></header>
   <div className="gn-qna-list">{faqs.map(([question,answer,detail,tag],i)=>{const expanded=open===i;return <article className={`gn-qna-item ${expanded?'gn-qna-open':''}`} key={question}><h3><button type="button" id={`gn-qna-trigger-${i}`} aria-expanded={expanded} aria-controls={`gn-qna-answer-${i}`} onClick={()=>setOpen(expanded?null:i)}><span className="gn-qna-number">{String(i+1).padStart(2,'0')}</span><span>{question}</span><RotatingToggle expanded={expanded} /></button></h3><div id={`gn-qna-answer-${i}`} role="region" aria-labelledby={`gn-qna-trigger-${i}`} aria-hidden={!expanded} inert={!expanded} className="gn-qna-reveal"><div className="gn-qna-clip"><div className="gn-qna-answer"><p>{answer}</p><p>{detail}</p><div className="gn-qna-tag"><i />{tag}</div></div></div></div></article>;})}</div>
   <footer><p>Ready to see how it works?</p><a href="#studio">Explore the learning studio <ArrowUpRight size={16} aria-hidden="true" /></a></footer>
  </div><div className="gn-qna-footnote"><span>● BUILT FOR CURIOSITY</span><span>CLASS 11 PHYSICS</span><span>PROTOTYPE / 2026</span></div>
 </section>;
}
const styles = `
.gn-qna { padding:80px 32px 100px; background:#0d0e11; background-image:radial-gradient(#24252a .6px,transparent .6px); background-size:26px 26px; color:#17181c; font-family:var(--font-ui),sans-serif; scroll-margin-top:24px; }
.gn-qna-archive { text-align:center; margin-bottom:40px; color:#c3c6cd; font:10px/1.8 ui-monospace,monospace; letter-spacing:1.5px; }
.gn-qna-archive>span { display:inline-block; padding:8px 18px; border:1px solid #303139; border-radius:40px; background:#17181c; }
.gn-qna-archive b { color:#ff5266; font-weight:400; }
.gn-qna-archive p { margin:18px 0 0; }
.gn-qna-card { max-width:1160px; margin:auto; padding:clamp(30px,5vw,76px); border-radius:56px; background:#f8f9fc; }
.gn-qna-card>header { text-align:center; margin-bottom:48px; }
.gn-qna-badge { display:inline-flex; gap:10px; align-items:center; background:#e9ebf0; border:1px solid #d0d3dc; padding:9px 16px; border-radius:30px; font:11px ui-monospace,monospace; letter-spacing:1px; }
.gn-qna-badge b { color:#c62038; }
.gn-qna-card h2 { font:400 clamp(28px,4vw,52px)/1.25 Audiowide,sans-serif; margin:26px 0 16px; color:#101114; letter-spacing:-1px; }
.gn-qna-card>header>p { font-size:16px; line-height:1.8; color:#5e6370; max-width:650px; margin:0 auto; }
.gn-qna-list { display:flex; flex-direction:column; gap:16px; }
.gn-qna-item { border:1px solid #d6d9e3; border-radius:28px; background:#f0f2f6; overflow:hidden; }
.gn-qna-item h3 { margin:0; }
.gnosis-home .gn-qna-item h3>button { display:grid; grid-template-columns:26px 1fr 38px; align-items:center; gap:20px; width:100%; padding:24px 28px; text-align:left; font-family:var(--font-ui),sans-serif; font-size:16px; line-height:1.6; font-weight:600; color:#17181c; border:0; background:transparent; cursor:pointer; }
.gn-qna-number { font:12px ui-monospace,monospace; color:#6b707b; }
.gn-qna-toggle { width:38px; height:38px; display:grid; place-items:center; border:1px solid #151619; border-radius:50%; color:white; background:#151619; }
.gn-qna-toggle { transition:background-color 450ms ease, color 450ms ease, border-color 450ms ease; }
.gn-qna-spinner { display:grid; place-items:center; transform-origin:center; }
.gn-qna-toggle svg { display:block; }
.gn-qna-item { transition:background-color 450ms ease, border-color 450ms ease; }
.gn-qna-reveal { display:grid; grid-template-rows:0fr; opacity:0; transition:grid-template-rows 550ms cubic-bezier(.22,1,.36,1), opacity 350ms ease; }
.gn-qna-open .gn-qna-reveal { grid-template-rows:1fr; opacity:1; }
.gn-qna-clip { min-height:0; overflow:hidden; }
@media(prefers-reduced-motion:reduce) { .gn-qna-toggle,.gn-qna-item,.gn-qna-reveal { transition:none; } }
.gn-qna-open { background:#fff; border-color:#ff8b9b; }
.gn-qna-open .gn-qna-toggle { color:#151619; background:#fff; border-color:#b9beca; }
.gn-qna-item h3>button:focus-visible { outline:2px solid #be1c35; outline-offset:-5px; border-radius:26px; }
.gn-qna-answer { padding:0 28px 24px; }
.gn-qna-answer[hidden] { display:none; }
.gn-qna-answer p { font-size:14px; line-height:1.9; color:#515764; margin:0 0 16px; }
.gn-qna-tag { display:flex; gap:9px; align-items:center; border-top:1px solid #e4e6ec; padding-top:17px; color:#656b78; font:10px/1.6 ui-monospace,monospace; letter-spacing:.5px; }
.gn-qna-tag i { width:6px; height:6px; border-radius:50%; background:#e32642; flex-shrink:0; }
.gn-qna-card>footer { text-align:center; margin-top:48px; font-size:13px; }
.gn-qna-card>footer p { color:#646976; margin:0 0 8px; }
.gnosis-home .gn-qna-card>footer a { display:inline-flex; align-items:center; justify-content:center; gap:10px; min-height:44px; color:#17181c; text-decoration:underline; text-underline-offset:5px; }
.gn-qna-footnote { display:flex; flex-wrap:wrap; justify-content:center; gap:24px; margin-top:32px; color:#aeb2bc; font:10px/1.8 ui-monospace,monospace; letter-spacing:1px; }
.gn-qna-footnote>span:first-child { color:#ff6d7f; }
@media(max-width:600px) { .gn-qna { padding:48px 16px 64px; } .gn-qna-card { padding:32px 18px; border-radius:30px; } .gn-qna-card h2 { font-size:28px; } .gn-qna-card>header>p { font-size:14px; } .gnosis-home .gn-qna-item h3>button { grid-template-columns:18px 1fr 30px; gap:10px; padding:20px 16px; font-size:13px; } .gn-qna-toggle { width:30px; height:30px; } .gn-qna-answer { padding:0 18px 20px; } .gn-qna-answer p { font-size:13px; } .gn-qna-footnote { gap:12px; font-size:8px; } }
`;
