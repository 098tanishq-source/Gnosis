import { ArrowUpRight, Focus, Lightbulb, BookOpen, Timer, Play, Check } from 'lucide-react';

const pillars = [
 { icon:Focus, title:'Understand the why.', text:'A correct option is only the beginning. Connect each answer to the principle behind it, then use that idea in a different problem.', tag:'CONCEPT FIRST' },
 { icon:Timer, title:'Practise with purpose.', text:'Notice where your time goes. Review your answers alongside question-level timing to identify the steps that need more attention.', tag:'REFLECT & REFINE' },
 { icon:Lightbulb, title:'Stay curious.', text:'When you get stuck, start with a better question. Conceptual hints help you revisit your notes and find the next step yourself.', tag:'GUIDED DISCOVERY' },
];
const steps = [
 { icon:BookOpen, number:'01', title:'Build a foundation', text:'Explore the Class 11 physics chapter shelf and its topic summaries. Make a short list of ideas to revisit in your textbook.', detail:'NCERT HUB / READ & RECALL' },
 { icon:Focus, number:'02', title:'Put it into practice', text:'Try the three-question mock test. Choose your answers, move between questions, and submit when you are ready to review.', detail:'MOCK TEST / TRY & REVIEW' },
 { icon:Play, number:'03', title:'Close the gaps', text:'Use a sample Socratic hint or open a focused video lesson. Return to the question with a clearer understanding of the concept.', detail:'HINTS & VIDEO / REVISIT' },
];
export default function AboutSection() {
 return <section id="about" className="gn-about" aria-labelledby="gn-about-title">
  <style>{styles}</style>
  <header className="gn-about-banner">
   <div className="gn-about-meta"><span>MANIFESTO / 01</span><span aria-hidden="true">+ + +</span></div>
   <div><h2 id="gn-about-title">About <span>Gnosis.</span></h2><p>A little curiosity. A deeper understanding.</p></div>
   <div className="gn-about-meta gn-about-base"><span><i /> LEARNING BEYOND THE ANSWER</span><span>CLASS 11 / PHYSICS</span></div>
  </header>
  <div className="gn-about-panel">
   <div className="gn-about-label"><span>Our principles</span><small>THE FOUNDATION</small></div>
   <h3 className="gn-about-statement">Learning should leave you with more than an answer. <span>It should give you the confidence to explain your thinking, question your assumptions, and try again.</span> That is the idea behind Gnosis.</h3>
   <div className="gn-about-grid">{pillars.map(({icon:Icon,title,text,tag},i)=><article className="gn-about-pillar" key={title}><span className="gn-about-icon"><Icon size={22} aria-hidden="true" /></span><small>PILLAR / 0{i+1}</small><h4>{title}</h4><p>{text}</p><footer><span>{tag}</span><span>0{i+1}/03 ↗</span></footer></article>)}</div>
  </div>
  <div className="gn-about-panel gn-about-white">
   <div className="gn-about-label"><span>Your learning path</span><small>ONE CONNECTED SPACE</small></div>
   <div className="gn-about-intro"><h3>Read. Try. Reflect.<br />Find your next step.</h3><p>Move between practice and explanation at your own pace. Each tool has a simple role in helping you work through a difficult idea.</p></div>
   <div className="gn-about-grid">{steps.map(({icon:Icon,number,title,text,detail})=><article className="gn-about-step" key={number}><div className="gn-about-visual" aria-hidden="true"><span>{number} / LEARNING SEQUENCE</span><Icon size={68} strokeWidth={1} /><b>{number}</b></div><div className="gn-about-step-copy"><h4>{title}</h4><p>{text}</p><small>{detail}</small></div></article>)}</div>
  </div>
  <div className="gn-about-panel gn-about-end"><div><div className="gn-about-label"><span>Built with focus</span></div><h3>Start small.<br />Go deeper.</h3><p>Gnosis is a working prototype. Explore its learning flow today while live AI, accounts and offline downloads remain future work.</p></div><div className="gn-about-next"><ul><li><Check size={16} aria-hidden="true" /> No account needed to explore</li><li><Check size={16} aria-hidden="true" /> Video loads only when you choose</li><li><Check size={16} aria-hidden="true" /> Responsive layouts for smaller screens</li></ul><a href="#studio">Explore the learning studio <ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
 </section>;
}
const styles = `
.gn-about { max-width:1440px; margin:0 auto; padding:80px 32px 32px; scroll-margin-top:24px; font-family:var(--font-ui),sans-serif; color:#17181c; }
.gn-about-banner { min-height:390px; border-radius:36px; border:1px solid #28292e; background:radial-gradient(ellipse at top right,#351920 0,transparent 55%),#121316; color:#f5f7fa; padding:36px 48px; display:flex; flex-direction:column; justify-content:space-between; gap:48px; }
.gn-about-meta { display:flex; justify-content:space-between; flex-wrap:wrap; gap:16px; font:10px ui-monospace,monospace; letter-spacing:1.5px; color:#b9bac2; }
.gn-about-meta i { display:inline-block; width:6px; height:6px; background:#ff334b; border-radius:50%; margin-right:8px; }
.gn-about-banner h2 { font:400 clamp(38px,5.5vw,76px)/1.2 Audiowide,sans-serif; text-align:center; margin:0; }
.gn-about-banner h2 span { color:#fff; }
.gn-about-banner p { text-align:center; margin:20px 0 0; font:11px/1.8 ui-monospace,monospace; letter-spacing:2px; text-transform:uppercase; color:#b9bac2; }
.gn-about-base { border-top:1px solid #303136; padding-top:22px; }
.gn-about-panel { margin-top:28px; padding:clamp(28px,4vw,60px); border-radius:36px; background:#f0f1f5; }
.gn-about-label { display:flex; align-items:center; flex-wrap:wrap; gap:14px; margin-bottom:26px; }
.gn-about-label>span { border:1px solid #d9dae0; border-radius:30px; background:#fff; padding:7px 12px; font:11px ui-monospace,monospace; }
.gn-about-label>span::before { content:'●'; color:#dc243b; margin-right:7px; font-size:8px; }
.gn-about-label small { color:#666a75; font:10px ui-monospace,monospace; letter-spacing:1px; }
.gn-about-statement { font-size:clamp(24px,2.8vw,39px); font-weight:500; line-height:1.4; letter-spacing:-1px; max-width:1050px; margin:0 0 52px; }
.gn-about-statement>span { color:#656873; }
.gn-about-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:24px; }
.gn-about-pillar { border:1px solid #e4e5ea; background:#fff; border-radius:20px; padding:28px; display:flex; flex-direction:column; }
.gn-about-icon { width:44px; height:44px; border-radius:12px; background:#151619; color:white; display:grid; place-items:center; margin-bottom:38px; }
.gn-about-pillar>small,.gn-about-step-copy>small { font:10px/1.6 ui-monospace,monospace; color:#666a75; letter-spacing:1px; }
.gn-about h4 { font-size:20px; font-weight:600; margin:12px 0; line-height:1.35; }
.gn-about-pillar p,.gn-about-step p,.gn-about-end p { font-size:14px; line-height:1.9; color:#585d68; margin:0 0 24px; }
.gn-about-pillar footer { margin-top:auto; padding-top:20px; border-top:1px solid #e6e7eb; display:flex; justify-content:space-between; gap:8px; font:9px ui-monospace,monospace; color:#666a75; }
.gn-about-white { background:white; }
.gn-about-intro { display:flex; align-items:end; justify-content:space-between; gap:40px; margin-bottom:36px; }
.gn-about-intro h3,.gn-about-end h3 { font:400 clamp(24px,2.7vw,36px)/1.4 Audiowide,sans-serif; margin:0; }
.gn-about-intro>p { max-width:360px; color:#666a75; font-size:13px; line-height:1.8; margin:0; }
.gn-about-step { border:1px solid #dedfe5; border-radius:18px; overflow:hidden; background:#f5f6f8; }
.gn-about-visual { background:#17181c; color:#dddfe5; min-height:220px; padding:22px; position:relative; display:flex; flex-direction:column; align-items:start; justify-content:space-between; overflow:hidden; }
.gn-about-visual>span { font:9px ui-monospace,monospace; letter-spacing:1px; }
.gn-about-visual>b { position:absolute; bottom:-20px; right:8px; font:120px Audiowide,sans-serif; color:#303239; }
.gn-about-visual svg { color:#ff5266; z-index:1; }
.gn-about-step-copy { padding:24px; }
.gn-about-step-copy>small { display:block; padding-top:18px; border-top:1px solid #dddfe5; font-size:9px; }
.gn-about-end { display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:60px; }
.gn-about-end p { margin:20px 0 0; max-width:540px; }
.gn-about-next ul { padding:0; margin:0 0 30px; list-style:none; }
.gn-about-next li { display:flex; align-items:center; gap:10px; font-size:13px; line-height:1.8; margin:14px 0; }
.gn-about-next li svg { color:#ba1930; flex-shrink:0; }
.gnosis-home .gn-about-next a { display:inline-flex; align-items:center; justify-content:center; gap:20px; min-height:48px; background:#151619; color:white; border-radius:10px; padding:14px 20px; font-size:12px; }
@media(max-width:850px) { .gn-about-grid { grid-template-columns:1fr; } .gn-about-intro,.gn-about-end { display:grid; grid-template-columns:1fr; gap:24px; } .gn-about-intro>p { max-width:100%; } .gn-about-visual { min-height:180px; } }
@media(max-width:520px) { .gn-about { padding:48px 16px 20px; } .gn-about-banner { border-radius:24px; padding:28px 24px; min-height:320px; } .gn-about-panel { border-radius:24px; padding:28px 22px; } .gn-about-meta { font-size:8px; } .gn-about-statement { letter-spacing:-.5px; } }
`;
