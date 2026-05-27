import { useFavorites } from '../Context/FavouritesContext';
import { RentoLogo, BellIcon, ProfileIcon } from '../../components/Icons/NavIcons';
import { TYPE_SECTION_LABELS } from '../../data/properties';
import { StarIcon, HeartIcon, BackIcon } from "../../components/Icons/Icons";

// ─── ВЕРТИКАЛЬНА КАРТКА ЖИТЛА З СИНХРОННИМИ ЛАЙКАМИ ─────────────────────────
const FavVerticalPropertyCard = ({ property, onClick }) => {
  const { likedProperties, toggleProperty } = useFavorites();
  const isLiked = likedProperties.has(property.id);

  return (
    <div onClick={onClick} className="w-full h-55 rounded-[28px] overflow-hidden relative cursor-pointer shadow-[0_8px_28px_rgba(0,30,140,0.15)]">
      <img src={property.image} alt={property.address} className="w-full h-full object-cover" />
      
      {/* Badge рейтингу */}
      <div className="absolute top-3.5 right-3.5 bg-[#3173FD] rounded-xl px-2.5 py-1 flex items-center gap-1 text-white text-[12px] font-medium">
        <StarIcon />
        {property.rating}
      </div>
      
      {/* Інформаційний оверлей */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(16,58,150,0.85)] via-[rgba(49,115,253,0.25)] to-transparent px-4.5 pb-4.5 pt-10 flex justify-between items-end">
        <div className="flex flex-col gap-0.5">
          <p className="text-white text-[20px] font-bold">{property.price}/ місяць</p>
          <p className="text-white/85 text-[13px] font-medium">{property.address}</p>
        </div>
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            toggleProperty(property.id); 
          }}
          className="bg-transparent border-none cursor-pointer p-0"
        >
          <HeartIcon filled={isLiked} />
        </button>
      </div>
    </div>
  );
};

// ─── ГОЛОВНИЙ КОМПОНЕНТ ЕКРАНУ СПИСКУ ───────────────────────────────────────
const FavAccommodationListScreen = ({ favProperties, onBack, onPropertyClick }) => {
  
  // Фільтрація по типах без прив'язки до міст
  const byType = (type) => favProperties.filter(p => p.type === type);

  const sections = Object.entries(TYPE_SECTION_LABELS)
    .map(([key, label]) => ({ key, label, items: byType(key) }))
    .filter(s => s.items.length > 0);

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">
      {/* Градієнт твого дизайну */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(148,93,233,0.55) 0%, rgba(99,138,255,0.7) 8%, rgba(79,118,255,0.5) 14%, #ffffff 28%, #ffffff 100%)',
        }}
      />

      <div
        className="relative z-10 flex flex-col flex-1 min-h-0 pb-10"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-14 pb-2.5">
          <button className="bg-transparent border-none cursor-pointer p-0">
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
          <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-0 flex items-center">
            <BackIcon />
          </button>
          <h1 className="font-bold text-[32px] leading-[100%] text-[#012A81]">
            Обране житло
          </h1>
        </div>

        {/* Категорії списку */}
        {sections.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6 pt-20">
            <p className="text-[#8a9ab8] text-[16px] font-medium text-center">
              Список обраного житла порожній
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
                  <FavVerticalPropertyCard
                    key={p.id}
                    property={p}
                    onClick={() => onPropertyClick(p)} // Передаємо івент кліку наверх у FavoritesScreen
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