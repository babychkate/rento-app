import { useState, useEffect } from 'react';

const CtrlBtn = ({ active, label, onPress, children }) => (
  <button onClick={onPress}
    className="flex flex-col items-center gap-2 bg-transparent border-none cursor-pointer">
    <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
      style={{
        background: active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}>
      {children}
    </div>
    <span className="text-[11px] font-semibold text-white/70">{label}</span>
  </button>
);

export const CallingOverlay = ({ chat, onEnd }) => {
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted]     = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [paused, setPaused]   = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-between py-16"
      style={{ background: 'linear-gradient(180deg,#1a3a8f 0%,#0d1f5c 100%)' }}>

      <div className="flex flex-col items-center gap-5 mt-4">
        <div className="w-32 h-32 rounded-full overflow-hidden"
          style={{ border: '3px solid rgba(255,255,255,0.3)', boxShadow: '0 0 0 14px rgba(255,255,255,0.06), 0 0 0 28px rgba(255,255,255,0.03)' }}>
          <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="font-bold text-[26px] text-white">{chat.name.split(' ')[0]}</p>
          <p className="text-[14px] font-medium text-white/60">
            {seconds === 0 ? 'Виклик…' : fmt(seconds)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8">
        <CtrlBtn active={muted} label="Мікрофон" onPress={() => setMuted(p => !p)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke={muted ? '#ef4444' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {muted ? (<>
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6" />
              <path d="M17 16.95A7 7 0 015 12v-2m14 0v2a7 7 0 01-.11 1.23" />
              <line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
            </>) : (<>
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
            </>)}
          </svg>
        </CtrlBtn>

        <CtrlBtn active={speaker} label="Гучний" onPress={() => setSpeaker(p => !p)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke={speaker ? '#fbbf24' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
          </svg>
        </CtrlBtn>

        <CtrlBtn active={paused} label="Утримати" onPress={() => setPaused(p => !p)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke={paused ? '#fbbf24' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {paused
              ? <polygon points="5 3 19 12 5 21 5 3" />
              : <><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></>}
          </svg>
        </CtrlBtn>
      </div>

      <button onClick={onEnd}
        className="w-17 h-17 rounded-full border-none cursor-pointer flex items-center justify-center active:scale-95 transition-transform"
        style={{ background: '#ef4444', boxShadow: '0 8px 24px rgba(239,68,68,0.5)' }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white" style={{ transform: 'rotate(135deg)' }}>
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
        </svg>
      </button>
    </div>
  );
};