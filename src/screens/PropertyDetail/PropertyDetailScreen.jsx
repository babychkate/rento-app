import { useState, useEffect } from 'react';
import { TYPE_LABELS } from '../../data/properties';
import PhotoTourScreen from '../PhotoTour/PhotoTourScreen';
import LandlordScreen from '../Landlord/LandlordScreen';
import VerificationScreen from '../Verification/VerificationScreen';
import PropertyMap from '../../components/PropertyMap/PropertyMap';
import BottomNav from '../../components/BottomNav/BottomNav';
import ContractScreen from '../Contract/ContractScreen';
import SecurityScreen from '../Security/SecurityScreen';

// ─── ІКОНКИ ───────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16 20L8 12L16 4" stroke="#0052FF" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = ({ filled = true }) => (
  <svg width="14" height="14" viewBox="0 0 23 22" fill="none">
    <path d="M3.25907 11.6533L4.50719 12.6068C4.84022 12.8612 4.97928 13.2963 4.85555 13.6967L3.49665 18.0942C3.2092 19.0244 4.28545 19.7751 5.05914 19.1841L8.48099 16.57C8.83939 16.2962 9.33672 16.2962 9.69512 16.57L13.117 19.1841C13.8907 19.7751 14.9669 19.0244 14.6795 18.0942L13.3206 13.6967C13.1968 13.2963 13.3359 12.8612 13.6689 12.6068L17.2805 9.84777C18.0406 9.2671 17.63 8.05312 16.6734 8.05312H12.3142C11.8757 8.05312 11.4883 7.76737 11.3588 7.34836L10.0435 3.09181C9.7531 2.15213 8.42301 2.15214 8.13263 3.09181L6.81729 7.34836C6.68781 7.76737 6.30042 8.05312 5.86186 8.05312H1.50268C0.54615 8.05312 0.135509 9.2671 0.895623 9.84777L1.65139 10.4251"
      stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M18.5 11.033C18.5 14.4127 15.093 17.5642 12.8905 19.314C12.3685 19.7287 11.6315 19.7287 11.1095 19.314C8.90697 17.5642 5.5 14.4127 5.5 11.033C5.5 7.14877 8.13401 4 12 4C15.866 4 18.5 7.14877 18.5 11.033Z"
      stroke="#0052FF" strokeWidth="1.5"/>
    <path d="M14.5 10.5C14.5 11.8807 13.3807 13 12 13C10.6193 13 9.5 11.8807 9.5 10.5C9.5 9.11929 10.6193 8 12 8C13.3807 8 14.5 9.11929 14.5 10.5Z"
      stroke="#0052FF" strokeWidth="1.5"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M8 4L16 12L8 20" stroke="#0052FF" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhotoTourIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// Іконки зручностей — мап по назві
