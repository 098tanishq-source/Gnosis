import { useEffect } from 'react';
import { Sparkles, Lightbulb, Loader2, BookOpen } from 'lucide-react';
import './fonts.css';
import { HINT } from './hints';
export default function SocraticAI({ hint, setHint }) {
 useEffect(() => {
  if (hint !== 'typing') return;
  const id = setTimeout(() => setHint('ready'), 1400);
  return () => clearTimeout(id);
 }, [hint, setHint]);
 return <section className="mx-auto max-w-3xl space-y-5" aria-label="Socratic AI">
  <div className="flex items-center gap-2 text-xs text-muted"><Sparkles size={16} /><span className="pill">PHYSICS WORKBENCH</span><span>Guided practice</span></div>
  <div className="chat-question"><span className="eyebrow text-inherit">Your challenge</span><h2 className="mt-3 text-lg font-medium leading-8">A ball is released from rest from a height of 20 m. How long does it take to reach the ground?</h2><p className="mt-3 font-mono text-sm">g = 10 m/s²</p></div>
  <div className="card"><div className="mb-4 flex items-center gap-2 font-semibold"><Lightbulb size={20} className="text-accent" />Gnosis Socratic Guide</div><p className="mb-5 text-sm leading-7 text-muted">Start with what you know. I’ll give you a conceptual nudge, so you can find the answer yourself.</p>
   <button className="btn btn-primary" disabled={hint !== 'idle'} onClick={() => setHint('typing')}>{hint === 'typing' ? <Loader2 size={18} className="animate-spin motion-reduce:animate-none" /> : <Sparkles size={18} />}{hint === 'ready' ? 'Hint revealed' : 'Ask Socratic Hint'}</button>
  </div>
  <div role="status" aria-live="polite" aria-atomic="true">{hint !== 'idle' && <div className="hint-card"><p className="mb-3 flex items-center gap-2 text-sm font-semibold"><BookOpen size={18} />{hint === 'typing' ? 'Preparing your hint…' : 'Return to your notes'}</p>{hint === 'ready' && <p className="text-sm leading-7">{HINT}</p>}</div>}</div>
  <p className="text-xs leading-5 text-muted">Simulated hint · No messages are sent to an AI service.</p>
 </section>;
}
