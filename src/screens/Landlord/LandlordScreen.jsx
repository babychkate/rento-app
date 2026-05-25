import { useState } from 'react';
import VerificationScreen from '../Verification/VerificationScreen';
import SecurityScreen from '../Security/SecurityScreen';

// ─── ІКОНКИ ───────────────────────────────────────────────────────────────────

const ArrowRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M8 4L16 12L8 20" stroke="#0052FF" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── ВІДГУК ───────────────────────────────────────────────────────────────────

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 100;
  const displayText = expanded || !isLong ? review.text : review.text.slice(0, 100) + '…';

  return (
    <div className="flex-shrink-0 w-[295px] rounded-3xl p-[18px] border border-white/80"
      style={{
        background: 'linear-gradient(180deg, #ACC5F8 5%, #FFFFFF 50%, #FFFFFF 100%)',
        boxShadow: '0 10px 20px rgba(0,30,140,0.15)',
      }}>
      <div className="flex items-center gap-3 mb-2">
        <img src={review.avatar} alt={review.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
        <span className="font-bold text-[15px] text-black">{review.name}</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="13" height="13" viewBox="0 0 24 24"
              fill={i < review.rating ? '#8F94FB' : '#e2e8f0'}>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          ))}
        </div>
        <span className="text-[13px] text-[#718096]">{review.date}</span>
      </div>
      <p className="text-[13px] text-[#2D3748] leading-relaxed mb-1">{displayText}</p>
      {isLong && (
        <button onClick={() => setExpanded(p => !p)}
          className="text-[13px] font-medium text-[#5A7BB5] bg-transparent border-none cursor-pointer p-0">
          {expanded ? 'Згорнути' : 'Показати більше'}
        </button>
      )}
    </div>
  );
};

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────

