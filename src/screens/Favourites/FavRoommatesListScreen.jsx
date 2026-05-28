import { useFavorites } from '../Context/FavouritesContext';
import { RentoLogo, BellIcon, ProfileIcon } from '../../components/Icons/NavIcons';
import { RoommateCard } from '../../components/Cards/RoommateCard/RoommateCard';
import { BackIcon } from '../../components/Icons/Icons';
import { GRADIENTS } from '../../visual effects/headerGradient';

const FavRoommatesListScreen = ({ 
  roommatesList,
  onBack, 
  onOpenDetails, 
  onToggleFavorite, 
  onLogoClick,
  onNotifications,
  onProfile
}) => {
  const { isRoommateLiked } = useFavorites();

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white">
      <div className="relative z-10 flex flex-col flex-1 min-h-0 pb-10"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* Градієнт + хедер */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 pointer-events-none z-0"
            style={{ background: GRADIENTS.homeHeader }} />
          <div className="relative z-10 flex items-center justify-between px-6 pt-16 pb-12">
            <button onClick={onLogoClick} className="bg-transparent border-none cursor-pointer p-0">
              <RentoLogo />
            </button>
            <div className="flex items-center gap-2.5">
              <button onClick={onNotifications} className="bg-transparent border-none cursor-pointer p-0">
                <BellIcon />
              </button>
              <button onClick={onProfile} className="bg-transparent border-none cursor-pointer p-0">
                <ProfileIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Page title */}
        <div className="flex items-center gap-3 px-6 pb-6">
          <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-0 flex items-center">
            <BackIcon />
          </button>
          <h1 className="font-bold text-[28px] leading-[100%] text-[#012A81]">
            Обрані співмешканці
          </h1>
        </div>

        {/* СІТКА */}
        {!roommatesList || roommatesList.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6">
            <p className="text-[#8a9ab8] text-[16px] font-medium text-center">
              Список співмешканців порожній
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 px-6 pt-2">
            {roommatesList.map(roommate => (
              <RoommateCard
                key={roommate.id}
                name={roommate.name}
                age={roommate.age}
                city={roommate.city}
                avatar={roommate.avatar}
                rating={roommate.rating}
                subtitle={roommate.subtitle}
                isLiked={isRoommateLiked(roommate.id)}
                onLike={() => onToggleFavorite(roommate.id)}
                onClick={() => onOpenDetails(roommate)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavRoommatesListScreen;