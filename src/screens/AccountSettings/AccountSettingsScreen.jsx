import { useState, useRef } from 'react';
import { useAuth } from '../../auth/AuthContext';

// ─── КОНСТАНТИ ────────────────────────────────────────────────────────────────

const CITIES = [
  'Київ', 'Львів', 'Одеса', 'Тернопіль',
  'Харків', 'Івано-Франківськ', 'Луцьк', 'Чернівці',
];

const VALID_EMAIL_DOMAINS = [
  'gmail.com', 'ukr.net', 'i.ua', 'meta.ua', 'ukrpost.ua',
  'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com',
  'lnu.edu.ua', 'lnam.edu.ua', 'kpi.ua', 'nau.edu.ua',
];

// ─── ВАЛІДАЦІЯ ────────────────────────────────────────────────────────────────

const hasDigits = (str) => /\d/.test(str);

const validateEmail = (email) => {
  if (!email) return null;
  if (!email.includes('@')) return 'Email має містити символ @';
  const [local, domain] = email.split('@');
  if (!local) return 'Вкажіть адресу перед @';
  if (!domain) return 'Вкажіть домен після @';
  if (!VALID_EMAIL_DOMAINS.includes(domain.toLowerCase()))
    return 'Допустимі: gmail.com, ukr.net, outlook.com…';
  return null;
};

const validatePhone = (phone) => {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  if (digits.length > 0 && digits.length < 10) return 'Введіть повний номер (мінімум 10 цифр)';
  if (digits.length > 12) return 'Номер задовгий';
  return null;
};

// ─── ДОПОМІЖНІ КОМПОНЕНТИ ────────────────────────────────────────────────────

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 19l-7-7 7-7" stroke="#0052FF" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SectionLabel = ({ children }) => (
  <p className="font-bold text-[14px] text-[#012A81] mt-6 mb-3 ml-3">{children}</p>
);

const FieldError = ({ msg }) =>
  msg ? <p className="text-[12px] text-[#ef4444] font-medium mt-1.5 ml-3">{msg}</p> : null;

const inputStyle = (hasError) =>
  [
    'w-full h-12 rounded-3xl px-6 font-montserrat text-[14px] font-medium',
    'text-[#012A81] outline-none transition-all placeholder:text-[#8fa0c4]',
    hasError
      ? 'bg-[#fee2e2] border-2 border-[#ef4444]'
      : 'bg-[#e2e7f6] border-2 border-[#0052FF]',
  ].join(' ');

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────

