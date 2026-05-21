import { useEffect, useState } from 'react';
import Chip from '../../components/Chip/Chip';
import StepButton from '../../components/StepButton/StepButton';
import {
  SettingsIcon,
  StarIcon,
  HomeIcon,
  HeartIcon,
  FireIcon,
} from '../../components/Icons/Icons.jsx';

const CHIPS = [
  // Row 1
  { variant: 'light', label: 'є світло',       style: { top: 36,  left: '50%', transform: 'translateX(-50%) rotate(-6deg)' } },
  // Row 2
  { variant: 'light', label: 'з паркінгом',    style: { top: 96,  left: 16,   transform: 'rotate(12deg)' } },
  { variant: 'light', iconOnly: true, icon: <SettingsIcon />, style: { top: 88, left: 192, transform: 'rotate(-18deg)' } },
  { variant: 'light', label: 'власник',         style: { top: 90,  right: 16,  transform: 'rotate(-10deg)' } },
  // Row 3
  { variant: 'mid',   label: 'з ремонтом',     style: { top: 162, left: 16,   transform: 'rotate(-8deg)' } },
  { variant: 'mid',   label: 'з сусідом',      style: { top: 158, right: 16,  transform: 'rotate(10deg)' } },
  // Row 4
  { variant: 'mid',   iconOnly: true, icon: <StarIcon />,     style: { top: 226, left: 16,   transform: 'rotate(18deg)' } },
  { variant: 'mid',   label: 'шукаю квартиру', style: { top: 228, left: 74,   transform: 'rotate(-5deg)', padding: '13px 44px' } },
  { variant: 'mid',   iconOnly: true, icon: <HomeIcon />,     style: { top: 222, right: 16,  transform: 'rotate(-14deg)' } },
  // Row 5
  { variant: 'dark',  label: 'перевірено',     style: { top: 297, left: 16,   transform: 'rotate(-10deg)' } },
  { variant: 'mid',   iconOnly: true, icon: <HeartIcon />,    style: { top: 292, left: '50%', transform: 'translateX(-50%) rotate(8deg)' } },
  { variant: 'dark',  label: 'без комісії',    style: { top: 293, right: 16,  transform: 'rotate(6deg)' } },
  // Row 6
  { variant: 'dark',  iconOnly: true, icon: <FireIcon />,     style: { top: 362, left: 16,   transform: 'rotate(-18deg)' } },
  { variant: 'dark',  label: 'доступно',       style: { top: 366, left: 100,   transform: 'rotate(8deg)' } },
  { variant: 'dark',  label: 'студенту',       style: { top: 366, right: 16,  transform: 'rotate(-6deg)' } },
  // Row 7
  { variant: 'dark',  label: 'зручно',         style: { top: 440, left: 10,   transform: 'rotate(-12deg)' } },
  { variant: 'dark',  label: 'затишно',        style: { top: 467, left: 128,  transform: 'rotate(10deg)' } },
  { variant: 'dark',  label: 'pet friendly',   style: { top: 435, right: 8,   transform: 'rotate(-8deg)' } },
];

const WelcomeScreen = ({ onNext }) => {
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLanded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={[
        'relative overflow-hidden w-107.5 min-h-233',
        'bg-[radial-gradient(120.45%_105.2%_at_50%_100%,#0052ff_5.29%,rgba(0,82,255,0.77)_45%,rgba(0,82,255,0.5)_60%,rgba(205,79,222,0.22)_80%,rgba(205,79,222,0.22)_100%),linear-gradient(0deg,#ffffff,#ffffff)]',
      ].join(' ')}
    >
      {/* Chips cloud */}
      <div className="relative w-full h-135">
        {CHIPS.map(({ variant, iconOnly, label, icon, style }, i) => {
          const originalTransform = style.transform ?? '';

          const chipStyle = {
            ...style,
            transform: landed
              ? originalTransform
              : `${originalTransform} translateY(-600px)`,
            opacity: landed ? 1 : 0,
            transition: `transform 0.9s cubic-bezier(0.22, 1.1, 0.36, 1) ${i * 60}ms, opacity 0.4s ease ${i * 60}ms`,
          };

          return (
            <Chip key={i} variant={variant} iconOnly={iconOnly} style={chipStyle}>
              {icon ?? null}
              {label && !iconOnly ? <span>{label}</span> : null}
            </Chip>
          );
        })}
      </div>

      {/* Hero text */}
      <div className="absolute left-0 right-0 bottom-50 flex flex-col items-center">
        <h1 className="font-montserrat font-semibold text-[24px] leading-tight text-white text-center mb-3">
          ВІТАЄМО У<br />RENTO!
        </h1>
        <p className="font-montserrat text-[16px] leading-[122%] text-white text-center">
          тут ви можете...
        </p>
      </div>

      {/* CTA */}
      <StepButton step={1} onClick={onNext} />
    </div>
  );
};

export default WelcomeScreen;