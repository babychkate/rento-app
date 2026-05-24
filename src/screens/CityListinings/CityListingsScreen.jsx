const BackIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
    stroke="#0052ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CityListingsScreen = ({ city, onBack }) => (
  <div className="flex flex-col w-full h-full bg-[#f1f2f6] font-montserrat">
    <div className="flex items-center relative pt-13 pb-7 px-6 shrink-0">
      <button
        onClick={onBack}
        className="flex items-center bg-transparent border-none cursor-pointer"
      >
        <BackIcon />
      </button>
      <span className="text-[22px] font-bold text-[#012A81] ml-2">
        Житло у {city}
      </span>
    </div>
    <div className="flex-1 flex items-center justify-center">
      <p className="text-[#8a9ab8] text-[16px] font-medium">
        Список житла у {city} — незабаром
      </p>
    </div>
  </div>
);

export default CityListingsScreen;