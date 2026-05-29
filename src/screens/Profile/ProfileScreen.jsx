import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import BottomNav from '../../components/BottomNav/BottomNav';
import PrivacyScreen from '../Privacy/PrivacyScreen';
import SecurityScreen from '../Security/SecurityScreen';
import AccountSettingsScreen from '../AccountSettings/AccountSettingsScreen';
import { AccountIcon, SecurityMenuIcon, PrivacyIcon } from '../../components/Icons/ProfileIcons';
import { BackIcon, ArrowIcon } from '../../components/Icons/Icons';

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────

const ProfileScreen = ({ onBack, onLogout, activeTab, onTabChange }) => {
  const { user } = useAuth();
  const [innerView, setInnerView] = useState(null);

if (innerView === 'security') {
    return (
      <SecurityScreen
        onBack={() => setInnerView(null)}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    );
  }
  if (innerView === 'account') {
  return <AccountSettingsScreen onBack={() => setInnerView(null)} />;
  }
if (innerView === 'privacy') {
  return (
    <PrivacyScreen
      onBack={() => setInnerView(null)}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
}

  const menuItems = [
    { key: 'account', label: 'Налаштування акаунта', icon: <AccountIcon /> },
    { key: 'security', label: 'Центр питань та безпеки', icon: <SecurityMenuIcon /> },
    { key: 'privacy', label: 'Конфіденційність', icon: <PrivacyIcon /> },
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
                <ArrowIcon />
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
      onTabChange(tab);
    }}
  />
      </div>
    </div>
  );
};

export default ProfileScreen;
