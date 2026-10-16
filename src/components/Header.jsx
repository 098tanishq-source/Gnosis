import { Atom, Leaf } from 'lucide-react';
export default function Header({ lowPower, onToggle }) {
 return <header className="app-header"><div className="header-inner">
  <div className="flex items-center gap-3"><span className="brand-icon"><Atom size={24} aria-hidden="true" /></span><div><p className="text-xl font-extrabold tracking-tight">Gnosis<span className="text-accent">.</span></p><p className="eyebrow text-[10px]">Deep learning</p></div></div>
  <button className="btn btn-secondary text-xs" type="button" aria-pressed={lowPower} onClick={onToggle}><Leaf size={16} aria-hidden="true" />Lite mode {lowPower ? 'on' : 'off'}</button>
 </div></header>;
}
