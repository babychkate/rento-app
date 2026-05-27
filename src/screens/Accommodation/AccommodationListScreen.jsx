import { useState } from 'react';
import { useFavorites } from '../Context/FavouritesContext'; // ← Підключаємо контекст
import BottomNav from '../../components/BottomNav/BottomNav';
import { RentoLogo, BellIcon, ProfileIcon } from '../../components/Icons/NavIcons';
import { TYPE_LABELS, TYPE_SECTION_LABELS } from '../../data/properties';
import PropertyDetailScreen from '../PropertyDetail/PropertyDetailScreen';
import VerticalAccommodationCard from '../../components/Cards/VerticalAccommodationCard/VerticalAccommodationCard';
import { BackIcon, StarIcon, HeartIcon } from '../../components/Icons/Icons';
import { GRADIENTS } from '../../visual effects/headerGradient';


const AccommodationListScreen = ({ city, filteredProperties, onBack, onLogoClick,
                                   activeTab, onTabChange, onNotifications, onProfile }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
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
    <div className="relative z-10 flex flex-col flex-1 min-h-0 pb-28"
  style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

  {/* Градієнт + хедер — скролиться */}
  <div className="relative shrink-0">
    <div className="absolute inset-0 pointer-events-none z-0"
      style={{ background: GRADIENTS.homeHeader }} />
    <div className="relative z-10 flex items-center justify-between px-6 pt-16 pb-12">
      <button onClick={onLogoClick} className="bg-transparent border-none cursor-pointer p-0">
        <RentoLogo />
      </button>
      <div className="flex items-center gap-2.5">
        <button onClick={onNotifications} className="bg-transparent border-none cursor-pointer p-0">
          <BellIcon />
        </button>
        <button onClick={onProfile} className="bg-transparent border-none cursor-pointer p-0">
          <ProfileIcon />
        </button>
      </div>
    </div>
  </div>

  {/* Title */}
  <div className="flex items-center gap-3 px-6 pb-6">
    <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-0 flex items-center">
      <BackIcon />
    </button>
    <h1 className="font-bold text-[28px] leading-[100%] text-[#012A81]">
      Житло у {city}
    </h1>
  </div>

{sections.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6">
            <p className="text-[#8a9ab8] text-[16px] font-medium text-center">
              За обраними фільтрами житла не знайдено
            </p>
          </div>
        ) : (
          sections.map(({ key, label, items }) => (
            <div key={key}>
              <p className="px-6 pt-5 pb-3.5 font-bold text-[14px] text-[#012A81]">{label}</p>
              <div className="flex flex-col gap-4 px-6">
                {items.map(p => (
                  <VerticalAccommodationCard key={p.id} property={p} onClick={() => setSelectedProperty(p)} />
                ))}
              </div>
            </div>
          ))
      )}
      
      {/* BottomNav */}
      <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
</div>
  );
};

export default AccommodationListScreen;