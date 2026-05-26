import { useState, useRef } from 'react';
import { PROPERTIES } from '../../data/properties';
import BottomNav from '../../components/BottomNav/BottomNav';

const CARDS = PROPERTIES.slice(0, 8).map(p => ({
  id:      p.id,
  image:   p.image,
  type:    p.type === 'apartment' ? 'Квартира' : p.type === 'house' ? 'Будинок' : 'Кімната',
  address: p.address,
  price:   p.price,
  rating:  p.rating,
  city:    p.city,
}));

// ─── ІКОНКА ЗІРКИ (як на PropertyCard) ───────────────────────────────────────

const StarIcon = () => (
  <svg viewBox="0 0 23 22" fill="none" width="13" height="13">
    <path d="M3.25907 11.6533L4.50719 12.6068C4.84022 12.8612 4.97928 13.2963 4.85555 13.6967L3.49665 18.0942C3.2092 19.0244 4.28545 19.7751 5.05914 19.1841L8.48099 16.57C8.83939 16.2962 9.33672 16.2962 9.69512 16.57L13.117 19.1841C13.8907 19.7751 14.9669 19.0244 14.6795 18.0942L13.3206 13.6967C13.1968 13.2963 13.3359 12.8612 13.6689 12.6068L17.2805 9.84777C18.0406 9.2671 17.63 8.05312 16.6734 8.05312H12.3142C11.8757 8.05312 11.4883 7.76737 11.3588 7.34836L10.0435 3.09181C9.7531 2.15213 8.42301 2.15214 8.13263 3.09181L6.81729 7.34836C6.68781 7.76737 6.30042 8.05312 5.86186 8.05312H1.50268C0.54615 8.05312 0.135509 9.2671 0.895623 9.84777L1.65139 10.4251"
      stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── КНОПКА ХРЕСТИК ──────────────────────────────────────────────────────────

const CrossBtn = ({ highlight, onClick }) => (
  <button onClick={onClick}
    className="border-none cursor-pointer p-0 active:scale-90 transition-transform"
    style={{ background: 'none' }}>
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
      <defs>
        <filter id="cross_shadow" x="0" y="0" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/><feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
      <g filter="url(#cross_shadow)">
        <rect x="4" width="60" height="60" rx="30"
          fill={highlight ? '#012A81' : 'white'}
          fillOpacity={highlight ? 1 : 0.64}/>
        <path d="M43 40L35.4142 32.4142C34.6332 31.6332 33.3668 31.6332 32.5858 32.4142L25 40"
          stroke={highlight ? 'white' : '#012A81'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M43 21L35.4142 28.5858C34.6332 29.3668 33.3668 29.3668 32.5858 28.5858L25 21"
          stroke={highlight ? 'white' : '#012A81'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  </button>
);

// ─── КНОПКА СЕРЦЕ ────────────────────────────────────────────────────────────

const HeartBtn = ({ highlight, onClick }) => (
  <button onClick={onClick}
    className="border-none cursor-pointer p-0 active:scale-90 transition-transform"
    style={{ background: 'none' }}>
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
      <defs>
        <filter id="heart_shadow" x="0" y="0" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/><feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
      <g filter="url(#heart_shadow)">
        <rect x="4" width="60" height="60" rx="30"
          fill={highlight ? '#CD4FDE' : 'white'}
          fillOpacity={highlight ? 1 : 0.64}/>
        <path d="M37.5189 35.2766C36.8026 36.0369 35.5293 37.3835 34.7267 38.232C34.3319 38.6493 33.6693 38.6497 33.2751 38.2319C31.6188 36.4771 27.5384 32.1534 25.4378 29.924C24.4757 28.9028 24 27.5718 24 26.2293C24 24.8868 24.4757 23.5444 25.4378 22.5232C27.3622 20.4923 30.4757 20.4923 32.4 22.5232L33.2615 23.4438C33.6558 23.8651 34.3238 23.8662 34.7195 23.4462L35.5892 22.5232C37.5135 20.4923 40.6162 20.4923 42.5405 22.5232C43.5243 23.5444 44 24.8754 44 26.2293C44 27.5603 43.5243 28.9028 42.5622 29.924L39.2492 33.4402"
          stroke={highlight ? 'white' : '#CD4FDE'}
          strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  </button>
);

// ─── КАРТКА ───────────────────────────────────────────────────────────────────

const SwipeCard = ({ card, style, onMouseDown, onTouchStart, dragX, isTop }) => {
  const rotate = isTop ? Math.min(Math.max(dragX / 12, -20), 20) : 0;

  // Колірний оверлей під час свайпу
  const likeOpacity    = isTop ? Math.min(Math.max((dragX - 30) / 80, 0), 0.45) : 0;
  const dislikeOpacity = isTop ? Math.min(Math.max((-dragX - 30) / 80, 0), 0.45) : 0;

  return (
    <div
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        ...style,
        transform: `${style?.transform ?? ''} rotate(${rotate}deg)`,
        cursor: isTop ? 'grab' : 'default',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* Фото */}
      <img src={card.image} alt={card.type} draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ borderRadius: 'inherit' }} />

      {/* Рожевий тон — подобається */}
      <div className="absolute inset-0"
        style={{ borderRadius: 'inherit', background: '#CD4FDE', opacity: likeOpacity, transition: 'opacity 0.05s' }} />

      {/* Синій тон — не подобається */}
      <div className="absolute inset-0"
        style={{ borderRadius: 'inherit', background: '#012A81', opacity: dislikeOpacity, transition: 'opacity 0.05s' }} />

      {/* Градієнт знизу */}
      <div className="absolute inset-0" style={{
        borderRadius: 'inherit',
        background: 'linear-gradient(to bottom, transparent 45%, rgba(20,10,50,0.72) 100%)',
      }} />

      {/* ── РЕЙТИНГ зліва вгорі (стиль PropertyCard) ── */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl"
        style={{ background: 'linear-gradient(135deg,#3173FD,#0052FF)', boxShadow: '0 4px 10px rgba(0,82,255,0.35)' }}>
        <StarIcon />
        <span className="font-bold text-[13px] text-white">{card.rating}</span>
      </div>

      {/* ── ЦІНА справа вгорі (та ж висота, що й рейтинг) ── */}
      <div className="absolute top-4 right-4 flex items-center px-3 py-1.5 rounded-2xl"
        style={{ background: 'linear-gradient(135deg,#3173FD,#0052FF)', boxShadow: '0 4px 10px rgba(0,82,255,0.35)' }}>
        <span className="font-bold text-[13px] text-white">{card.price}/ місяць</span>
      </div>

      {/* ── ІНФО по центру знизу ── */}
      <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1 px-4">
        <p className="font-bold text-[22px] text-white text-center leading-tight">{card.type}</p>
        <div className="flex items-center gap-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="text-[13px] font-medium text-white/80">{card.address}</span>
        </div>
      </div>
    </div>
  );
};

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────

const TinderScreen = ({ onBack }) => {
  const [cards, setCards]       = useState(CARDS);
  const [dragX, setDragX]       = useState(0);
  const [dragging, setDragging] = useState(false);
  const [gone, setGone]         = useState(null);
  const [activeTab, setActiveTab] = useState('plant');
  const startX = useRef(0);

  const currentCard = cards[0];
  const nextCard    = cards[1];

  const startDrag = (clientX) => { startX.current = clientX; setDragging(true); };
  const moveDrag  = (clientX) => { if (dragging) setDragX(clientX - startX.current); };

  const dismissCard = (dir) => {
    setGone(dir);
    setDragX(dir === 'right' ? 520 : -520);
    setTimeout(() => { setCards(prev => prev.slice(1)); setDragX(0); setGone(null); }, 380);
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    if      (dragX > 80)  dismissCard('right');
    else if (dragX < -80) dismissCard('left');
    else setDragX(0);
  };

  const highlightLeft  = dragX < -40 || gone === 'left';
  const highlightRight = dragX > 40  || gone === 'right';

  return (
    <div
      className="relative w-full h-full flex flex-col font-montserrat overflow-hidden"
      onMouseMove={e => moveDrag(e.clientX)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchMove={e => moveDrag(e.touches[0].clientX)}
      onTouchEnd={endDrag}
      style={{ background: 'linear-gradient(160deg, #EDD4F0 0%, #A0ADFD 100%)' }}
    >

      {/* ── ХЕДЕР ── */}
      <div className="flex items-center justify-between px-6 pt-14 pb-2 shrink-0">
        <div className="w-8" />
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 28,
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'center',
          color: '#CD4FDE',
        }}>
          Вподобайка
        </p>
        <button onClick={onBack}
          className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="#CD4FDE" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* ── СТЕК КАРТОК ── */}
      <div className="flex-1 flex items-center justify-center px-6" style={{ minHeight: 0 }}>
        {cards.length === 0 ? (
          <div className="flex flex-col items-center gap-4 px-6">
            {/* Будиночок як у навбарі, але більший */}
            <svg width="80" height="72" viewBox="0 0 51 42" fill="none">
              <path d="M30.2914 19.9474H17.3249C16.3825 19.9474 15.9632 18.763 16.6957 18.1701L24.9325 11.503C25.2959 11.2089 25.8145 11.2058 26.1814 11.4955L34.1197 17.7641C34.3599 17.9538 34.5 18.243 34.5 18.549V29.9986C34.5 30.5514 34.0514 30.9994 33.4986 30.9986L28.6556 30.9916C28.1039 30.9908 27.6571 30.5433 27.6571 29.9916V25.6814C27.6571 25.1298 27.2105 24.6824 26.6589 24.6814L24.4479 24.6772C23.8949 24.6762 23.446 25.1242 23.446 25.6772V29.9912C23.446 30.5435 22.9984 30.9912 22.4461 30.9912L17.6032 30.9914C17.0509 30.9915 16.6031 30.5438 16.6031 29.9914V22.5789"
                stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>

            <p className="text-[20px] text-white text-center" style={{ fontWeight: 600 }}>
              Ви переглянули все!
            </p>

            <button
              onClick={() => setCards(CARDS)}
              className="w-full h-12 rounded-3xl font-bold text-[15px] text-white border-none cursor-pointer active:scale-[0.98] transition-transform"
              style={{
                background: 'linear-gradient(135deg, #CD4FDE 0%, #a855f7 100%)',
                boxShadow: '0 8px 20px rgba(205,79,222,0.45)',
              }}
            >
              Переглянути знову
            </button>
          </div>
        ) : (
          <div className="relative w-full" style={{ height: 500 }}>

            {/* Наступна картка */}
            {nextCard && (
              <SwipeCard card={nextCard} dragX={0} isTop={false}
                style={{
                  position: 'absolute', inset: 0, borderRadius: 28, overflow: 'hidden',
                  transform: 'scale(0.95) translateY(10px)', zIndex: 1,
                }} />
            )}

            {/* Поточна картка */}
            {currentCard && (
              <SwipeCard
                key={currentCard.id}
                card={currentCard}
                dragX={dragX}
                isTop={true}
                onMouseDown={e => startDrag(e.clientX)}
                onTouchStart={e => startDrag(e.touches[0].clientX)}
                style={{
                  position: 'absolute', inset: 0, borderRadius: 28, overflow: 'hidden',
                  transform: `translateX(${dragX}px)`,
                  zIndex: 2,
                  boxShadow: '0 24px 64px rgba(90,30,160,0.28)',
                  transition: dragging ? 'none' : 'transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* ── КНОПКИ ── */}
      {cards.length > 0 && (
        <div className="flex items-center justify-center gap-12 pb-5 shrink-0">
          <CrossBtn highlight={highlightLeft}  onClick={() => dismissCard('left')} />
          <HeartBtn highlight={highlightRight} onClick={() => dismissCard('right')} />
        </div>
      )}

      {/* ── BOTTOM NAV ── */}
      <div className="relative z-10">
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'home') { onBack?.(); return; }
            setActiveTab(tab);
          }}
        />
      </div>
    </div>
  );
};

export default TinderScreen;
