const CategoryCard = ({ icon, label, selected, onClick }) => (
  <button
    onClick={onClick}
    className={[
      'rounded-[50px] px-4 py-3.5',
      'flex items-center gap-2',
      'border-[1.2px] cursor-pointer transition-all duration-200',
      'font-montserrat text-[14px] font-bold leading-[120%] tracking-[-0.01em] text-left',
      'backdrop-blur-lg',
      selected
        ? [
            'border-white/45 text-[#002475]',
            'bg-[#0052FF8C]',
            'shadow-[2px_4px_6.4px_-5px_rgba(0,82,255,0.55),4px_5px_9.1px_1px_rgba(205,79,222,0.27),1px_3px_6.4px_-4px_rgba(244,245,255,0.31),inset_0_1.5px_0px_rgba(255,255,255,0.3)]',
          ].join(' ')
        : [
            'border-white/45 text-[#002475]',
            'bg-[linear-gradient(180deg,rgba(235,238,255,0.75)_0%,rgba(190,202,255,0.7)_100%)]',
            'shadow-[8px_8px_13.9px_-5px_rgba(0,82,255,0.55),11px_9px_21.9px_1px_rgba(205,79,222,0.27),4px_4px_10.8px_-4px_rgba(244,245,255,0.15),inset_0_1.5px_0px_rgba(255,255,255,0.6)]',
          ].join(' '),
    ].join(' ')}
  >
    {icon}
    <span dangerouslySetInnerHTML={{ __html: label }} />
  </button>
);

export default CategoryCard;