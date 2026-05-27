import { StarIcon, ArrowIcon } from '../../Icons/Icons';

export const UserCard = ({ roommate, onClick }) => {
  const preview = roommate.tags.slice(0, 2).join(' · ');

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[50px] px-4 py-4 flex items-center justify-between cursor-pointer transition-transform duration-150 active:scale-[0.99]"
      style={{ boxShadow: '6px 6px 8px rgba(0,30,140,0.4)', border: '3px solid rgba(0,30,140,0.09)' }}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 shrink-0">
          <img
            src={roommate.avatar}
            alt={roommate.name}
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute -bottom-1 left-2/3 -translate-x-1/2
            bg-[#0052FF] text-white rounded-xl px-2 py-0.5
            flex items-center gap-1"
            style={{ fontSize: '11px', fontWeight: 500, boxShadow: '0 2px 6px rgba(0,0,0,0.15)', whiteSpace: 'nowrap' }}>
            <StarIcon />
            {roommate.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-bold text-[16px] text-[#012A81]">{roommate.name}</span>
          <span className="text-[13px] font-medium text-[#a0aec0]">{preview}</span>
        </div>
      </div>

      <ArrowIcon />
    </div>
  );
};