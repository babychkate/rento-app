import Chip from '../../components/Chip/Chip';
import StepButton from '../../components/StepButton/StepButton';
import {
  SettingsIcon,
  StarIcon,
  HomeIcon,
  HeartIcon,
  FireIcon,
} from '../../components/Icons/icons';

const CHIPS = [
  // Row 1
  { variant: 'light', label: 'є світло',      style: { top: 36,  left: '50%', transform: 'translateX(-50%) rotate(-4deg)' } },
  // Row 2
  { variant: 'light', label: 'з паркінгом',   style: { top: 96,  left: 16,   transform: 'rotate(8deg)' } },
  { variant: 'light', iconOnly: true, icon: <SettingsIcon />, style: { top: 93, left: 198, transform: 'rotate(-12deg)' } },
  { variant: 'light', label: 'власник',        style: { top: 96,  right: 16,  transform: 'rotate(-6deg)' } },
  // Row 3
  { variant: 'mid',   label: 'з ремонтом',    style: { top: 163, left: 16,   transform: 'rotate(-5deg)' } },
  { variant: 'mid',   label: 'з сусідом',     style: { top: 163, right: 16,  transform: 'rotate(7deg)' } },
  // Row 4
  { variant: 'mid',   iconOnly: true, icon: <StarIcon />,     style: { top: 228, left: 16,   transform: 'rotate(15deg)' } },
  { variant: 'mid',   label: 'шукаю квартиру', style: { top: 230, left: 74,  transform: 'rotate(-3deg)', padding: '13px 44px' } },
  { variant: 'mid',   iconOnly: true, icon: <HomeIcon />,     style: { top: 228, right: 16,  transform: 'rotate(-10deg)' } },
  // Row 5
  { variant: 'dark',  label: 'перевірено',    style: { top: 297, left: 16,   transform: 'rotate(-8deg)' } },
  { variant: 'mid',   iconOnly: true, icon: <HeartIcon />,    style: { top: 295, left: '50%', transform: 'translateX(-50%) rotate(5deg)' } },
  { variant: 'dark',  label: 'без комісії',   style: { top: 297, right: 16,  transform: 'rotate(4deg)' } },
  // Row 6
  { variant: 'dark',  iconOnly: true, icon: <FireIcon />,     style: { top: 364, left: 16,   transform: 'rotate(-15deg)' } },
  { variant: 'dark',  label: 'доступно',      style: { top: 364, left: 74,   transform: 'rotate(6deg)' } },
  { variant: 'dark',  label: 'студенту',      style: { top: 364, right: 16,  transform: 'rotate(-4deg)' } },
  // Row 7
  { variant: 'dark',  label: 'зручно',        style: { top: 437, left: 16,   transform: 'rotate(5deg)' } },
  { variant: 'dark',  label: 'затишно',       style: { top: 433, left: 114,  transform: 'rotate(-6deg)' } },
  { variant: 'dark',  label: 'pet friendly',  style: { top: 439, right: 16,  transform: 'rotate(3deg)' } },
];

const WelcomeScreen = ({ onNext }) => (
  <div
    className={[
      'relative overflow-hidden w-107.5 min-h-233',
      'bg-[radial-gradient(120.45%_105.2%_at_50%_100%,#0052ff_5.29%,rgba(0,82,255,0.77)_45%,rgba(0,82,255,0.5)_60%,rgba(205,79,222,0.22)_80%,rgba(205,79,222,0.22)_100%),linear-gradient(0deg,#ffffff,#ffffff)]',
    ].join(' ')}
  >
    {/* Chips cloud */}
    <div className="relative w-full h-130">
      {CHIPS.map(({ variant, iconOnly, label, icon, style }, i) => (
        <Chip key={i} variant={variant} iconOnly={iconOnly} style={style}>
          {icon ?? null}
          {label && !iconOnly ? <span>{label}</span> : null}
        </Chip>
      ))}
    </div>

    {/* Hero text */}
    <div className="absolute left-0 right-0 bottom-50 flex flex-col items-center">
      <h1 className="font-(family-name:--font-montserrat) font-semibold text-[24px] leading-tight text-white text-center mb-3">
        ВІТАЄМО У<br />RENTO!
      </h1>
      <p className="font-(family-name:--font-montserrat) text-[16px] leading-[122%] text-white text-center">
        тут ви можете...
      </p>
    </div>

    {/* CTA */}
    <StepButton step={1} onClick={onNext} />
  </div>
);

export default WelcomeScreen;
