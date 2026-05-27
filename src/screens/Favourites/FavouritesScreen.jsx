import { useState } from 'react';
import { useFavorites } from '../Context/FavouritesContext';
import { PROPERTIES, ROOMMATES } from '../../data/properties';
import BottomNav from '../../components/BottomNav/BottomNav';
import LandlordScreen from '../Landlord/LandlordScreen';
import AccommodationDetailScreen from '../AccommodationDetail/AccommodationDetailScreen';
import RoommateScreen from '../Roommate/RoommateScreen'; 
import FavPropertiesListScreen from './FavAccommodationListScreen';

// 1. ІМПОРТУЄМО НАШІ ОНОВЛЕНІ ЕКРАНИ ДЛЯ СПИСКІВ
import LandlordsListScreen from './FavLandlordsListScreen'; 
import FavRoommatesListScreen from './FavRoommatesListScreen'; // <--- НАШ НОВИЙ ІМПОРТ

// ─── ІКОНКИ ────────────────────────────────────────────────────────────────
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16 20L8 12L16 4" stroke="#0052FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 12H20M20 12L13 5M20 12L13 19" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="38" height="38" viewBox="0 0 42 42" fill="none">
    <path d="M24.5189 26.2766C23.8026 27.0369 22.5293 28.3835 21.7267 29.232C21.3319 29.6493 20.6693 29.6497 20.2751 29.2319C18.6188 27.4771 14.5384 23.1534 12.4378 20.924C11.4757 19.9028 11 18.5718 11 17.2293C11 15.8868 11.4757 14.5444 12.4378 13.5232C14.3622 11.4923 17.4757 11.4923 19.4 13.5232L20.2615 14.4438C20.6558 14.8651 21.3238 14.8662 21.7195 14.4462L22.5892 13.5232C24.5135 11.4923 27.6162 11.4923 29.5405 13.5232C30.5243 14.5444 31 15.8754 31 17.2293C31 18.5603 30.5243 19.9028 29.5622 20.924L26.2492 24.4402"
      stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="white"/>
  </svg>
);

// ─── ГОРИЗОНТАЛЬНА КАРТКА (для головного екрану обраного) ────────────────────────
const FavCard = ({ image, rating, mainText, subText, onLike, onClick }) => (
  <div
    onClick={onClick}
    className="flex-shrink-0 w-[210px] h-[270px] rounded-[28px] overflow-hidden relative cursor-pointer"
    style={{ boxShadow: '0 8px 24px rgba(0,30,140,0.12)' }}
  >
    <img src={image} alt={mainText} className="w-full h-full object-cover block" />
    <div className="absolute top-3.5 right-3.5 bg-[#3173FD] rounded-xl px-2 py-1 flex items-center gap-1 text-white text-[11px] font-semibold">
      <StarIcon />
      {rating}
    </div>
    <div className="absolute inset-0 flex flex-col justify-end p-4"
      style={{ background: 'linear-gradient(to top, rgba(1,42,129,0.85) 0%, rgba(1,42,129,0.3) 40%, transparent 100%)' }}>
      <p className="text-white text-[16px] font-bold mb-0.5">{mainText}</p>
      <p className="text-white/80 text-[12px] font-medium">{subText}</p>
      <button
        onClick={(e) => { e.stopPropagation(); onLike?.(); }}
        className="absolute bottom-4 right-4 bg-transparent border-none cursor-pointer p-0"
      >
        <HeartIcon />
      </button>
    </div>
  </div>
);

// ─── СЕКЦІЯ НА ГОЛОВНОМУ ЕКРАНІ ─────────────────────────────────────────────
const FavSection = ({ title, items, onArrowClick, renderCard }) => {
  if (!items || items.length === 0) return null;
  return (
    <>
      <div onClick={onArrowClick} className="flex justify-between items-center px-6 pt-6 pb-3 cursor-pointer">
        <span className="font-bold text-[16px] text-[#012A81]">{title}</span>
        <ArrowIcon />
      </div>
      <div className="flex gap-4 px-6 pb-2.5" style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {items.map(renderCard)}
      </div>
    </>
  );
};

