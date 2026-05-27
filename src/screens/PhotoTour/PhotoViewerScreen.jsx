import { useState } from 'react';
import { CloseIcon } from '../../components/Icons/Icons';

const PhotoViewerScreen = ({ photos, initialIndex = 0, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);

  const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length);
  const next = () => setCurrent(i => (i + 1) % photos.length);

  return (
    <div className="relative w-full h-full flex flex-col bg-black font-montserrat">

      {/* Фото на весь екран */}
      <div className="absolute inset-0">
        <img src={photos[current]} alt=""
          className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)',
        }} />
      </div>

      {/* Верхній бар */}
      <div className="relative z-10 flex items-center justify-end px-6 pt-14 pb-4">
  {/* Текст абсолютно по центру рядка */}
  <span className="absolute left-1/2 -translate-x-1/2 font-bold text-[18px] text-white">
    Фототур
  </span>
  
  {/* Кнопка залишається праворуч */}
  <button onClick={onClose} className="bg-transparent border-none cursor-pointer p-1">
    <button onClick={onClose} className="bg-transparent border-none cursor-pointer p-1">
  <CloseIcon />
</button>
  </button>
</div>

      {/* Стрілки */}
      {photos.length > 1 && (
        <>
          <button onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10
              w-11 h-11 rounded-full flex items-center justify-center
              bg-black/30 backdrop-blur-sm border-none cursor-pointer">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10
              w-11 h-11 rounded-full flex items-center justify-center
              bg-black/30 backdrop-blur-sm border-none cursor-pointer">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      {/* Індикатор точки */}
      {photos.length > 1 && (
        <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center gap-1.5">
          {photos.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-200"
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                background: i === current ? 'white' : 'rgba(255,255,255,0.45)',
              }} />
          ))}
        </div>
      )}
    </div>
  );
};

export { PhotoViewerScreen };
