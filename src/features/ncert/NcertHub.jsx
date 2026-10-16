import { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, Atom } from 'lucide-react';
import { CHAPTERS } from './chapters';
const notes = [
 'Start with SI base quantities. Write a derived quantity in terms of mass, length and time before checking its dimensions. Dimensional consistency is necessary, but it does not determine numerical constants.',
 'Displacement tracks change in position; distance tracks path length. The slope of a position–time graph gives velocity, and the area under a velocity–time graph gives displacement.',
 'Draw a free-body diagram before writing equations. Apply net force = mass × acceleration separately along each chosen axis. Action–reaction forces act on different bodies.',
];
export default function NcertHub() {
 const [open, setOpen] = useState(null);
 return <section className="space-y-5" aria-label="NCERT chapter shelf">
  <div className="ocean-hero"><p className="eyebrow text-sky-200">YOUR CORE CURRICULUM</p><h2 className="mt-3 text-2xl font-bold">Classical physics, made clear.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-sky-100">Units, motion and forces. Build understanding one chapter at a time.</p><div className="mt-5 flex items-center gap-2 text-sm"><Atom size={18} />3 chapter summaries · Class 11</div></div>
  <div className="flex items-center justify-between"><h2 className="text-lg font-bold">Core curriculum units</h2><span className="text-xs text-accent">3 chapters</span></div>
  {CHAPTERS.map((chapter, i) => <article className="card" key={chapter.title}>
   <div className="flex flex-wrap items-center gap-4"><span className="chapter-number">0{i + 1}</span><div className="min-w-0 flex-1"><h3 className="font-semibold leading-6">{chapter.title}</h3><p className="mt-2 text-xs leading-5 text-muted">{chapter.note}</p></div><span className="offline-badge"><CheckCircle2 size={13} />Available Offline</span></div>
   <button className="mt-4 flex min-h-11 w-full items-center justify-between text-sm font-semibold text-accent" aria-expanded={open === i} aria-controls={`chapter-${i}`} onClick={() => setOpen(open === i ? null : i)}><span className="flex items-center gap-2"><BookOpen size={16} />{open === i ? 'Close summary' : 'Read quick summary'}</span><ChevronDown size={16} /></button>
   {open === i && <div id={`chapter-${i}`} className="mt-3 rounded-lg bg-well p-4 text-sm leading-7">{notes[i]}</div>}
  </article>)}
  <p className="text-xs leading-5 text-muted">These are original short study summaries, not NCERT textbook PDFs. Offline badges are prototype labels: loaded summaries work without a connection while this page stays open; offline reload and textbook downloads are not implemented.</p>
 </section>;
}