const AmenityIcon = ({ name }) => {
  const icons = {
    'Wi-Fi': (
      <svg width="28" height="28" viewBox="0 0 42 42" fill="none">
        <path d="M21.5 31H21.5187" stroke="#0052FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.4375 26.3848C19.1375 23.3079 23.8625 23.3079 26.5625 26.3848" stroke="#0052FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30.2746 21.769C25.1884 16.6408 18.1246 16.6408 12.7246 21.769" stroke="#0052FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 17.1539C16.5263 8.94875 26.4737 8.94874 35 17.1537" stroke="#0052FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'Балкон': (
      <svg width="28" height="28" viewBox="0 0 42 42" fill="none">
        <path d="M12.5001 22.6266H30.5M16.204 31.675V25.0538M21.4937 31.675V25.0538M26.8189 31.6348V28.3445V25.0538M12.5 32.5H30.4999" stroke="#0052FF" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M16.1914 21.8019C16.2024 20.5521 16.2151 17.6374 16.2224 15.836C16.2268 14.7333 16.2292 13.6293 16.2279 12.649C16.2255 10.9349 17.6269 9.5 19.3411 9.5H21.5001H23.8088C25.4657 9.5 26.8088 10.8431 26.8088 12.5V15.836V21.8882" stroke="#0052FF" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    'Фен': (
      <svg width="28" height="28" viewBox="0 0 42 42" fill="none">
        <path d="M16.9062 12.4713C17.7408 12.4714 18.4209 13.1505 18.4209 13.9928C18.4208 14.835 17.7407 15.5142 16.9062 15.5143C16.0718 15.5143 15.3917 14.835 15.3916 13.9928C15.3916 13.1505 16.0717 12.4713 16.9062 12.4713Z" stroke="#0052FF" strokeWidth="1.4"/>
        <path d="M16.4688 9.7002C16.8969 9.7002 19.0623 9.87613 21.5479 10.0859C24.0021 10.2931 26.714 10.5283 28.1729 10.6348C28.3671 10.6489 28.5176 10.818 28.5176 10.9941V17.2793C28.5176 17.4539 28.3688 17.6245 28.1709 17.6396C26.6957 17.7529 23.9942 18.0105 21.5508 18.2393C19.0725 18.4713 16.9192 18.667 16.4688 18.667C14.1388 18.6668 12.2003 16.6878 12.2002 14.1836C12.2002 11.6794 14.1387 9.70035 16.4688 9.7002Z" stroke="#0052FF" strokeWidth="1.4"/>
        <path d="M20.0132 28.701C19.7467 30.7073 21.3288 35.3502 24.6622 31.5499C26.753 29.1662 30.3657 31.7392 31.5003 32.4212M20.0132 28.701C20.9085 28.701 21.639 27.9845 21.6564 27.0895L21.8247 18.4399L16.8184 18.9239L18.1438 27.1099C18.2923 28.027 19.0841 28.701 20.0132 28.701Z" stroke="#0052FF" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    'Постільна білизна': (
      <svg width="28" height="28" viewBox="0 0 42 42" fill="none">
        <path d="M10.5 12.7002H30.4463C31.1641 12.7004 31.7461 13.2822 31.7461 14V19.0518C31.7459 19.7694 31.164 20.3514 30.4463 20.3516H10.5C9.78215 20.3516 9.20039 19.7696 9.2002 19.0518V14C9.2002 13.282 9.78203 12.7002 10.5 12.7002Z" stroke="#0052FF" strokeWidth="1.4"/>
        <path d="M10.5 20.7853H32.5C33.218 20.7853 33.7998 21.3671 33.7998 22.0851V28.0001C33.7998 28.7181 33.2179 29.2999 32.5 29.2999H10.5C9.78206 29.2999 9.20024 28.7181 9.2002 28.0001V22.0851C9.2002 21.3671 9.78203 20.7853 10.5 20.7853Z" stroke="#0052FF" strokeWidth="1.4"/>
        <path d="M13.8262 25.0427L28.4539 25.0425" stroke="#0052FF" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M13.7793 16.8632L28.4541 16.8632" stroke="#0052FF" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  };

  // Якщо є конкретна іконка — повертаємо її, інакше — загальний кружок
  if (icons[name]) return icons[name];

  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="#0052FF" strokeWidth="1.4"/>
      <path d="M12 8v4l3 3" stroke="#0052FF" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
};

// ─── КОМПОНЕНТ ВІДГУКУ ────────────────────────────────────────────────────────

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 100;
  const displayText = expanded || !isLong ? review.text : review.text.slice(0, 100) + '…';

  return (
    <div className="shrink-0 w-77.5 rounded-3xl p-4.5 border border-white/80"
      style={{
        background: 'linear-gradient(180deg, #ACC5F8 5%, #FFFFFF 50%, #FFFFFF 100%)',
        boxShadow: '0 10px 20px rgba(0,30,140,0.15)',
      }}>
      {/* Аватар + ім'я */}
      <div className="flex items-center gap-3 mb-2">
        <img src={review.avatar} alt={review.name}
          className="w-10 h-10 rounded-full object-cover shrink-0" />
        <span className="font-bold text-[15px] text-black">{review.name}</span>
      </div>

      {/* Зірки + дата */}
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

      {/* Текст */}
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

const PropertyDetailScreen = ({ property, onBack }) => {
  const [screen, setScreen] = useState(null); // null | 'phototour' | 'landlord' | 'identity' | 'security' | 'contract'
    const [activeTab, setActiveTab] = useState('home');

  // Навігація до підекранів
  if (screen === 'identity') {
    return <VerificationScreen type={screen} onBack={() => setScreen(null)} />;
  }

  if (screen === 'phototour') {
    return (
      <PhotoTourScreen
        property={property}
        sections={property.photos}   // ← додай цей рядок
        onBack={() => setScreen(null)}
      />
    );
  }

  if (screen === 'landlord') {
    return <LandlordScreen property={property} onBack={() => setScreen(null)} />;
  }

  if (screen === 'security') {
  return <SecurityScreen onBack={() => setScreen(null)} />;
}

  if (screen === 'contract') {
    return (
      <ContractScreen
        property={property}
        onBack={() => setScreen(null)}
        onFinish={() => setScreen(null)} // ← додай
      />
    );
  }

  const typeLabel = TYPE_LABELS[property.type] ?? 'Житло';

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">
      {/* Scrollable area */}
      <div className="flex-1 min-h-0 pb-28"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 pt-10 pb-3">
          <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
            <BackIcon />
          </button>
          <span className="font-bold text-[22px] text-[#012A81]">Житло</span>
          <div className="w-8" />
        </div>

        {/* ФОТО */}
        <div className="mx-6 rounded-[28px] overflow-hidden relative shadow-[0_8px_28px_rgba(0,30,140,0.15)]">
          <img src={property.image} alt={typeLabel}
            className="w-full h-60 object-cover block" />
          <button onClick={() => setScreen('phototour')}
            className="absolute bottom-3.5 right-3.5 bg-transparent border-none cursor-pointer
              flex items-center gap-1 text-white font-semibold text-[14px]">
            Фототур
            <PhotoTourIcon />
          </button>
        </div>

        {/* ЗАГОЛОВОК */}
        <div className="flex items-center justify-between px-6 pt-5">
          <span className="font-bold text-[18px] text-[#012A81]">{typeLabel}</span>
          <div className="flex items-center gap-1 bg-[#3173FD] rounded-xl px-2.5 py-1">
            <StarIcon />
            <span className="text-white text-[12px] font-medium">{property.rating}</span>
          </div>
        </div>

        {/* АДРЕСА */}
        <div className="flex items-center gap-1.5 px-6 pt-1">
          <LocationIcon />
          <span className="text-[13px] font-medium text-[#4b5b7e]">
            {property.address}, {property.city}
          </span>
        </div>

        {/* ЦІНА
        <p className="px-6 pt-2.5 font-bold text-[20px] text-[#0052FF]">
          {property.price}<span className="text-[14px] font-medium text-[#4b5b7e]">/міс</span>
        </p> */}

        {/* ОРЕНДОДАВЕЦЬ */}
        <h2 className="px-6 pt-9 pb-4 font-bold text-[16px] text-[#0052FF]">
          Профіль орендодавця
        </h2>
        <div className="flex items-center justify-between mx-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <img src={property.landlord?.avatar} alt={property.landlord?.name}
                className="w-full h-full object-cover" />
            </div>
            <span className="font-medium text-[14px] text-[#012A81]">
              {property.landlord?.name}
            </span>
          </div>
          <button onClick={() => setScreen('landlord')}
            className="bg-transparent border-none cursor-pointer p-1">
            <ArrowRightIcon />
          </button>
        </div>

        {/* ЗРУЧНОСТІ */}
        <h2 className="px-6 pt-9 pb-1 font-bold text-[16px] text-[#0052FF]">Зручності</h2>

        {property.amenities?.general?.length > 0 && (
          <>
            <p className="px-6 pt-2.5 pb-1 font-bold text-[12px] text-[#012A81]">Загальні</p>
            {property.amenities.general.map(item => (
              <div key={item} className="flex items-center gap-2 px-6 py-1">
                <AmenityIcon name={item} />
                <span className="font-medium text-[14px] text-[#012A81]">{item}</span>
              </div>
            ))}
          </>
        )}

        {property.amenities?.bathroom?.length > 0 && (
          <>
            <p className="px-6 pt-2.5 pb-1 font-bold text-[12px] text-[#012A81]">Ванна кімната</p>
            {property.amenities.bathroom.map(item => (
              <div key={item} className="flex items-center gap-2 px-6 py-1">
                <AmenityIcon name={item} />
                <span className="font-medium text-[14px] text-[#012A81]">{item}</span>
              </div>
            ))}
          </>
        )}

        {property.amenities?.bedroom?.length > 0 && (
          <>
            <p className="px-6 pt-2.5 pb-1 font-bold text-[12px] text-[#012A81]">Спальня</p>
            {property.amenities.bedroom.map(item => (
              <div key={item} className="flex items-center gap-2 px-6 py-1">
                <AmenityIcon name={item} />
                <span className="font-medium text-[14px] text-[#012A81]">{item}</span>
              </div>
            ))}
          </>
        )}

        {/* ЩО ПОРУЧ — КАРТА */}
        <h2 className="px-6 pt-9 pb-4 font-bold text-[16px] text-[#0052FF]">Що поруч</h2>
        <div className="mx-6 h-45 rounded-[20px] overflow-hidden shadow-[0_4px_16px_rgba(0,30,140,0.1)]">
          {property.coordinates ? (
            <PropertyMap
              coordinates={property.coordinates}
              address={property.address}
            />
          ) : (
            <div className="w-full h-full bg-[#e8edf8] flex items-center justify-center rounded-[20px]">
              <span className="text-[#4b5b7e] text-[14px]">Карта недоступна</span>
            </div>
          )}
        </div>

        {/* ВІДГУКИ */}
        <h2 className="px-6 pt-9 pb-1 font-bold text-[16px] text-[#0052FF]">Відгуки</h2>
        <div className="flex gap-3 px-6 pt-3 pb-4"
          style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {(property.reviews ?? []).map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {(!property.reviews || property.reviews.length === 0) && (
            <p className="text-[#8a9ab8] text-[14px] py-4">Поки немає відгуків</p>
          )}
        </div>

        {/* ПЕРЕВІРЯЄМО КОЖНОГО */}
        <h2 className="px-6 pt-6 pb-2 font-bold text-[16px] text-[#0052FF]">
          Перевіряємо кожного
        </h2>

        {[
          {
            key: 'identity',
            label: 'Особу підтверджено',
            icon: (
              <svg width="32" height="32" viewBox="0 0 42 42" fill="none">
                <path d="M35.2912 9.97429C34.8714 9.45643 34.1227 8.6615 33.6489 8.19351C30.3979 4.98235 25.9305 3 21 3C11.0589 3 3 11.0589 3 21C3 30.9411 11.0589 39 21 39C30.9411 39 39 30.9411 39 21C39 18.8672 38.6291 16.821 37.9482 14.9225"
                  stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
                <path d="M13.1514 22.353L16.7953 27.0018C17.1654 27.474 17.8651 27.5162 18.2894 27.092L35.292 10.0894"
                  stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ),
          },
          {
            key: 'security',
            label: (
              <>
                <span className="text-[#0052FF] font-bold">RENTO</span>
                {' '}розробив комплексну безпеку
              </>
            ),
            icon: (
              <svg width="32" height="32" viewBox="0 0 42 42" fill="none">
                <path d="M37.824 8.71191L21.6457 2.14918C21.4095 2.05336 21.1456 2.05136 20.908 2.14359L4.72551 8.4243C4.29883 8.5899 4.03904 9.02404 4.09477 9.47833L6.15839 26.2978C6.35645 27.912 7.20129 29.3767 8.49943 30.3564L20.6756 39.5454C21.0321 39.8145 21.5238 39.8145 21.8803 39.5454L34.0565 30.3564C35.3546 29.3767 36.1995 27.912 36.3975 26.2978L37.796 14.8997"
                  stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12.3701 22.7123L16.1516 27.0389C16.5183 27.4585 17.1573 27.4974 17.5722 27.1253L38 8.80521"
                  stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ),
          },
          {
            key: 'contract',
            label: 'Переглянути зразок договору',
            icon: (
              <svg width="32" height="32" viewBox="0 0 42 42" fill="none">
                <path d="M25.3519 8.28473V10.8627C25.3519 12.4235 26.6051 13.6952 28.1658 13.7181L32.5752 13.7826L33.9055 13.7623C35.6946 13.7349 36.4193 11.446 34.972 10.3939L30.7734 6.65312L28.147 4.57735C27.2642 3.87965 26.1719 3.50011 25.0467 3.5001L17.0925 3.5L8.9804 3.5001C8.13168 3.50011 7.34132 3.93205 6.88297 4.64635C6.62527 5.04795 6.48828 5.51508 6.48828 5.99225V35.8445C6.48828 36.3068 6.60897 36.7611 6.83842 37.1625C7.31128 37.9896 8.191 38.5 9.14374 38.5H32.7037C33.554 38.5 34.3644 38.1392 34.9333 37.5072L35.0118 37.4201C35.5077 36.8692 35.7822 36.1541 35.7822 35.4129V26.8193V17.7017"
                  stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ),
          },
        ].map(({ key, label, icon }, idx, arr) => (
          <div key={key}>
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                {icon}
                <span className="font-semibold text-[15px] text-[#012A81]">{label}</span>
              </div>
              <button onClick={() => setScreen(key)}
                className="bg-transparent border-none cursor-pointer p-1 ml-auto">
                <ArrowRightIcon />
              </button>
            </div>
            {idx < arr.length - 1 && (
              <div className="mx-6 h-px bg-[rgba(41,121,255,0.1)]" />
            )}
          </div>
        ))}

        <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      </div>
    </div>
  );
};

export default PropertyDetailScreen;
