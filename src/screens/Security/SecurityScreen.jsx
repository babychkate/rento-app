import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import { BackIcon } from '../../components/Icons/Icons';

const SecurityScreen = ({ onBack, activeTab, onTabChange  }) => {

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">

      {/* TOP BAR */}
      <div className="relative z-10 flex items-center gap-3 px-6 pt-14 pb-10">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <BackIcon />
        </button>
        <span className="font-bold text-[22px] text-[#012A81]">Центр питань та безпеки</span>
      </div>

      {/* SCROLLABLE */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-6 pb-28"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* ─── СЕКЦІЯ 1 ─── */}

        <p className="font-bold text-[14px] text-[#012A81] mb-2">Чек лист порад</p>
        <p className="text-[13px] text-[#333] leading-relaxed mb-3">
          У разі зникнення електропостачання, будь ласка, дотримуйтесь наступних рекомендацій:
        </p>
        <ul className="text-[13px] text-[#333] leading-relaxed mb-4 space-y-1.5">
          {[
            'Перевірте, чи є світло у сусідів (можливо, це загальне відключення)',
            'Переконайтесь, що автоматичні вимикачі у щитку не вимкнені',
            'Не намагайтесь самостійно усувати несправності, якщо не маєте відповідних навичок',
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#2979ff] flex-shrink-0 mt-0.5">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-[13px] text-[#333] leading-relaxed mb-2">
          Якщо проблему не вирішено — зверніться до нас:
        </p>
        <ul className="text-[13px] text-[#333] leading-relaxed mb-4 space-y-1.5">
          {[
            'Телефон: +38 (0XX) XXX-XX-XX',
            'Viber / Telegram: +38 (0XX) XXX-XX-XX',
            'Email: info@rento.ua',
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#2979ff] flex-shrink-0 mt-0.5">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-[13px] text-[#333] leading-relaxed mb-6">
          Ми оперативно відреагуємо та допоможемо вирішити проблему.
        </p>

        <div className="h-px bg-[rgba(41,121,255,0.12)] mb-6" />

        {/* ─── СЕКЦІЯ 2 ─── */}
        <p className="font-bold text-[14px] text-[#012A81] mb-2">Як підписати договір</p>
        <p className="text-[13px] text-[#333] leading-relaxed mb-3">
          Процес укладення договору простий і займає мінімум часу:
        </p>
        <ol className="text-[13px] text-[#333] leading-relaxed space-y-2 mb-6">
          {[
            "Ви залишаєте заявку на сайті або зв'язуєтесь з нами",
            'Ми узгоджуємо деталі послуг і умови співпраці',
            'Надсилаємо вам договір для ознайомлення',
            "Ви підписуєте договір зручним способом: онлайн (електронний підпис) або при зустрічі з нашим представником",
            'Після підписання ми розпочинаємо надання послуг',
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#2979ff] font-semibold flex-shrink-0">{i + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>

        <div className="h-px bg-[rgba(41,121,255,0.12)] mb-6" />

        {/* ─── СЕКЦІЯ 3 ─── */}
        <p className="font-bold text-[17px] text-[#012A81] mb-3">Як не натрапити на шахраїв</p>
        <p className="text-[13px] text-[#333] leading-relaxed mb-3">
          Щоб убезпечити себе при замовленні послуг, рекомендуємо дотримуватись простих правил:
        </p>
        <ul className="text-[13px] text-[#333] leading-relaxed mb-4 space-y-1.5">
          {[
            'Перевіряйте компанію: наявність сайту, відгуків та реальних контактів',
            'Уникайте підозріло низьких цін — це часто ознака недобросовісних виконавців',
            'Не передавайте повну оплату наперед без договору',
            'Уточнюйте деталі послуг та вартість до початку робіт',
            'Підписуйте договір або отримуйте письмове підтвердження співпраці',
            'Переконайтесь, що виконавець надає гарантії на виконані роботи',
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#2979ff] flex-shrink-0 mt-0.5">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="bg-[#fff8e6] rounded-xl px-4 py-3 mb-6">
          <p className="font-semibold text-[13px] text-[#b45309] mb-1">⚠ Зверніть увагу</p>
          <p className="text-[13px] text-[#333] leading-relaxed">
            Ми працюємо офіційно, укладаємо договори та надаємо прозорі умови співпраці — щоб ви були впевнені у результаті.
          </p>
        </div>

        <div className="h-px bg-[rgba(41,121,255,0.12)] mb-6" />

        {/* ─── СЕКЦІЯ 4 ─── */}
        <p className="font-bold text-[14px] text-[#012A81] mb-2">Перевірка оголошення</p>
        <p className="text-[13px] text-[#333] leading-relaxed mb-3">
          Перед тим як замовити послугу, уважно перевірте оголошення:
        </p>
        <ul className="text-[13px] text-[#333] leading-relaxed mb-4 space-y-1.5">
          {[
            "Чи вказані повні контакти (телефон, email, адреса)",
            "Чи є реальна назва компанії або ім'я виконавця",
            'Чи описані конкретні послуги, а не загальні фрази',
            'Чи відповідає ціна ринковій (надто низька — ризик)',
            'Чи є відгуки або приклади робіт',
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#2979ff] flex-shrink-0 mt-0.5">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="bg-[#fff8e6] rounded-xl px-4 py-3 mb-4">
          <p className="font-semibold text-[13px] text-[#b45309] mb-2">⚠ Ознаки підозрілого оголошення</p>
          <ul className="text-[13px] text-[#333] leading-relaxed space-y-1">
            {[
              'Дуже низька ціна без пояснень',
              'Відсутність контактів або тільки месенджер',
              'Наполягання на передоплаті без договору',
              'Розмитий опис послуг',
              'Новий акаунт без історії та відгуків',
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#b45309] flex-shrink-0">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#eefbf0] rounded-xl px-4 py-3">
          <p className="font-semibold text-[13px] text-[#166534] mb-1">✅ Наша порада</p>
          <p className="text-[13px] text-[#333] leading-relaxed">
            Завжди уточнюйте деталі перед замовленням і обирайте перевірених виконавців із прозорими умовами співпраці.
          </p>
        </div>

      </div>

      {/* BOTTOM NAV */}
      <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
};

export default SecurityScreen;
