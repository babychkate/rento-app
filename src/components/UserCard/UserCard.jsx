import { BackIcon, StarIcon, ArrowIcon } from '../../components/Icons/Icons';

export const UserCard = ({ roommate, onClick }) => {
  const preview = roommate.tags.slice(0, 2).join(' · ');

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[28px] px-3 py-2.5 flex items-center justify-between cursor-pointer transition-transform duration-150 active:scale-[0.99]"
      style={{ boxShadow: '0 6px 18px rgba(0,30,140,0.05)' }}
    >
      <div className="flex items-center gap-3.5">
        {/* Аватар + рейтинг */}
        <div className="relative w-14 h-14 shrink-0">
          <img
            src={roommate.avatar}
            alt={roommate.name}
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2
            bg-[#0052FF] text-white rounded-lg px-1.5 py-[2px]
            flex items-center gap-[2px]"
            style={{ fontSize: '9px', fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
            <StarIcon />
            {roommate.rating.toFixed(1)}
          </div>
        </div>

        {/* Ім'я + теги */}
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-[15px] text-[#012A81]">{roommate.name}</span>
          <span className="text-[12px] font-medium text-[#a0aec0]">{preview}</span>
        </div>
      </div>

      <ArrowIcon />
    </div>
  );
};