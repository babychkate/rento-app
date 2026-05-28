export const CrossBtn = ({ highlight, onClick }) => (
  <button onClick={onClick}
    className="border-none cursor-pointer p-0 active:scale-90 transition-transform"
    style={{ background: 'none' }}>
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
      <defs>
        <filter id="cross_shadow" x="0" y="0" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/><feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
      <g filter="url(#cross_shadow)">
        <rect x="4" width="60" height="60" rx="30"
          fill={highlight ? '#012A81' : 'white'}
          fillOpacity={highlight ? 1 : 0.64}/>
        <path d="M43 40L35.4142 32.4142C34.6332 31.6332 33.3668 31.6332 32.5858 32.4142L25 40"
          stroke={highlight ? 'white' : '#012A81'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M43 21L35.4142 28.5858C34.6332 29.3668 33.3668 29.3668 32.5858 28.5858L25 21"
          stroke={highlight ? 'white' : '#012A81'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  </button>
);

export const HeartBtn = ({ highlight, onClick }) => (
  <button onClick={onClick}
    className="border-none cursor-pointer p-0 active:scale-90 transition-transform"
    style={{ background: 'none' }}>
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
      <defs>
        <filter id="heart_shadow" x="0" y="0" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/><feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
      <g filter="url(#heart_shadow)">
        <rect x="4" width="60" height="60" rx="30"
          fill={highlight ? '#CD4FDE' : 'white'}
          fillOpacity={highlight ? 1 : 0.64}/>
        <path d="M37.5189 35.2766C36.8026 36.0369 35.5293 37.3835 34.7267 38.232C34.3319 38.6493 33.6693 38.6497 33.2751 38.2319C31.6188 36.4771 27.5384 32.1534 25.4378 29.924C24.4757 28.9028 24 27.5718 24 26.2293C24 24.8868 24.4757 23.5444 25.4378 22.5232C27.3622 20.4923 30.4757 20.4923 32.4 22.5232L33.2615 23.4438C33.6558 23.8651 34.3238 23.8662 34.7195 23.4462L35.5892 22.5232C37.5135 20.4923 40.6162 20.4923 42.5405 22.5232C43.5243 23.5444 44 24.8754 44 26.2293C44 27.5603 43.5243 28.9028 42.5622 29.924L39.2492 33.4402"
          stroke={highlight ? 'white' : '#CD4FDE'}
          strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  </button>
);