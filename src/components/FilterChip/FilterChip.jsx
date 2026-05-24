const FilterChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={[
      'px-6 py-2.5 rounded-full cursor-pointer shrink-0',
      'font-montserrat text-[15px] font-semibold tracking-[0.01em]',
      'border-[1.5px] transition-all duration-200 whitespace-nowrap',
      active
        ? [
            'text-white border-white/60',
            'bg-[linear-gradient(135deg,#60aaff_0%,#2979ff_35%,#1a5fff_70%,#0040dd_100%)]',
            'shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.5)]',
          ].join(' ')
        : [
            'text-[#012A81] border-[#e2e8f5] bg-white',
            'shadow-none',
          ].join(' '),
    ].join(' ')}
  >
    {label}
  </button>
);

export default FilterChip;