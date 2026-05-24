// Використовується для 3 секцій: 'identity' | 'security' | 'contract'
const CONTENT = {
  identity: {
    title: 'Особу підтверджено',
    subtitle: 'Верифікація особи',
    description: 'Тут буде детальна інформація про процес верифікації особи орендодавця: перевірка паспорту, ідентифікаційного коду та інших документів.',
    icon: (
      <svg width="64" height="64" viewBox="0 0 42 42" fill="none">
        <path d="M35.2912 9.97429C34.8714 9.45643 34.1227 8.6615 33.6489 8.19351C30.3979 4.98235 25.9305 3 21 3C11.0589 3 3 11.0589 3 21C3 30.9411 11.0589 39 21 39C30.9411 39 39 30.9411 39 21C39 18.8672 38.6291 16.821 37.9482 14.9225"
          stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M13.1514 22.353L16.7953 27.0018C17.1654 27.474 17.8651 27.5162 18.2894 27.092L35.292 10.0894"
          stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  security: {
    title: 'Безпека RENTO',
    subtitle: 'Комплексна система захисту',
    description: 'RENTO розробив комплексну систему безпеки для захисту орендарів і орендодавців: страхування, escrow-платежі та підтримка 24/7.',
    icon: (
      <svg width="64" height="64" viewBox="0 0 42 42" fill="none">
        <path d="M37.824 8.71191L21.6457 2.14918C21.4095 2.05336 21.1456 2.05136 20.908 2.14359L4.72551 8.4243C4.29883 8.5899 4.03904 9.02404 4.09477 9.47833L6.15839 26.2978C6.35645 27.912 7.20129 29.3767 8.49943 30.3564L20.6756 39.5454C21.0321 39.8145 21.5238 39.8145 21.8803 39.5454L34.0565 30.3564C35.3546 29.3767 36.1995 27.912 36.3975 26.2978L37.796 14.8997"
          stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12.3701 22.7123L16.1516 27.0389C16.5183 27.4585 17.1573 27.4974 17.5722 27.1253L38 8.80521"
          stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  contract: {
    title: 'Зразок договору',
    subtitle: 'Юридична документація',
    description: 'Тут буде зразок договору оренди, розроблений юристами RENTO. Ви зможете ознайомитися з усіма умовами перед підписанням.',
    icon: (
      <svg width="64" height="64" viewBox="0 0 42 42" fill="none">
        <path d="M25.3519 8.28473V10.8627C25.3519 12.4235 26.6051 13.6952 28.1658 13.7181L32.5752 13.7826L33.9055 13.7623C35.6946 13.7349 36.4193 11.446 34.972 10.3939L30.7734 6.65312L28.147 4.57735C27.2642 3.87965 26.1719 3.50011 25.0467 3.5001L17.0925 3.5L8.9804 3.5001C8.13168 3.50011 7.34132 3.93205 6.88297 4.64635C6.62527 5.04795 6.48828 5.51508 6.48828 5.99225V35.8445C6.48828 36.3068 6.60897 36.7611 6.83842 37.1625C7.31128 37.9896 8.191 38.5 9.14374 38.5H32.7037C33.554 38.5 34.3644 38.1392 34.9333 37.5072L35.0118 37.4201C35.5077 36.8692 35.7822 36.1541 35.7822 35.4129V26.8193V17.7017"
          stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
};

const VerificationScreen = ({ type = 'identity', onBack }) => {
  const content = CONTENT[type] ?? CONTENT.identity;

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-14 pb-6 border-b border-[rgba(41,121,255,0.1)]">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 20L8 12L16 4" stroke="#0052FF" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="font-bold text-[22px] text-[#012A81] text-center flex-1 mx-2">
          {content.title}
        </span>
        <div className="w-8" />
      </div>

      {/* Контент */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <div className="w-24 h-24 rounded-full bg-[#eef3ff] flex items-center justify-center shadow-[0_8px_24px_rgba(41,121,255,0.15)]">
          {content.icon}
        </div>

        <p className="font-bold text-[20px] text-[#012A81] text-center">
          {content.subtitle}
        </p>

        <div className="bg-[#f1f4fd] rounded-2xl px-6 py-5 text-center max-w-xs">
          <p className="text-[14px] text-[#4b5b7e] leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationScreen;
