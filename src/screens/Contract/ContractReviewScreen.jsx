import { useState, useRef } from 'react';
import ContractSuccessScreen from './ContractSuccessScreen';
import BottomNav from '../../components/BottomNav/BottomNav';
import { BackIcon } from '../../components/Icons/Icons';
import { DiaIcon } from '../../components/Icons/SocialIcons';

const S = ({ children }) => (
  <p className="font-bold text-[10px] text-center uppercase tracking-wide text-[#012A81] my-2"
    style={{ fontFamily: 'serif' }}>{children}</p>
);
const P = ({ children }) => (
  <p className="text-[10px] text-[#222] leading-[1.6] text-justify mb-1.5"
    style={{ fontFamily: 'serif' }}>{children}</p>
);
const Li = ({ children }) => (
  <p className="text-[10px] text-[#222] leading-[1.65] pl-3 mb-1"
    style={{ fontFamily: 'serif' }}>— {children}</p>
);
const Bold = ({ children }) => (
  <span className="font-bold text-[#012A81]">{children}</span>
);

const PAGE_1 = (p) => (
  <div>
    <div className="text-center mb-2">
      <div className="font-bold text-[11px] uppercase tracking-wide text-black" style={{ fontFamily: 'serif' }}>ДОГОВІР №{p.contractNumber}</div>
      <div className="text-[10px] text-[#444]" style={{ fontFamily: 'serif' }}>оренди житлового приміщення</div>
    </div>
    <p className="text-right text-[10px] text-[#444] mb-2" style={{ fontFamily: 'serif' }}>м. {p.city} &nbsp; {p.today}</p>
    <P>Фізична особа <Bold>{p.landlordName}</Bold>, надалі — <u>«Орендодавець»</u>, та Фізична особа <Bold>{p.surname} {p.name}</Bold>, РНОКПП <Bold>{p.rnokpp}</Bold>, надалі — <u>«Орендар»</u>, разом — <b>«Сторони»</b>, уклали цей Договір про наступне:</P>
    <S>РОЗДІЛ 1. ПРЕДМЕТ ДОГОВОРУ</S>
    <P>1.1. Орендодавець передає Орендарю у тимчасове платне користування приміщення за адресою: <Bold>{p.address}</Bold> (надалі — «Об'єкт»). Орендар зобов'язується прийняти Об'єкт, вносити орендну плату та повернути його у належному стані.</P>
    <P>1.2. Об'єкт належить Орендодавцю на праві власності та не є предметом судових спорів чи арешту.</P>
    <P>1.3. Загальна площа — <Bold>{p.totalArea} кв. м</Bold>, житлова — <Bold>{p.livingArea} кв. м</Bold>.</P>
    <S>РОЗДІЛ 2. СТРОК ОРЕНДИ</S>
    <P>2.1. Договір укладається строком на 12 місяців з моменту підписання.</P>
    <P>2.2. За відсутності повідомлення про припинення за 30 днів — Договір автоматично пролонгується на тих самих умовах.</P>
  </div>
);

const PAGE_2 = (p) => (
  <div>
    <S>РОЗДІЛ 3. ОРЕНДНА ПЛАТА</S>
    <P>3.1. Розмір щомісячної орендної плати — <Bold>{p.price}</Bold>.</P>
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

const ContractReviewScreen = ({ property, userData, onBack, onFinish, activeTab, onTabChange }) => {
  const [page, setPage] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [showDia, setShowDia] = useState(false);
  const contractNumber = useRef(Math.floor(100000 + Math.random() * 900000)).current;
  const today = new Date().toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const TOTAL = 4;

  const data = {
    name: userData?.name ?? '________',
    surname: userData?.surname ?? '________',
    rnokpp: userData?.rnokpp ?? '__________',
    address: `${property?.address ?? ''}, ${property?.city ?? ''}`,
    totalArea: property?.totalArea ?? '___',
    livingArea: property?.livingArea ?? '___',
    price: property?.price ?? '___',
    city: property?.city ?? '___',
    landlordName: property?.landlord?.name ?? '_______________',
    landlordRnokpp: '__________',
    contractNumber, today,
  };

  if (showDia) {
  return (
    <ContractSuccessScreen
      property={property}
      userData={userData}
      contractNumber={contractNumber}
      today={today}
      onBack={() => setShowDia(false)}
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 20L8 12L16 4" stroke="#0052FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="font-bold text-[22px] text-[#012A81]">Перегляд договору</span>
        <div className="w-8" />
      </div>

      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-6 pb-28"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        <div className="flex items-center justify-between mt-4 mb-6">
          <span className="font-bold text-[17px] text-[#012A81]">Крок 2/3</span>
          <span className="font-bold text-[17px] text-[#012A81]">Перевірка тексту</span>
        </div>

        {/* Картка */}
        <div className="flex items-center gap-1">
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
              <PageContent {...data} />
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

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-3 mb-6">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)}
              className="border-none bg-transparent cursor-pointer p-0 transition-all duration-200"
              style={{ width: i === page ? 22 : 8, height: 8, borderRadius: 4,
                background: i === page ? '#2979ff' : 'rgba(41,121,255,0.25)' }} />
          ))}
        </div>

        {/* Чекбокс */}
        <label className="flex items-center gap-3 cursor-pointer mb-6">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="sr-only" />
          <div className={['w-5 h-5 rounded-[5px] flex items-center justify-center shrink-0 transition-all duration-200',
            agreed ? 'bg-[#2979ff] border-2 border-[#2979ff]' : 'bg-white border-2 border-[#2979ff]'].join(' ')}>
            {agreed && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span className="font-medium text-[13px] text-[#012A81]">я погоджуюсь з умовами договору</span>
        </label>

        {/* Кнопки */}
        <div className="flex flex-col gap-3">
          <button onClick={() => { if (agreed) setShowDia(true); }} disabled={!agreed}
            className={['w-full py-4 rounded-full font-bold text-[16px] text-white',
              'border-[1.5px] border-white/60 transition-opacity duration-200',
              'bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)]',
              'flex items-center justify-center gap-3',
              agreed ? 'cursor-pointer opacity-100 shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.5)]'
                     : 'opacity-40 cursor-not-allowed'].join(' ')}>
            Підписати через <DiaIcon />
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

export default ContractReviewScreen;
