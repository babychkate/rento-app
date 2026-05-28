import { useState } from 'react';
import { useFavorites } from '../Context/FavouritesContext';
import { PROPERTIES, ROOMMATES } from '../../data/properties';
import BottomNav from '../../components/BottomNav/BottomNav';
import LandlordScreen from '../Landlord/LandlordScreen';
import AccommodationDetailScreen from '../AccommodationDetail/AccommodationDetailScreen';
import RoommateScreen from '../Roommate/RoommateScreen'; 
import FavPropertiesListScreen from './FavAccommodationListScreen';
import FavLandlordsListScreen from './FavLandlordsListScreen'; 
import FavRoommatesListScreen from './FavRoommatesListScreen';
import { BackIcon } from '../../components/Icons/Icons';
import { FavCard, FavSection } from '../../components/Cards/FavCard/FavCard';

const FavoritesScreen = ({ onGoHome, activeTab, onTabChange, onNotifications, onProfile }) => {
  const {
    likedProperties, likedLandlords, likedRoommates,
    toggleProperty, toggleLandlord, toggleRoommate,
  } = useFavorites();

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
      activeTab={activeTab}
      onTabChange={onTabChange}
      />
    );
  }

if (view === 'properties-list') {
  return (
    <FavPropertiesListScreen
      favProperties={favProperties}
      onBack={() => setView(null)}
      onLogoClick={onGoHome}
      onNotifications={onNotifications}
      onProfile={onProfile}
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
              activeTab={activeTab}
      onTabChange={onTabChange}
      />
    );
  }

if (view === 'landlords-list') {
  return (
    <FavLandlordsListScreen
      landlordsList={favLandlords}
      likedLandlords={likedLandlords}
      onBack={() => setView(null)}
      onLogoClick={onGoHome}
      onNotifications={onNotifications}  // ← додати
      onProfile={onProfile}              // ← додати
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
              activeTab={activeTab}
      onTabChange={onTabChange}
      />
    );
  }

if (view === 'roommates-list') {
  return (
    <FavRoommatesListScreen
      roommatesList={favRoommates}
      onBack={() => setView(null)}
      onLogoClick={onGoHome}
      onNotifications={onNotifications}
      onProfile={onProfile}
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
            onTabChange(tab);
          }}
        />
      </div>
    </div>
  );
};

export default FavoritesScreen;