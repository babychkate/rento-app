import { useFavorites } from '../../../screens/Context/FavouritesContext';
import { StarIcon, HeartIcon } from '../../Icons/Icons';

const AccommodationCard = ({ property, onClick }) => {
  const { isPropertyLiked, toggleProperty } = useFavorites();
  const liked = isPropertyLiked(property.id);

  return (
    <div
      onClick={onClick}
      className="shrink-0 w-60 h-65 rounded-[28px] overflow-hidden relative cursor-pointer">
      <img
        src={property.image}
        alt={property.address}
        className="w-full h-full object-cover"
      />

      {/* Rating badge */}
      <div className="absolute top-3.5 right-3.5 bg-[#3173FD] rounded-xl px-2.5 py-1
        flex items-center gap-1 text-white text-[12px] font-medium">
        <StarIcon />
        {property.rating}
      </div>

      {/* Overlay */}
      <div className="absolute bottom-0 left-0 right-0
        bg-linear-to-t from-[rgba(16,58,150,0.85)] via-[rgba(49,115,253,0.25)] to-transparent
        px-4.5 pb-4.5 pt-10 flex justify-between items-end">
        <div className="flex flex-col gap-0.5">
          <p className="text-white text-[18px] font-bold">{property.price}/ місяць</p>
          <p className="text-white/85 text-[12px] font-medium">{property.address}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleProperty(property.id); }}
          className="bg-transparent border-none cursor-pointer p-0"
        >
          <HeartIcon filled={liked} />
        </button>
      </div>
    </div>
  );
};

export default AccommodationCard;
