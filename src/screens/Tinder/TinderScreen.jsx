import { useState, useRef } from 'react';
import { PROPERTIES } from '../../data/properties';
import { useFavorites } from '../Context/FavouritesContext';
import BottomNav from '../../components/BottomNav/BottomNav';
import { StarIcon, CloseIcon } from '../../components/Icons/Icons';
import { HeartBtn, CrossBtn } from '../../components/Icons/TinderIcons';
import { TinderCard } from '../../components/Cards/TinderCard/TinderCard';

const CARDS = PROPERTIES.slice(0, 8).map(p => ({
  id:      p.id,
  image:   p.image,
  type:    p.type === 'apartment' ? 'Квартира' : p.type === 'house' ? 'Будинок' : 'Кімната',
  address: p.address,
  price:   p.price,
  rating:  p.rating,
  city:    p.city,
}));

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────

const TinderScreen = ({ onBack, activeTab, onTabChange  }) => {
  const [cards, setCards]       = useState(CARDS);
  const [dragX, setDragX]       = useState(0);
  const [dragging, setDragging] = useState(false);
  const [gone, setGone] = useState(null);
const { toggleProperty, isPropertyLiked } = useFavorites();
  const startX = useRef(0);

  const currentCard = cards[0];
  const nextCard    = cards[1];

  const startDrag = (clientX) => { startX.current = clientX; setDragging(true); };
  const moveDrag  = (clientX) => { if (dragging) setDragX(clientX - startX.current); };

const dismissCard = (dir) => {
  if (dir === 'right' && currentCard) {
    if (!isPropertyLiked(currentCard.id)) {
      toggleProperty(currentCard.id);
    }
  }
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
            <CloseIcon />
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
              <TinderCard card={nextCard} dragX={0} isTop={false}
                style={{
                  position: 'absolute', inset: 0, borderRadius: 28, overflow: 'hidden',
                  transform: 'scale(0.95) translateY(10px)', zIndex: 1,
                }} />
            )}

            {/* Поточна картка */}
            {currentCard && (
              <TinderCard
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
        <div className="flex items-center justify-center gap-12 pb-35 shrink-0">
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
      onTabChange(tab);
    }}
  />
      </div>
    </div>
  );
};

export default TinderScreen;
