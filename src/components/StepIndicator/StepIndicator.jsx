/**
 * Step indicator — не кнопка, просто показує номер кроку
 * @param {number | string} step
 * @param {'absolute' | 'relative'} position
 */
const StepIndicator = ({ step = 1, position = 'absolute' }) => {
  const posClass = position === 'absolute'
    ? 'absolute bottom-[60px] left-1/2 -translate-x-1/2'
    : 'relative';

  return (
    <div
      className={[
        'absolute bottom-[14cqw] left-1/2 -translate-x-1/2',
        'w-[21cqw] h-[21cqw] rounded-full', // Розмір адаптується сам!
        'bg-[radial-gradient(circle_at_top_left,#cfd6ff_0%,#b8c2f3_45%,#aab5eb_100%)]',
        'border border-white/80', // Тепер це завжди чесний 1px, який не зникне
        // Тіні теж адаптуємо через cqw, щоб вони не ставали завеликими на малих екранах:
        'shadow-[inset_0.23cqw_0.23cqw_0.7cqw_rgba(255,255,255,1),inset_-0.46cqw_-0.7cqw_1.4cqw_rgba(0,30,120,0.15),0px_1.4cqw_2.8cqw_rgba(0,20,90,0.15)]',
        'flex items-center justify-center',
        'font-montserrat font-bold text-[4.2cqw] text-[#003285]', // Текст теж адаптивний
        'cursor-pointer z-10',
      ].join(' ')}
      aria-label={`Крок ${step}`}
    >
      {step}
    </div>
  );
};

export default StepIndicator;