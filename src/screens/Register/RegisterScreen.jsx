import { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import BtnPill from '../../components/BtnPill/BtnPill';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import { GoogleIcon, AppleIcon, DiaIcon } from '../../components/Icons/SocialIcons';

const BackIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
    stroke="#0052ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const RegisterScreen = ({ onBack, onNext, onLogin }) => {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');

  return (
    <div className="flex flex-col w-full min-h-full bg-[#f1f2f6] font-montserrat overflow-y-auto px-6 pb-15">

      {/* Top bar */}
<div className="flex items-center relative pt-13 pb-7 gap-2 shrink-0">
  {/* Кнопка залишається на своєму місці ліворуч */}
  <button
    onClick={onBack}
    className="flex items-center bg-transparent border-none cursor-pointer shrink-0 z-10"
  >
    <BackIcon />
  </button>
  
  {/* Заголовок тепер завжди чітко по центру контейнера */}
<span className="absolute left-1/2 top-[47%] -translate-x-1/2 text-[22px] font-bold text-[#012A81] whitespace-nowrap">
    Зареєструватися
  </span>
</div>

      {/* Fields */}
      <InputField
        label="Ваше ім'я"
        type="text"
        placeholder="Введіть ваше ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label="Email"
        type="email"
        placeholder="Введіть email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Пароль"
        type="password"
        placeholder="Введіть пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        label="Підтвердити пароль"
        type="password"
        placeholder="Введіть підтверджений пароль"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      {/* Register button */}
      <BtnPill className="text-[16px] mt-6" onClick={onNext}>
        Зареєструватися
      </BtnPill>

      {/* Login link */}
      <p className="text-center mt-5 text-[13px] font-bold text-[#012A81]">
        Вже є акаунт?{' '}
        <span onClick={onLogin} className="text-[#0052ff] font-bold cursor-pointer">
          Увійти
        </span>
      </p>

      {/* Social logins */}
      <div className="mt-8 flex flex-col gap-3">
        <BtnPill className="font-semibold">
            <GoogleIcon />
          Продовжити з Google
        </BtnPill>
        <BtnPill className="font-semibold">
          <DiaIcon />
          Продовжити з Дія
        </BtnPill>
        <BtnPill className="font-semibold">
          <AppleIcon />
          Продовжити з Apple
        </BtnPill>
      </div>

      {/* Step button — в потоці, скролиться разом з контентом */}
      <div className="flex justify-center mt-16">
        <StepIndicator step={3} position="relative" />
      </div>

    </div>
  );
};

export default RegisterScreen;