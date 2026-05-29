import { useState, useRef, useEffect } from 'react';
import { RentoLogo, BellIcon, ProfileIcon } from '../../components/Icons/NavIcons';
import { GRADIENTS } from '../../visual effects/headerGradient';
import { BackIcon } from '../../components/Icons/Icons';
import { CallingOverlay } from '../../components/CallingOverlay/CallingOverlay';
import { SendIcon } from "../../components/Icons/SendIcon"

const now = () => {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
};


const ChatScreen = ({ chat, onBack, onGoHome, onNotifications, onProfile, activeTab, onTabChange }) => {
  const [messages, setMessages] = useState(chat.messages ?? []);
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
      style={{ background: 'white' }}>

      {/* ── ХЕДЕР ── */}
<div className="relative shrink-0">
  <div className="absolute inset-0 pointer-events-none z-0"
    style={{ background: GRADIENTS.homeHeader }} />

  {/* Рядок 1: лого + дзвіночок + профіль */}
  <div className="relative z-10 flex items-center justify-between px-6 pt-19 pb-14 h-35">
    <button onClick={onGoHome} className="bg-transparent border-none cursor-pointer p-0">
      <RentoLogo />
    </button>
    <div className="flex items-center gap-2.5">
      <button onClick={onNotifications} className="bg-transparent border-none cursor-pointer p-0">
        <BellIcon />
      </button>
      <button onClick={onProfile} className="bg-transparent border-none cursor-pointer p-0">
        <ProfileIcon />
      </button>
    </div>
        </div>
        </div>

  {/* Рядок 2: назад | пілюля | дзвінок */}
  <div className="relative z-10 flex items-center justify-between pt-4 px-6">

    {/* Назад */}
    <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1 shrink-0">
      <BackIcon />
    </button>

    {/* Пілюля */}
<div className="flex items-center justify-center flex-1 mx-3 px-4 py-2 rounded-[50px]"
  style={{
    background: 'rgba(203,217,255,0.6)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.5)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  }}>
  
  {/* Фото + текст по центру разом */}
  <div className="flex items-center gap-3">
    <img src={chat.avatar} alt={chat.name}
      className="w-14 h-14 rounded-full object-cover shrink-0"
      style={{ border: '2px solid rgba(255,255,255,0.6)' }} />
    <div className="flex flex-col items-start">
      <span className="font-bold text-[15px] text-[#3b82f6] leading-tight">
        {chat.name.split(' ')[0]}
      </span>
      <span className="text-[11px] font-medium text-[#5c8bf0]">
        активність — недавно
      </span>
    </div>
  </div>
</div>

    {/* Дзвінок */}
    <button onClick={() => setCalling(true)}
      className="w-11 h-11 rounded-full border-none cursor-pointer flex items-center justify-center active:scale-95 transition-transform shrink-0"
      style={{ background: '#4f83ff', boxShadow: '0 4px 14px rgba(79,131,255,0.4)' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    </button>
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
