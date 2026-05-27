import { useState, useMemo } from 'react';
import { ROOMMATES } from '../../data/properties';
import FilterChip from '../../components/FilterChip/FilterChip';
import { SearchIcon } from '../../components/Icons/Icons';
import RoommateScreen from './RoommateScreen';
import { UserCard } from '../../components/Cards/UserCard/UserCard';
import { BackIcon } from '../../components/Icons/Icons';

// ─── УСІ ТЕГИ ─────────────────────────────────────────────────────────────

const ALL_TAGS = [...new Set(ROOMMATES.flatMap(r => r.tags))].sort();

// ─── ГОЛОВНИЙ КОМПОНЕНТ ────────────────────────────────────────────────────

const AllRoommatesScreen = ({ onBack, activeTab, onTabChange }) => {
  const [citySearch, setCitySearch] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [selectedRoommate, setSelectedRoommate] = useState(null);

  const toggleTag = (tag) =>
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );

  const filtered = useMemo(() =>
    ROOMMATES.filter(r => {
      const matchCity = !citySearch.trim() ||
        r.city.toLowerCase().includes(citySearch.toLowerCase());
      const matchTags = activeTags.length === 0 ||
        activeTags.every(tag => r.tags.includes(tag));
      return matchCity && matchTags;
    }),
    [citySearch, activeTags]
  );

  // ── Деталі сусіда ──────────────────────────────────────────────────────
if (selectedRoommate) {
  return (
    <RoommateScreen
      roommate={selectedRoommate}
      onBack={() => setSelectedRoommate(null)}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
}

  // Розбиваємо теги на два рядки
  const row1 = ALL_TAGS.slice(0, Math.ceil(ALL_TAGS.length / 2));
  const row2 = ALL_TAGS.slice(Math.ceil(ALL_TAGS.length / 2));

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-[#f1f2f6]">

      <div
        className="flex flex-col flex-1 min-h-0 pb-8"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 pt-14 pb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none cursor-pointer"
          >
            <BackIcon />
          </button>
          <span className="font-bold text-[24px] text-[#012A81]">Пошук сусіда</span>
          <div className="w-9" />
        </div>

        {/* ЗАГОЛОВОК + лічильник */}
        <div className="flex items-baseline justify-between px-6 pb-5">
          <p className="font-semibold text-[20px] text-[#0052FF]">Рекомендовані для вас</p>
          {/* <span className="text-[13px] font-semibold text-[#a0aec0]">{filtered.length}</span> */}
        </div>

        {/* ФІЛЬТРИ
        <div className="flex flex-col gap-2.5 pb-5">
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
        </div> */}

        {/* ПОШУК */}
        <div className="px-6 pb-6">
          <div className="relative flex items-center">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <SearchIcon />
              </div>
            <input
              type="text"
              placeholder="Введіть місто"
              value={citySearch}
              onChange={e => setCitySearch(e.target.value)}
              className="w-full pl-12 pr-4.5 py-3.5 rounded-full border-[2.5px] border-[#2979ff] bg-[#dde5f6] font-montserrat text-[14px] text-[#0f1e5c] outline-none appearance-none shadow-[inset_0_3px_8px_rgba(41,121,255,0.08),0_4px_14px_rgba(41,121,255,0.15),inset_0_-2px_0_rgba(41,121,255,0.12)] placeholder:text-[#4b5b7e]"
            />
          </div>
        </div>

        {/* СПИСОК */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 gap-3">
            <span className="text-[40px]">🔍</span>
            <p className="font-bold text-[16px] text-[#012A81] text-center">
              Нікого не знайдено
            </p>
            <p className="text-[13px] text-[#718096] text-center">
              Спробуй змінити місто або фільтри
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-6">
            {filtered.map(r => (
              <UserCard
                key={r.id}
                roommate={r}
                onClick={() => setSelectedRoommate(r)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AllRoommatesScreen;
