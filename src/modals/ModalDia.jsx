import { useState, useEffect } from 'react';
import { ModalOverlay } from "./ModalOverlay";
import { SOCIAL_TEST_ACCOUNTS } from "../data/socialTestAccounts";
import { DiaIcon } from '../components/Icons/SocialIcons';

const QR_CELLS = Array.from({ length: 100 }, (_, i) => Math.random() > 0.45);

export const DiaAuthModal = ({ onClose, onSuccess }) => {
  const [phase, setPhase] = useState('qr'); // 'qr' | 'scanning' | 'done'

  useEffect(() => {
    if (phase !== 'qr') return;
    const t1 = setTimeout(() => setPhase('scanning'), 3000);
    return () => clearTimeout(t1);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'scanning') return;
    const t2 = setTimeout(() => {
      setPhase('done');
      setTimeout(() => onSuccess(SOCIAL_TEST_ACCOUNTS.dia), 800);
    }, 1500);
    return () => clearTimeout(t2);
  }, [phase]);

  return (
    <ModalOverlay onClose={onClose}>
      <div className="rounded-[28px] pb-8 pt-5 px-6"
        style={{ background: '#1c1c1e' }}>

        {/* Хедер */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <DiaIcon />
            <span className="font-bold text-[16px] text-white">Увійти через Дія</span>
          </div>
          <button onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-[#ebebf599] text-[20px] leading-none">
            ✕
          </button>
        </div>

        {/* QR або статус */}
        <div className="rounded-[20px] p-5 flex flex-col items-center gap-4"
          style={{ background: '#2c2c2e' }}>

          {phase === 'qr' && (
            <>
              {/* QR на темному фоні */}
              <div className="bg-white rounded-xl p-3">
                <div className="w-36 h-36 grid"
                  style={{ gridTemplateColumns: 'repeat(10, 1fr)', gap: 1 }}>
                  {QR_CELLS.map((filled, i) => (
                    <div key={i} style={{
                      background: filled ? '#1c1c1e' : 'transparent',
                      borderRadius: 1,
                    }} />
                  ))}
                </div>
              </div>
              <p className="text-[13px] font-semibold text-white text-center">
                Відскануйте QR-код у застосунку{' '}
                <span style={{ color: '#00c37c' }}>Дія</span>
              </p>
              <p className="text-[11px] text-center" style={{ color: '#ebebf599' }}>
                Код діє 3 хвилини
              </p>
            </>
          )}

          {phase === 'scanning' && (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
                style={{ borderColor: '#00c37c', borderTopColor: 'transparent' }} />
              <p className="text-[14px] font-semibold text-white">Верифікація…</p>
              <p className="text-[12px]" style={{ color: '#ebebf599' }}>
                Підтвердьте вхід у застосунку Дія
              </p>
            </div>
          )}

          {phase === 'done' && (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: '#00c37c' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-[14px] font-bold text-white">Особу підтверджено!</p>
            </div>
          )}
        </div>

        <p className="text-[11px] text-center mt-4 leading-relaxed" style={{ color: '#ebebf599' }}>
          Авторизація через державний застосунок Дія. Ваші дані захищені.
        </p>

        <button onClick={onClose}
          className="w-full mt-3 py-2 bg-transparent border-none cursor-pointer text-[13px] font-medium"
          style={{ color: '#0a84ff' }}>
          Скасувати
        </button>
      </div>
    </ModalOverlay>
  );
};
