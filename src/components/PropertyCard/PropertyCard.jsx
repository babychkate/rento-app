import { useState } from 'react';

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 23 22" fill="none">
    <path d="M3.25907 11.6533L4.50719 12.6068C4.84022 12.8612 4.97928 13.2963 4.85555 13.6967L3.49665 18.0942C3.2092 19.0244 4.28545 19.7751 5.05914 19.1841L8.48099 16.57C8.83939 16.2962 9.33672 16.2962 9.69512 16.57L13.117 19.1841C13.8907 19.7751 14.9669 19.0244 14.6795 18.0942L13.3206 13.6967C13.1968 13.2963 13.3359 12.8612 13.6689 12.6068L17.2805 9.84777C18.0406 9.2671 17.63 8.05312 16.6734 8.05312H12.3142C11.8757 8.05312 11.4883 7.76737 11.3588 7.34836L10.0435 3.09181C9.7531 2.15213 8.42301 2.15214 8.13263 3.09181L6.81729 7.34836C6.68781 7.76737 6.30042 8.05312 5.86186 8.05312H1.50268C0.54615 8.05312 0.135509 9.2671 0.895623 9.84777L1.65139 10.4251"
      stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
    <path d="M24.5189 26.2766C23.8026 27.0369 22.5293 28.3835 21.7267 29.232C21.3319 29.6493 20.6693 29.6497 20.2751 29.2319C18.6188 27.4771 14.5384 23.1534 12.4378 20.924C11.4757 19.9028 11 18.5718 11 17.2293C11 15.8868 11.4757 14.5444 12.4378 13.5232C14.3622 11.4923 17.4757 11.4923 19.4 13.5232L20.2615 14.4438C20.6558 14.8651 21.3238 14.8662 21.7195 14.4462L22.5892 13.5232C24.5135 11.4923 27.6162 11.4923 29.5405 13.5232C30.5243 14.5444 31 15.8754 31 17.2293C31 18.5603 30.5243 19.9028 29.5622 20.924L26.2492 24.4402"
      stroke="white"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={filled ? 'white' : 'none'}
    />
  </svg>
);

const PropertyCard = ({ property, onClick}) => {
  const [liked, setLiked] = useState(false);

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
  onClick={(e) => { e.stopPropagation(); setLiked(p => !p); }}
  className="bg-transparent border-none cursor-pointer p-0"
>
          <HeartIcon filled={liked} />
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;