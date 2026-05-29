import { ArrowIcon } from '../../Icons/Icons';

const ROLE_COLORS = {
  'орендодавець': '#3b82f6',
  'сусід': '#7c3aed',
  'орендар': '#22c55e',
};

const previewText = (msg) => {
  const first = msg.trim().split(' ')[0];
  return first + '\u00a0…';
};

export const ChatCard = ({ chat, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left flex items-center justify-between border-none cursor-pointer transition-all duration-150 active:scale-[0.98]"
    style={{
      borderRadius: '40px',
      padding: '10px 20px 10px 10px',
      background: 'linear-gradient(180deg, rgba(160,173,253,0.4) 0%, rgba(177,187,252,0.45) 50%, rgba(220,224,248,0.65) 100%)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.75)',
      boxShadow: '0 6px 18px rgba(0,82,255,0.06), inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(160,173,253,0.2)',
    }}
  >
    <div className="flex items-center gap-3.5">
      <div className="relative w-14 h-14 shrink-0">
        <img src={chat.avatar} alt={chat.name}
          className="w-full h-full rounded-full object-cover" />
        {/* {chat.unread > 0 && (
          <div className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 rounded-full bg-[#0052FF] flex items-center justify-center px-1"
            style={{ boxShadow: '0 2px 6px rgba(0,82,255,0.45)', fontSize: '10px', fontWeight: 700, color: '#fff' }}>
            {chat.unread}
          </div>
        )} */}
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[15px] text-[#012A81]">{chat.name}</span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-lg"
            style={{ color: ROLE_COLORS[chat.role] ?? '#718096', background: `${ROLE_COLORS[chat.role] ?? '#718096'}18` }}>
            {chat.role}
          </span>
        </div>
        <span className="text-[12px] font-medium text-[#728cb6]">
          {previewText(chat.lastMessage)}
        </span>
      </div>
    </div>

    <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
      <span className="text-[11px] font-medium text-[#a0aec0]">{chat.time}</span>
      <ArrowIcon />
    </div>
  </button>
);