// ─── ГОЛОВНИЙ КОМПОНЕНТ ────────────────────────────────────────────────────
const FavoritesScreen = ({ onGoHome }) => {
  const {
    likedProperties, likedLandlords, likedRoommates,
    toggleProperty, toggleLandlord, toggleRoommate,
  } = useFavorites();

  const [activeTab, setActiveTab] = useState('favorites');
  const [view, setView] = useState(null);
  const [previousView, setPreviousView] = useState(null);
  const [selected, setSelected] = useState(null);

  const arrProperties = Array.from(likedProperties || []);
  const arrLandlords = Array.from(likedLandlords || []);
  const arrRoommates = Array.from(likedRoommates || []);

  const favProperties = PROPERTIES.filter(p => arrProperties.includes(p.id));
  
  const favLandlords = PROPERTIES
    .filter(p => p.landlord && arrLandlords.includes(p.landlord.id))
    .map(p => ({
      ...p.landlord,
      rating: p.rating,
      address: p.address
    }));

  const favRoommates = ROOMMATES.filter(r => arrRoommates.includes(r.id));

  // ── Маршрутизація під-екранів ────────────────────────────────────────────
  if (view === 'property-detail' && selected) {
    return (
      <AccommodationDetailScreen
        property={selected}
        onBack={() => {
          setView(previousView);
          setPreviousView(null);
          setSelected(null);
        }}
      />
    );
  }

  if (view === 'properties-list') {
    return (
      <FavPropertiesListScreen
        favProperties={favProperties}
        onBack={() => setView(null)}
        onPropertyClick={(p) => {
          setPreviousView('properties-list');
          setSelected(p);
          setView('property-detail');
        }}
      />
    );
  }

  if (view === 'landlord-detail' && selected) {
    return (
      <LandlordScreen
        property={selected}
        onBack={() => {
          setView(previousView);
          setPreviousView(null);
          setSelected(null);
        }}
      />
    );
  }

  if (view === 'landlords-list') {
    return (
      <LandlordsListScreen
        landlordsList={favLandlords}
        likedLandlords={likedLandlords}
        onBack={() => setView(null)}
        onLogoClick={onGoHome}
        onToggleFavorite={(id) => toggleLandlord(id)}
        onOpenDetails={(landlord) => {
          setPreviousView('landlords-list');
          setSelected({ landlord: landlord, rating: landlord.rating, address: landlord.address });
          setView('landlord-detail');
        }}
      />
    );
  }

  if (view === 'roommate-detail' && selected) {
    return (
      <RoommateScreen
        roommate={selected}
        onBack={() => {
          setView(previousView);
          setPreviousView(null);
          setSelected(null);
        }}
      />
    );
  }

  // 2. ПІДКЛЮЧАЄМО НАШ НОВИЙ ЕКРАН ДЛЯ СПИСКУ СПІВМЕШКАНЦІВ
  if (view === 'roommates-list') {
    return (
      <FavRoommatesListScreen
        roommatesList={favRoommates}
        likedRoommates={likedRoommates} // Прокидаємо Set з контексту
        onBack={() => setView(null)}
        onLogoClick={onGoHome}
        onToggleFavorite={(id) => toggleRoommate(id)}
        onOpenDetails={(roommate) => {
          setPreviousView('roommates-list');
          setSelected(roommate);
          setView('roommate-detail');
        }}
      />
    );
  }

  const isEmpty = favProperties.length === 0 && favLandlords.length === 0 && favRoommates.length === 0;

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">
      <div className="flex-1 min-h-0 pb-28" style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 pt-10 pb-2.5">
          <button onClick={onGoHome} className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center w-9 h-9">
            <BackIcon />
          </button>
          <span className="font-bold text-[22px] text-[#012A81]">Обране</span>
          <div className="w-9" />
        </div>

        {/* Порожній стан */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center px-8 py-24 text-center gap-4">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#c5d0e8" strokeWidth="1.5"/>
            </svg>
            <p className="font-bold text-[18px] text-[#012A81]">Список порожній</p>
            <p className="text-[14px] text-[#8a9ab8] font-medium leading-relaxed">
              Додавайте квартири, орендодавців та співмешканців — натискайте ❤️ на картці
            </p>
          </div>
        )}

        {/* ЖИТЛО */}
        <FavSection
          title="Житло"
          items={favProperties}
          onArrowClick={() => setView('properties-list')}
          renderCard={(p) => (
            <FavCard
              key={p.id}
              image={p.image}
              rating={p.rating}
              mainText={`${p.price}/ місяць`}
              subText={p.address}
              onLike={() => toggleProperty(p.id)}
              onClick={() => {
                setPreviousView(null);
                setSelected(p);
                setView('property-detail');
              }}
            />
          )}
        />

        {/* ОРЕНДОДАВЦІ */}
        <FavSection
          title="Орендодавці"
          items={PROPERTIES.filter(p => p.landlord && arrLandlords.includes(p.landlord.id))}
          onArrowClick={() => setView('landlords-list')}
          renderCard={(p) => (
            <FavCard
              key={p.id}
              image={p.landlord.avatar}
              rating={p.rating}
              mainText={p.landlord.name}
              subText={p.address}
              onLike={() => toggleLandlord(p.landlord.id)}
              onClick={() => {
                setPreviousView(null);
                setSelected(p);
                setView('landlord-detail');
              }}
            />
          )}
        />

        {/* СПІВМЕШКАНЦІ */}
        <FavSection
          title="Співмешканці"
          items={favRoommates}
          onArrowClick={() => setView('roommates-list')}
          renderCard={(r) => (
            <FavCard
              key={r.id}
              image={r.avatar}
              rating={r.rating}
              mainText={r.name}
              subText={r.subtitle}
              onLike={() => toggleRoommate(r.id)} 
              onClick={() => {
                setPreviousView(null);
                setSelected(r);
                setView('roommate-detail');
              }}
            />
          )}
        />
      </div>

      {/* BOTTOM NAV */}
      <div className="relative z-10">
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'home') { onGoHome?.(); return; }
            setActiveTab(tab);
          }}
        />
      </div>
    </div>
  );
};

export default FavoritesScreen;