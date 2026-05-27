import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import InputField from '../../components/InputField/InputField';
import BtnPill from '../../components/BtnPill/BtnPill';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import { GoogleIcon, AppleIcon, DiaIcon } from '../../components/Icons/SocialIcons';
import { BackIcon } from '../../components/Icons/Icons';
import { FieldError } from '../../components/FieldError/FieldError';
import { GoogleAuthModal } from '../../modals/ModalGoogle';
import { DiaAuthModal } from '../../modals/ModalDia';
import { AppleAuthModal } from '../../modals/ModalApple';

const LoginScreen = ({ onBack, onNext, onNextToCategory, onForgot, onRegister }) => {
  const { login, register } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});
  const [socialModal, setSocialModal] = useState(null);

  const handleLogin = () => {
    setErrors({});
    const result = login({ email, password });
    if (!result.ok) {
      setErrors({ [result.field]: result.error });
      return;
    }
    onNext();
  };

  const handleSocialSuccess = ({ name, email }) => {
    setSocialModal(null);

    // Існуючий юзер → одразу home
    const loginResult = login({ email, password: 'Social2024!' });
    if (loginResult.ok) { onNext(); return; }

    // Новий юзер → реєструємо і ведемо на вибір категорії
    const registerResult = register({ name, email, password: 'Social2024!', confirm: 'Social2024!' });
    if (registerResult.ok) onNextToCategory();
  };

  return (
    <div className="flex flex-col w-full min-h-full bg-[#f1f2f6] font-montserrat px-6">

      {/* Top bar */}
      <div className="flex items-center justify-center relative pt-13 pb-7 shrink-0">
        <button onClick={onBack} className="absolute left-0 bg-transparent border-none cursor-pointer">
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
        <BtnPill className="font-semibold" onClick={() => setSocialModal('google')}><GoogleIcon /> Продовжити з Google</BtnPill>
        <BtnPill className="font-semibold" onClick={() => setSocialModal('dia')}><DiaIcon /> Продовжити з Дія</BtnPill>
        <BtnPill className="font-semibold" onClick={() => setSocialModal('apple')}><AppleIcon /> Продовжити з Apple</BtnPill>
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

      {socialModal === 'google' && <GoogleAuthModal onClose={() => setSocialModal(null)} onSuccess={handleSocialSuccess} />}
      {socialModal === 'dia'    && <DiaAuthModal    onClose={() => setSocialModal(null)} onSuccess={handleSocialSuccess} />}
      {socialModal === 'apple'  && <AppleAuthModal  onClose={() => setSocialModal(null)} onSuccess={handleSocialSuccess} />}

    </div>
  );
};

export default LoginScreen;