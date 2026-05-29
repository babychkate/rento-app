import { useState } from 'react';
import { BackIcon } from '../../components/Icons/Icons';
import BottomNav from '../../components/BottomNav/BottomNav';

const PrivacyScreen = ({ onBack, activeTab, onTabChange }) => {
  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">

      {/* TOP BAR */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-14 pb-10">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <BackIcon />
        </button>
        <span className="font-bold text-[22px] text-[#012A81]">Конфіденційність</span>
        <div className="w-8" />
      </div>

      {/* SCROLLABLE */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-6 pb-28"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* СЕКЦІЯ 1 */}
        <p className="font-bold text-[14px] text-[#012A81] mb-2">Які дані ми збираємо</p>
        <p className="text-[13px] text-[#333] leading-relaxed mb-3">
          Для надання якісного сервісу ми збираємо такі дані:
        </p>
        <ul className="text-[13px] text-[#333] leading-relaxed mb-6 space-y-1.5">
          {[
            "Ім'я, прізвище та контактна інформація",
            'Електронна адреса та номер телефону',
            'Дані про пристрій та браузер',
            'Інформація про активність у застосунку',
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#2979ff] flex-shrink-0 mt-0.5">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="h-px bg-[rgba(41,121,255,0.12)] mb-6" />

        {/* СЕКЦІЯ 2 */}
        <p className="font-bold text-[14px] text-[#012A81] mb-2">Як ми використовуємо дані</p>
        <p className="text-[13px] text-[#333] leading-relaxed mb-3">
          Зібрані дані використовуються виключно для:
        </p>
        <ol className="text-[13px] text-[#333] leading-relaxed space-y-2 mb-6">
          {[
            'Надання та покращення наших послуг',
            'Персоналізації вашого досвіду',
            'Зв\'язку з вами щодо вашого акаунту',
            'Забезпечення безпеки платформи',
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#2979ff] font-semibold flex-shrink-0">{i + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>

        <div className="h-px bg-[rgba(41,121,255,0.12)] mb-6" />

        {/* СЕКЦІЯ 3 */}
        <p className="font-bold text-[14px] text-[#012A81] mb-2">Захист ваших даних</p>
        <p className="text-[13px] text-[#333] leading-relaxed mb-3">
          Ми серйозно ставимось до захисту персональних даних:
        </p>
        <ul className="text-[13px] text-[#333] leading-relaxed mb-4 space-y-1.5">
          {[
            'Всі дані зберігаються на захищених серверах',
            'Використовується шифрування при передачі даних',
            'Доступ до даних мають лише уповноважені співробітники',
            'Регулярно проводимо аудит безпеки',
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#2979ff] flex-shrink-0 mt-0.5">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="bg-[#eefbf0] rounded-xl px-4 py-3 mb-6">
          <p className="font-semibold text-[13px] text-[#166534] mb-1">✅ Ваші права</p>
          <p className="text-[13px] text-[#333] leading-relaxed">
            Ви маєте право запросити доступ, виправлення або видалення ваших персональних даних у будь-який час.
          </p>
        </div>

        <div className="h-px bg-[rgba(41,121,255,0.12)] mb-6" />

        {/* СЕКЦІЯ 4 */}
        <p className="font-bold text-[14px] text-[#012A81] mb-2">Передача даних третім особам</p>
        <p className="text-[13px] text-[#333] leading-relaxed mb-4">
          Ми не продаємо та не передаємо ваші персональні дані третім особам без вашої згоди, за винятком випадків передбачених законодавством.
        </p>

        <div className="bg-[#fff8e6] rounded-xl px-4 py-3">
          <p className="font-semibold text-[13px] text-[#b45309] mb-1">⚠ Зверніть увагу</p>
          <p className="text-[13px] text-[#333] leading-relaxed">
            З питань конфіденційності звертайтесь: privacy@rento.ua
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
};

export default PrivacyScreen;