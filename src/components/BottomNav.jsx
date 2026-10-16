import { ClipboardList, Sparkles, BookOpen, PlayCircle } from 'lucide-react';
const tabs = [ ['test', 'Mock Test', ClipboardList], ['ai', 'Socratic AI', Sparkles], ['ncert', 'NCERT Hub', BookOpen], ['player', 'Tunnel Player', PlayCircle] ];
export default function BottomNav({ active, onChange }) {
 return <nav className="bottom-nav" aria-label="Main navigation"><div className="mx-auto grid max-w-2xl grid-cols-4 gap-1">{tabs.map(([id, label, Icon]) => <button type="button" key={id} aria-current={active === id ? 'page' : undefined} onClick={() => onChange(id)} className={`nav-item ${active === id ? 'nav-active' : ''}`}><Icon size={21} aria-hidden="true" /><span>{label}</span><span aria-hidden="true" className="nav-dot" /></button>)}</div></nav>;
}
