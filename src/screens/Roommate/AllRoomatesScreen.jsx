import { useState, useMemo } from 'react';
import { ROOMMATES } from '../../data/properties';
import FilterChip from '../../components/FilterChip/FilterChip';
import { SearchIcon } from '../../components/Icons/Icons';

// ─── ІКОНКИ ────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 19l-7-7 7-7" stroke="#0052FF" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="8" height="8" fill="#ffffff">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="34" height="34" viewBox="0 0 42 42" fill="none">
    <path d="M21 30L31.6248 22.6444C32.7736 21.8491 32.7736 20.1509 31.6248 19.3556L21 12"
      stroke="#012A81" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28.5 21H10.5" stroke="#012A81" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── УСІ ТЕГИ ─────────────────────────────────────────────────────────────

const ALL_TAGS = [...new Set(ROOMMATES.flatMap(r => r.tags))].sort();

// ─── ЗАГЛУШКА — ДЕТАЛІ СУСІДА (та сама що в CommunityScreen) ──────────────

const RoommateStubScreen = ({ roommate, onBack }) => (
  <div className="relative w-full h-full flex flex-col font-montserrat bg-[#f1f2f6]"
    style={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
    <div className="flex items-center justify-between px-6 pt-14 pb-4">
      <button onClick={onBack}
        className="w-9 h-9 flex items-center justify-center bg-transparent border-none cursor-pointer">
        <BackIcon />
      </button>
      <span className="font-bold text-[22px] text-[#012A81]">Профіль сусіда</span>
      <div className="w-9" />
    </div>
    <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6 pb-12">
      <img
        src={roommate.avatar}
        className="w-24 h-24 rounded-full object-cover shadow-lg"
        alt={roommate.name}
      />
      <p className="font-bold text-[20px] text-[#012A81]">{roommate.name}</p>
      <p className="text-[14px] text-[#718096]">{roommate.subtitle} · {roommate.city}</p>
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {roommate.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-2xl text-[12px] font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#3b82f6 0%,#0052FF 100%)' }}
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-[14px] text-[#4b5b7e] text-center mt-2 leading-relaxed">
        {roommate.description}
      </p>
      <div className="mt-4 w-full px-4">
        <div className="rounded-3xl bg-[#e4e9f7] border border-[#3173FD]/20 p-5 text-center">
          <p className="text-[13px] text-[#718096] font-semibold">Детальний профіль</p>
          <p className="text-[12px] text-[#a0aec0] mt-1">буде доступний незабаром</p>
        </div>
      </div>
    </div>
  </div>
);

// ─── КАРТКА СУСІДА (та сама що в CommunityScreen) ─────────────────────────

const UserCard = ({ roommate, onClick }) => {
  const preview = roommate.tags.slice(0, 2).join(' · ');

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[28px] px-3 py-2.5 flex items-center justify-between cursor-pointer transition-transform duration-150 active:scale-[0.99]"
      style={{ boxShadow: '0 6px 18px rgba(0,30,140,0.05)' }}
    >
      <div className="flex items-center gap-3.5">
        <div className="relative w-14 h-14 shrink-0">
          <img
            src={roommate.avatar}
            alt={roommate.name}
            className="w-full h-full rounded-full object-cover"
          />
          <div
            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 bg-[#0052FF] text-white rounded-lg px-1.5 py-[2px] flex items-center gap-[2px]"
            style={{ fontSize: '9px', fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}
          >
            <StarIcon />
            {roommate.rating.toFixed(1)}
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-[15px] text-[#012A81]">{roommate.name}</span>
          <span className="text-[12px] font-medium text-[#a0aec0]">{preview}</span>
        </div>
      </div>
      <ArrowIcon />
    </div>
  );
};

// ─── ГОЛОВНИЙ КОМПОНЕНТ ────────────────────────────────────────────────────

const AllRoommatesScreen = ({ onBack }) => {
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
      <RoommateStubScreen
        roommate={selectedRoommate}
        onBack={() => setSelectedRoommate(null)}
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

        {/* ФІЛЬТРИ */}
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
        </div>

        {/* ПОШУК */}
        <div className="px-6 pb-6">
          <div className="relative flex items-center">
            <div className="absolute left-4.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
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
