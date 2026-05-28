import { StarIcon, HeartIcon } from "../../Icons/Icons";

export const RoommateCard = ({ name, age, avatar, rating, subtitle, onLike, onClick, isLiked }) => (
  <div 
    onClick={onClick} 
    className="w-full h-[250px] rounded-[28px] overflow-hidden relative cursor-pointer shadow-[0_8px_24px_rgba(0,30,140,0.12)]"
  >
    <img src={avatar} alt={name} className="w-full h-full object-cover object-top" />
    
    <div className="absolute top-3 right-3 bg-[#3173FD] rounded-full px-2 py-0.5 flex items-center gap-0.5 text-white text-[10px] font-500">
      <StarIcon />
      <span>{rating}</span>
    </div>

    <div className="absolute inset-0 flex flex-col justify-end p-4"
      style={{ background: 'linear-gradient(to top, rgba(1,42,129,0.85) 0%, rgba(1,42,129,0.3) 40%, transparent 100%)' }}>
      <div className="flex justify-between items-end gap-1">
        <div className="flex flex-col text-white min-w-0">
          <span className="font-bold text-[15px] leading-tight truncate">
            {name?.split(' ')[0]}, {age}
          </span>
          <span className="text-[11px] opacity-85 truncate">{subtitle}</span>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onLike?.(); }}
          className="bg-transparent border-none cursor-pointer p-0 active:scale-90 transition-transform"
        >
          <HeartIcon filled={isLiked} />
        </button>
      </div>
    </div>
  </div>
);