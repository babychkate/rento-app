import { useState } from 'react';
import { useFavorites } from '../Context/FavouritesContext'; // ← Підключаємо контекст
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import { RentoLogo, BellIcon, ProfileIcon } from '../../components/Icons/HomeNavIcons';
import { TYPE_LABELS, TYPE_SECTION_LABELS } from '../../data/properties';
import PropertyDetailScreen from '../PropertyDetail/PropertyDetailScreen';

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16 20L8 12L16 4" stroke="#3173FD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 23 22" fill="none">
    <path d="M3.25907 11.6533L4.50719 12.6068C4.84022 12.8612 4.97928 13.2963 4.85555 13.6967L3.49665 18.0942C3.2092 19.0244 4.28545 19.7751 5.05914 19.1841L8.48099 16.57C8.83939 16.2962 9.33672 16.2962 9.69512 16.57L13.117 19.1841C13.8907 19.7751 14.9669 19.0244 14.6795 18.0942L13.3206 13.6967C13.1968 13.2963 13.3359 12.8612 13.6689 12.6068L17.2805 9.84777C18.0406 9.2671 17.63 8.05312 16.6734 8.05312H12.3142C11.8757 8.05312 11.4883 7.76737 11.3588 7.34836L10.0435 3.09181C9.7531 2.15213 8.42301 2.15214 8.13263 3.09181L6.81729 7.34836C6.68781 7.76737 6.30042 8.05312 5.86186 8.05312H1.50268C0.54615 8.05312 0.135509 9.2671 0.895623 9.84777L1.65139 10.4251"
      stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg 
    width="38" 
    height="38" 
    viewBox="0 0 42 42" 
    fill={filled ? "white" : "none"} // ← тепер це працює динамічно!
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M24.5189 26.2766C23.8026 27.0369 22.5293 28.3835 21.7267 29.232C21.3319 29.6493 20.6693 29.6497 20.2751 29.2319C18.6188 27.4771 14.5384 23.1534 12.4378 20.924C11.4757 19.9028 11 18.5718 11 17.2293C11 15.8868 11.4757 14.5444 12.4378 13.5232C14.3622 11.4923 17.4757 11.4923 19.4 13.5232L20.2615 14.4438C20.6558 14.8651 21.3238 14.8662 21.7195 14.4462L22.5892 13.5232C24.5135 11.4923 27.6162 11.4923 29.5405 13.5232C30.5243 14.5444 31 15.8754 31 17.2293C31 18.5603 30.5243 19.9028 29.5622 20.924L26.2492 24.4402"
      stroke="white" 
      strokeWidth="1.4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      // Переконайся, що тут НЕМАЄ внутрішнього fill="white", інакше він усе переб'є
    />
  </svg>
);

const VerticalPropertyCard = ({ property, onClick }) => {
  const { likedProperties, toggleProperty } = useFavorites(); // ← Отримуємо глобальний стан
  const isLiked = likedProperties.has(property.id); // Перевіряємо, чи цей ID є в обраному

  return (
    <div onClick={onClick} className="w-full h-55 rounded-[28px] overflow-hidden relative cursor-pointer shadow-[0_8px_28px_rgba(0,30,140,0.15)]">
      <img
        src={property.image}
        alt={property.address}
        className="w-full h-full object-cover"
      />
      {/* Badge */}
      <div className="absolute top-3.5 right-3.5 bg-[#3173FD] rounded-xl px-2.5 py-1 flex items-center gap-1 text-white text-[12px] font-medium">
        <StarIcon />
        {property.rating}
      </div>
      {/* Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-[rgba(16,58,150,0.85)] via-[rgba(49,115,253,0.25)] to-transparent px-4.5 pb-4.5 pt-10 flex justify-between items-end">
        <div className="flex flex-col gap-0.5">
          <p className="text-white text-[20px] font-bold">{property.price}/ місяць</p>
          <p className="text-white/85 text-[13px] font-medium">{property.address}</p>
        </div>
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            toggleProperty(property.id); // ← Перемикаємо глобально
          }}
          className="bg-transparent border-none cursor-pointer p-0"
        >
          <HeartIcon filled={isLiked} /> {/* Рендериться залежно від глобального лайку */}
        </button>
      </div>
    </div>
  );
};

const CityListingsScreen = ({ city, filteredProperties, onBack, onLogoClick }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Групуємо по типу — тільки ті що пройшли фільтр
  const byType = (type) => filteredProperties.filter(p => p.city === city && p.type === type);

  const sections = Object.entries(TYPE_SECTION_LABELS)
    .map(([key, label]) => ({ key, label, items: byType(key) }))
    .filter(s => s.items.length > 0);

  if (selectedProperty) {
    return (
      <PropertyDetailScreen
        property={selectedProperty}
        onBack={() => setSelectedProperty(null)}
      />
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat">

      {/* Градієнт */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(148,93,233,0.55) 0%, rgba(99,138,255,0.7) 8%, rgba(79,118,255,0.5) 14%, #ffffff 28%, #ffffff 100%)',
        }}
      />

      <div
        className="relative z-10 flex flex-col flex-1 min-h-0 pb-28"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-14 pb-2.5">
          <button
            onClick={onLogoClick}
            className="bg-transparent border-none cursor-pointer p-0"
          >
            <RentoLogo />
          </button>
          <div className="flex items-center gap-2.5">
            <button className="bg-transparent border-none cursor-pointer p-0">
              <BellIcon />
            </button>
            <button className="bg-transparent border-none cursor-pointer p-0">
              <ProfileIcon />
            </button>
          </div>
        </div>

        {/* Page title */}
        <div className="flex items-center gap-3 px-6 pt-9 pb-6">
          <button
            onClick={onBack}
            className="bg-transparent border-none cursor-pointer p-0 flex items-center"
          >
            <BackIcon />
          </button>
          <h1 className="font-bold text-[32px] leading-[100%] text-[#012A81]">
            Житло у {city}
          </h1>
        </div>

        {/* Sections by type */}
        {sections.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6">
            <p className="text-[#8a9ab8] text-[16px] font-medium text-center">
              За обраними фільтрами житла не знайдено
            </p>
          </div>
        ) : (
          sections.map(({ key, label, items }) => (
            <div key={key}>
              <p className="px-6 pt-5 pb-3.5 font-bold text-[14px] text-[#012A81]">
                {label}
              </p>
              <div className="flex flex-col gap-4 px-6">
                {items.map(p => (
                  <VerticalPropertyCard
                    key={p.id}
                    property={p}
                    onClick={() => setSelectedProperty(p)}
                  />
                ))}
              </div>
            </div>
          ))
        )}

      </div>

      {/* Bottom nav */}
      <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

    </div>
  );
};

export default CityListingsScreen;