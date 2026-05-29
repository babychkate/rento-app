import { useState, useMemo } from 'react';
import { useAuth } from '../../auth/AuthContext';
import FilterChip from '../../components/FilterChip/FilterChip';
import AccommodationCard from '../../components/Cards/AccommodationCard/AccommodationCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import AccommodationListScreen from '../Accommodation/AccommodationListScreen';
import FiltersScreen from '../Filters/FiltersScreen';
import AccommodationDetailScreen from '../AccommodationDetail/AccommodationDetailScreen';
import FavoritesScreen from '../Favourites/FavouritesScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import NotificationsScreen from '../Notifications/NotificationsScreen';
import MessagesScreen from '../Messages/MessagesScreen';
import CommunityScreen from '../Community/CommunityScreen';
import TinderScreen from '../Tinder/TinderScreen';
import { ArrowIcon, FilterIcon, SearchIcon } from '../../components/Icons/Icons';
import { RentoLogo, BellIcon, ProfileIcon,} from '../../components/Icons/NavIcons';
import { PROPERTIES, CITIES, TYPE_LABELS, QUICK_FILTERS, TAG_TO_SECTION } from '../../data/properties';
import { GRADIENTS } from '../../visual effects/headerGradient';

const INITIAL_FILTERS = {
  city: '', types: [], quickTags: [], radius: [],
  priceFrom: '', priceTo: '', rooms: [],
  totalFrom: '', totalTo: '', livingFrom: '', livingTo: '',
  floorFrom: '', floorTo: '', bedsFrom: '', bedsTo: '',
  renovation: [], walls: [], offer: [], living: [],
  planning: [], barrier: [], light: [], heating: [], rental: [],
};

const matchRoomsLogic = (propertyRooms, selectedRooms) => {
  if (!selectedRooms.length) return true;
  return selectedRooms.some(r =>
    r === '4+' ? propertyRooms >= 4 : propertyRooms === Number(r)
  );
};

const HomeScreen = ({ onLogout }) => {
  const { user } = useAuth();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [cityView, setCityView] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const toggleType = (type) =>
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(x => x !== type)
        : [...prev.types, type],
    }));

  const toggleQuickTag = (tag) => {
    const section = TAG_TO_SECTION[tag];
    setFilters(prev => {
      const isActive = prev.quickTags.includes(tag);
      const newQuickTags = isActive
        ? prev.quickTags.filter(x => x !== tag)
        : [...prev.quickTags, tag];

      if (section) {
        const prevSection = prev[section] ?? [];
        const newSection = isActive
          ? prevSection.filter(x => x !== tag)
          : prevSection.includes(tag) ? prevSection : [...prevSection, tag];
        return { ...prev, quickTags: newQuickTags, [section]: newSection };
      }
      return { ...prev, quickTags: newQuickTags };
    });
  };

  const setSearch = (value) =>
    setFilters(prev => ({ ...prev, city: value }));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCityView(null); // ← додати
    setSelectedProperty(null); // ← додати
      setShowProfile(false);       // ← додати
  setShowNotifications(false); // ← додати
  };

  // Фільтрація
  const filtered = useMemo(() => {
    const f = filters;
    return PROPERTIES.filter(p => {
      const matchCity = !f.city?.trim() ||
        p.city.toLowerCase().includes(f.city.toLowerCase()) ||
        p.address.toLowerCase().includes(f.city.toLowerCase());
      const matchType = f.types.length === 0 || f.types.includes(p.type);
      const matchQuick = f.quickTags.length === 0 || f.quickTags.every(tag => p.tags.includes(tag));
      const matchPrice = (!f.priceFrom || p.priceNum >= Number(f.priceFrom)) && (!f.priceTo || p.priceNum <= Number(f.priceTo));
      const matchRooms = matchRoomsLogic(p.rooms, f.rooms ?? []);
      const matchTotal = (!f.totalFrom || p.totalArea >= Number(f.totalFrom)) && (!f.totalTo || p.totalArea <= Number(f.totalTo));
      const matchLiving = (!f.livingFrom || p.livingArea >= Number(f.livingFrom)) && (!f.livingTo || p.livingArea <= Number(f.livingTo));
      const matchFloor = (!f.floorFrom || p.floor == null || p.floor >= Number(f.floorFrom)) && (!f.floorTo || p.floor == null || p.floor <= Number(f.floorTo));
      const matchBeds = (!f.bedsFrom || (p.beds ?? 0) >= Number(f.bedsFrom)) && (!f.bedsTo || (p.beds ?? 0) <= Number(f.bedsTo));

      const tagSections = [
        f.living ?? [], f.planning ?? [], f.barrier ?? [],
        f.light ?? [], f.heating ?? [], f.rental ?? [],
      ];
      const matchExtTags = tagSections.every(section =>
        section.length === 0 || section.some(tag => p.tags.includes(tag))
      );

      return matchCity && matchType && matchQuick && matchPrice && matchRooms && matchTotal && matchLiving && matchFloor && matchBeds && matchExtTags;
    });
  }, [filters]);

  const byCity = (city) => filtered.filter(p => p.city === city);

if (selectedProperty) {
  return (
    <AccommodationDetailScreen
      property={selectedProperty}
      onBack={() => setSelectedProperty(null)}
      activeTab={activeTab}        // ← додати
      onTabChange={handleTabChange} // ← додати
    />
  );
}

if (showFilters) {
  return (
    <FiltersScreen
      initialFilters={filters}
      onBack={() => setShowFilters(false)}
      onApply={(newFilters) => {
        setFilters(newFilters);
        setShowFilters(false);
      }}
    />
  );
}

