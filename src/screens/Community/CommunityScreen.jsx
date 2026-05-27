import { useState, useMemo } from 'react';
import { ROOMMATES } from '../../data/properties';
import BottomNav from '../../components/BottomNav/BottomNav';
import BazaarScreen from '../Bazaar/BazaarScreen';
import FilterChip from '../../components/FilterChip/FilterChip';
import AllRoommatesScreen from '../Roommate/AllRoomatesScreen';
import RoommateScreen from '../Roommate/RoommateScreen';
import { UserCard } from '../../components/Cards/UserCard/UserCard';
import { BackIcon, ArrowIcon, ArrowWhiteIcon, SearchIcon } from '../../components/Icons/Icons';
import MessagesScreen from '../Messages/MessagesScreen';
import FavoritesScreen from '../Favourites/FavouritesScreen';
import TinderScreen from '../Tinder/TinderScreen';

const ALL_TAGS = [...new Set(ROOMMATES.flatMap(r => r.tags))].sort();

const CommunityScreen = ({ onBack, activeTab, onTabChange }) => {
  const [citySearch, setCitySearch] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [innerView, setInnerView] = useState(null);

  const toggleTag = (tag) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    return ROOMMATES.filter(r => {
      const matchCity = !citySearch.trim() ||
        r.city.toLowerCase().includes(citySearch.toLowerCase());
      const matchTags = activeTags.length === 0 ||
        activeTags.every(tag => r.tags.includes(tag));
      return matchCity && matchTags;
    });
  }, [citySearch, activeTags]);

  const recommended = filtered.slice(0, 4);

  if (innerView === 'all') {
    return (
      <AllRoommatesScreen
        onBack={() => setInnerView(null)}
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'home') { onBack?.(); return; }
          setInnerView(null);
          onTabChange(tab);
        }}
      />
    );
  }

  if (innerView?.type === 'roommate') {
    return (
      <RoommateScreen
        roommate={innerView.roommate}
        onBack={() => setInnerView(null)}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setInnerView(null); 
          onTabChange(tab);   
        }}
      />
    );
  }
  
  if (innerView === 'bazaar') {
    return <BazaarScreen onBack={() => setInnerView(null)} />;
  }

  if (activeTab === 'home') {
    onBack?.();
    return null;
  }
    
  if (activeTab === 'messages') {
    return <MessagesScreen onBack={() => onTabChange('community')} />;
  }

  if (activeTab === 'favorites') {
    return <FavoritesScreen onBack={() => onTabChange('community')} onGoHome={() => onTabChange('community')} />;
  }

  if (activeTab === 'tinder') {
    return <TinderScreen onBack={() => onTabChange('community')} />;
  }

  // Розбиваємо теги на два рядки
  const row1 = ALL_TAGS.slice(0, Math.ceil(ALL_TAGS.length / 2));
  const row2 = ALL_TAGS.slice(Math.ceil(ALL_TAGS.length / 2));

  // ДИНАМІЧНИЙ РЕНДЕР КОНТЕНТУ ВКЛАДОК (Як на HomeScreen)
  const renderMainContent = () => {
    return (
      <>
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 pt-14 pb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none cursor-pointer"
          >
            <BackIcon />
          </button>
          <span className="font-bold text-[24px] text-[#012A81]">Спільнота</span>
          <div className="w-9" />
        </div>

        
        <p className="px-6 pt-6 pb-3 font-bold text-[14px] text-[#012A81]">Вкажіть місто, село</p>
        {/* АДАПТОВАНИЙ ПОШУКОВИК З ЛУПОЮ ТА КНОПКОЮ ФІЛЬТРА */}
        <div className="px-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Пошук"
                value={citySearch}
                onChange={e => setCitySearch(e.target.value)}
                className="w-full pl-12 pr-4.5 py-3.5 rounded-full border-[2.5px] border-[#2979ff] bg-[#dde5f6] font-montserrat text-[14px] text-[#0f1e5c] outline-none appearance-none shadow-[inset_0_3px_8px_rgba(41,121,255,0.08),0_4px_14px_rgba(41,121,255,0.15),inset_0_-2px_0_rgba(41,121,255,0.12)] placeholder:text-[#4b5b7e]"
              />
            </div>
          </div>
        </div>
        {/* ЗАГОЛОВОК */}
        <p className="px-6 pb-5 font-semibold text-[20px] text-[#0052FF]">Пошук сусіда</p>

        {/* ШВИДКІ ФІЛЬТРИ В СТИЛІ HOMESCREEN */}
        <p className="px-6 pb-3 font-bold text-[14px] text-[#012A81]">Швидкі фільтри</p>
        <div className="flex flex-col gap-2.5 pb-6">
          {[row1, row2].map((row, ri) => (
            <div key={ri} className="px-6">
              <div
                className="flex gap-2.5 overflow-x-auto whitespace-nowrap"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '2px' }}
              >
                {row.map(tag => (
                  <FilterChip
                    key={tag}
                    label={tag}
                    active={activeTags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* РЕКОМЕНДОВАНІ */}
        <p className="px-6 pb-3 font-bold text-[14px] text-[#012A81]">
          Рекомендовані для вас
        </p>

        {recommended.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-[#8a9ab8] text-[15px] font-medium">
              За обраними фільтрами нікого не знайдено
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-6">
            {recommended.map(r => (
              <UserCard
                key={r.id}
                roommate={r}
                onClick={() => setInnerView({ type: 'roommate', roommate: r })}
              />
            ))}
          </div>
        )}

        {/* ДИВИТИСЯ ВСІХ */}
        <div className="text-right px-6 py-3">
          <button
            onClick={() => setInnerView('all')}
            className="bg-transparent border-none cursor-pointer text-[13px] font-500 text-[#4B5B7E] hover:text-[#0052FF] transition-colors"
          >
            Дивитися всіх
          </button>
        </div>

        {/* БАНЕР БАРАХОЛКА */}
        <div className="px-6 mb-4">
          <button
            onClick={() => setInnerView('bazaar')}
            className="w-full h-[180px] rounded-[28px] overflow-hidden relative flex items-center justify-between px-6 border-none cursor-pointer transition-transform duration-150 active:scale-[0.99]"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 8px 24px rgba(0,20,100,0.12)',
            }}
          >
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg,rgba(0,20,90,0.75) 0%,rgba(0,40,120,0.4) 100%)' }} />
              <div className="relative z-10 flex flex-col gap-1 text-left">
                <span className="font-extrabold text-[26px] text-white tracking-wide">
                  БАРАХОЛКА
                </span>
                <span className="text-[12px] font-semibold text-white/80">
                  продавай, купуй, обмінюйся
                </span>
              </div>
            <div className="relative z-10">
              <ArrowWhiteIcon />
            </div>
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-transparent">

      <div
        className="relative z-10 flex flex-col flex-1 min-h-0 pb-28"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {renderMainContent()}
      </div>

        <div className="relative z-10">
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
          if (tab === 'home') { onBack?.(); return; }
          setInnerView(null);
          onTabChange(tab);
        }}
        />
      </div>
    </div>
  );
};

export default CommunityScreen;