import { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import BtnPill from '../../components/BtnPill/BtnPill';
import StepIndicator from '../../components/StepIndicator/StepIndicator.jsx';
import { GoogleIcon, AppleIcon } from '../../components/Icons/SocialIcons.jsx';

const BackIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
    stroke="#0052ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const LoginScreen = ({ onBack, onNext, onForgot, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col w-107.5 min-h-233 bg-[#f1f2f6] font-montserrat overflow-hidden px-6">

      {/* Top bar */}
      <div className="flex items-center justify-center relative pt-13 pb-7">
        <button
          onClick={onBack}
          className="absolute left-0 flex items-center bg-transparent border-none cursor-pointer"
        >
          <BackIcon />
        </button>
        <span className="text-[22px] font-bold text-[#0f1e5c]">Увійти</span>
      </div>

      {/* Fields */}
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

      {/* Login button */}
      <BtnPill className="text-[16px] mt-6" onClick={onNext}>
        Увійти
      </BtnPill>

      {/* Forgot password */}
      <p
        onClick={onForgot}
        className="text-center mt-3.5 text-[13px] font-bold text-[#0f1e5c] cursor-pointer"
      >
        Забули пароль?
      </p>

      {/* Social logins */}
      <div className="mt-8 flex flex-col gap-3">
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

      {/* Register link */}
      <p className="text-center mt-7 text-[13px] font-bold text-[#0f1e5c]">
        Немає акаунту?{' '}
        <span
          onClick={onRegister}
          className="text-[#0052ff] font-bold cursor-pointer"
        >
          Зареєструйся
        </span>
      </p>

      {/* Step button */}
      <div className="flex justify-center mt-10.5 mb-12.5">
        <StepIndicator step={2} onClick={onNext} />
      </div>
    </div>
  );
};

export default LoginScreen;