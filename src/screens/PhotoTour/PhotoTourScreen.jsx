import { useState, useRef } from 'react';
import { PhotoViewerScreen } from './PhotoViewerScreen';
import { BackIcon } from '../../components/Icons/Icons';

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
  const sections = propSections;
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
          <BackIcon />
        </button>
        <span className="font-bold text-[22px] text-[#012A81]">Фототур</span>
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
            <p className="px-6 pt-7 pb-3.5 font-bold text-[20px] text-[#0052FF]">
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
