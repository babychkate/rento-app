import { useState } from 'react';
import ContractReviewScreen from './ContractReviewScreen';
import BottomNav from '../../components/BottomNav/BottomNav';

const Input = ({ label, placeholder, value, onChange, type = 'text' }) => (
  <div className="flex flex-col gap-2">
    <label className="font-semibold text-[13px] text-[#012A81]">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-[18px] py-[14px] rounded-full
        border-[2px] border-[#2979ff] bg-[#dde5f6]
        font-montserrat text-[14px] text-[#0f1e5c]
        outline-none appearance-none
        shadow-[inset_0_3px_8px_rgba(41,121,255,0.08),0_4px_14px_rgba(41,121,255,0.15)]
        placeholder:text-[#4b5b7e]"
    />
  </div>
);

const Step2Stub = ({ onBack }) => (
  <div className="relative w-full h-full flex flex-col font-montserrat bg-white">
    <div className="flex items-center justify-between px-6 pt-14 pb-6">
      <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16 20L8 12L16 4" stroke="#0052FF" strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <span className="font-bold text-[22px] text-[#012A81]">Оформлення угоди</span>
      <div className="w-8" />
    </div>
    <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
      <div className="w-20 h-20 rounded-full bg-[#eef3ff] flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M9 12l2 2 4-4" stroke="#0052FF" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="9" stroke="#0052FF" strokeWidth="2"/>
        </svg>
      </div>
      <p className="font-bold text-[20px] text-[#012A81] text-center">Крок 2/3</p>
      <div className="bg-white rounded-2xl px-6 py-5 text-center max-w-xs shadow-[0_4px_16px_rgba(0,30,140,0.08)]">
        <p className="text-[14px] text-[#4b5b7e] leading-relaxed">
          Тут буде перегляд заповненого договору та підтвердження перед підписанням через ДІЯ
        </p>
      </div>
    </div>
  </div>
);

const ContractFormScreen = ({ property, onBack, onCancel, onFinish }) => {
  const [name,       setName]       = useState('');
  const [surname,    setSurname]    = useState('');
  const [rnokpp,     setRnokpp]     = useState('');
  const [useProfile, setUseProfile] = useState(false);
  const [showStep2,  setShowStep2]  = useState(false);
  const [activeTab,  setActiveTab]  = useState('home');

  const handleUseProfile = (checked) => {
    setUseProfile(checked);
    if (checked) {
      try {
        const raw = localStorage.getItem('rento_user');
        if (!raw) { setUseProfile(false); return; }
        const stored = JSON.parse(raw);
        const fullName = (stored.name || '').trim();
        if (!fullName) { setUseProfile(false); return; }
        const parts = fullName.split(/\s+/);
        // є тільки ім'я — заповнюємо тільки ім'я
        setName(parts[0] || '');
        // є прізвище — заповнюємо і його
        setSurname(parts.length > 1 ? parts.slice(1).join(' ') : '');
      } catch {
        setUseProfile(false);
      }
    } else {
      setName('');
      setSurname('');
    }
  };

  const validateRnokpp = (value) => {
    if (!/^\d{10}$/.test(value)) return false;
    const d = value.split('').map(Number);
    const weights = [-1, 5, 7, 9, 4, 6, 10, 5, 7];
    const sum = weights.reduce((acc, w, i) => acc + w * d[i], 0);
    return (sum % 11) % 10 === d[9];
  };

  const rnokppValid = validateRnokpp(rnokpp);
  const isValid = name.trim() && surname.trim() && rnokppValid;

  if (showStep2) {
    return (
      <ContractReviewScreen
        property={property}
        userData={{ name, surname, rnokpp }}
        onBack={() => setShowStep2(false)}
        onFinish={onFinish}
      />
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">

      {/* TOP BAR — як у ContractScreen */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-14 pb-4">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 20L8 12L16 4" stroke="#0052FF" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="font-bold text-[22px] text-[#012A81]">Оформлення угоди</span>
        <div className="w-8" />
      </div>

      {/* SCROLLABLE */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-6 pb-28"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* Крок + заголовок */}
        <div className="flex items-center justify-between mt-4 mb-8">
          <span className="font-bold text-[17px] text-[#012A81]">Крок 1/3</span>
          <span className="font-bold text-[17px] text-[#012A81]">Заповнення даних</span>
        </div>

        {/* Поля */}
        <div className="flex flex-col gap-6">
          <Input
            label="Ваше ім'я"
            placeholder="Введіть ваше ім'я"
            value={name}
            onChange={setName}
          />
          <Input
            label="Прізвище"
            placeholder="Введіть ваше прізвище"
            value={surname}
            onChange={setSurname}
          />
          <Input
            label="РНОКПП"
            placeholder="Введіть РНОКПП"
            value={rnokpp}
            onChange={setRnokpp}
            type="number"
          />
          {rnokpp.length > 0 && (
            rnokpp.length !== 10
              ? <p className="text-[12px] text-[#f59e0b] px-2 -mt-1">
                  РНОКПП має містити рівно 10 цифр (зараз {rnokpp.length})
                </p>
              : !rnokppValid
                ? <p className="text-[12px] text-[#f59e0b] px-2 -mt-1">
                    Невірна контрольна цифра — перевірте номер
                  </p>
                : <p className="text-[12px] text-[#22c55e] px-2 -mt-1">
                    ✓ Номер коректний
                  </p>
          )}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-7 mb-5">
          {[0, 1, 2].map(i => (
            <div key={i} className="rounded transition-all duration-200"
              style={{
                width: i === 0 ? 22 : 8,
                height: 8,
                borderRadius: 4,
                background: i === 0 ? '#2979ff' : 'rgba(41,121,255,0.25)',
              }} />
          ))}
        </div>

        {/* Примітка */}
        <p className="text-[12px] text-[#4b5b7e] mb-4 leading-relaxed">
          *дані будуть автоматично додані в текст договору
        </p>

        {/* Чекбокс */}
        <label className="flex items-center gap-3 cursor-pointer mb-7">
          <input
            type="checkbox"
            checked={useProfile}
            onChange={e => handleUseProfile(e.target.checked)}
            className="sr-only"
          />
          <div className={[
            'w-5 h-5 rounded-[5px] flex items-center justify-center flex-shrink-0 transition-all duration-200',
            useProfile
              ? 'bg-[#2979ff] border-[2px] border-[#2979ff]'
              : 'bg-white border-[2px] border-[#2979ff]',
          ].join(' ')}>
            {useProfile && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span className="font-medium text-[13px] text-[#012A81]">
            використовувати дані з профілю
          </span>
        </label>

        {/* Кнопки */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => { if (isValid) setShowStep2(true); }}
            disabled={!isValid}
            className={[
              'w-full py-[16px] rounded-full font-bold text-[16px] text-white',
              'border-[1.5px] border-white/60 transition-opacity duration-200',
              'bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)]',
              isValid
                ? 'cursor-pointer opacity-100 shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.5)]'
                : 'opacity-40 cursor-not-allowed',
            ].join(' ')}>
            Далі
          </button>
          <button
            onClick={onCancel}
            className="w-full py-[16px] rounded-full font-bold text-[16px] text-[#012A81]
              bg-white border-[2px] border-[rgba(41,121,255,0.2)] cursor-pointer
              shadow-[0_3px_10px_rgba(0,30,120,0.08)]">
            Скасувати
          </button>
        </div>

      </div>

      {/* BOTTOM NAV */}
      <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default ContractFormScreen;
