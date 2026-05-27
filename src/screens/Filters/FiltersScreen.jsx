import { useState, useMemo } from 'react';
import {
  PROPERTIES, TYPE_LABELS, RADIUS_OPTIONS, ROOMS_OPTIONS, HEATING_OPTIONS, RENOVATION_OPTIONS, BARRIER_OPTIONS,
  LIGHT_OPTIONS, LIVING_OPTIONS, PLANNING_OPTIONS, WALLS_OPTIONS, RENTAL_OPTIONS, OFFER_OPTIONS, TAG_TO_SECTION,
  QUICK_FILTER_SET,
} from '../../data/properties';
import { SearchIcon, BackIcon, ChevronDown, ChevronUp } from '../../components/Icons/Icons';

const toggle = (arr, val) =>
  arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

const matchRoomsLogic = (propertyRooms, selectedRooms) => {
  if (!selectedRooms.length) return true;
  return selectedRooms.some(r =>
    r === '4+' ? propertyRooms >= 4 : propertyRooms === Number(r)
  );
};

// Пігулка
const FilterChipExtended = ({ label, active, onClick, disabled }) => (
  <button
    onClick={disabled ? undefined : onClick}
    className={[
      'px-6 py-2.75 rounded-full font-montserrat text-[14px] font-semibold',
      'tracking-[0.01em] whitespace-nowrap transition-all duration-200 border-[1.5px]',
      disabled
        ? 'bg-[#e8eaf0] text-[#b0b8d0] border-transparent cursor-not-allowed'
        : active
          ? 'text-white border-white/60 cursor-pointer bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)] shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.5)]'
          : 'bg-white text-[#012A81] border-transparent shadow-[0_2px_8px_rgba(0,30,120,0.08)] cursor-pointer',
    ].join(' ')}
  >
    {label}
  </button>
);

// Кругла пігулка для кімнат
const CircleChip = ({ label, active, onClick, disabled }) => (
  <button
    onClick={disabled ? undefined : onClick}
    className={[
      'w-13 h-13 rounded-full font-montserrat text-[15px] font-bold',
      'flex items-center justify-center transition-all duration-200 border-[1.5px]',
      disabled
        ? 'bg-[#e8eaf0] text-[#b0b8d0] border-transparent cursor-not-allowed'
        : active
          ? 'text-white border-white/60 cursor-pointer bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)] shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.5)]'
          : 'bg-white text-[#012A81] border-transparent shadow-[0_2px_8px_rgba(0,30,120,0.08)] cursor-pointer',
    ].join(' ')}
  >
    {label}
  </button>
);

// Поле з валідацією
const RangeInput = ({ placeholder, value, onChange, hasError }) => (
  <input
    type="number"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    min="0"
    className={[
      'w-full px-4.5 py-3.5 rounded-full',
      'font-montserrat text-[14px] font-medium text-[#0f1e5c]',
      'outline-none appearance-none transition-all duration-200',
      'placeholder:text-[#4b5b7e]',
      hasError
        ? 'border-[2.5px] border-[#f59e0b] bg-[#fffbeb] shadow-[0_4px_14px_rgba(245,158,11,0.2)]'
        : 'border-[2.5px] border-[#2979ff] bg-[#dde5f6] shadow-[inset_0_3px_8px_rgba(41,121,255,0.08),0_4px_14px_rgba(41,121,255,0.15),inset_0_-2px_0_rgba(41,121,255,0.12)]',
    ].join(' ')}
  />
);

// Пара полів з валідацією
const RangePair = ({ fromVal, toVal, onFromChange, onToChange,
                     fromPlaceholder = 'Від', toPlaceholder = 'До', errorMsg }) => {
  const hasError = fromVal !== '' && toVal !== '' && Number(fromVal) > Number(toVal);
  return (
    <div>
      <div className="flex gap-3">
        <RangeInput placeholder={fromPlaceholder} value={fromVal}
          onChange={onFromChange} hasError={hasError} />
        <RangeInput placeholder={toPlaceholder} value={toVal}
          onChange={onToChange} hasError={hasError} />
      </div>
      {hasError && (
        <p className="text-[#f59e0b] text-[12px] font-medium mt-1.5 px-2">
          {errorMsg ?? 'Початкове значення більше за кінцеве'}
        </p>
      )}
    </div>
  );
};

