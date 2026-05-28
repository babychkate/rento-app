import { ArrowIcon, StarIcon, HeartIcon } from '../../../components/Icons/Icons';

export const FavCard = ({ image, rating, mainText, subText, onLike, onClick }) => (
  <div
    onClick={onClick}
    className="shrink-0 w-[210px] h-[270px] rounded-[28px] overflow-hidden relative cursor-pointer"
    style={{ boxShadow: '0 8px 24px rgba(0,30,140,0.12)' }}
  >
    <img src={image} alt={mainText} className="w-full h-full object-cover block" />
    <div className="absolute top-3.5 right-3.5 bg-[#3173FD] rounded-xl px-2 py-1 flex items-center gap-1 text-white text-[11px] font-semibold">
      <StarIcon />
      {rating}
    </div>
    <div className="absolute inset-0 flex flex-col justify-end p-4"
      style={{ background: 'linear-gradient(to top, rgba(1,42,129,0.85) 0%, rgba(1,42,129,0.3) 40%, transparent 100%)' }}>
      <p className="text-white text-[16px] font-bold mb-0.5">{mainText}</p>
      <p className="text-white/80 text-[12px] font-medium">{subText}</p>
      <button
        onClick={(e) => { e.stopPropagation(); onLike?.(); }}
        className="absolute bottom-3 right-2 bg-transparent border-none cursor-pointer p-0"
      >
        <HeartIcon filled={true}/>
      </button>
    </div>
  </div>
);

export const FavSection = ({ title, items, onArrowClick, renderCard }) => {
  if (!items || items.length === 0) return null;
  return (
    <>
      <div onClick={onArrowClick} className="flex justify-between items-center px-6 pt-6 pb-3 cursor-pointer">
        <span className="font-bold text-[16px] text-[#012A81]">{title}</span>
        <ArrowIcon />
      </div>
      <div className="flex gap-4 px-6 pb-2.5" style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {items.map(renderCard)}
      </div>
    </>
  );
};