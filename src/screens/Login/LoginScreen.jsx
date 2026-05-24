import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
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

const FieldError = ({ message }) =>
  message ? <p className="text-red-500 text-[12px] font-medium mt-1 mb-1">{message}</p> : null;

const LoginScreen = ({ onBack, onNext, onForgot, onRegister }) => {
  const { login } = useAuth();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});

  const handleLogin = () => {
    setErrors({});
    const result = login({ email, password });
    if (!result.ok) {
      setErrors({ [result.field]: result.error });
      return;
    }
    onNext();
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#f1f2f6] font-montserrat px-6">

      {/* Top bar */}
      <div className="flex items-center justify-center relative pt-13 pb-7 shrink-0">
        <button
          onClick={onBack}
          className="absolute left-0 flex items-center bg-transparent border-none cursor-pointer"
        >
          <BackIcon />
        </button>
        <span className="text-[22px] font-bold text-[#012A81]">Увійти</span>
      </div>

      {/* Fields */}
      <InputField
        label="Email"
        type="email"
        placeholder="Введіть email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FieldError message={errors.email} />

      <InputField
        label="Пароль"
        type="password"
        placeholder="Введіть пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FieldError message={errors.password} />

      {/* Login button */}
      <BtnPill className="text-[16px] font-semibold mt-6" onClick={handleLogin}>
        Увійти
      </BtnPill>

      {/* Forgot password */}
      <p
        onClick={onForgot}
        className="text-center mt-3.5 text-[13px] font-bold text-[#012A81] cursor-pointer"
      >
        Забули пароль?
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

      {/* Register link */}
      <p className="text-center mt-7 text-[13px] font-bold text-[#012A81]">
        Немає акаунту?{' '}
        <span onClick={onRegister} className="text-[#0052ff] font-bold cursor-pointer">
          Зареєструйся
        </span>
      </p>

      {/* Step button */}
      <div className="flex justify-center mt-auto pb-15">
        <StepIndicator step={2} position="relative" />
      </div>

    </div>
  );
};

export default LoginScreen;
