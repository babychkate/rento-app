import { useState, useMemo } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { CHATS } from '../../data/properties';
import BottomNav from '../../components/BottomNav/BottomNav';
import { SearchIcon } from '../../components/Icons/Icons';
import { BellIcon, ProfileIcon } from '../../components/Icons/NavIcons';
import ProfileScreen from '../Profile/ProfileScreen';
import NotificationsScreen from '../Notifications/NotificationsScreen';
import ChatScreen from '../Chat/ChatScreen';


// ─── КАРТКА ЧАТУ ──────────────────────────────────────────────────────────────

// Превʼю: перше слово + "…"
const previewText = (msg) => {
  const first = msg.trim().split(' ')[0];
  return first + '\u00a0…';
};

const ROLE_COLORS = {
  'орендодавець': '#3b82f6',
  'сусід':        '#8f94fb',
  'орендар':      '#22c55e',
};

const ChatCard = ({ chat, onClick }) => (
  <button
  onClick={onClick}
  className="w-full text-left flex items-center justify-between border-none cursor-pointer transition-all duration-150 active:scale-[0.98]"
  style={{
    borderRadius: '40px',
    padding: '10px 20px 10px 10px',
    position: 'relative',
    
    // Напрямок 180deg пускає градієнт зверху вниз. 
    // Найсвітліший колір (#DCE0F8) тепер чітко внизу.
    background: 'linear-gradient(180deg, rgba(160, 173, 253, 0.4) 0%, rgba(177, 187, 252, 0.45) 50%, rgba(220, 224, 248, 0.65) 100%)',
    
    // Ефект розмиття скла
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    
    // Тонка біла рамка
    border: '1px solid rgba(255, 255, 255, 0.75)',
    
    // М'яка зовнішня тінь + внутрішні бліки для об'єму
    boxShadow: `
      0 6px 18px rgba(0, 82, 255, 0.06),
      inset 0 1px 2px rgba(255, 255, 255, 0.8),
      inset 0 -1px 2px rgba(160, 173, 253, 0.2)
    `,
  }}
>
    {/* Ліва частина: аватар + текст */}
    <div className="flex items-center gap-3.5">
      {/* Аватар */}
      <div className="relative w-14 h-14 shrink-0">
        <img src={chat.avatar} alt={chat.name}
          className="w-full h-full rounded-full object-cover" />
        {/* Крапка непрочитаного */}
        {chat.unread > 0 && (
          <div className="absolute -top-0.5 -right-0.5 min-w-4.5 h-.5 rounded-full bg-[#0052FF] flex items-center justify-center px-1"
            style={{ boxShadow: '0 2px 6px rgba(0,82,255,0.45)', fontSize: '10px', fontWeight: 700, color: '#fff' }}>
            {chat.unread}
          </div>
        )}
      </div>

      {/* Імʼя + превʼю */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[15px] text-[#012A81]">{chat.name}</span>
          {/* Бейдж ролі */}
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-lg"
            style={{
              color: ROLE_COLORS[chat.role] ?? '#718096',
              background: `${ROLE_COLORS[chat.role] ?? '#718096'}18`,
            }}
          >
            {chat.role}
          </span>
        </div>
        <span className="text-[12px] font-medium text-[#728cb6]">
          {previewText(chat.lastMessage)}
        </span>
      </div>
    </div>

    {/* Права частина: час + стрілка */}
    <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
      <span className="text-[11px] font-medium text-[#a0aec0]">{chat.time}</span>
      {/* Кастомна стрілка як у спільноті */}
      <svg width="34" height="34" viewBox="0 0 42 42" fill="none">
        <path d="M21 30L31.6248 22.6444C32.7736 21.8491 32.7736 20.1509 31.6248 19.3556L21 12"
          stroke="#012A81" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28.5 21H10.5" stroke="#012A81" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </button>
);

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────

const MessagesScreen = ({ onBack, onLogout }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('search');
  const [search, setSearch]       = useState('');
  const [openChat, setOpenChat] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const firstName = user?.firstName ?? user?.name?.split(' ')[0] ?? 'користувачу';

  const filtered = useMemo(() =>
    CHATS.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

      if (showProfile) {
  return (
    <ProfileScreen
      onBack={() => setShowProfile(false)}
      onLogout={onLogout}
    />
  );
  }
  
  if (showNotifications) {
  return <NotificationsScreen onBack={() => setShowNotifications(false)} />;
  }
  
    if (openChat) {
    return <ChatScreen
      chat={openChat}
      onBack={() => setOpenChat(null)}
      onGoHome={onBack}
      onOpenNotifications={() => { setShowNotifications(true) }}
      onOpenProfile={() => { setShowProfile(true) }}
    />
}

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat">

      {/* Градієнт — як на HomeScreen */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'linear-gradient(180deg, rgba(148,93,233,0.55) 0%, rgba(99,138,255,0.7) 4%, rgba(79,118,255,0.5) 8%, #ffffff 18%, #ffffff 100%)',
      }} />

      {/* Скролл-зона */}
      <div
        className="relative z-10 flex flex-col flex-1 min-h-0 pb-28"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >

        {/* ── TOP BAR — як на HomeScreen ── */}
        <div className="flex items-center justify-between px-6 pt-14 pb-2.5">
          <span className="font-bold text-[24px] text-white leading-none">
            Привіт, {firstName}
          </span>
          {/* Право: дзвіночок + профіль (як на HomeScreen) */}
          <div className="flex items-center gap-2.5">
                          <button onClick={() => setShowNotifications(true)} className="bg-transparent border-none cursor-pointer p-0">
                            <BellIcon />
                          </button>
                          <button onClick={() => setShowProfile(true)} className="bg-transparent border-none cursor-pointer p-0">
                            <ProfileIcon />
                          </button>
            </div>
        </div>

                {/* ── ЗАГОЛОВОК ── */}
        <p className="px-6 pt-8 font-semibold text-[22px] text-[#0052FF]">Повідомлення</p>

        {/* ── ПОШУК — як на HomeScreen ── */}
        <div className="px-6 pt-4 pb-5">
          <div className="relative flex items-center">
            <div className="absolute left-4.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Введіть імʼя або роль"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4.5 py-3.5 rounded-full border-[2.5px] border-[#2979ff] bg-[#dde5f6] font-montserrat text-[14px] text-[#0f1e5c] outline-none appearance-none shadow-[inset_0_3px_8px_rgba(41,121,255,0.08),0_4px_14px_rgba(41,121,255,0.15),inset_0_-2px_0_rgba(41,121,255,0.12)] placeholder:text-[#4b5b7e]"
            />
          </div>
        </div>

        {/* ── СПИСОК ЧАТІВ ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 gap-3">
            <span className="text-[40px]">💬</span>
            <p className="font-bold text-[16px] text-[#012A81] text-center">Нікого не знайдено</p>
            <p className="text-[13px] text-[#718096] text-center">Спробуй змінити запит</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-6">
            {filtered.map(chat => (
              <ChatCard
                key={chat.id}
                chat={chat}
                onClick={() => setOpenChat(chat)}
              />
            ))}
          </div>
        )}

      </div>

      {/* ── BOTTOM NAV ── */}
      <div className="relative z-10">
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'home') { onBack?.(); return; }
            setActiveTab(tab);
          }}
        />
      </div>
    </div>
  );
};

export default MessagesScreen;
