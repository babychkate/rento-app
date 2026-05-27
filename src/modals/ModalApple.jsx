import { useState, useEffect } from 'react';
import { ModalOverlay } from "./ModalOverlay";
import { SOCIAL_TEST_ACCOUNTS } from "../data/socialTestAccounts"

export const AppleAuthModal = ({ onClose, onSuccess }) => {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'faceid' | 'done'

  const handleSignIn = () => {
    setPhase('faceid');
    setTimeout(() => {
      setPhase('done');
      setTimeout(() => onSuccess(SOCIAL_TEST_ACCOUNTS.apple), 700);
    }, 1800);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="rounded-t-[28px] pb-8 pt-6 px-6"
        style={{ background: '#1c1c1e' }}>

        {/* Apple лого */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <span className="font-bold text-[17px] text-white">Увійти через Apple</span>
          <p className="text-[12px] text-[#ebebf599] text-center mt-1">
            Додаток <span className="text-white font-semibold">RENTO</span> запитує дозвіл на використання вашого Apple ID
          </p>
        </div>

        {/* Акаунт */}
        <div className="rounded-2xl px-4 py-3 mb-4"
          style={{ background: '#2c2c2e' }}>
          <p className="text-[11px] text-[#ebebf599] mb-0.5">Apple ID</p>
          <p className="text-[14px] font-semibold text-white">{SOCIAL_TEST_ACCOUNTS.apple.email}</p>
        </div>

        {/* Приховати email */}
        <div className="rounded-2xl px-4 py-3 mb-6 flex items-center justify-between"
          style={{ background: '#2c2c2e' }}>
          <div>
            <p className="text-[13px] font-medium text-white">Приховати email</p>
            <p className="text-[11px] text-[#ebebf599] mt-0.5">Буде створено анонімний email</p>
          </div>
          {/* Toggle */}
          <div className="w-11 h-6 rounded-full flex items-center px-0.5"
            style={{ background: '#34c759' }}>
            <div className="w-5 h-5 rounded-full bg-white ml-auto" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
          </div>
        </div>

        {/* Face ID / кнопка */}
        {phase === 'idle' && (
          <button onClick={handleSignIn}
            className="w-full h-12 rounded-2xl font-semibold text-[15px] border-none cursor-pointer active:scale-[0.98] transition-transform"
            style={{ background: 'white', color: '#1c1c1e' }}>
            Продовжити
          </button>
        )}

        {phase === 'faceid' && (
          <div className="flex flex-col items-center gap-3 py-2">
            {/* Face ID анімація */}
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-[14px] border-2 border-white/30 animate-pulse" />
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="absolute inset-0">
                {/* Кути Face ID */}
                <path d="M4 16V8a4 4 0 014-4h8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M52 16V8a4 4 0 00-4-4h-8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M4 40v8a4 4 0 004 4h8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M52 40v8a4 4 0 01-4 4h-8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                {/* Очі */}
                <circle cx="20" cy="24" r="2.5" fill="white"/>
                <circle cx="36" cy="24" r="2.5" fill="white"/>
                {/* Посмішка */}
                <path d="M20 34c0 0 2.5 4 8 4s8-4 8-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[13px] font-medium text-white">Face ID…</p>
          </div>
        )}

        {phase === 'done' && (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#34c759]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="text-[13px] font-medium text-white">Підтверджено</p>
          </div>
        )}

        <button onClick={onClose}
          className="w-full mt-3 py-2 bg-transparent border-none cursor-pointer text-[13px] font-medium"
          style={{ color: '#0a84ff' }}>
          Скасувати
        </button>
      </div>
    </ModalOverlay>
  );
};