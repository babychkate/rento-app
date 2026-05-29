import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import ContractFormScreen from './ContractFormScreen';
import { BackIcon } from '../../components/Icons/Icons';

const S = ({ children }) => (
  <p className="font-bold text-[10px] text-center uppercase tracking-wide text-[#012A81] my-2"
    style={{ fontFamily: 'serif' }}>{children}</p>
);
const P = ({ children }) => (
  <p className="text-[10px] text-[#222] leading-[1.6] text-justify mb-1.5"
    style={{ fontFamily: 'serif' }}>{children}</p>
);
const Bold = ({ children }) => (
  <span className="font-bold text-[#012A81]">{children}</span>
);

const PAGE_1 = (p) => (
  <div>
    <div className="text-center mb-2">
      <div className="font-bold text-[11px] uppercase tracking-wide text-black" style={{ fontFamily: 'serif' }}>ДОГОВІР №___</div>
      <div className="text-[10px] text-[#444]" style={{ fontFamily: 'serif' }}>оренди житлового приміщення</div>
    </div>
    <p className="text-right text-[10px] text-[#444] mb-2" style={{ fontFamily: 'serif' }}>м. {p.city} &nbsp; «___» __________ 20___ р.</p>
    <P>Фізична особа <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>, надалі — <u>«Орендодавець»</u>, та Фізична особа <u>&nbsp;{p.surname} {p.name}&nbsp;</u>, РНОКПП <u>&nbsp;{p.rnokpp || '___________'}&nbsp;</u>, надалі — <u>«Орендар»</u>, разом — <b>«Сторони»</b>, уклали цей Договір про наступне:</P>
    <S>РОЗДІЛ 1. ПРЕДМЕТ ДОГОВОРУ</S>
    <P>1.1. Орендодавець передає Орендарю у тимчасове платне користування приміщення за адресою: <u>&nbsp;{p.address}&nbsp;</u> (надалі — «Об'єкт»). Орендар зобов'язується прийняти Об'єкт, вносити орендну плату та повернути його у належному стані.</P>
    <P>1.2. Об'єкт належить Орендодавцю на праві власності та не є предметом судових спорів чи арешту.</P>
    <P>1.3. Загальна площа — <u>&nbsp;{p.totalArea} кв. м&nbsp;</u>, житлова — <u>&nbsp;{p.livingArea} кв. м&nbsp;</u>.</P>
    <S>РОЗДІЛ 2. СТРОК ОРЕНДИ</S>
    <P>2.1. Договір укладається строком на 12 місяців з моменту підписання.</P>
    <P>2.2. За відсутності повідомлення про припинення за 30 днів — Договір автоматично пролонгується на тих самих умовах.</P>
  </div>
);

const PAGE_2 = (p) => (
  <div>
    <S>РОЗДІЛ 3. ОРЕНДНА ПЛАТА</S>
    <P>3.1. Розмір щомісячної орендної плати — <u>&nbsp;{p.price}&nbsp;</u>.</P>
    <P>3.2. Орендна плата сплачується щомісяця не пізніше 5 числа поточного місяця.</P>
    <P>3.3. Зміна орендної плати — не частіше разу на рік і не більше ніж на 10%, за письмовою згодою Сторін.</P>
    <P>3.4. Комунальні послуги оплачуються Орендарем самостійно, окремо від орендної плати.</P>
    <S>РОЗДІЛ 4. ПРАВА ТА ОБОВ'ЯЗКИ ОРЕНДОДАВЦЯ</S>
    <P>4.1. Орендодавець має право: отримувати орендну плату; перевіряти стан Об'єкта не частіше разу на місяць (з попередженням за 24 год.); вимагати дострокового розірвання у разі систематичного порушення умов.</P>
    <P>4.2. Орендодавець зобов'язаний: передати Об'єкт у придатному стані; не перешкоджати користуванню; усувати несправності не з вини Орендаря; повернути заставу після закінчення оренди за відсутності збитків.</P>
  </div>
);

const PAGE_3 = (p) => (
  <div>
    <S>РОЗДІЛ 5. ПРАВА ТА ОБОВ'ЯЗКИ ОРЕНДАРЯ</S>
    <P>5.1. Орендар має право: користуватися Об'єктом за призначенням; вимагати усунення несправностей, що перешкоджають нормальному користуванню.</P>
    <P>5.2. Орендар зобов'язаний: використовувати Об'єкт виключно для проживання; своєчасно вносити орендну плату; утримувати Об'єкт у чистоті; не здійснювати перепланування без згоди; не передавати в суборенду без письмової згоди; повідомити про намір звільнити Об'єкт за 30 днів.</P>
    <S>РОЗДІЛ 6. ВІДПОВІДАЛЬНІСТЬ СТОРІН</S>
    <P>6.1. Прострочення орендної плати понад 5 днів — пеня 0,5% від суми боргу за кожен день.</P>
    <P>6.2. Дострокове розірвання з ініціативи Орендаря без поважних причин — компенсація у розмірі одного місячного платежу.</P>
    <P>6.3. Шкода, заподіяна Об'єкту з вини Орендаря, відшкодовується у повному обсязі.</P>
    <P>6.4. Сторони звільняються від відповідальності у разі форс-мажору.</P>
  </div>
);

const PAGE_4 = (p) => (
  <div>
    <S>РОЗДІЛ 7. РОЗІРВАННЯ ДОГОВОРУ</S>
    <P>7.1. Договір може бути розірваний за взаємною згодою Сторін у будь-який час.</P>
    <P>7.2. Орендодавець має право розірвати Договір достроково у разі: прострочення оплати понад 30 днів; використання Об'єкта не за призначенням; систематичного порушення правил співжиття.</P>
    <P>7.3. Орендар може розірвати Договір, письмово повідомивши Орендодавця за 30 днів.</P>
    <S>РОЗДІЛ 8. ПРИКІНЦЕВІ ПОЛОЖЕННЯ</S>
    <P>8.1. Електронна копія Договору, підписана через «ДІЯ», має таку ж юридичну силу, як паперовий оригінал.</P>
    <P>8.2. Зміни до Договору дійсні лише у письмовій формі, підписаній обома Сторонами.</P>
    <P>8.3. Спори вирішуються шляхом переговорів, а у разі недосягнення згоди — у судовому порядку.</P>
    <P>8.4. Цей Договір підписано за допомогою сервісу <b>RENTO</b> та засвідчено через <b>«ДІЯ»</b>.</P>
  </div>
);

const CONTRACT_PAGES = [PAGE_1, PAGE_2, PAGE_3, PAGE_4];

const ContractScreen = ({ property, onBack, onFinish, activeTab, onTabChange }) => {
  const [page, setPage] = useState(0);
  const [showRentStub, setShowRentStub] = useState(false);
  const TOTAL = 4;

  const placeholders = {
    name: '________', surname: '________', rnokpp: '',
    address: `${property?.address ?? ''}, ${property?.city ?? ''}`,
    totalArea: property?.totalArea ?? '___',
    livingArea: property?.livingArea ?? '___',
    price: property?.price ?? '___',
    city: property?.city ?? '___',
  };

if (showRentStub) {
  return (
    <ContractFormScreen
      property={property}
      onBack={() => setShowRentStub(false)}
      onCancel={() => setShowRentStub(false)}
      onFinish={onFinish}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
}

  const PageContent = CONTRACT_PAGES[page];

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">
      <div className="relative z-10 flex items-center justify-between px-6 pt-14 pb-4">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <BackIcon/>
        </button>
        <span className="font-bold text-[22px] text-[#012A81]">Шаблон договору</span>
        <div className="w-8" />
      </div>

      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-6 pb-28"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        <div className="flex items-center gap-1 mt-2">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            className="shrink-0 w-7 flex items-center justify-center bg-transparent border-none cursor-pointer"
            style={{ opacity: page === 0 ? 0.2 : 1 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#0052FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex-1 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,30,140,0.15)] overflow-hidden">
            <div className="overflow-y-auto px-5 py-4"
              style={{ maxHeight: '420px', scrollbarWidth: 'thin', scrollbarColor: '#c0cce8 transparent' }}>
              <PageContent {...placeholders} />
            </div>
          </div>
          <button onClick={() => setPage(p => Math.min(TOTAL - 1, p + 1))} disabled={page === TOTAL - 1}
            className="shrink-0 w-7 flex items-center justify-center bg-transparent border-none cursor-pointer"
            style={{ opacity: page === TOTAL - 1 ? 0.2 : 1 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="#0052FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-3 mb-6">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)}
              className="border-none bg-transparent cursor-pointer p-0 transition-all duration-200"
              style={{ width: i === page ? 22 : 8, height: 8, borderRadius: 4,
                background: i === page ? '#2979ff' : 'rgba(41,121,255,0.25)' }} />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={() => setShowRentStub(true)}
            className="w-full py-4 rounded-full font-bold text-[16px] text-white
              border-[1.5px] border-white/60 cursor-pointer
              bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)]
              shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.5)]">
            Орендувати
          </button>
          <button onClick={onBack}
            className="w-full py-4 rounded-full font-bold text-[16px] text-[#012A81]
              bg-white border-2 border-[rgba(41,121,255,0.2)] cursor-pointer
              shadow-[0_3px_10px_rgba(0,30,120,0.08)]">
            Скасувати
          </button>
        </div>
      </div>

      <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
};

export default ContractScreen;
