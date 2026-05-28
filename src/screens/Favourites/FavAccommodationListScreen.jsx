import { useFavorites } from '../Context/FavouritesContext';
import { RentoLogo, BellIcon, ProfileIcon } from '../../components/Icons/NavIcons';
import { TYPE_SECTION_LABELS } from '../../data/properties';
import { GRADIENTS } from '../../visual effects/headerGradient';
import { BackIcon } from "../../components/Icons/Icons";
import VerticalAccommodationCard from '../../components/Cards/VerticalAccommodationCard/VerticalAccommodationCard';

const FavAccommodationListScreen = ({ favProperties, onBack, onPropertyClick, onLogoClick, onNotifications, onProfile }) => {
  const byType = (type) => favProperties.filter(p => p.type === type);
  const sections = Object.entries(TYPE_SECTION_LABELS)
    .map(([key, label]) => ({ key, label, items: byType(key) }))
    .filter(s => s.items.length > 0);

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">
      <div className="relative z-10 flex flex-col flex-1 min-h-0 pb-10"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* Градієнт + хедер */}
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

        {/* Page title */}
        <div className="flex items-center gap-3 px-6 pb-6">
          <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-0 flex items-center">
            <BackIcon />
          </button>
          <h1 className="font-bold text-[28px] leading-[100%] text-[#012A81]">
            Обране житло
          </h1>
        </div>

        {/* Секції */}
        {sections.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6 pt-20">
            <p className="text-[#8a9ab8] text-[16px] font-medium text-center">
              Список обраного житла порожній
            </p>
          </div>
        ) : (
          sections.map(({ key, label, items }) => (
            <div key={key}>
              <p className="px-6 pt-5 pb-3.5 font-bold text-[14px] text-[#012A81]">{label}</p>
              <div className="flex flex-col gap-4 px-6">
                {items.map(p => (
                  <VerticalAccommodationCard
                    key={p.id}
                    property={p}
                    onClick={() => onPropertyClick(p)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavAccommodationListScreen;