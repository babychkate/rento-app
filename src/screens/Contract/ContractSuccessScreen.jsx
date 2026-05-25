import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';

const CheckIcon = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35.2912 9.97429C34.8714 9.45643 34.1227 8.6615 33.6489 8.19351C30.3979 4.98235 25.9305 3 21 3C11.0589 3 3 11.0589 3 21C3 30.9411 11.0589 39 21 39C30.9411 39 39 30.9411 39 21C39 18.8672 38.6291 16.821 37.9482 14.9225"
      stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
    <path d="M13.1514 22.353L16.7953 27.0018C17.1654 27.474 17.8651 27.5162 18.2894 27.092L35.292 10.0894"
      stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const buildContractHTML = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: 'Times New Roman', serif; font-size: 11px; color: #222; margin: 40px; line-height: 1.7; }
    h2 { font-size: 13px; text-align: center; text-transform: uppercase; letter-spacing: 0.5px; margin: 18px 0 4px; }
    .center { text-align: center; }
    .right { text-align: right; }
    .justify { text-align: justify; }
    .bold { font-weight: bold; color: #012A81; }
    .section { font-size: 11.5px; font-weight: bold; text-align: center; text-transform: uppercase; margin: 16px 0 8px; }
    p { margin-bottom: 8px; }
    .li { padding-left: 16px; margin-bottom: 4px; }
    u { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="center">
    <h2>ДОГОВІР №${data.contractNumber}</h2>
    <p>оренди житлового приміщення</p>
  </div>
  <p class="right">м. ${data.city} &nbsp; ${data.today}</p>
  <p class="justify">Фізична особа <span class="bold">${data.landlordName}</span>, що надалі іменується «Орендодавець», з одного боку, та Фізична особа <span class="bold">${data.surname} ${data.name}</span>, РНОКПП <span class="bold">${data.rnokpp}</span>, що надалі іменується «Орендар», з іншого боку, разом іменуються «Сторони» і уклали цей Договір про наступне:</p>
  <div class="section">РОЗДІЛ 1. ПРЕДМЕТ ДОГОВОРУ</div>
  <p class="justify">1.1. Орендодавець зобов'язується передати Орендарю у тимчасове платне користування житлове приміщення за адресою: <span class="bold">${data.address}</span> (надалі — «Об'єкт»), а Орендар зобов'язується його прийняти, своєчасно вносити орендну плату та повернути Об'єкт у належному стані.</p>
  <p class="justify">1.2. Об'єкт належить Орендодавцю на праві власності та не є предметом судових спорів, не знаходиться под арештом чи забороною відчуження.</p>
  <p>1.3. Загальна площа Об'єкта — <span class="bold">${data.totalArea} кв. м</span>, житлова площа — <span class="bold">${data.livingArea} кв. м</span>.</p>
  <div class="section">РОЗДІЛ 2. СТРОК ОРЕНДИ</div>
  <p>2.1. Договір укладається строком на 12 місяців з моменту підписання.</p>
  <p>2.2. Якщо жодна зі Сторін не повідомила іншу про припинення Договору за 30 календарних днів до закінчення строку, він автоматично пролонгується на тих самих умовах.</p>
  <div class="section">РОЗДІЛ 3. ОРЕНДНА ПЛАТА ТА ПОРЯДОК РОЗРАХУНКІВ</div>
  <p>3.1. Розмір щомісячної орендної плати становить <span class="bold">${data.price}</span>.</p>
  <p>3.2. Орендна плата сплачується Орендарем щомісяця не пізніше 5 (п'ятого) числа поточного місяця.</p>
  <p>3.3. Орендна плата може бути змінена за письмовою згодою Сторін не частіше ніж раз на рік і не більше ніж на 10% від чинної ставки.</p>
  <p>3.4. Комунальні послуги оплачуються Орендарем самостійно, окремо від Орендної плати.</p>
  <div class="section">РОЗДІЛ 4. ПРАВА ТА ОБОВ'ЯЗКИ ОРЕНДОДАВЦЯ</div>
  <p>4.1. Орендодавець має право:</p>
  <p class="li">— отримувати орендну плату у встановлені строки;</p>
  <p class="li">— перевіряти стан Об'єкта не частіше одного разу на місяць, попередвно повідомивши Орендаря за 24 години;</p>
  <p class="li">— вимагати дострокового розірвання Договору у разі систематичного порушення його умов.</p>
  <p>4.2. Орендодавець зобов'язаний:</p>
  <p class="li">— передати Об'єкт у придатному для проживання стані;</p>
  <p class="li">— не перешкоджати Орендарю у користуванні Об'єктом;</p>
  <p class="li">— своєчасно усувати несправності, що виникли не з вини Орендаря;</p>
  <p class="li">— повернути заставу після закінчення строку оренди за умови відсутності збитків.</p>
  <div class="section">РОЗДІЛ 5. ПРАВА ТА ОБОВ'ЯЗКИ ОРЕНДАРЯ</div>
  <p>5.1. Орендар має право:</p>
  <p class="li">— користуватися Об'єктом відповідно до його призначення;</p>
  <p class="li">— вимагати усунення несправностей, що перешкоджають нормальному користуванню.</p>
  <p>5.2. Орендар зобов'язаний:</p>
  <p class="li">— використовувати Об'єкт виключно для проживання;</p>
  <p class="li">— своєчасно вносити Орендну плату;</p>
  <p class="li">— утримувати Об'єкт у чистоті та порядку;</p>
  <p class="li">— повідомити Орендодавця про намір звільнити Об'єкт не пізніше ніж за 30 календарних днів.</p>
  <div class="section">РОЗДІЛ 6. ВІДПОВІДАЛЬНІСТЬ СТОРІН</div>
  <p>6.1. У разі прострочення орендної плати більше ніж на 5 calendarних днів Орендар сплачує пеню у розмірі 0,5% від суми боргу за кожен день прострочення.</p>
  <p>6.2. У разі дострокового розірвання Договору з ініціативи Орендаря без поважних причин він сплачує компенсацію у розмірі одного місячного платежу.</p>
  <p>6.3. Шкода, заподіяна Об'єкту з вини Орендаря, відшкодовується ним у повному обсязі.</p>
  <p>6.4. Сторони звільняються від відповідальності у разі настання обставин непереборної сили (форс-мажор).</p>
  <div class="section">РОЗДІЛ 7. ПОРЯДОК РОЗІРВАННЯ ДОГОВОРУ</div>
  <p>7.1. Договір може бути розірваний за взаємною згодою Сторін у будь-який час.</p>
  <p>7.2. Орендодавець має право розірвати Договір достроково у разі прострочення орендної плати більше ніж на 30 днів, використання Об'єкта не за призначенням або систематичного порушення правил співжиття.</p>
  <p>7.3. Орендар має право розірвати Договір достроково, письмово повідомивши Орендодавця за 30 календарних днів.</p>
  <div class="section">РОЗДІЛ 8. ПРИКІНЦЕВІ ПОЛОЖЕННЯ</div>
  <p>8.1. Електронна копія Договору, підписана через сервіс «ДІЯ», має таку ж юридичну силу, як і паперовий оригінал.</p>
  <p>8.2. Усі зміни та доповнення до цього Договору є дійсними лише у разі їх оформлення у письмовому вигляді та підписання обома Сторонами.</p>
  <p>8.3. Усі спори вирішуються шляхом переговорів, а у разі недосягнення згоди — у судовому порядку відповідно до законодавства України.</p>
  <p>8.4. Цей Договір підписано за допомогою сервісу RENTO та засвідчено електронним підписом через «ДІЯ».</p>
  <br/><br/>
  <table width="100%" style="border-collapse: collapse; margin-top: 20px;">
    <tr>
      <td width="50%" style="padding: 8px; vertical-align: top;">
        <strong>ОРЕНДОДАВЕЦЬ</strong><br/>
        ПІБ: ${data.landlordName}<br/>
        РНОКПП: ___________<br/>
        Підпис: ___________
      </td>
      <td width="50%" style="padding: 8px; vertical-align: top;">
        <strong>ОРЕНДАР</strong><br/>
        ПІБ: ${data.surname} ${data.name}<br/>
        РНОКПП: ${data.rnokpp}<br/>
        Підпис: ___________
      </td>
    </tr>
  </table>
</body>
</html>
`;

const ContractSuccessScreen = ({ property, userData, contractNumber, today, onBack }) => {
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const data = {
    name:           userData?.name    ?? '________',
    surname:        userData?.surname ?? '________',
    rnokpp:         userData?.rnokpp  ?? '__________',
    address:        `${property?.address ?? ''}, ${property?.city ?? ''}`,
    totalArea:      property?.totalArea  ?? '___',
    livingArea:     property?.livingArea ?? '___',
    price:          property?.price      ?? '___',
    city:           property?.city       ?? '___',
    landlordName:   property?.landlord?.name ?? '_______________',
    contractNumber: contractNumber ?? '______',
    today: today ?? new Date().toLocaleDateString('uk-UA', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    }),
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await new Promise((resolve, reject) => {
        if (window.html2pdf) { resolve(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      const element = document.createElement('div');
      element.innerHTML = buildContractHTML(data);

      const opt = {
        margin:       15,
        filename:     `Dohovir_${data.contractNumber}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          logging: false,
          scrollY: 0, // Фіксує скрол при рендері, прибираючи "стрибок"
          scrollX: 0 
        },
        jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      await window.html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF error:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">

      {/* TOP BAR */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-14 pb-4 flex-shrink-0">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 20L8 12L16 4" stroke="#0052FF" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="font-bold text-[22px] text-[#012A81]">Статус підпису</span>
        <div className="w-8" />
      </div>

      {/* SCROLLABLE CONTEXT (Тепер флекс-контейнер для центрування) */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-6 pb-28 flex flex-col"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* Крок */}
        <div className="flex items-center justify-between mt-4 mb-4 flex-shrink-0">
          <span className="font-bold text-[17px] text-[#012A81]">Крок 3/3</span>
        </div>

        {/* Ідеально центрований контент */}
        <div className="flex-1 flex flex-col items-center justify-center gap-5 py-4">

          {/* Іконка */}
          <div className="w-20 h-20 rounded-full bg-[#eef3ff] flex items-center justify-center
            shadow-[0_8px_24px_rgba(41,121,255,0.15)]">
            <CheckIcon />
          </div>

          {/* Заголовок */}
          <p className="font-bold text-[18px] text-[#0052FF] tracking-wide uppercase text-center m-0">
            ДОГОВІР ПІДПИСАНО
          </p>

          {/* Завантажити */}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); handleDownload(); }}
            disabled={downloading}
            className="bg-transparent border-none cursor-pointer font-medium text-[15px] text-[#012A81] underline-none disabled:opacity-50">
            {downloading ? 'Генерація PDF...' : 'Завантажити підписаний pdf'}
          </button>
        </div>

      </div>

      {/* BOTTOM NAV */}
      <div className="relative z-10 flex-shrink-0">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default ContractSuccessScreen;