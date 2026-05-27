import { useState } from 'react';
import { useFavorites } from '../../screens/Context/FavouritesContext';
import VerificationScreen from '../Verification/VerificationScreen';
import SecurityScreen from '../Security/SecurityScreen';
import { ReviewCard } from '../../components/Cards/ReviewCard/ReviewCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import { BackIcon, ArrowIcon, StarIcon, HeartIcon, VerifiedIcon, ShieldIcon } from '../../components/Icons/Icons';
import { PhoneIcon, TelegramIcon, InstagramIcon } from "../../components/Icons/SocialIcons";

const LandlordScreen = ({ property, onBack, activeTab, onTabChange }) => {
  const [verificationScreen, setVerificationScreen] = useState(null);
  const { isLandlordLiked, toggleLandlord } = useFavorites();
  const landlord = property?.landlord;
  const isLiked = landlord?.id ? isLandlordLiked(landlord.id) : false;
  const reviews = property?.reviews ?? [];

  if (verificationScreen === 'security') {
    return <SecurityScreen onBack={() => setVerificationScreen(null)} />;
  }
  if (verificationScreen) {
    return <VerificationScreen type={verificationScreen} onBack={() => setVerificationScreen(null)} />;
  }

const contactIcons = {
  phone: <PhoneIcon />,
  instagram: <InstagramIcon />,
  telegram: <TelegramIcon />,
};

const verificationItems = [
  { key: 'identity', icon: <VerifiedIcon />, label: 'Особу підтверджено' },
  { key: 'security', icon: <ShieldIcon />, label: <><span className="text-[#0052FF] font-bold">RENTO</span> розробив комплексну безпеку</> },
];

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">
      <div className="flex-1 min-h-0 pb-28"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 pt-14 pb-4">
          <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-1">
            <BackIcon />
          </button>
          <span className="font-bold text-[22px] text-[#012A81]">Орендодавець</span>
          <div className="w-8" />
        </div>

        {/* HERO ФОТО */}
        <div className="mx-6 rounded-[28px] overflow-hidden relative h-[300px] shadow-[0_8px_28px_rgba(0,30,140,0.18)]">
          <img src={landlord?.avatar} alt={landlord?.name}
            className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, transparent 35%, rgba(49,115,253,0.45) 65%, rgba(0,50,200,0.82) 100%)',
          }} />

          {/* Лайк */}
          <button
            onClick={(e) => { e.stopPropagation(); if (landlord?.id) toggleLandlord(landlord.id); }}
            className="absolute bottom-[6px] right-4 z-50 bg-transparent border-none cursor-pointer p-2 active:scale-95 transition-transform">
            <HeartIcon filled={isLiked} />
          </button>

          {/* Ім'я */}
          <span className="absolute bottom-[18px] left-5 font-bold text-[26px] text-white"
            style={{ textShadow: '0 2px 8px rgba(0,20,100,0.4)' }}>
            {landlord?.name?.split(' ')[0]}
          </span>
        </div>

        {/* БІО + РЕЙТИНГ */}
        <div className="flex items-start justify-between gap-3 px-6 pt-5">
          <ul className="flex-1 flex flex-col gap-1.5 list-none">
            {(landlord?.bio ?? []).map(item => (
              <li key={item} className="relative pl-4 font-semibold text-[13px] text-[#3a4060] leading-snug">
                <span className="absolute left-0 top-[6px] w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex-shrink-0 flex items-center gap-1.5 bg-[#3173FD] rounded-xl px-2.5 py-1
            flex items-center gap-1 text-white text-[12px] font-medium">
            <StarIcon />
            {landlord?.rating ?? property?.rating}
          </div>
        </div>

        {/* КОНТАКТИ */}
        <p className="px-6 pt-7 pb-3 font-bold text-[16px] text-[#0052FF]">Контакти</p>
        <div className="flex flex-col px-6">
          {Object.entries(landlord?.contacts ?? {}).map(([key, value], idx, arr) => (
            <div key={key}>
              <div className="flex items-center gap-3.5 py-3.5">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {contactIcons[key]}
                </div>
                <span className="font-semibold text-[14px] text-[#012A81]">{value}</span>
              </div>
              {idx < arr.length - 1 && <div className="h-px bg-[rgba(41,121,255,0.1)]" />}
            </div>
          ))}
        </div>

        {/* ПЕРЕВІРЯЄМО КОЖНОГО */}
        <p className="px-6 pt-7 pb-1 font-bold text-[16px] text-[#0052FF]">Перевіряємо кожного</p>
        <div className="flex flex-col px-6">
          {verificationItems.map(({ key, icon, label }, idx, arr) => (
            <div key={key}>
              <div className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3.5">
                  {icon}
                  <span className="font-semibold text-[14px] text-[#012A81]">{label}</span>
                </div>
                <button onClick={() => setVerificationScreen(key)}
                  className="bg-transparent border-none cursor-pointer p-1 ml-2 flex-shrink-0">
                  <ArrowIcon />
                </button>
              </div>
              {idx < arr.length - 1 && <div className="h-px bg-[rgba(41,121,255,0.1)]" />}
            </div>
          ))}
        </div>

        {/* ВІДГУКИ */}
        <p className="px-6 pt-7 pb-1 font-bold text-[16px] text-[#0052FF]">Відгуки</p>
        <div className="flex gap-3 px-6 pt-3 pb-4"
          style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

      </div>

      <div className="relative z-60">
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
    </div>
  );
};

export default LandlordScreen;