const LandlordScreen = ({ property, onBack }) => {
  const landlord = property?.landlord;

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-14 pb-6 border-b border-[rgba(41,121,255,0.1)]">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 20L8 12L16 4" stroke="#0052FF" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="font-bold text-[22px] text-[#012A81]">Орендодавець</span>
        <div className="w-8" />
      </div>

      {/* Контент */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        {landlord?.avatar && (
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-[0_8px_24px_rgba(41,121,255,0.2)]">
            <img src={landlord.avatar} alt={landlord.name}
              className="w-full h-full object-cover" />
          </div>
        )}
        <p className="font-bold text-[22px] text-[#012A81] text-center">
          {landlord?.name}
        </p>

        <div className="bg-[#f1f4fd] rounded-2xl px-6 py-5 text-center max-w-xs">
          <p className="font-semibold text-[15px] text-[#012A81] mb-1">
            Профіль орендодавця
          </p>
          <p className="text-[13px] text-[#4b5b7e]">
            Детальна інформація про орендодавця, верифікація та контакти з'являться тут
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandlordScreen;
