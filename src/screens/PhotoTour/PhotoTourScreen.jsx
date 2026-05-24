const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16 20L8 12L16 4" stroke="#0052FF" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhotoTourScreen = ({ property, onBack }) => {
  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-[#0a0f1e]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-14 pb-4">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 20L8 12L16 4" stroke="white" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="font-bold text-[18px] text-white">Фототур</span>
        <div className="w-8" />
      </div>

      {/* Фото на весь екран */}
      <div className="flex-1 relative overflow-hidden">
        <img
          src={property?.image}
          alt="Фото житла"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {/* Плейсхолдер повідомлення */}
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3 px-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center">
            <p className="text-white font-semibold text-[15px] mb-1">Фототур у розробці</p>
            <p className="text-white/70 text-[13px]">
              Тут буде галерея всіх фото та 3D-тур по житлу
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoTourScreen;