const SectionTitle = ({ title, warning }) => (
  <div className="mb-3 mt-6">
    <p className="font-montserrat font-bold text-[14px] text-[#012A81]">{title}</p>
    {warning && <p className="font-montserrat text-[12px] text-[#f59e0b] mt-1">{warning}</p>}
  </div>
);

const FiltersScreen = ({ initialFilters, onApply, onBack }) => {

  const [showExtra, setShowExtra] = useState(false);

  // Ініціалізуємо стан ПОВНІСТЮ з initialFilters — жодних перетворень,
  const [types,      setTypes]      = useState(initialFilters.types      ?? []);
  const [quickTags,  setQuickTags]  = useState(initialFilters.quickTags  ?? []);
  const [city,       setCity]       = useState(initialFilters.city       ?? '');
  const [radius,     setRadius]     = useState(initialFilters.radius     ?? []);
  const [priceFrom,  setPriceFrom]  = useState(initialFilters.priceFrom  ?? '');
  const [priceTo,    setPriceTo]    = useState(initialFilters.priceTo    ?? '');
  const [rooms,      setRooms]      = useState(initialFilters.rooms      ?? []);
  const [totalFrom,  setTotalFrom]  = useState(initialFilters.totalFrom  ?? '');
  const [totalTo,    setTotalTo]    = useState(initialFilters.totalTo    ?? '');
  const [livingFrom, setLivingFrom] = useState(initialFilters.livingFrom ?? '');
  const [livingTo,   setLivingTo]   = useState(initialFilters.livingTo   ?? '');
  const [floorFrom,  setFloorFrom]  = useState(initialFilters.floorFrom  ?? '');
  const [floorTo,    setFloorTo]    = useState(initialFilters.floorTo    ?? '');
  const [bedsFrom,   setBedsFrom]   = useState(initialFilters.bedsFrom   ?? '');
  const [bedsTo,     setBedsTo]     = useState(initialFilters.bedsTo     ?? '');
  const [renovation, setRenovation] = useState(initialFilters.renovation ?? []);
  const [walls,      setWalls]      = useState(initialFilters.walls      ?? []);
  const [offer,      setOffer]      = useState(initialFilters.offer      ?? []);
  const [living,     setLiving]     = useState(initialFilters.living     ?? []);
  const [planning,   setPlanning]   = useState(initialFilters.planning   ?? []);
  const [barrier,    setBarrier]    = useState(initialFilters.barrier    ?? []);
  const [light,      setLight]      = useState(initialFilters.light      ?? []);
  const [heating,    setHeating]    = useState(initialFilters.heating    ?? []);
  const [rental,     setRental]     = useState(initialFilters.rental     ?? []);

  // Логіка попереджень
  const onlyRoom  = types.length > 0 && types.every(t => t === 'room');
  const onlyHouse = types.length > 0 && types.every(t => t === 'house');
  const hasRoom   = types.includes('room');
  const hasHouse  = types.includes('house');
  const hasOther    = types.some(t => t !== 'room');
  const hasNonHouse = types.some(t => t !== 'house');

  const roomsWarning = onlyRoom
    ? 'Не застосовується для кімнат'
    : (hasRoom && hasOther) ? '⚠ Не застосовується для кімнат' : null;

  const floorWarning = onlyHouse
    ? 'Не застосовується для будинків'
    : (hasHouse && hasNonHouse) ? '⚠ Не застосовується для будинків' : null;

  // Валідація
  const hasErrors = (
    (priceFrom  !== '' && priceTo   !== '' && Number(priceFrom)  > Number(priceTo))  ||
    (totalFrom  !== '' && totalTo   !== '' && Number(totalFrom)  > Number(totalTo))  ||
    (livingFrom !== '' && livingTo  !== '' && Number(livingFrom) > Number(livingTo)) ||
    (floorFrom  !== '' && floorTo   !== '' && Number(floorFrom)  > Number(floorTo))  ||
    (bedsFrom   !== '' && bedsTo    !== '' && Number(bedsFrom)   > Number(bedsTo))
  );

  // Підрахунок результатів — та сама логіка що й у HomeScreen
  const resultCount = useMemo(() => {
    return PROPERTIES.filter(p => {
      if (types.length > 0 && !types.includes(p.type)) return false;

      if (city.trim() &&
        !p.city.toLowerCase().includes(city.toLowerCase()) &&
        !p.address.toLowerCase().includes(city.toLowerCase())) return false;

      if (priceFrom !== '' && p.priceNum < Number(priceFrom)) return false;
      if (priceTo   !== '' && p.priceNum > Number(priceTo))   return false;

      if (!matchRoomsLogic(p.rooms, rooms)) return false;

      if (totalFrom  !== '' && p.totalArea  < Number(totalFrom))  return false;
      if (totalTo    !== '' && p.totalArea  > Number(totalTo))    return false;
      if (livingFrom !== '' && p.livingArea < Number(livingFrom)) return false;
      if (livingTo   !== '' && p.livingArea > Number(livingTo))   return false;

      if (floorFrom !== '' && p.floor != null && p.floor < Number(floorFrom)) return false;
      if (floorTo   !== '' && p.floor != null && p.floor > Number(floorTo))   return false;

      if (bedsFrom !== '' && (p.beds ?? 0) < Number(bedsFrom)) return false;
      if (bedsTo   !== '' && (p.beds ?? 0) > Number(bedsTo))   return false;

      // quickTags — AND
      if (quickTags.length > 0 && !quickTags.every(t => p.tags.includes(t))) return false;

      // Секційні теги — в секції АБО, між секціями І
      const tagSections = [living, planning, barrier, light, heating, rental];
      for (const section of tagSections) {
        if (section.length > 0 && !section.some(tag => p.tags.includes(tag))) return false;
      }

      return true;
    }).length;
  }, [types, city, priceFrom, priceTo, rooms, totalFrom, totalTo,
      livingFrom, livingTo, floorFrom, floorTo, bedsFrom, bedsTo,
      quickTags, living, planning, barrier, light, heating, rental]);

  const handleClear = () => {
    setTypes([]); setQuickTags([]); setCity(''); setRadius([]);
    setPriceFrom(''); setPriceTo(''); setRooms([]);
    setTotalFrom(''); setTotalTo(''); setLivingFrom(''); setLivingTo('');
    setFloorFrom(''); setFloorTo(''); setBedsFrom(''); setBedsTo('');
    setRenovation([]); setWalls([]); setOffer([]);
    setLiving([]); setPlanning([]); setBarrier([]);
    setLight([]); setHeating([]); setRental([]);
  };

  const handleApply = () => {
    if (hasErrors) return;

    // Повертаємо ПОВНИЙ об'єкт — HomeScreen просто замінює свій стан цим об'єктом
    onApply({
      city, types, quickTags,
      radius, priceFrom, priceTo, rooms,
      totalFrom, totalTo, livingFrom, livingTo,
      floorFrom, floorTo, bedsFrom, bedsTo,
      renovation, walls, offer,
      living, planning, barrier, light, heating, rental,
    });
  };

  const toggleSectionTag = (tag, currentVal, setVal) => {
  const newVal = toggle(currentVal, tag);
  setVal(newVal);

  // Якщо тег є серед quickTags на головній — синхронізуємо
  if (QUICK_FILTER_SET.has(tag)) {
    setQuickTags(prev =>
      newVal.includes(tag)
        ? prev.includes(tag) ? prev : [...prev, tag]
        : prev.filter(x => x !== tag)
    );
  }
};

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-[#f1f2f6]">

      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-[#f1f2f6] flex items-center justify-between px-6 pt-14 pb-6">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <BackIcon />
        </button>
        <span className="font-bold text-[22px] text-[#012A81]">Фільтри</span>
        <button onClick={handleClear}
          className="bg-transparent border-none cursor-pointer font-montserrat font-semibold text-[14px] text-[#012A81]">
          Очистити
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 px-6 pb-36"
        style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* Тип житла */}
        <div className="flex flex-wrap gap-2.5">
          {Object.entries(TYPE_LABELS).map(([key, label]) => (
            <FilterChipExtended key={key} label={label} active={types.includes(key)}
              onClick={() => setTypes(t => toggle(t, key))} />
          ))}
        </div>

        {/* Місто */}
        <SectionTitle title="Вкажіть місто, село, район, вулицю" />
        <div className="relative">
          <div className="absolute left-4.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </div>
          <input type="text" placeholder="Введість місто або вулицю" value={city}
            onChange={e => setCity(e.target.value)}
            className="w-full pl-11.5 pr-4.5 py-3.5 rounded-full
              border-[2.5px] border-[#2979ff] bg-[#dde5f6]
              font-montserrat text-[14px] font-medium text-[#0f1e5c]
              outline-none appearance-none
              shadow-[inset_0_3px_8px_rgba(41,121,255,0.08),0_4px_14px_rgba(41,121,255,0.15),inset_0_-2px_0_rgba(41,121,255,0.12)]
              placeholder:text-[#4b5b7e]"
          />
        </div>

        {/* Радіус */}
        <SectionTitle title="Радіус пошуку" />
        <div className="flex flex-wrap gap-2.5">
          {RADIUS_OPTIONS.map(r => (
            <FilterChipExtended key={r} label={r} active={radius.includes(r)}
              onClick={() => setRadius(v => toggle(v, r))} />
          ))}
        </div>

        {/* Ціна */}
        <SectionTitle title="Ціна за місяць" />
        <RangePair
          fromVal={priceFrom} toVal={priceTo}
          onFromChange={e => setPriceFrom(e.target.value)}
          onToChange={e => setPriceTo(e.target.value)}
          fromPlaceholder="Від $" toPlaceholder="До $"
          errorMsg="Початкова ціна більша за кінцеву"
        />

        {/* Кімнат */}
        <SectionTitle title="Кімнат" warning={roomsWarning} />
        <div className="flex gap-3">
          {ROOMS_OPTIONS.map(r => (
            <CircleChip key={r} label={r} active={rooms.includes(r)}
              disabled={onlyRoom} onClick={() => setRooms(v => toggle(v, r))} />
          ))}
        </div>

        {/* Загальна площа */}
        <SectionTitle title="Загальна площа, м²" />
        <RangePair
          fromVal={totalFrom} toVal={totalTo}
          onFromChange={e => setTotalFrom(e.target.value)}
          onToChange={e => setTotalTo(e.target.value)}
        />

        {/* Житлова площа */}
        <SectionTitle title="Житлова площа, м²" />
        <RangePair
          fromVal={livingFrom} toVal={livingTo}
          onFromChange={e => setLivingFrom(e.target.value)}
          onToChange={e => setLivingTo(e.target.value)}
        />

        {/* Поверх */}
        <SectionTitle title="Поверх" warning={floorWarning} />
        <RangePair
          fromVal={floorFrom} toVal={floorTo}
          onFromChange={e => setFloorFrom(e.target.value)}
          onToChange={e => setFloorTo(e.target.value)}
          errorMsg="Початковий поверх більший за кінцевий"
        />

        {/* Спальні місця */}
        <SectionTitle title="Спальних місць" />
        <RangePair
          fromVal={bedsFrom} toVal={bedsTo}
          onFromChange={e => setBedsFrom(e.target.value)}
          onToChange={e => setBedsTo(e.target.value)}
        />

        {/* Divider */}
        <div className="h-px bg-[rgba(41,121,255,0.1)] my-6" />

        {/* Додаткові фільтри */}
        <button onClick={() => setShowExtra(p => !p)}
          className="w-full flex items-center justify-center gap-2 bg-transparent border-none cursor-pointer py-2">
          <span className="font-montserrat font-bold text-[16px] text-[#2979ff]">
            Додаткові фільтри
          </span>
          {showExtra ? <ChevronUp /> : <ChevronDown />}
        </button>

        {showExtra && (
          <>
            <SectionTitle title="Ремонт" />
            <div className="flex flex-wrap gap-2.5">
              {RENOVATION_OPTIONS.map(r => (
                <FilterChipExtended key={r} label={r} active={renovation.includes(r)}
                onClick={() => toggleSectionTag(r, renovation, setRenovation)}/>
              ))}
            </div>

            <SectionTitle title="Безбар'єрність" />
            <div className="flex flex-wrap gap-2.5">
              {BARRIER_OPTIONS.map(r => (
                <FilterChipExtended key={r} label={r} active={barrier.includes(r)}
                  onClick={() => toggleSectionTag(r, barrier, setBarrier)} />
              ))}
            </div>

            <SectionTitle title="Коли немає світла" />
            <div className="flex flex-wrap gap-2.5">
              {LIGHT_OPTIONS.map(r => (
                <FilterChipExtended key={r} label={r} active={light.includes(r)}
                onClick={() => toggleSectionTag(r, light, setLight)}/>
              ))}
            </div>

            <SectionTitle title="Умови проживання" />
            <div className="flex flex-wrap gap-2.5">
              {LIVING_OPTIONS.map(r => (
                <FilterChipExtended key={r} label={r} active={living.includes(r)}
                  onClick={() => toggleSectionTag(r, living, setLiving)} />
              ))}
            </div>

            <SectionTitle title="Особливості планування" />
            <div className="flex flex-wrap gap-2.5">
              {PLANNING_OPTIONS.map(r => (
                <FilterChipExtended key={r} label={r} active={planning.includes(r)}
                  onClick={() => toggleSectionTag(r, planning, setPlanning)} />
              ))}
            </div>

            <SectionTitle title="Тип стін" />
            <div className="flex flex-wrap gap-2.5">
              {WALLS_OPTIONS.map(r => (
                <FilterChipExtended key={r} label={r} active={walls.includes(r)}
                 onClick={() => toggleSectionTag(r, walls, setWalls)} />
              ))}
            </div>

            <SectionTitle title="Опалення" />
            <div className="flex flex-wrap gap-2.5">
              {HEATING_OPTIONS.map(r => (
                <FilterChipExtended key={r} label={r} active={heating.includes(r)}
                 onClick={() => toggleSectionTag(r, heating, setHeating)} />
              ))}
            </div>

            <SectionTitle title="Тип пропозиції" />
            <div className="flex flex-wrap gap-2.5">
              {OFFER_OPTIONS.map(r => (
                <FilterChipExtended key={r} label={r} active={offer.includes(r)}
                 onClick={() => toggleSectionTag(r, offer, setOffer)} />
              ))}
            </div>

            <SectionTitle title="Умови оренди" />
            <div className="flex flex-wrap gap-2.5">
              {RENTAL_OPTIONS.map(r => (
                <FilterChipExtended key={r} label={r} active={rental.includes(r)}
                 onClick={() => toggleSectionTag(r, rental, setRental)} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Sticky bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-[#f1f2f6]">
        <button onClick={handleApply} disabled={hasErrors}
          className={[
            'w-full py-4.5 rounded-full font-montserrat text-[16px] font-bold text-white',
            'border-[1.5px] border-white/60 transition-opacity duration-200',
            hasErrors
              ? 'opacity-40 cursor-not-allowed'
              : 'cursor-pointer shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.5)]',
            'bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)]',
          ].join(' ')}
        >
          Показати {resultCount} оголошень
        </button>
      </div>
    </div>
  );
};

export default FiltersScreen;
