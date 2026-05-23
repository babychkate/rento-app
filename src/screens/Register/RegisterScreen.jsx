import { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import BtnPill from '../../components/BtnPill/BtnPill';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import { GoogleIcon, AppleIcon } from '../../components/Icons/SocialIcons';

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
        <button
          onClick={onBack}
          className="flex items-center bg-transparent border-none cursor-pointer shrink-0"
        >
          <BackIcon />
        </button>
        <span className="text-[22px] font-bold text-[#0f1e5c]">Зареєструватися</span>
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

      {/* Or row */}
      <p className="text-center mt-2.5 text-[12px] font-medium text-[#8a9ab8]">
        або увійти
      </p>

      {/* Social logins */}
      <div className="mt-4 flex flex-col gap-3">
        <BtnPill>
          <span className="w-7 h-7 rounded-md bg-white flex items-center justify-center shrink-0">
            <GoogleIcon />
          </span>
          Continue with Google
        </BtnPill>
        <BtnPill>
          <span className="w-7 h-7 rounded-md bg-white/20 border border-white/50 flex items-center justify-center shrink-0 text-white text-[10px] font-bold tracking-tight">
            Дія
          </span>
          Continue with Дія
        </BtnPill>
        <BtnPill>
          <span className="w-7 h-7 rounded-md bg-white/15 flex items-center justify-center shrink-0">
            <AppleIcon />
          </span>
          Continue with Apple
        </BtnPill>
      </div>

      {/* Login link */}
      <p className="text-center mt-5 text-[13px] font-bold text-[#0f1e5c]">
        Вже є акаунт?{' '}
        <span onClick={onLogin} className="text-[#0052ff] font-bold cursor-pointer">
          Увійти
        </span>
      </p>

      {/* Step button — в потоці, скролиться разом з контентом */}
      <div className="flex justify-center mt-16">
        <StepIndicator step={3} position="relative" />
      </div>

    </div>
  );
};

export default RegisterScreen;