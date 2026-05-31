import { BackIcon } from '../../components/Icons/Icons';
import BottomNav from '../../components/BottomNav/BottomNav';

const CONTENT = {
  identity: {
    title: 'Особу підтверджено',
    sections: [
      {
        title: 'Як ми перевіряємо особу',
        items: [
          'Орендодавець завантажує паспорт або ID-картку через застосунок «ДІЯ»',
          'Система автоматично звіряє дані з державними реєстрами',
          'Проводиться відеоверифікація для підтвердження особи',
          'Перевірка займає не більше 24 годин',
        ],
      },
      {
        title: 'Що це означає для вас',
        items: [
          'Ви спілкуєтесь з реальною людиною, а не з фейком',
          'Дані орендодавця підтверджені державними органами',
          'У разі шахрайства — є юридична відповідальність',
        ],
      },
      {
        title: 'Документи що перевіряються',
        items: [
          'Паспорт громадянина України або ID-картка',
          'Ідентифікаційний код (РНОКПП)',
          'Документи на право власності житла',
        ],
      },
    ],
    icon: (
      <svg width="64" height="64" viewBox="0 0 42 42" fill="none">
        <path d="M35.2912 9.97429C34.8714 9.45643 34.1227 8.6615 33.6489 8.19351C30.3979 4.98235 25.9305 3 21 3C11.0589 3 3 11.0589 3 21C3 30.9411 11.0589 39 21 39C30.9411 39 39 30.9411 39 21C39 18.8672 38.6291 16.821 37.9482 14.9225"
          stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M13.1514 22.353L16.7953 27.0018C17.1654 27.474 17.8651 27.5162 18.2894 27.092L35.292 10.0894"
          stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  security: {
    title: 'Безпека RENTO',
    sections: [
      {
        title: 'Комплексна система захисту',
        items: [
          'Страхування угод на випадок непередбачених ситуацій',
          'Escrow-платежі — гроші передаються лише після підписання',
          'Підтримка 24/7 у разі виникнення проблем',
          'Юридичний супровід кожної угоди',
        ],
      },
      {
        title: 'Як ми захищаємо орендарів',
        items: [
          'Перевірка кожного оголошення перед публікацією',
          'Гарантія повернення коштів у разі шахрайства',
          'Безпечний чат без розкриття особистих контактів',
        ],
      },
    ],
    icon: (
      <svg width="64" height="64" viewBox="0 0 42 42" fill="none">
        <path d="M37.824 8.71191L21.6457 2.14918C21.4095 2.05336 21.1456 2.05136 20.908 2.14359L4.72551 8.4243C4.29883 8.5899 4.03904 9.02404 4.09477 9.47833L6.15839 26.2978C6.35645 27.912 7.20129 29.3767 8.49943 30.3564L20.6756 39.5454C21.0321 39.8145 21.5238 39.8145 21.8803 39.5454L34.0565 30.3564C35.3546 29.3767 36.1995 27.912 36.3975 26.2978L37.796 14.8997"
          stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12.3701 22.7123L16.1516 27.0389C16.5183 27.4585 17.1573 27.4974 17.5722 27.1253L38 8.80521"
          stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
};

const VerificationScreen = ({ type = 'identity', onBack, activeTab, onTabChange }) => {
  const content = CONTENT[type] ?? CONTENT.identity;

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">

      {/* TOP BAR */}
      <div className="relative z-10 flex items-center gap-3 px-6 pt-14 pb-10">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <BackIcon />
        </button>
        <span className="font-bold text-[22px] text-[#012A81]">{content.title}</span>
      </div>

      {/* SCROLLABLE */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-28"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* Іконка */}
        <div className="flex justify-center py-8">
          <div className="w-24 h-24 rounded-full bg-[#eef3ff] flex items-center justify-center
            shadow-[0_8px_24px_rgba(41,121,255,0.15)]">
            {content.icon}
          </div>
        </div>

        {/* Секції */}
        {content.sections.map((section, si, arr) => (
          <div key={si}>
            <p className="font-bold text-[14px] text-[#012A81] mb-2">{section.title}</p>
            <ul className="text-[13px] text-[#333] leading-relaxed mb-4 space-y-1.5">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#2979ff] flex-shrink-0 mt-0.5">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {si < arr.length - 1 && (
              <div className="h-px bg-[rgba(41,121,255,0.12)] mb-6" />
            )}
          </div>
        ))}

        <div className="bg-[#eefbf0] rounded-xl px-4 py-3 mt-2">
          <p className="font-semibold text-[13px] text-[#166534] mb-1">✅ Наша гарантія</p>
          <p className="text-[13px] text-[#333] leading-relaxed">
            Всі орендодавці на платформі RENTO пройшли перевірку особи. Ми гарантуємо безпечну та прозору оренду.
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
};

export default VerificationScreen;