if (showProfile) {
  return (
    <ProfileScreen
      onBack={() => setShowProfile(false)}
      onLogout={onLogout}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  );
}

if (showNotifications) {
  return (
    <NotificationsScreen
      onBack={() => setShowNotifications(false)}
      onLogout={onLogout}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onProfile={() => setShowProfile(true)}
      onNotifications={() => setShowNotifications(true)}
    />
  );
}
if (cityView) {
  return (
    <AccommodationListScreen
      city={cityView.city}
      filteredProperties={filtered}
      onBack={() => setCityView(null)}
      onLogoClick={() => setCityView(null)}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onNotifications={() => setShowNotifications(true)}
      onProfile={() => setShowProfile(true)}
    />
  );
  }
  
  if (activeTab === 'community') {
  return (
    <CommunityScreen
      onBack={() => setActiveTab('home')}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  );
}

if (activeTab === 'messages') {
  return <MessagesScreen onBack={() => setActiveTab('home')} />;
}

if (activeTab === 'tinder') {
  return (
    <TinderScreen
      onBack={() => setActiveTab('home')}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  );
}

if (activeTab === 'favorites') {
  return (
    <FavoritesScreen
      onGoHome={() => setActiveTab('home')}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onNotifications={() => setShowNotifications(true)}
      onProfile={() => setShowProfile(true)}
    />
  );
}
  // --- ДИНАМІЧНИЙ РЕНДЕР КОНТЕНТУ ВКЛАДОК ---
  const renderMainContent = () => {
    
        return (
          <>            
            <div className="relative shrink-0">
            {/* Градієнт — висота батька */}
            <div className="absolute inset-0 pointer-events-none z-0"
              style={{ background: GRADIENTS.homeHeader }} />

            {/* Хедер */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-16 pb-12">
              <button className="bg-transparent border-none cursor-pointer p-0">
                <RentoLogo />
              </button>
              <div className="flex items-center gap-2.5">
                <button onClick={() => setShowNotifications(true)} className="bg-transparent border-none cursor-pointer p-0">
                  <BellIcon />
                </button>
                <button onClick={() => setShowProfile(true)} className="bg-transparent border-none cursor-pointer p-0">
                  <ProfileIcon />
                </button>
              </div>
              </div>
              </div>

          {/* Hero */}
          <p className="relative z-10 px-6 pb-10 font-bold text-[28px] leading-[100%] text-[#012A81]">
            Знайди своє<br />омріяне житло!
          </p>
                    
            {/* Search */}
            <div className="px-6 pb-5">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  {/* Іконка лупи, позиціонована всередині інпута */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Введіть місто або вулицю"
                    value={filters.city}
                    onChange={e => setSearch?.(e.target.value) || setFilters?.(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full pl-12 pr-4.5 py-3.5 rounded-full border-[2.5px] border-[#2979ff] bg-[#dde5f6] font-montserrat text-[14px] text-[#0f1e5c] outline-none appearance-none shadow-[inset_0_3px_8px_rgba(41,121,255,0.08),0_4px_14px_rgba(41,121,255,0.15),inset_0_-2px_0_rgba(41,121,255,0.12)] placeholder:text-[#4b5b7e]"
                  />
                </div>
                {/* Кнопка фільтра, яка викликає модалку */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center border-[1.5px] border-white/60 cursor-pointer bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)] shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.5)]"
                >
                  <FilterIcon />
                </button>
              </div>
            </div>

            {/* Type filters */}
            <div className="px-6 pb-1">
              <div className="flex gap-2.5" style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '2px' }}>
                {Object.entries(TYPE_LABELS).map(([key, label]) => (
                  <FilterChip key={key} label={label} active={filters.types.includes(key)} onClick={() => toggleType(key)} />
                ))}
              </div>
            </div>

            {/* Quick filters */}
            <p className="px-6 pt-7 pb-3 font-bold text-[14px] text-[#012A81]">Додаткові фільтри</p>
            <div className="px-6 pb-1">
              <div className="flex gap-2.5" style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '2px' }}>
                {QUICK_FILTERS.map(f => (
                  <FilterChip key={f} label={f} active={filters.quickTags.includes(f)} onClick={() => toggleQuickTag(f)} />
                ))}
              </div>
            </div>

            {/* City sections */}
            {CITIES.map(city => {
              const items = byCity(city);
              if (items.length === 0) return null;
              return (
                <div key={city}>
                  <div className="flex items-center justify-between px-6 pt-7 pb-4">
                    <span className="font-bold text-[14px] text-[#012A81]">Житло у {city}</span>
                    <button onClick={() => setCityView({ city })} className="bg-transparent border-none cursor-pointer p-0">
                      <ArrowIcon />
                    </button>
                  </div>
                  <div className="flex gap-4 px-6 pb-2" style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {items.map(p => (
                      <AccommodationCard key={p.id} property={p} onClick={() => setSelectedProperty(p)} />
                    ))}
                  </div>
                </div>
              );
            })}

            {CITIES.every(city => byCity(city).length === 0) && (
              <div className="flex items-center justify-center px-6 py-20">
                <p className="text-[#8a9ab8] text-[16px] font-medium text-center">За обраними фільтрами житла не знайдено</p>
              </div>
            )}
          </>
        );
  };

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat">

      {/* Основна контентна область — скролиться */}
      <div className="relative z-10 flex flex-col flex-1 min-h-0 pb-28"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {renderMainContent()}
      </div>

      {/* BottomNav */}
      <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
};

export default HomeScreen;