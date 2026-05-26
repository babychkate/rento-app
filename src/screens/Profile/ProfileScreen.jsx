import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import BottomNav from '../../components/BottomNav/BottomNav';
import SecurityScreen from '../Security/SecurityScreen';
import AccountSettingsScreen from '../AccountSettings/AccountSettingsScreen';

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────

const ProfileScreen = ({ onBack, onLogout }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('plant');
  const [innerView, setInnerView] = useState(null);
  // innerView: null | 'account' | 'security' | 'privacy'

  // ── Підекрани ────────────────────────────────────────────────────────────
  if (innerView === 'security') {
    return <SecurityScreen onBack={() => setInnerView(null)} />;
  }
  if (innerView === 'account') {
  return <AccountSettingsScreen onBack={() => setInnerView(null)} />;
}

  const menuItems = [
    {
      key: 'account',
      label: 'Налаштування акаунта',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
          stroke="#0052FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      key: 'security',
      label: 'Центр питань та безпеки',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
          stroke="#0052FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    },
    {
      key: 'privacy',
      label: 'Конфіденційність',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
          stroke="#0052FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-[#f1f2f6]">

      {/* ── СКРОЛЛ-КОНТЕНТ ── */}
      <div
        className="flex-1 min-h-0 pb-28"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 pt-14 pb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#0052FF" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-bold text-[22px] text-[#012A81]">Профіль</span>
          <div className="w-9" />
        </div>

        {/* HERO ФОТО */}
        <div className="mx-6 rounded-[28px] overflow-hidden relative h-75"
          style={{ boxShadow: '0 8px 28px rgba(0,30,140,0.15)' }}>
          <img
            src={
              user?.avatar ??
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
            }
            alt={user?.name ?? 'Профіль'}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, transparent 35%, rgba(49,115,253,0.45) 65%, rgba(0,50,200,0.82) 100%)',
          }} />
          <span
            className="absolute bottom-4.5 left-5 font-bold text-[26px] text-white"
            style={{ textShadow: '0 2px 8px rgba(0,20,100,0.4)' }}
          >
            {user?.name?.split(' ')[0] ?? 'Вікторія'}
          </span>
        </div>

        {/* БІОГРАФІЯ */}
        <p className="px-6 pt-6 pb-2 font-bold text-[16px] text-[#0052FF]">
          Біографія / про себе
        </p>
        <p className="px-6 pb-2 text-[13.5px] font-medium text-[#3a4060] leading-relaxed">
          {user?.bio ??
            `Привіт! Я ${user?.name}. Працюю в креативній сфері, тому ціную естетику та затишок у домі. Люблю ранки з фільтр-кавою та вечори за цікавою книгою. Я за повагу до особистого простору, але завжди рада обговорити плани на вихідні.`}
        </p>

        {/* МЕНЮ */}
        <div className="flex flex-col px-6 mt-3">
          {menuItems.map(({ key, label, icon }, idx, arr) => (
            <div key={key}>
              <button
                onClick={() => setInnerView(key)}
                className="w-full flex items-center justify-between py-4 bg-transparent border-none cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  {icon}
                  <span className="font-semibold text-[14px] text-[#012A81]">{label}</span>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="#0052FF" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {idx < arr.length - 1 && (
                <div className="h-px bg-[rgba(41,121,255,0.1)]" />
              )}
            </div>
          ))}
        </div>

        {/* КНОПКА ВИЙТИ */}
        <div className="px-6 pt-8 pb-4">
          <button
            onClick={onLogout}
            className="w-full h-12 rounded-3xl font-bold text-[15px] text-white border-none cursor-pointer active:scale-[0.98] transition-transform"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #0052FF 100%)',
              boxShadow: '0 8px 20px rgba(0,82,255,0.35)',
            }}
          >
            Вийти
          </button>
        </div>

      </div>

      {/* BOTTOM NAV */}
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

export default ProfileScreen;
