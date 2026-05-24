import { useState, useMemo } from 'react';
import { useAuth } from '../Context/AuthContext';
import FilterChip from '../../components/FilterChip/FilterChip';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import CityListingsScreen from '../CityListinings/CityListingsScreen';
import FiltersScreen from '../Filters/FiltersScreen';
import {
  RentoLogo, BellIcon, ProfileIcon,
  FilterIcon, ArrowIcon,
} from '../../components/Icons/HomeNavIcons';
import { PROPERTIES, CITIES, TYPE_LABELS, QUICK_FILTERS } from '../../data/properties';

const HomeScreen = ({ onLogout }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab]         = useState('home');
  const [search, setSearch]               = useState('');
  const [activeType, setActiveType]       = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [cityView, setCityView]           = useState(null);
  const [showFilters, setShowFilters]     = useState(false);

  const toggleFilter = (f) =>
    setActiveFilters(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );

  const filtered = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchSearch = search.trim() === '' ||
        p.city.toLowerCase().includes(search.toLowerCase()) ||
        p.address.toLowerCase().includes(search.toLowerCase());
      const matchType    = !activeType || p.type === activeType;
      const matchFilters = activeFilters.length === 0 ||
        activeFilters.every(f => p.tags.includes(f));
      return matchSearch && matchType && matchFilters;
    });
  }, [search, activeType, activeFilters]);

  const byCity = (city) => filtered.filter(p => p.city === city);

  if (showFilters) return <FiltersScreen onBack={() => setShowFilters(false)} />;
  if (cityView)    return <CityListingsScreen city={cityView.city} onBack={() => setCityView(null)} />;

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat">

      {/* Градієнт фон */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(148,93,233,0.55) 0%, rgba(99,138,255,0.7) 8%, rgba(79,118,255,0.5) 14%, #ffffff 28%, #ffffff 100%)',
        }}
      />

      {/* Скролабельний контент */}
      <div
        className="relative z-10 flex flex-col flex-1 min-h-0 pb-28"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-14 pb-2.5">
          <button className="bg-transparent border-none cursor-pointer p-0">
            <RentoLogo />
          </button>
          <div className="flex items-center gap-2.5">
            <button className="bg-transparent border-none cursor-pointer p-0">
              <BellIcon />
            </button>
            <button
              onClick={onLogout}
              className="bg-transparent border-none cursor-pointer p-0"
            >
              <ProfileIcon />
            </button>
          </div>
        </div>

        {/* Hero */}
        <p className="px-6 pt-10 pb-10 font-bold text-[28px] leading-[100%] text-[#012A81]">
          Знайди своє<br />омріяне житло!
        </p>

        {/* Search row */}
        <div className="px-6 pb-5">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Введіть місто або вулицю"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-[18px] py-[14px] rounded-full
                border-[2.5px] border-[#2979ff] bg-[#dde5f6]
                font-montserrat text-[14px] text-[#0f1e5c]
                outline-none appearance-none
                shadow-[inset_0_3px_8px_rgba(41,121,255,0.08),0_4px_14px_rgba(41,121,255,0.15),inset_0_-2px_0_rgba(41,121,255,0.12)]
                placeholder:text-[#4b5b7e]"
            />
            <button
              onClick={() => setShowFilters(true)}
              className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center
                border-[1.5px] border-white/60 cursor-pointer
                bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)]
                shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.5)]"
            >
              <FilterIcon />
            </button>
          </div>
        </div>

        {/* Type filters */}
<div className="px-6 pb-1">
  <div
    className="flex gap-2.5"
    style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '2px' }}
  >
    {Object.entries(TYPE_LABELS).map(([key, label]) => (
      <FilterChip
        key={key}
        label={label}
        active={activeType === key}
        onClick={() => setActiveType(prev => prev === key ? null : key)}
      />
    ))}
  </div>
</div>

{/* Quick filters label */}
<p className="px-6 pt-7 pb-3 font-bold text-[14px] text-[#012A81]">
  Додаткові фільтри
</p>

{/* Quick filters */}
<div className="px-6 pb-1">
  <div
    className="flex gap-2.5"
    style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '2px' }}
  >
    {QUICK_FILTERS.map(f => (
      <FilterChip
        key={f}
        label={f}
        active={activeFilters.includes(f)}
        onClick={() => toggleFilter(f)}
      />
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
                <span className="font-bold text-[14px] text-[#012A81]">
                  Житло у {city}
                </span>
                <button
                  onClick={() => setCityView({ city })}
                  className="bg-transparent border-none cursor-pointer p-0"
                >
                  <ArrowIcon />
                </button>
              </div>
              <div
                className="flex gap-4 px-6 pb-2"
                style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {items.map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          );
        })}

      </div>

      {/* Bottom nav */}
      <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

    </div>
  );
};

export default HomeScreen;