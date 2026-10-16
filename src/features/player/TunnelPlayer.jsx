import { useState } from 'react';
import { PlayCircle, ExternalLink } from 'lucide-react';
import { VIDEO } from './video';
export default function TunnelPlayer() {
 const [playing, setPlaying] = useState(false);
 return <section className="card overflow-hidden !p-0">
  <div className="aspect-video bg-primary text-white">{playing ? <iframe className="h-full w-full border-0" src={`https://www.youtube.com/embed/${VIDEO.id}?controls=1&modestbranding=1&rel=0`} title={VIDEO.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <button className="flex h-full w-full flex-col items-center justify-center gap-3 p-5" onClick={() => setPlaying(true)}><PlayCircle size={48} strokeWidth={1.5} /><span className="font-semibold">Load lesson</span><span className="text-xs text-sky-100">YouTube loads only when you’re ready</span></button>}</div>
  <div className="p-6"><p className="eyebrow">TUNNEL PLAYER / FOCUS SESSION</p><h2 className="mt-3 text-xl font-bold">Watch. Pause. Explain it back.</h2><p className="mt-3 text-sm leading-7 text-muted">Keep a notebook nearby and write one idea in your own words after each section.</p><a className="btn btn-secondary mt-5" target="_blank" rel="noreferrer" href={`https://www.youtube.com/watch?v=${VIDEO.id}`}>Open on YouTube<ExternalLink size={16} /></a><p className="mt-4 text-xs leading-5 text-muted">Internet required. Video availability depends on YouTube and the owner’s embed settings. Same-channel recommendations may still appear.</p></div>
 </section>;
}
