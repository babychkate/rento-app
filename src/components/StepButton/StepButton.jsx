/**
 * @param {number | string} step
 * @param {() => void}      onClick
 */
const StepButton = ({ step = 1, onClick }) => (
  <button
    onClick={onClick}
    aria-label={`Step ${step}`}
    className={[
      'absolute bottom-15 left-1/2 -translate-x-1/2',
      'w-22.5 h-22.5 rounded-full',
      'bg-[radial-gradient(circle_at_top_left,#cfd6ff_0%,#b8c2f3_45%,#aab5eb_100%)]',
      'border-[0.2px] border-white/80',
      'shadow-[inset_1px_1px_3px_rgba(255,255,255,1),inset_-2px_-3px_6px_rgba(0,30,120,0.15),0px_6px_12px_rgba(0,20,90,0.15)]',
      'flex items-center justify-center',
      'font-(family-name:--font-montserrat) font-bold text-[18px] text-[#003285]',
      'cursor-pointer z-10',
      'transition-transform duration-200 active:scale-95',
      'step-btn-ring', // ring pseudo-element handled via index.css
    ].join(' ')}
  >
    {step}
  </button>
);

export default StepButton;
