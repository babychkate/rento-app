import { useState, useRef } from 'react';
import ContractSuccessScreen from './ContractSuccessScreen';
import BottomNav from '../../components/BottomNav/BottomNav';

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
const Bold = ({ children }) => (
  <span className="font-bold text-[#012A81]">{children}</span>
);

const DiaIcon = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 4C24.9722 4 27.9554 4.00275 30.3066 4.34766C32.6242 4.68765 34.2028 5.34534 35.4287 6.57129C36.6547 7.7973 37.3124 9.37524 37.6523 11.6924C37.9973 14.0433 38 17.0265 38 21C38 24.9735 37.9973 27.9567 37.6523 30.3076C37.3124 32.6248 36.6547 34.2027 35.4287 35.4287C34.2028 36.6547 32.6242 37.3123 30.3066 37.6523C27.9554 37.9973 24.9722 38 21 38C17.0278 38 14.0446 37.9973 11.6934 37.6523C9.37578 37.3123 7.79724 36.6547 6.57129 35.4287C5.34534 34.2028 4.68765 32.6242 4.34766 30.3066C4.00275 27.9554 4 24.9722 4 21C4 17.0278 4.00275 14.0446 4.34766 11.6934C4.68765 9.37578 5.34533 7.79724 6.57129 6.57129C7.79724 5.34533 9.37578 4.68765 11.6934 4.34766C14.0446 4.00275 17.0278 4 21 4Z" stroke="white" strokeOpacity="0.68" strokeWidth="2"/>
    <path d="M27.5395 17C26.2184 17 25.2378 18.1306 25.2378 19.5256C25.2378 20.6646 25.9603 21.5533 26.8748 21.8163L25 25H26.7511L28.345 22.0371H29.538V25H31V17H27.5395ZM27.7406 20.6836C27.1393 20.6836 26.767 20.1605 26.767 19.5642C26.767 18.968 27.1082 18.3999 27.7406 18.3999H29.5399V20.6836H27.7406Z" fill="white"/>
    <path d="M19.533 17L19 18.4477L21.1872 18.4354L19.8919 23.1223C19.5226 24.489 20.9663 25.5215 22.1982 24.7179L25 22.8426L24.175 21.6464L21.3767 23.5589L23.2629 17H19.533Z" fill="white"/>
    <path d="M22 16C22.5523 16 23 15.7761 23 15.5C23 15.2239 22.5523 15 22 15C21.4477 15 21 15.2239 21 15.5C21 15.7761 21.4477 16 22 16Z" fill="white"/>
    <path d="M17.0055 23.6593V16H11.5079V20.0879C11.5079 22.0114 10.969 23.2006 10.6514 23.656H10V26.9968H11.3941V25.0219H16.6065V27H18V23.6593H17.0055ZM12.8939 20.0037V17.3588H15.5759V23.6548H12.1139C12.4278 23.1241 12.8939 21.7737 12.8939 20.0037Z" fill="white"/>
  </svg>
);

const PAGE_1 = (p) => (
  <div>
    <div className="text-center mb-3">
      <div className="font-bold text-[12px] uppercase tracking-wide text-black"
        style={{ fontFamily: 'serif' }}>ДОГОВІР №{p.contractNumber}</div>
      <div className="text-[10px] text-[#444]"
        style={{ fontFamily: 'serif' }}>оренди житлового приміщення</div>
    </div>
    <p className="text-right text-[10px] text-[#444] mb-2.5" style={{ fontFamily: 'serif' }}>
      м. {p.city} &nbsp; {p.today}
    </p>
    <P>Фізична особа <Bold>{p.landlordName}</Bold>, що надалі іменується <u>«Орендодавець»</u>, з одного боку, та Фізична особа <Bold>{p.surname} {p.name}</Bold>, РНОКПП <Bold>{p.rnokpp}</Bold>, що надалі іменується <u>«Орендар»</u>, з іншого боку, разом іменуються <b>«Сторони»</b> і уклали цей Договір про наступне:</P>
    <S>РОЗДІЛ 1. ПРЕДМЕТ ДОГОВОРУ</S>
    <P>1.1. Орендодавець зобов'язується передати Орендарю у тимчасове платне користування житлове приміщення за адресою: <Bold>{p.address}</Bold> (надалі — «Об'єкт»), а Орендар зобов'язується його прийняти, своєчасно вносити орендну плату та повернути Об'єкт у належному стані.</P>
    <P>1.2. Об'єкт належить Орендодавцю на праві власності та не є предметом судових спорів, не знаходиться під арештом чи забороною відчуження.</P>
    <P>1.3. Загальна площа Об'єкта — <Bold>{p.totalArea} кв. м</Bold>, житлова площа — <Bold>{p.livingArea} кв. м</Bold>.</P>
    <S>РОЗДІЛ 2. СТРОК ОРЕНДИ</S>
    <P>2.1. Договір укладається строком на 12 місяців з моменту підписання.</P>
    <P>2.2. Якщо жодна зі Сторін не повідомила іншу про припинення Договору за 30 календарних днів до закінчення строку, він автоматично пролонгується на тих самих умовах.</P>
  </div>
);

