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

const RegisterScreen = ({ onBack, onNext, onLogin }) => {
  const { register } = useAuth();

  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [errors, setErrors]     = useState({});

  const handleRegister = () => {
    setErrors({});
    const result = register({ name, email, password, confirm });
    if (!result.ok) {
      setErrors({ [result.field]: result.error });
      return;
    }
    // реєстрація успішна → логін
    onNext();
  };

  return (
    <div className="flex flex-col w-full min-h-full bg-[#f1f2f6] font-montserrat overflow-y-auto px-6 pb-15">

      {/* Top bar */}
      <div className="flex items-center relative pt-13 pb-7 gap-2 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center bg-transparent border-none cursor-pointer shrink-0 z-10"
        >
          <BackIcon />
        </button>
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
      <FieldError message={errors.name} />

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
        placeholder="Мінімум 8 символів, є цифра"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FieldError message={errors.password} />

      <InputField
        label="Підтвердити пароль"
        type="password"
        placeholder="Введіть пароль ще раз"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <FieldError message={errors.confirm} />

      {/* Register button */}
      <BtnPill className="text-[16px] mt-6" onClick={handleRegister}>
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

      {/* Step button */}
      <div className="flex justify-center mt-16">
        <StepIndicator step={2} position="relative" />
      </div>

    </div>
  );
};

export default RegisterScreen;
