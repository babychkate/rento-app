import { useState, useRef } from 'react';
import { PhotoViewerScreen } from './PhotoViewerScreen';

// ─── ДАНІ СЕКЦІЙ ─────────────────────────────────────────────────────────────
const DEFAULT_SECTIONS = [
  {
    id: 'bedroom',
    label: 'спальня',
    photos: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    id: 'bathroom',
    label: 'ванна',
    photos: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317702782?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    id: 'living',
    label: 'вітальня',
    photos: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    id: 'kitchen',
    label: 'кухня',
    photos: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80',
    ],
  },
];

// ─── ФОТО-ГРІД СЕКЦІЇ ────────────────────────────────────────────────────────
const SectionPhotoGrid = ({ photos, onPhotoClick }) => (
  <div className="px-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
    {photos[0] && (
      <div onClick={() => onPhotoClick(0)}
        className="cursor-pointer rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,30,140,0.1)]"
        style={{ gridRow: 'span 2', height: 298 }}>
        <img src={photos[0]} alt="" className="w-full h-full object-cover" />
      </div>
    )}
    {photos[1] && (
      <div onClick={() => onPhotoClick(1)}
        className="cursor-pointer rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,30,140,0.1)]"
        style={{ height: 140 }}>
        <img src={photos[1]} alt="" className="w-full h-full object-cover" />
      </div>
    )}
    {photos[2] && (
      <div onClick={() => onPhotoClick(2)}
        className="cursor-pointer rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,30,140,0.1)]"
        style={{ height: 140 }}>
        <img src={photos[2]} alt="" className="w-full h-full object-cover" />
      </div>
    )}
    {photos[3] && (
      <div onClick={() => onPhotoClick(3)}
        className="cursor-pointer rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,30,140,0.1)]"
        style={{ height: 180 }}>
        <img src={photos[3]} alt="" className="w-full h-full object-cover" />
      </div>
    )}
    {photos[4] && (
      <div onClick={() => onPhotoClick(4)}
        className="cursor-pointer rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,30,140,0.1)]"
        style={{ height: 180 }}>
        <img src={photos[4]} alt="" className="w-full h-full object-cover" />
      </div>
    )}
  </div>
);

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────
const PhotoTourScreen = ({ property, onBack, sections: propSections }) => {
  const sections = propSections ?? DEFAULT_SECTIONS;
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? null);
  const [viewer, setViewer] = useState(null); // { sectionId, photoIndex } | null

  const scrollRef = useRef(null);
  const sectionRefs = useRef({});

  const handleThumbClick = (sectionId) => {
    setActiveSection(sectionId);
    const el = sectionRefs.current[sectionId];
    if (el && scrollRef.current) {
      const containerTop = scrollRef.current.getBoundingClientRect().top;
      const elTop = el.getBoundingClientRect().top;
      scrollRef.current.scrollBy({ top: elTop - containerTop - 100, behavior: 'smooth' });
    }
  };

  // Повноекранний перегляд
  if (viewer) {
    const section = sections.find(s => s.id === viewer.sectionId);
    return (
      <PhotoViewerScreen
        photos={section?.photos ?? []}
        initialIndex={viewer.photoIndex}
        onClose={() => setViewer(null)}
      />
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-[#f1f2f6]">

      {/* STICKY TOP BAR */}
      <div className="sticky top-0 z-10 bg-[#f1f2f6] flex items-center justify-between px-6 pt-14 pb-5">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 20L8 12L16 4" stroke="#3173FD" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="font-bold text-[22px] text-[#0052FF]">Фототур</span>
        <div className="w-8" />
      </div>

      {/* SCROLLABLE */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 pb-10"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >

        {/* ПІГУЛКИ З МІНІАТЮРАМИ */}
        <div
          className="flex gap-2.5 px-6 pb-2"
          style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sections.map(section => {
            const isActive = activeSection === section.id;
            return (
              <div
                key={section.id}
                className="shrink-0 flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => handleThumbClick(section.id)}
              >
                <div className="w-18.5 h-15 rounded-[14px] overflow-hidden shadow-[0_3px_10px_rgba(0,30,140,0.12)]">
                  <img src={section.photos[0]} alt={section.label}
                    className="w-full h-full object-cover" />
                </div>
                <span className={[
                  'px-4 py-1.5 rounded-full font-semibold text-[12px] whitespace-nowrap border-[1.5px] transition-all duration-200',
                  isActive
                    ? 'text-white border-white/60 bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)] shadow-[0_3px_8px_rgba(41,121,255,0.3),inset_0_1px_0_rgba(255,255,255,0.5)]'
                    : 'bg-white text-[#012A81] border-transparent shadow-[0_2px_6px_rgba(0,30,120,0.08)]',
                ].join(' ')}>
                  {section.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* СЕКЦІЇ */}
        {sections.map(section => (
          <div key={section.id} ref={el => { sectionRefs.current[section.id] = el; }}>
            <p className="px-6 pt-7 pb-3.5 font-bold text-[22px] text-[#0052FF]">
              {section.label.charAt(0).toUpperCase() + section.label.slice(1)}
            </p>
            <SectionPhotoGrid
              photos={section.photos}
              onPhotoClick={(idx) => setViewer({ sectionId: section.id, photoIndex: idx })}
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default PhotoTourScreen;
