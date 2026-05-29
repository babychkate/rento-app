import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import { NOTIFICATIONS as INITIAL_NOTIFICATIONS } from '../../data/properties';
import { BellIcon, ProfileIcon } from '../../components/Icons/NavIcons';
import { NotifIcon } from '../../components/Icons/NotifIcon';
import { NotifModal } from '../../modals/ModalNotify';
import { GRADIENTS } from '../../visual effects/headerGradient';

const NotificationsScreen = ({ onBack, onLogout, activeTab, onTabChange, onProfile, onNotifications }) => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [selected, setSelected] = useState(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleOpen = (notif) => {
    setNotifications(prev =>
      prev.map(n => n.id === notif.id ? { ...n, read: true } : n)
    );
    setSelected(notif);
  };

return (
  <div className="relative w-full h-full flex flex-col font-montserrat">

    {/* Градієнт + хедер */}
    <div className="relative shrink-0">
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: GRADIENTS.homeHeader }} />
      <div className="relative z-10 flex items-center justify-between px-6 pt-20 pb-16 h-35">
        <div className="flex items-center gap-2">
          <button onClick={onBack}
            className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-bold text-[24px] text-white leading-none">Сповіщення</span>
        </div>
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

    {/* Скролящий контент */}
    <div className="relative z-10 flex flex-col flex-1 min-h-0 pb-28"
      style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

      {unreadCount > 0 && (
        <div className="px-8 pb-3">
          <span className="inline-block font-bold text-[12px] text-white px-3 py-1 rounded-2xl"
            style={{ background: '#0052FF' }}>
            {unreadCount} нових
          </span>
        </div>
      )}

        {/* СПИСОК */}
        <div className="flex flex-col gap-3.5 px-6 pt-4">
          {notifications.map(notif => (
            <button key={notif.id} onClick={() => handleOpen(notif)}
              className="w-full text-left rounded-[28px] px-5 py-4 flex items-center gap-4 border-none cursor-pointer transition-transform duration-150 active:scale-[0.98]"
              style={{
                background: notif.read ? 'rgba(226,231,246,0.55)' : 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: notif.read ? '1px solid rgba(255,255,255,0.6)' : '1px solid rgba(255,255,255,0.95)',
                boxShadow: notif.read ? '0 4px 14px rgba(49,115,253,0.04)' : '0 6px 20px rgba(49,115,253,0.10)',
              }}>
              <div className="shrink-0">
                <NotifIcon type={notif.icon} muted={notif.read} />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="text-[14.5px] leading-snug"
                  style={{ fontWeight: notif.read ? 500 : 700, color: notif.read ? '#5a6a8a' : '#012A81' }}>
                  {notif.text}
                </span>
                <span className="text-[12px] font-medium text-[#728cb6]">{notif.time}</span>
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

      {/* BOTTOM NAV */}
      <div className="relative z-10">
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'home') { onBack?.(); return; }
            onTabChange(tab);
          }}
        />
      </div>

      {/* МОДАЛКА */}
      {selected && (
        <NotifModal notif={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default NotificationsScreen;