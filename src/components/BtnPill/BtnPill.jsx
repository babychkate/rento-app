/**
 * @param {React.ReactNode} children
 * @param {() => void}      onClick
 * @param {string}          className  - extra Tailwind classes
 */
const BtnPill = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={[
      'w-full px-7 py-3.75 rounded-full cursor-pointer',
      'font-montserrat text-[15px] font-semibold text-white tracking-[0.01em]',  // ← semibold
      'border-[1.5px] border-white/60',
      'bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)]',
      'shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.5)]',  // ← менш розкинута
      'flex items-center justify-center gap-2.5',
      className,
    ].join(' ')}
  >
    {children}
  </button>
);

export default BtnPill;