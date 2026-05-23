const variantClasses = {
  light: [
    'border-white/40',
    'bg-gradient-to-br from-[rgba(215,192,255,0.7)] to-[rgba(179,155,250,0.8)]',
    'shadow-[0_15px_30px_rgba(150,115,255,0.25),0_25px_45px_rgba(166,134,255,0.15)]',
  ].join(' '),

  mid: [
    'border-white/40',
    'bg-gradient-to-br from-[rgba(125,128,255,0.75)] to-[rgba(79,100,255,0.85)]',
    'shadow-[0_18px_35px_rgba(99,102,241,0.3),0_30px_55px_rgba(79,70,229,0.2)]',
  ].join(' '),

  dark: [
    'border-white/40',
    'bg-gradient-to-br from-[rgba(80,115,255,0.9)] via-[rgba(30,75,255,0.85)] to-[rgba(5,40,220,0.95)]',
    'shadow-[0_20px_35px_rgba(0,50,255,0.35),0_35px_65px_rgba(0,20,180,0.22)]',
  ].join(' '),
};

/**
 * @param {'light' | 'mid' | 'dark'} variant
 * @param {boolean}                  iconOnly  - circular pill
 * @param {React.CSSProperties}      style     - position + rotation
 */
const Chip = ({ variant = 'mid', iconOnly = false, children, style }) => {
  const base = [
    'absolute inline-flex items-center justify-center',
    'font-[family-name:var(--font-montserrat)] font-bold text-base text-white',
    'border-[1.2px] backdrop-blur-md leading-none whitespace-nowrap',
    iconOnly
      ? 'w-[52px] h-[52px] rounded-full p-0'
      : 'rounded-full px-[26px] py-[13px]',
    variantClasses[variant],
  ].join(' ');

  return (
    <div className={base} style={style}>
      {children}
    </div>
  );
};

export default Chip;