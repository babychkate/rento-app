export const ModalOverlay = ({ onClose, children }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }}
    onClick={onClose}
  >
    <div
      onClick={e => e.stopPropagation()}
      className="w-full max-w-97.5 font-montserrat rounded-[28px] overflow-hidden"
      style={{ animation: 'fadeScale 0.22s cubic-bezier(0.25,0.46,0.45,0.94)' }}
    >
      {children}
    </div>

    <style>{`
      @keyframes fadeScale {
        from {
          opacity:0;
          transform:scale(0.94);
        }
        to {
          opacity:1;
          transform:scale(1);
        }
      }
    `}</style>
  </div>
);