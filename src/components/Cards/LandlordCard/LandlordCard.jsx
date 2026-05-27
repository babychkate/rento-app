import { StarIcon, HeartIcon } from "../../Icons/Icons";

export const LandlordCard = ({ name, avatar, rating, address, onLike, onClick, isLiked }) => (
  <div 
    onClick={onClick} 
    className="w-full h-[250px] rounded-[28px] overflow-hidden relative cursor-pointer shadow-[0_8px_24px_rgba(0,30,140,0.12)]"
  >
    <img src={avatar} alt={name} className="w-full h-full object-cover object-top" />
    
    <div className="absolute top-3 right-3 bg-[#3173FD] rounded-full px-2 py-0.5 flex items-center gap-0.5 text-white text-[10px] font-bold">
      <StarIcon />
      <span>{rating}</span>
    </div>

    <div className="absolute inset-0 flex flex-col justify-end" style={{
      background: 'linear-gradient(180deg, transparent 40%, rgba(49,115,253,0.3) 70%, rgba(1,42,129,0.85) 100%)'
    }}>
      <div className="px-4 pb-4 pt-8 flex justify-between items-end gap-1">
        <div className="flex flex-col text-white min-w-0">
          <span className="font-bold text-[15px] leading-tight truncate">{name}</span>
          <span className="text-[11px] opacity-85 truncate">{address}</span>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onLike?.(); }}
          className="bg-transparent border-none cursor-pointer p-0.5 active:scale-90 transition-transform"
        >
          <HeartIcon filled={isLiked} />
        </button>
      </div>
    </div>
  </div>
);