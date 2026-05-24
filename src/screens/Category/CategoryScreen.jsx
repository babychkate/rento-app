import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import {
  FamilyIcon, PetIcon, CoupleIcon,
  SoloIcon, FreelancerIcon, StudentIcon,
} from '../../components/Icons/CategoryIcons';

const BackIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
    stroke="#0052ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CATEGORIES = [
  { id: 'family',     icon: <FamilyIcon />,     label: "сім'я<br>з дітьми" },
  { id: 'pet',        icon: <PetIcon />,         label: 'власник<br>хвостика' },
  { id: 'couple',     icon: <CoupleIcon />,      label: 'пара' },
  { id: 'solo',       icon: <SoloIcon />,        label: 'одинак' },
  { id: 'freelancer', icon: <FreelancerIcon />,  label: 'фрілансер' },
  { id: 'student',    icon: <StudentIcon />,     label: 'студент' },
];

const CategoryScreen = ({ onBack, onNext }) => {
  const { updateUser } = useAuth();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) return;
    updateUser({ category: selected });
    onNext();
  };

  return (
    <div className={[
      'relative w-full min-h-full flex flex-col',
      'bg-[radial-gradient(120.45%_105.2%_at_50%_100%,#0052ff_5.29%,rgba(0,82,255,0.77)_45%,rgba(0,82,255,0.5)_60%,rgba(205,79,222,0.22)_80%,rgba(205,79,222,0.22)_100%),linear-gradient(0deg,#ffffff,#ffffff)]',
      'font-montserrat px-6',
    ].join(' ')}>

      {/* Top bar */}
      <div className="flex items-center justify-center relative pt-12 pb-6 shrink-0">
        <button
          onClick={onBack}
          className="absolute left-0 flex items-center bg-transparent border-none cursor-pointer"
        >
          <BackIcon />
        </button>
        <span className="text-[28px] font-bold text-[#012A81]">Категорія</span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 mt-4">
        {CATEGORIES.map(({ id, icon, label }) => (
          <CategoryCard
            key={id}
            icon={icon}
            label={label}
            selected={selected === id}
            onClick={() => setSelected(id)}
          />
        ))}
      </div>

      {/* Bottom text */}
      <div className="flex flex-col items-center mt-15 gap-3 text-center">
        <p className="text-white text-[30px] font-semibold leading-[100%] mb-3">ХТО ТИ?</p>
        <p className="text-white text-[16px] font-normal leading-[130%] max-w-72.5">
          це допоможе нам підібрати<br />найбільш відповідні умови для тебе
        </p>
      </div>

      {/* Продовжити + степ */}
      <div className="flex flex-col items-center gap-5 mt-auto pb-15">
        <span
          onClick={handleContinue}
          className={[
            'text-[20px] font-medium leading-[122%] font-montserrat transition-opacity duration-200 mb-10',
            selected
              ? 'text-white cursor-pointer opacity-100'
              : 'text-white/40 cursor-default opacity-40',
          ].join(' ')}
        >
          Продовжити
        </span>
        <StepIndicator step={3} position="relative" />
      </div>

    </div>
  );
};

export default CategoryScreen;
