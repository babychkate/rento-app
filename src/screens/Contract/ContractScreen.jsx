import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import ContractFormScreen from './ContractFormScreen';

const S = ({ children }) => (
  <p className="font-bold text-[10px] text-center uppercase tracking-wide text-[#012A81] my-2.5"
    style={{ fontFamily: 'serif' }}>{children}</p>
);
const P = ({ children }) => (
  <p className="text-[10px] text-[#222] leading-[1.65] text-justify mb-2"
    style={{ fontFamily: 'serif' }}>{children}</p>
);
const Li = ({ children }) => (
  <p className="text-[10px] text-[#222] leading-[1.65] pl-3 mb-1"
    style={{ fontFamily: 'serif' }}>— {children}</p>
);

// ─── 4 СТОРІНКИ ──────────────────────────────────────────────────────────────

const PAGE_1 = (p) => (
  <div>
    <div className="text-center mb-3">
      <div className="font-bold text-[12px] uppercase tracking-wide text-black"
        style={{ fontFamily: 'serif' }}>ДОГОВІР №___</div>
      <div className="text-[10px] text-[#444]"
        style={{ fontFamily: 'serif' }}>оренди житлового приміщення</div>
    </div>

    <p className="text-right text-[10px] text-[#444] mb-2.5" style={{ fontFamily: 'serif' }}>
      м. {p.city} &nbsp; «___» __________ 20___ р.
    </p>

    <P>
      Фізична особа <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>, що надалі іменується <u>«Орендодавець»</u>, з одного боку, та Фізична особа <u>&nbsp;{p.surname} {p.name}&nbsp;</u>, РНОКПП <u>&nbsp;{p.rnokpp || '___________'}&nbsp;</u>, що надалі іменується <u>«Орендар»</u>, з іншого боку, разом іменуються <b>«Сторони»</b> і уклали цей Договір про наступне:
    </P>

    <S>РОЗДІЛ 1. ПРЕДМЕТ ДОГОВОРУ</S>
    <P>1.1. Орендодавець зобов'язується передати Орендарю у тимчасове платне користування житлове приміщення за адресою: <u>&nbsp;{p.address}&nbsp;</u> (надалі — «Об'єкт»), а Орендар зобов'язується його прийняти, своєчасно вносити орендну плату та повернути Об'єкт у належному стані.</P>
    <P>1.2. Об'єкт належить Орендодавцю на праві власності та не є предметом судових спорів, не знаходиться під арештом чи забороною відчуження.</P>
    <P>1.3. Загальна площа Об'єкта — <u>&nbsp;{p.totalArea} кв. м&nbsp;</u>, житлова площа — <u>&nbsp;{p.livingArea} кв. м&nbsp;</u>.</P>

    <S>РОЗДІЛ 2. СТРОК ОРЕНДИ</S>
    <P>2.1. Договір укладається строком на 12 місяців з моменту підписання.</P>
    <P>2.2. Якщо жодна зі Сторін не повідомила іншу про припинення Договору за 30 календарних днів до закінчення строку, він автоматично пролонгується на тих самих умовах.</P>
  </div>
);

