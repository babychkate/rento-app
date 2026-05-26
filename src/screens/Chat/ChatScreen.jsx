import { useState, useRef, useEffect } from 'react';
import { RentoLogo, BellIcon, ProfileIcon } from '../../components/Icons/HomeNavIcons';

// ─── ПОЧАТКОВІ ПОВІДОМЛЕННЯ ───────────────────────────────────────────────────

const INITIAL_MESSAGES = [
  { id: 'm1', from: 'them', text: 'Привіт!', time: '9:31' },
  { id: 'm2', from: 'me',   text: 'Привіт!\nМаєте хвилинку?', time: '9:31' },
  { id: 'm3', from: 'them', text: 'Без б!', time: '9:32' },
];

const now = () => {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
};

// ─── ЕКРАН ДЗВІНКА ────────────────────────────────────────────────────────────

const CallingOverlay = ({ chat, onEnd }) => {
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

// ─── ІКОНКА НАДСИЛАННЯ ────────────────────────────────────────────────────────

const SendIcon = ({ active }) => (
  <svg width="65" height="42" viewBox="0 0 65 42" fill="none">
    <path
      d="M28.1652 16.7388L36.0605 25.2551C36.2949 25.5079 36.3826 25.8638 36.2923 26.1966L35.4761 29.2076C35.2678 29.9763 34.2883 30.2048 33.7613 29.6078L31.6733 27.2426C31.4172 26.9525 31.0166 26.8362 30.645 26.944L26.1824 28.239C25.5767 28.4147 24.9615 27.9927 24.9074 27.3643L23.6716 12.9955C23.601 12.174 24.499 11.6248 25.1982 12.062L41.4289 22.2119C42.1876 22.6864 41.9889 23.8423 41.1152 24.0361L37.9434 24.7396"
      stroke={active ? 'white' : 'rgba(255,255,255,0.45)'}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────

const ChatScreen = ({ chat, onBack, onGoHome, onOpenNotifications, onOpenProfile }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput]       = useState('');
  const [calling, setCalling]   = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const autoReply = () => {
    const replies = [
      'Зрозуміло, дякую!', 'Добре, я подумаю 🙂', 'Окей, домовились!',
      'Гарно, побачимось!', 'Напишу пізніше.', 'Так, все чудово!',
      'Дякую за інфо!', 'Чудово, чекаю 🙏',
    ];
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `m${Date.now()}`, from: 'them',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: now(),
      }]);
    }, 900 + Math.random() * 1200);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: `m${Date.now()}`, from: 'me', text, time: now() }]);
    setInput('');
    inputRef.current?.focus();
    autoReply();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat overflow-hidden"
      style={{ background: '#f4f6fa' }}>

      {/* ── ХЕДЕР ── */}
      <div style={{ flexShrink: 0,
        background: 'linear-gradient(180deg, rgba(148,93,233,0.55) 0%, rgba(99,138,255,0.7) 40%, rgba(79,118,255,0.5) 65%, #f4f6fa 100%)',
        padding: '56px 24px 20px',
      }}>

        {/* Рядок 1: лого + дзвіночок + профіль */}
        <div className="flex items-center justify-between mb-5">
          <button onClick={onGoHome} className="bg-transparent border-none cursor-pointer p-0">
            <RentoLogo />
          </button>
          <div className="flex items-center gap-2.5">
            <button onClick={onOpenNotifications} className="bg-transparent border-none cursor-pointer p-0">
              <BellIcon />
            </button>
            <button onClick={onOpenProfile} className="bg-transparent border-none cursor-pointer p-0">
              <ProfileIcon />
            </button>
          </div>
        </div>

        {/* Рядок 2: назад | пілюля | дзвінок */}
        <div className="flex items-center justify-between">

          {/* Назад */}
          <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Пілюля */}
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-[30px] mx-3 flex-1 justify-center"
            style={{
              background: 'rgba(203,217,255,0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            }}>
            <img src={chat.avatar} alt={chat.name}
              className="w-11 h-11 rounded-full object-cover shrink-0" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-[15px] text-[#3b82f6] leading-tight">
                {chat.name.split(' ')[0]}
              </span>
              <span className="text-[11px] font-medium text-[#5c8bf0]">
                активність — недавно
              </span>
            </div>
          </div>

          {/* Дзвінок */}
          <button onClick={() => setCalling(true)}
            className="w-11.5 h-11.5 rounded-full border-none cursor-pointer flex items-center justify-center active:scale-95 transition-transform shrink-0"
            style={{ background: '#4f83ff', boxShadow: '0 4px 14px rgba(79,131,255,0.4)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── ПОВІДОМЛЕННЯ ── */}
      <div className="flex-1 flex flex-col gap-4 px-5 py-3"
        style={{ overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: 90 }}>

        <div className="flex justify-center my-1">
          <span className="text-[12px] font-semibold text-[#4f73d6] px-4 py-1 rounded-[10px]"
            style={{ background: '#cbd9ff' }}>
            Сьогодні
          </span>
        </div>

        {messages.map(msg => (
          <div key={msg.id} className="flex flex-col"
            style={{ alignSelf: msg.from === 'me' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
            <div className="text-[14px] font-medium leading-snug"
              style={{
                padding: '14px 18px',
                borderRadius: msg.from === 'me' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: msg.from === 'me' ? '#4781ff' : '#dde3f8',
                color: msg.from === 'me' ? '#ffffff' : '#1e2538',
                whiteSpace: 'pre-line',
              }}>
              {msg.text}
            </div>
            <span className="text-[11px] font-medium text-[#656e7b] mt-1.5"
              style={{
                alignSelf: msg.from === 'me' ? 'flex-end' : 'flex-start',
                marginLeft: msg.from === 'them' ? 2 : 0,
                marginRight: msg.from === 'me' ? 2 : 0,
              }}>
              {msg.time}
            </span>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* ── ПОЛЕ ВВОДУ ── */}
      <div className="absolute bottom-6 left-0 right-0 px-5">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center h-13 rounded-[30px] px-6"
            style={{ background: '#e5ecf9', border: '2px solid #2563eb' }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Повідомлення"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="w-full bg-transparent border-none outline-none font-montserrat text-[14px] font-medium text-[#1e293b] placeholder:text-[#64748b]"
            />
          </div>
          <button onClick={handleSend} disabled={!input.trim()}
            className="w-13 h-13 rounded-full border-none cursor-pointer flex items-center justify-center shrink-0 transition-all active:scale-95"
            style={{
              background: input.trim() ? 'linear-gradient(135deg,#3b82f6 0%,#0052FF 100%)' : '#c7d5f8',
              boxShadow: input.trim() ? '0 4px 14px rgba(0,82,255,0.35)' : 'none',
            }}>
            <SendIcon active={!!input.trim()} />
          </button>
        </div>
      </div>

      {/* ── ОВЕРЛЕЙ ДЗВІНКА ── */}
      {calling && <CallingOverlay chat={chat} onEnd={() => setCalling(false)} />}
    </div>
  );
};

export default ChatScreen;