const PAGE_2 = (p) => (
  <div>
    <S>РОЗДІЛ 3. ОРЕНДНА ПЛАТА ТА ПОРЯДОК РОЗРАХУНКІВ</S>
    <P>3.1. Розмір щомісячної орендної плати становить <Bold>{p.price}</Bold>.</P>
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



const ContractReviewScreen = ({ property, userData, onBack, onFinish }) => {
  const [page,      setPage]      = useState(0);
  const [agreed,    setAgreed]    = useState(false);
  const [showDia,   setShowDia]   = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const contractNumber = useRef(Math.floor(100000 + Math.random() * 900000)).current;
  const today = new Date().toLocaleDateString('uk-UA', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });

  const TOTAL = 4;

  const data = {
    name:          userData?.name    ?? '________',
    surname:       userData?.surname ?? '________',
    rnokpp:        userData?.rnokpp  ?? '__________',
    address:       `${property?.address ?? ''}, ${property?.city ?? ''}`,
    totalArea:     property?.totalArea  ?? '___',
    livingArea:    property?.livingArea ?? '___',
    price:         property?.price      ?? '___',
    city:          property?.city       ?? '___',
    landlordName:  property?.landlord?.name ?? '_______________',
    landlordRnokpp: '__________',
    contractNumber,
    today,
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
      />
    );
  }

  const PageContent = CONTRACT_PAGES[page];

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">

      {/* TOP BAR — ідентично ContractFormScreen */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-14 pb-4">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 20L8 12L16 4" stroke="#0052FF" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="font-bold text-[22px] text-[#012A81]">Перегляд договору</span>
        <div className="w-8" />
      </div>

      {/* SCROLLABLE — ідентично ContractFormScreen */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-6 pb-28"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* Крок */}
        <div className="flex items-center justify-between mt-4 mb-8">
          <span className="font-bold text-[17px] text-[#012A81]">Крок 2/3</span>
          <span className="font-bold text-[17px] text-[#012A81]">Перевірка тексту</span>
        </div>

        {/* DOCUMENT + СТРІЛКИ */}
        <div className="flex items-center gap-1 mb-3">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex-shrink-0 w-7 flex items-center justify-center bg-transparent border-none cursor-pointer"
            style={{ opacity: page === 0 ? 0.2 : 1 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#0052FF" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="flex-1 bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,30,140,0.15)] overflow-hidden">
            <div className="px-5 py-4">
              <PageContent {...data} />
            </div>
          </div>

          <button
            onClick={() => setPage(p => Math.min(TOTAL - 1, p + 1))}
            disabled={page === TOTAL - 1}
            className="flex-shrink-0 w-7 flex items-center justify-center bg-transparent border-none cursor-pointer"
            style={{ opacity: page === TOTAL - 1 ? 0.2 : 1 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="#0052FF" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mb-5">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)}
              className="border-none bg-transparent cursor-pointer p-0 transition-all duration-200"
              style={{
                width: i === page ? 22 : 8,
                height: 8,
                borderRadius: 4,
                background: i === page ? '#2979ff' : 'rgba(41,121,255,0.25)',
              }} />
          ))}
        </div>

        {/* ЧЕКБОКС */}
        <label className="flex items-center gap-3 cursor-pointer mb-7">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="sr-only"
          />
          <div className={[
            'w-5 h-5 rounded-[5px] flex items-center justify-center flex-shrink-0 transition-all duration-200',
            agreed
              ? 'bg-[#2979ff] border-[2px] border-[#2979ff]'
              : 'bg-white border-[2px] border-[#2979ff]',
          ].join(' ')}>
            {agreed && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span className="font-medium text-[13px] text-[#012A81]">
            я погоджуюсь з умовами договору
          </span>
        </label>

        {/* КНОПКИ */}
        <div className="flex flex-col gap-3">
          <button
  onClick={() => { if (agreed) setShowDia(true); }}
  disabled={!agreed}
  className={[
    'w-full py-[16px] rounded-full font-bold text-[16px] text-white',
    'border-[1.5px] border-white/60 transition-opacity duration-200',
    'bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)]',
    'flex items-center justify-center gap-3',
    agreed
      ? 'cursor-pointer opacity-100 shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.5)]'
      : 'opacity-40 cursor-not-allowed',
  ].join(' ')}>
  Підписати через
  <DiaIcon />
</button>
          <button
            onClick={onBack}
            className="w-full py-[16px] rounded-full font-bold text-[16px] text-[#012A81]
              bg-white border-[2px] border-[rgba(41,121,255,0.2)] cursor-pointer
              shadow-[0_3px_10px_rgba(0,30,120,0.08)]">
            Скасувати
          </button>
        </div>

      </div>

      {/* BOTTOM NAV */}
      <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default ContractReviewScreen;