const PAGE_2 = (p) => (
  <div>
    <S>РОЗДІЛ 3. ОРЕНДНА ПЛАТА ТА ПОРЯДОК РОЗРАХУНКІВ</S>
    <P>3.1. Розмір щомісячної орендної плати становить <u>&nbsp;{p.price}&nbsp;</u>.</P>
    <P>3.2. Орендна плата сплачується Орендарем щомісяця не пізніше 5 (п'ятого) числа поточного місяця.</P>
    <P>3.3. Орендна плата може бути змінена за письмовою згодою Сторін не частіше ніж раз на рік і не більше ніж на 10% від чинної ставки.</P>
    <P>3.4. Комунальні послуги оплачуються Орендарем самостійно, окремо від Орендної плати.</P>

    <S>РОЗДІЛ 4. ПРАВА ТА ОБОВ'ЯЗКИ ОРЕНДОДАВЦЯ</S>
    <P>4.1. Орендодавець має право:</P>
    <Li>отримувати орендну плату у встановлені строки;</Li>
    <Li>перевіряти стан Об'єкта не частіше одного разу на місяць, попередньо повідомивши Орендаря за 24 години;</Li>
    <Li>вимагати дострокового розірвання Договору у разі систематичного порушення його умов.</Li>
    <P>4.2. Орендодавець зобов'язаний:</P>
    <Li>передати Об'єкт у придатному для проживання стані;</Li>
    <Li>не перешкоджати Орендарю у користуванні Об'єктом;</Li>
    <Li>своєчасно усувати несправності, що виникли не з вини Орендаря;</Li>
    <Li>повернути заставу після закінчення строку оренди за умови відсутності збитків.</Li>
  </div>
);

const PAGE_3 = (p) => (
  <div>
    <S>РОЗДІЛ 5. ПРАВА ТА ОБОВ'ЯЗКИ ОРЕНДАРЯ</S>
    <P>5.1. Орендар має право:</P>
    <Li>користуватися Об'єктом відповідно до його призначення;</Li>
    <Li>вимагати усунення несправностей, що перешкоджають нормальному користуванню.</Li>
    <P>5.2. Орендар зобов'язаний:</P>
    <Li>використовувати Об'єкт виключно для проживання;</Li>
    <Li>своєчасно вносити Орендну плату;</Li>
    <Li>утримувати Об'єкт у чистоті та порядку;</Li>
    <Li>повідомити Орендодавця про намір звільнити Об'єкт не пізніше ніж за 30 календарних днів.</Li>

    <S>РОЗДІЛ 6. ВІДПОВІДАЛЬНІСТЬ СТОРІН</S>
    <P>6.1. У разі прострочення орендної плати більше ніж на 5 календарних днів Орендар сплачує пеню у розмірі 0,5% від суми боргу за кожен день прострочення.</P>
    <P>6.2. У разі дострокового розірвання Договору з ініціативи Орендаря без поважних причин він сплачує компенсацію у розмірі одного місячного платежу.</P>
    <P>6.3. Шкода, заподіяна Об'єкту з вини Орендаря, відшкодовується ним у повному обсязі.</P>
    <P>6.4. Сторони звільняються від відповідальності у разі настання обставин непереборної сили (форс-мажор).</P>
  </div>
);

const PAGE_4 = (p) => (
  <div>
    <S>РОЗДІЛ 7. ПОРЯДОК РОЗІРВАННЯ ДОГОВОРУ</S>
    <P>7.1. Договір може бути розірваний за взаємною згодою Сторін у будь-який час.</P>
    <P>7.2. Орендодавець має право розірвати Договір достроково у разі прострочення орендної плати більше ніж на 30 днів, використання Об'єкта не за призначенням або систематичного порушення правил співжиття.</P>
    <P>7.3. Орендар має право розірвати Договір достроково, письмово повідомивши Орендодавця за 30 календарних днів.</P>

    <S>РОЗДІЛ 8. ПРИКІНЦЕВІ ПОЛОЖЕННЯ</S>
    <P>8.1. Електронна копія Договору, підписана через сервіс «ДІЯ», має таку ж юридичну силу, як і паперовий оригінал.</P>
    <P>8.2. Усі зміни та доповнення до цього Договору є дійсними лише у разі їх оформлення у письмовому вигляді та підписання обома Сторонами.</P>
    <P>8.3. Усі спори вирішуються шляхом переговорів, а у разі недосягнення згоди — у судовому порядку відповідно до законодавства України.</P>
    <P>8.4. Цей Договір підписано за допомогою сервісу <b>RENTO</b> та засвідчено електронним підписом через <b>«ДІЯ»</b>.</P>
  </div>
);

const CONTRACT_PAGES = [PAGE_1, PAGE_2, PAGE_3, PAGE_4];



// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────

const ContractScreen = ({ property, onBack }) => {
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [showRentStub, setShowRentStub] = useState(false);

  const TOTAL = 4;

  const placeholders = {
    name: '________',
    surname: '________',
    rnokpp: '',
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
      />
    );
  }

  const PageContent = CONTRACT_PAGES[page];

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white pb-27">

      {/* Тонкий градієнт зверху */}
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-0" style={{
        background: 'linear-gradient(180deg, rgba(49,115,253,0.12) 0%, transparent 100%)',
      }} />

      {/* TOP BAR */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-14 pb-3">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 20L8 12L16 4" stroke="#0052FF" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="font-bold text-[22px] text-[#012A81]">Шаблон договору</span>
        <div className="w-8" />
      </div>

      {/* DOCUMENT + СТРІЛКИ */}
      <div className="relative z-10 flex items-center px-2 flex-1 min-h-0 pb-1">

        {/* Стрілка вліво */}
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          className="flex-shrink-0 w-8 flex items-center justify-center bg-transparent border-none cursor-pointer"
          style={{ opacity: page === 0 ? 0.2 : 1 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#0052FF" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Картка — без свого скролу, підлаштовується під висоту */}
        <div className="flex-1 bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,30,140,0.15)] overflow-hidden style={{ maxHeight: '60vh' }}>">
          <div className="h-full overflow-y-auto px-6 py-5 pb-7"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#c0cce8 transparent' }}>
            <PageContent {...placeholders} />
          </div>
        </div>

        {/* Стрілка вправо */}
        <button
          onClick={() => setPage(p => Math.min(TOTAL - 1, p + 1))}
          disabled={page === TOTAL - 1}
          className="flex-shrink-0 w-8 flex items-center justify-center bg-transparent border-none cursor-pointer"
          style={{ opacity: page === TOTAL - 1 ? 0.2 : 1 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="#0052FF" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* DOTS */}
      <div className="relative z-10 flex justify-center gap-2 py-3">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button key={i} onClick={() => setPage(i)}
            className="border-none bg-transparent cursor-pointer p-0 transition-all duration-200"
            style={{
              width: i === page ? 22 : 8,
              height: 8,
              borderRadius: 4,
              background: i === page ? '#2979ff' : 'rgba(41,121,255,0.25)',
            }}
          />
        ))}
      </div>

      {/* КНОПКИ */}
      <div className="relative z-10 flex flex-col gap-3 px-6 pb-3">
        <button
          onClick={() => setShowRentStub(true)}
          className="w-full py-[16px] rounded-full font-bold text-[16px] text-white
            border-[1.5px] border-white/60 cursor-pointer
            bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)]
            shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.5)]">
          Орендувати
        </button>
        <button
          onClick={onBack}
          className="w-full py-[16px] rounded-full font-bold text-[16px] text-[#012A81]
            bg-white border-[2px] border-[rgba(41,121,255,0.2)] cursor-pointer
            shadow-[0_3px_10px_rgba(0,30,120,0.08)]">
          Скасувати
        </button>
      </div>

      {/* BOTTOM NAV */}
      <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default ContractScreen;
