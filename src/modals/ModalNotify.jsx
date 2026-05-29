import { NotifIcon } from "../components/Icons/NotifIcon";

export const NotifModal = ({ notif, onClose }) => (
  <div
    className="absolute inset-0 z-50 flex items-center justify-center px-6"
    style={{ background: 'rgba(1,42,129,0.22)', backdropFilter: 'blur(3px)' }}
    onClick={onClose}
  >
    <div
      className="w-full rounded-[28px] p-6"
      style={{
        background: 'rgba(240,243,252,0.98)',
        border: '1px solid rgba(255,255,255,0.95)',
        boxShadow: '0 20px 56px rgba(0,30,140,0.22)',
      }}
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="shrink-0 mt-0.5">
          <NotifIcon type={notif.icon} />
        </div>
        <p className=" font-bold text-[16px] text-[#012A81] leading-snug flex-1">
          {notif.text}
        </p>
      </div>

      <p className="text-[14px] font-medium text-[#3a4060] leading-relaxed mb-5">
        {notif.detail}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-[#728cb6]">{notif.time}</span>
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-2xl font-bold text-[13px] text-white border-none cursor-pointer active:scale-[0.97] transition-transform"
          style={{ background: 'linear-gradient(135deg,#3b82f6 0%,#0052FF 100%)' }}
        >
          Зрозуміло
        </button>
      </div>
    </div>
  </div>
);