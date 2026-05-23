import { useState } from 'react';

const EyeOpenIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#2979ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#2979ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/**
 * @param {string}  label       - field label text
 * @param {string}  type        - 'email' | 'password' | 'text'
 * @param {string}  placeholder
 * @param {string}  value
 * @param {fn}      onChange
 */
const InputField = ({ label, type = 'text', placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const inputClass = [
    'w-full px-[18px] py-[14px] rounded-full',
    'border-[2.5px] border-[#2979ff] bg-[#dde5f6]',
    'font-[family-name:var(--font-montserrat)] text-[14px] text-[#0f1e5c]',
    'outline-none appearance-none',
    'shadow-[inset_0_3px_8px_rgba(41,121,255,0.08),0_4px_14px_rgba(41,121,255,0.15),inset_0_-2px_0_rgba(41,121,255,0.12)]',
    'placeholder:text-[#4b5b7e]',  // ← темніший сірий
    isPassword ? 'pr-[50px]' : '',
  ].join(' ');

  return (
    <div className="w-full">
      <p className="text-[13px] font-semibold text-[#012A81] mb-1.75 mt-4">  {/* ← #012A81 */}
        {label}
      </p>
      <div className="relative w-full">
        <input
          className={inputClass}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={isPassword ? 'new-password' : 'off'}
        />
        {isPassword && (
          <button
            type="button"
            aria-label="Показати пароль"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center p-1 bg-transparent border-none cursor-pointer z-10"
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;