const AccountSettingsScreen = ({ onBack }) => {
  const { user, updateUser } = useAuth();

  // user shape (розширений):
  // { id, name, email, password, category, role, createdAt,
  //   firstName?, lastName?, city?, phone?, bio?, avatar? }
  const nameParts = (user?.name ?? '').split(' ');

  const initial = {
    firstName: user?.firstName ?? nameParts[0] ?? '',
    lastName:  user?.lastName  ?? nameParts[1] ?? '',
    city:      user?.city  ?? '',
    email:     user?.email ?? '',
    phone:     user?.phone ?? '',
    avatar:    user?.avatar ?? null,
  };

  const [form, setForm]       = useState(initial);
  const [touched, setTouched] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(initial.avatar);
  const [saved, setSaved]     = useState(false);
  const fileRef = useRef(null);

  // ── Чи є зміни ────────────────────────────────────────────────────────────
  const isDirty =
    form.firstName !== initial.firstName ||
    form.lastName  !== initial.lastName  ||
    form.city      !== initial.city      ||
    form.email     !== initial.email     ||
    form.phone     !== initial.phone     ||
    avatarPreview  !== initial.avatar;

  const set = (field, value) => {
    setSaved(false);
    setForm(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // ── Помилки ────────────────────────────────────────────────────────────────
  const errors = {
    firstName: touched.firstName && hasDigits(form.firstName)
      ? "Ім'я не має містити цифри" : null,
    lastName: touched.lastName && hasDigits(form.lastName)
      ? 'Прізвище не має містити цифри' : null,
    email: touched.email ? validateEmail(form.email) : null,
    phone: touched.phone ? validatePhone(form.phone) : null,
  };
  const hasErrors = Object.values(errors).some(Boolean);
  const canSave   = isDirty && !hasErrors;

  // ── Аватарка через file input ──────────────────────────────────────────────
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('Файл занадто великий. Максимум 10 МБ.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarPreview(ev.target.result); // base64 data URL
      setSaved(false);
      setTouched(prev => ({ ...prev, avatar: true }));
    };
    reader.readAsDataURL(file);
  };

  // ── Збереження → updateUser → localStorage ────────────────────────────────
  const handleSave = () => {
    if (!canSave) return;
    // Показуємо помилки якщо є
    setTouched({ firstName: true, lastName: true, email: true, phone: true });
    if (hasErrors) return;

    updateUser({
      firstName: form.firstName,
      lastName:  form.lastName,
      // Оновлюємо name для сумісності з ProfileScreen, LandlordScreen тощо
      name:  [form.firstName, form.lastName].filter(Boolean).join(' ') || user?.name,
      city:  form.city,
      email: form.email,
      phone: form.phone,
      avatar: avatarPreview, // null або base64
    });

    setSaved(true);
    setTimeout(() => onBack?.(), 900);
  };

  const handleCancel = () => {
    setForm(initial);
    setAvatarPreview(initial.avatar);
    setTouched({});
    setSaved(false);
  };

  const avatarSrc = avatarPreview
    ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-[#f1f2f6]">
      <div
        className="flex-1 min-h-0 pb-12"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >

        {/* TOP BAR */}
        <div className="flex items-center pt-14 pb-8 px-6">
          <button onClick={onBack}
            className="w-9 h-9 flex items-center justify-start bg-transparent border-none cursor-pointer shrink-0">
            <BackIcon />
          </button>
          <span className="font-bold text-[24px] text-[#012A81] flex-1 text-center mr-9">
            Налаштування
          </span>
        </div>

        <div className="px-6">

          {/* ─── ПЕРСОНАЛЬНІ ДАНІ ─── */}
          <SectionLabel>Персональні дані</SectionLabel>
          <div className="flex flex-col gap-3">

            <div>
              <input type="text" placeholder="Імʼя"
                value={form.firstName} onChange={e => set('firstName', e.target.value)}
                className={inputStyle(errors.firstName)} />
              <FieldError msg={errors.firstName} />
            </div>

            <div>
              <input type="text" placeholder="Прізвище"
                value={form.lastName} onChange={e => set('lastName', e.target.value)}
                className={inputStyle(errors.lastName)} />
              <FieldError msg={errors.lastName} />
            </div>

            <div className="relative">
              <select value={form.city} onChange={e => set('city', e.target.value)}
                className={`${inputStyle(false)} appearance-none cursor-pointer pr-10`}>
                <option value="" disabled hidden>Місто проживання</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1l5 5 5-5" stroke="#0052FF" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* ─── ФОТО ПРОФІЛЮ ─── */}
          <SectionLabel>Фото профілю</SectionLabel>
          <div className="flex flex-col items-center gap-3">
            <input ref={fileRef} type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden" onChange={handleAvatarChange} />

            <button onClick={() => fileRef.current?.click()}
              className="relative bg-transparent border-none cursor-pointer p-0">
              <img src={avatarSrc} alt="Аватарка"
                className="w-27.5 h-27.5 rounded-full object-cover"
                style={{ border: '3px solid #0052FF' }} />
              <div className="absolute bottom-0 right-0 w-8.5 h-8.5 rounded-full bg-[#0052FF] flex items-center justify-center"
                style={{ border: '3px solid #f1f2f6', boxShadow: '0 4px 10px rgba(0,82,255,0.3)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="3" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            </button>

            <p className="text-[11px] font-medium text-[#728cb6] text-center">
              jpg, png, webp · до 10 МБ
            </p>
            <p className="text-[11px] font-medium text-[#a0aec0] text-center -mt-1">
              На телефоні відкриється галерея або камера
            </p>
          </div>

          {/* ─── КОНТАКТИ ─── */}
          <SectionLabel>Контакти</SectionLabel>
          <div className="flex flex-col gap-3">

            <div>
              <input type="email" placeholder="Email"
                value={form.email} onChange={e => set('email', e.target.value)}
                className={inputStyle(errors.email)} />
              <FieldError msg={errors.email} />
            </div>

            <div>
              <input type="tel" placeholder="+38(___) ___ __ __"
                value={form.phone} onChange={e => set('phone', e.target.value)}
                className={inputStyle(errors.phone)} />
              <FieldError msg={errors.phone} />
            </div>
          </div>

          {/* ─── GOOGLE ─── */}
          <button className="w-full flex items-center justify-center gap-2.5 bg-transparent border-none cursor-pointer font-bold text-[14px] text-[#012A81] my-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google" className="w-5 h-5" />
            Прив'язати до Google
          </button>

          {/* ─── КНОПКИ ─── */}
          <div className="flex flex-col gap-4 pb-6">
            <button onClick={handleSave} disabled={!canSave}
              className="w-full h-13.5 rounded-[27px] font-bold text-[16px] text-white border-none transition-all"
              style={{
                background: canSave
                  ? 'linear-gradient(180deg,#5386ff 0%,#0052ff 100%)'
                  : 'linear-gradient(180deg,#b0c4f8 0%,#8aa8f0 100%)',
                boxShadow: canSave ? '0 12px 24px rgba(0,82,255,0.35)' : 'none',
                cursor: canSave ? 'pointer' : 'not-allowed',
                opacity: canSave ? 1 : 0.65,
              }}>
              {saved ? '✓ Збережено!' : 'Зберегти налаштування'}
            </button>

            <button onClick={handleCancel} disabled={!isDirty}
              className="w-full h-13.5 rounded-[27px] font-bold text-[16px] text-white border-none transition-all"
              style={{
                background: isDirty
                  ? 'linear-gradient(180deg,#5386ff 0%,#0052ff 100%)'
                  : 'linear-gradient(180deg,#b0c4f8 0%,#8aa8f0 100%)',
                boxShadow: isDirty ? '0 12px 24px rgba(0,82,255,0.35)' : 'none',
                cursor: isDirty ? 'pointer' : 'not-allowed',
                opacity: isDirty ? 1 : 0.65,
              }}>
              Скасувати
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccountSettingsScreen;
