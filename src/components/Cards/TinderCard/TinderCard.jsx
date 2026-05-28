import { StarIcon } from "../../Icons/Icons";

export const TinderCard = ({ card, style, onMouseDown, onTouchStart, dragX, isTop }) => {
  const rotate = isTop ? Math.min(Math.max(dragX / 12, -20), 20) : 0;

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
        <span className="font-500 text-[13px] text-white">{card.rating}</span>
      </div>

      {/* ── ЦІНА справа вгорі (та ж висота, що й рейтинг) ── */}
      <div className="absolute top-4 right-4 flex items-center px-3 py-1.5 rounded-2xl"
        style={{ background: 'linear-gradient(135deg,#3173FD,#0052FF)', boxShadow: '0 4px 10px rgba(0,82,255,0.35)' }}>
        <span className="font-500 text-[14px] text-white">{card.price}/ місяць</span>
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