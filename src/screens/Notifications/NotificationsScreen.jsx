import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import { NOTIFICATIONS as INITIAL_NOTIFICATIONS } from '../../data/properties';

// ─── ІКОНКИ ───────────────────────────────────────────────────────────────────

const NotifIcon = ({ type, muted }) => {
  const color = muted ? '#a0aec0' : '#0052FF';
  if (type === 'star') return (
    <svg width="38" height="38" viewBox="0 0 42 42" fill="none">
      <path d="M21 5L24.9 14.3L35 15.3L27.8 22L30.2 32L21 27L11.8 32L14.2 22L7 15.3L17.1 14.3Z"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (type === 'heart') return (
    <svg width="38" height="38" viewBox="0 0 42 42" fill="none">
      <path d="M21 35S6 25.5 6 15.5C6 11.4 9.1 8 13 8C16 8 18.6 9.8 20 12.3C21.4 9.8 24 8 27 8C30.9 8 34 11.4 34 15.5C34 25.5 21 35 21 35Z"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (type === 'message') return (
    <svg width="38" height="38" viewBox="0 0 42 42" fill="none">
      <path d="M8 8H34C35.1 8 36 8.9 36 10V28C36 29.1 35.1 30 34 30H14L6 38V10C6 8.9 6.9 8 8 8Z"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <svg width="38" height="38" viewBox="0 0 42 42" fill="none">
      <path d="M21.5 25.98V11.98" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.82 9.27C10.92 5.67 15.41 3.3 20.46 3.02C20.8 3 21.14 2.99 21.49 2.99C31.43 2.99 39.49 11.05 39.49 20.99C39.49 30.93 31.43 38.99 21.49 38.99C11.55 38.99 3.49 30.93 3.49 20.99C3.49 17.84 3.83 16.03 5.25 13.46"
        stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M22.49 28.99C22.49 29.54 22.04 29.99 21.49 29.99C20.94 29.99 20.49 29.54 20.49 28.99C20.49 28.44 20.94 27.99 21.49 27.99C22.04 27.99 22.49 28.44 22.49 28.99Z"
        fill={color} />
    </svg>
  );
};

// ─── МОДАЛКА — рендериться всередині .screen, по центру ──────────────────────

const NotifModal = ({ notif, onClose }) => (
  <div
    className="absolute inset-0 z-50 flex items-center justify-center px-6"
    style={{ background: 'rgba(1,42,129,0.22)', backdropFilter: 'blur(3px)' }}
    onClick={onClose}
  >
    <div
      className="w-full rounded-[28px] p-6"
      style={{
        background: 'rgba(240,243,252,0.98)',
        border: '1px solid rgba(255,255,255,0.95)',
        boxShadow: '0 20px 56px rgba(0,30,140,0.22)',
      }}
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="shrink-0 mt-0.5">
          <NotifIcon type={notif.icon} />
        </div>
        <p className=" font-bold text-[16px] text-[#012A81] leading-snug flex-1">
          {notif.text}
        </p>
      </div>

      <p className="text-[14px] font-medium text-[#3a4060] leading-relaxed mb-5">
        {notif.detail}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-[#728cb6]">{notif.time}</span>
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-2xl font-bold text-[13px] text-white border-none cursor-pointer active:scale-[0.97] transition-transform"
          style={{ background: 'linear-gradient(135deg,#3b82f6 0%,#0052FF 100%)' }}
        >
          Зрозуміло
        </button>
      </div>
    </div>
  </div>
);

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────

const NotificationsScreen = ({ onBack }) => {
  const [activeTab, setActiveTab]       = useState('home');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [selected, setSelected]         = useState(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleOpen = (notif) => {
    setNotifications(prev =>
      prev.map(n => n.id === notif.id ? { ...n, read: true } : n)
    );
    setSelected(notif);
  };

  return (
    // position: relative — щоб модалка з absolute позиціонувалась всередині
    <div className="relative w-full h-full flex flex-col font-montserrat overflow-hidden">

      {/* Градієнт */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'linear-gradient(180deg, rgba(148,93,233,0.55) 0%, rgba(99,138,255,0.7) 4%, rgba(79,118,255,0.5) 8%, #ffffff 18%, #ffffff 100%)',
      }} />

      {/* Скролл-зона */}
      <div
        className="relative z-10 flex flex-col flex-1 min-h-0 pb-28"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between px-6 pt-14 pb-16">

          {/* Ліво: біла стрілка + заголовок */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="3"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="font-bold text-[24px] text-white leading-none">
              Сповіщення
            </span>
          </div>

          {/* Право: дзвіночок + профіль (як на HomeScreen) */}
          <div className="flex items-center gap-2.5">
            {/* Дзвіночок */}
            <button className="bg-transparent border-none cursor-pointer p-0">
              <svg width="32" height="34" viewBox="0 0 42 42" fill="none">
                <path d="M26.67 33.95C26.67 37.02 24.13 39.5 21 39.5C17.87 39.5 15.33 37.02 15.33 33.95H9.39C6.88 33.95 5.63 33.95 5.38 33.77C5.1 33.57 5.04 33.46 5 33.12C4.97 32.81 5.73 31.56 7.25 29.04C8.59 26.83 9.66 23.74 9.66 19.52C9.66 16.97 10.85 14.52 12.98 12.72C14.31 11.59 15.84 10.8 17.6 10.34C16.78 9.51 16.27 8.37 16.27 7.13C16.27 4.57 18.39 2.5 21 2.5C23.61 2.5 25.73 4.57 25.73 7.13C25.73 8.37 25.22 9.51 24.4 10.34C26.16 10.8 27.69 11.59 29.02 12.72C31.15 14.52 32.34 16.97 32.34 19.52C32.34 23.74 33.41 26.83 34.75 29.04C36.27 31.56 37.03 32.81 37 33.12C36.96 33.46 36.9 33.57 36.62 33.77C36.37 33.95 35.12 33.95 32.61 33.95H26.67Z"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Профіль */}
            <button className="bg-transparent border-none cursor-pointer p-0">
              <svg width="32" height="34" viewBox="0 0 42 42" fill="none">
                <path d="M22.89 39H34.7C35.97 39 37.19 38.5 38.09 37.6C38.99 36.7 39.5 35.47 39.5 34.2V33.91C39.5 32.33 38.72 30.84 37.4 29.95L28.18 23.65C27.57 23.23 27.27 23.02 27.1 22.82C26.58 22.22 26.46 21.59 26.73 20.85C26.81 20.6 27.07 20.23 27.58 19.49C33.68 10.58 27.01 3 21 3C14.99 3 8.32 10.58 14.42 19.48C14.93 20.22 15.18 20.6 15.27 20.84C15.54 21.59 15.42 22.22 14.9 22.82C14.73 23.02 14.42 23.23 13.81 23.65L4.67 29.85C3.31 30.78 2.5 32.31 2.5 33.96C2.5 35.36 3.12 36.68 4.2 37.58L4.43 37.77C5.47 38.59 6.51 38.97 7.6 39H8.42"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Лічильник непрочитаних — під хедером */}
        {unreadCount > 0 && (
          <div className="px-8">
            <span
              className="inline-block font-bold text-[12px] text-white px-3 py-1 rounded-2xl"
              style={{ background: '#0052FF' }}
            >
              {unreadCount} нових
            </span>
          </div>
        )}

        {/* ── СПИСОК — відступ +40px від хедера ── */}
        <div className="flex flex-col gap-3.5 px-6 pt-4">
          {notifications.map(notif => (
            <button
              key={notif.id}
              onClick={() => handleOpen(notif)}
              className="w-full text-left rounded-[28px] px-5 py-4 flex items-center gap-4 border-none cursor-pointer transition-transform duration-150 active:scale-[0.98]"
              style={{
                background: notif.read
                  ? 'rgba(226,231,246,0.55)'
                  : 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: notif.read
                  ? '1px solid rgba(255,255,255,0.6)'
                  : '1px solid rgba(255,255,255,0.95)',
                boxShadow: notif.read
                  ? '0 4px 14px rgba(49,115,253,0.04)'
                  : '0 6px 20px rgba(49,115,253,0.10)',
              }}
            >
              <div className="shrink-0">
                <NotifIcon type={notif.icon} muted={notif.read} />
              </div>

              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span
                  className="text-[14.5px] leading-snug"
                  style={{
                    fontWeight: notif.read ? 500 : 700,
                    color: notif.read ? '#5a6a8a' : '#012A81',
                  }}
                >
                  {notif.text}
                </span>
                <span className="text-[12px] font-medium text-[#728cb6]">
                  {notif.time}
                </span>
              </div>

              {!notif.read && (
                <div className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: '#0052FF', boxShadow: '0 0 6px rgba(0,82,255,0.5)' }} />
              )}
            </button>
          ))}

          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <span className="text-[44px]">🔔</span>
              <p className="font-bold text-[17px] text-[#012A81] text-center">Немає сповіщень</p>
              <p className="text-[13px] text-[#718096] text-center">Ми повідомимо вас про важливі події</p>
            </div>
          )}
        </div>

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

      {/* ── МОДАЛКА — absolute всередині .screen, по центру ── */}
      {selected && (
        <NotifModal
          notif={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default NotificationsScreen;
