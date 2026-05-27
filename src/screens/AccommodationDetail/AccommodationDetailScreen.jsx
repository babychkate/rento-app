import { useState, useEffect } from 'react';
import { TYPE_LABELS } from '../../data/properties';
import PropertyMap from '../../components/PropertyMap/PropertyMap';
import { ReviewCard } from '../../components/Cards/ReviewCard/ReviewCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import PhotoTourScreen from '../PhotoTour/PhotoTourScreen';
import LandlordScreen from '../Landlord/LandlordScreen';
import VerificationScreen from '../Verification/VerificationScreen';
import ContractScreen from '../Contract/ContractScreen';
import SecurityScreen from '../Security/SecurityScreen';
import {
  BackIcon, StarIcon, ArrowIcon, LocationIcon,
  PhotoTourIcon, VerifiedIcon, ShieldIcon, DocumentIcon
} from '../../components/Icons/Icons';

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

  if (icons[name]) return icons[name];

  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="#0052FF" strokeWidth="1.4"/>
      <path d="M12 8v4l3 3" stroke="#0052FF" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
};

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────

const AccommodationDetailScreen = ({ property, onBack, activeTab, onTabChange }) => {
  const [screen, setScreen] = useState(null); // null | 'phototour' | 'landlord' | 'identity' | 'security' | 'contract'

  // Навігація до підекранів
  if (screen === 'identity') {
    return <VerificationScreen type={screen} onBack={() => setScreen(null)} />;
  }

  if (screen === 'phototour') {
    return (
      <PhotoTourScreen
        property={property}
        sections={property.photos}
        onBack={() => setScreen(null)}
      />
    );
  }

if (screen === 'landlord') {
  return (
    <LandlordScreen
      property={property}
      onBack={() => setScreen(null)}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
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
            <ArrowIcon />
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
        <div className="mx-6 h-45 rounded-[20px] overflow-hidden shadow-[0_4px_16px_rgba(0,30,140,0.1)]" style={{ position: 'relative', zIndex: 0 }}>
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
            icon: <VerifiedIcon />,
          },
          {
            key: 'security',
            label: (
              <>
                <span className="text-[#0052FF] font-bold">RENTO</span>
                {' '}розробив комплексну безпеку
              </>
            ),
            icon: <ShieldIcon />,
          },
          {
            key: 'contract',
            label: 'Переглянути зразок договору',
            icon: <DocumentIcon />,
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
                <ArrowIcon />
              </button>
            </div>
            {idx < arr.length - 1 && (
              <div className="mx-6 h-px bg-[rgba(41,121,255,0.1)]" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-60">
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
};

export default AccommodationDetailScreen;
