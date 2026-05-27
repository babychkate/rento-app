import { useState } from 'react';

export const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 100;
  const displayText = expanded || !isLong ? review.text : review.text.slice(0, 100) + '…';

  return (
    <div className="shrink-0 w-77.5 rounded-3xl p-4.5 border border-white/80"
      style={{
        background: 'linear-gradient(180deg, #ACC5F8 5%, #FFFFFF 50%, #FFFFFF 100%)',
        boxShadow: '4px 4px 12px 2px rgba(0,30,140,0.3)',
      }}>
      {/* Аватар + ім'я */}
      <div className="flex items-center gap-3 mb-2">
        <img src={review.avatar} alt={review.name}
          className="w-10 h-10 rounded-full object-cover shrink-0" />
        <span className="font-bold text-[15px] text-black">{review.name}</span>
      </div>

      {/* Зірки + дата */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="13" height="13" viewBox="0 0 24 24"
              fill={i < review.rating ? '#8F94FB' : '#e2e8f0'}>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          ))}
        </div>
        <span className="text-[13px] text-[#718096]">{review.date}</span>
      </div>

      {/* Текст */}
      <p className="text-[13px] text-[#2D3748] leading-relaxed mb-1">{displayText}</p>
      {isLong && (
        <button onClick={() => setExpanded(p => !p)}
          className="text-[13px] font-medium text-[#5A7BB5] bg-transparent border-none cursor-pointer p-0">
          {expanded ? 'Згорнути' : 'Показати більше'}
        </button>
      )}
    </div>
  );
};