const LandlordScreen = ({ property, onBack }) => {
  const [verificationScreen, setVerificationScreen] = useState(null);

  const landlord = property?.landlord;

  // Відгуки орендодавця — беремо з property або хардкод
  const reviews = property?.reviews ?? [
    {
      id: 'l-r1',
      name: 'Сергій',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: '1 тиждень тому',
      text: "Дуже чисто, є все необхідне (рушники, посуд, праска), приємна хазяйка зустріла вчасно! До супермаркету йшли 10 хвилин.",
    },
    {
      id: 'l-r2',
      name: 'Ігор',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: '2 тижні тому',
      text: "Дуже чисто, є все необхідне, посуд, праска. Квартира відповідає опису. Зручне розташування.",
    },
  ];

  // Навігація до екранів верифікації
  if (verificationScreen === 'security') {
    return <SecurityScreen onBack={() => setVerificationScreen(null)} />;
  }
  if (verificationScreen) {
    return (
      <VerificationScreen
        type={verificationScreen}
        onBack={() => setVerificationScreen(null)}
      />
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-[#f1f2f6]">

      {/* SCROLLABLE */}
      <div className="flex-1 min-h-0 pb-28"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 pt-14 pb-4">
          <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16 20L8 12L16 4" stroke="#012A81" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="font-bold text-[22px] text-[#012A81]">Орендодавець</span>
          <div className="w-8" />
        </div>

        {/* HERO ФОТО */}
        <div className="mx-6 rounded-[28px] overflow-hidden relative h-[300px]
          shadow-[0_8px_28px_rgba(0,30,140,0.18)]">
          <img
            src={landlord?.avatar}
            alt={landlord?.name}
            className="w-full h-full object-cover object-top"
          />
          {/* Градієнт */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, transparent 35%, rgba(49,115,253,0.45) 65%, rgba(0,50,200,0.82) 100%)',
          }} />
          {/* Ім'я */}
          <span className="absolute bottom-[18px] left-5 font-bold text-[26px] text-white"
            style={{ textShadow: '0 2px 8px rgba(0,20,100,0.4)' }}>
            {landlord?.name?.split(' ')[0]}
          </span>
        </div>

        {/* БІО */}
        <div className="flex items-start justify-between gap-3 px-6 pt-5">
          <ul className="flex-1 flex flex-col gap-1.5 list-none">
            {[
              'Перевірений орендодавець',
              '4 роки досвіду на платформі',
              'Швидка комунікація та заселення',
              'Високий рівень довіри серед орендарів',
            ].map(item => (
              <li key={item} className="relative pl-4 font-semibold text-[13px] text-[#3a4060] leading-snug">
                <span className="absolute left-0 top-[6px] w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
                {item}
              </li>
            ))}
          </ul>

          {/* Рейтинг бейдж */}
          <div className="flex-shrink-0 flex items-center gap-1.5 bg-[#3173FD] rounded-xl px-3 py-1.5 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 23 22" fill="none">
              <path d="M3.25907 11.6533L4.50719 12.6068C4.84022 12.8612 4.97928 13.2963 4.85555 13.6967L3.49665 18.0942C3.2092 19.0244 4.28545 19.7751 5.05914 19.1841L8.48099 16.57C8.83939 16.2962 9.33672 16.2962 9.69512 16.57L13.117 19.1841C13.8907 19.7751 14.9669 19.0244 14.6795 18.0942L13.3206 13.6967C13.1968 13.2963 13.3359 12.8612 13.6689 12.6068L17.2805 9.84777C18.0406 9.2671 17.63 8.05312 16.6734 8.05312H12.3142C11.8757 8.05312 11.4883 7.76737 11.3588 7.34836L10.0435 3.09181C9.7531 2.15213 8.42301 2.15214 8.13263 3.09181L6.81729 7.34836C6.68781 7.76737 6.30042 8.05312 5.86186 8.05312H1.50268C0.54615 8.05312 0.135509 9.2671 0.895623 9.84777L1.65139 10.4251"
                stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-white text-[13px] font-medium">{property?.rating ?? '4.9'}</span>
          </div>
        </div>

        {/* КОНТАКТИ */}
        <p className="px-6 pt-7 pb-3 font-bold text-[16px] text-[#0052FF]">Контакти</p>
        <div className="flex flex-col px-6">
          {[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/>
                </svg>
              ),
              value: '+380715829471',
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="#0052FF" stroke="none"/>
                </svg>
              ),
              value: '@nadiia.yukhymchuk',
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 4.5L2.5 11.5L9.5 13.5M21.5 4.5L9.5 13.5M21.5 4.5L14.5 20.5L9.5 13.5M9.5 13.5V19.5L12.5 16.5"/>
                </svg>
              ),
              value: '@nadiia_rento',
            },
          ].map(({ icon, value }, idx, arr) => (
            <div key={value}>
              <div className="flex items-center gap-3.5 py-3.5">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <span className="font-semibold text-[14px] text-[#012A81]">{value}</span>
              </div>
              {idx < arr.length - 1 && (
                <div className="h-px bg-[rgba(41,121,255,0.1)]" />
              )}
            </div>
          ))}
        </div>

        {/* ПЕРЕВІРЯЄМО КОЖНОГО */}
        <p className="px-6 pt-7 pb-1 font-bold text-[16px] text-[#0052FF]">Перевіряємо кожного</p>
        <div className="flex flex-col px-6">
          {[
            {
              key: 'identity',
              icon: (
                <svg width="26" height="26" viewBox="0 0 42 42" fill="none">
                  <path d="M35.2912 9.97429C34.8714 9.45643 34.1227 8.6615 33.6489 8.19351C30.3979 4.98235 25.9305 3 21 3C11.0589 3 3 11.0589 3 21C3 30.9411 11.0589 39 21 39C30.9411 39 39 30.9411 39 21C39 18.8672 38.6291 16.821 37.9482 14.9225"
                    stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M13.1514 22.353L16.7953 27.0018C17.1654 27.474 17.8651 27.5162 18.2894 27.092L35.292 10.0894"
                    stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              label: 'Особу підтверджено',
            },
            {
              key: 'security',
              icon: (
                <svg width="26" height="26" viewBox="0 0 42 42" fill="none">
                  <path d="M37.824 8.71191L21.6457 2.14918C21.4095 2.05336 21.1456 2.05136 20.908 2.14359L4.72551 8.4243C4.29883 8.5899 4.03904 9.02404 4.09477 9.47833L6.15839 26.2978C6.35645 27.912 7.20129 29.3767 8.49943 30.3564L20.6756 39.5454C21.0321 39.8145 21.5238 39.8145 21.8803 39.5454L34.0565 30.3564C35.3546 29.3767 36.1995 27.912 36.3975 26.2978L37.796 14.8997"
                    stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12.3701 22.7123L16.1516 27.0389C16.5183 27.4585 17.1573 27.4974 17.5722 27.1253L38 8.80521"
                    stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              label: (
                <><span className="text-[#0052FF] font-bold">RENTO</span> розробив комплексну безпеку</>
              ),
            },
          ].map(({ key, icon, label }, idx, arr) => (
            <div key={key}>
              <div className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3.5">
                  {icon}
                  <span className="font-semibold text-[14px] text-[#012A81]">{label}</span>
                </div>
                <button onClick={() => setVerificationScreen(key)}
                  className="bg-transparent border-none cursor-pointer p-1 ml-2 flex-shrink-0">
                  <ArrowRightIcon />
                </button>
              </div>
              {idx < arr.length - 1 && (
                <div className="h-px bg-[rgba(41,121,255,0.1)]" />
              )}
            </div>
          ))}
        </div>

        {/* ВІДГУКИ */}
        <p className="px-6 pt-7 pb-1 font-bold text-[16px] text-[#0052FF]">Відгуки</p>
        <div className="flex gap-3 px-6 pt-3 pb-4"
          style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default LandlordScreen;
