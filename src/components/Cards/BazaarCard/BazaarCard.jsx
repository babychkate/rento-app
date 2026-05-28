export const BazaarCard = ({ item }) => (
  <div
    className="bg-white rounded-[20px] overflow-hidden transition-transform duration-200 active:scale-[0.98]"
    style={{ boxShadow: '0 4px 14px rgba(0,30,140,0.06)' }}
  >
    {/* Фото */}
    <div className="relative w-full" style={{ paddingBottom: '75%' }}>
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {item.badge && (
        <span
          className="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg"
          style={{ background: 'linear-gradient(135deg,#0052FF,#3b82f6)' }}
        >
          {item.badge}
        </span>
      )}
    </div>

    {/* Інфо */}
    <div className="px-3 py-2.5">
      <p className="font-bold text-[13px] text-[#012A81] leading-tight truncate">
        {item.title}
      </p>
      <div className="flex items-center justify-between mt-1">
        <span className="font-extrabold text-[15px] text-[#0052FF]">{item.price}</span>
        <span className="text-[11px] text-[#a0aec0] font-medium">{item.city}</span>
      </div>
    </div>
  </div>
);