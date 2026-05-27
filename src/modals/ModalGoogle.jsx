import { useState, useEffect } from 'react';
import { ModalOverlay } from "./ModalOverlay";
import { SOCIAL_TEST_ACCOUNTS } from "../data/socialTestAccounts"

export const GoogleAuthModal = ({ onClose, onSuccess }) => {
  const [selected, setSelected] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleChoose = (account) => {
    setSelected(true);
    setLoading(true);
    setTimeout(() => {
      onSuccess({ name: account.name, email: account.email });
    }, 1200);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-white rounded-t-[28px] pb-8 pt-5 px-5">

        {/* Хедер */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            {/* Google G */}
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-bold text-[15px] text-[#202124]">Увійти через Google</span>
          </div>
          <button onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-[#5f6368] text-[20px] leading-none">
            ✕
          </button>
        </div>

        <p className="text-[12px] text-[#5f6368] mb-4 leading-snug">
          Оберіть акаунт для входу в <span className="font-semibold text-[#012A81]">RENTO</span>
        </p>

        {/* Акаунти */}
        <div className="flex flex-col gap-2 mb-5">
          <button onClick={() => handleChoose(SOCIAL_TEST_ACCOUNTS.google)}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl border-none cursor-pointer text-left transition-all"
            style={{
              background: selected ? '#e8f0fe' : '#f8f9fa',
              border: selected ? '1.5px solid #4285F4' : '1.5px solid transparent',
            }}>
            <img src={SOCIAL_TEST_ACCOUNTS.google.avatar} alt={SOCIAL_TEST_ACCOUNTS.google.name}
              className="w-10 h-10 rounded-full object-cover shrink-0" />
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="font-semibold text-[14px] text-[#202124] truncate">{SOCIAL_TEST_ACCOUNTS.google.name}</span>
              <span className="text-[12px] text-[#5f6368] truncate">{SOCIAL_TEST_ACCOUNTS.google.email}</span>
            </div>
            {selected && loading && (
              <div className="w-4 h-4 rounded-full border-2 border-[#4285F4] border-t-transparent animate-spin shrink-0" />
            )}
          </button>
        </div>

        <p className="text-[10px] text-[#5f6368] text-center leading-relaxed">
          Продовжуючи, ви погоджуєтесь з{' '}
          <span className="text-[#1a73e8]">Умовами використання</span> та{' '}
          <span className="text-[#1a73e8]">Політикою конфіденційності</span> Google
        </p>
      </div>
    </ModalOverlay>
  );
};