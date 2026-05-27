import React, { useState } from 'react';
import { useFavorites } from '../Context/FavouritesContext'; 
import BottomNav from '../../components/BottomNav/BottomNav';
import { RentoLogo, BellIcon, ProfileIcon } from '../../components/Icons/NavIcons';
import { RoommateCard } from '../../components/RoommateCard/RoommateCard'; // Впевнись, що шлях правильний
import { BackIcon } from '../../components/Icons/Icons';

const FavRoommatesListScreen = ({ 
  roommatesList, 
  likedRoommates: externalLikedRoommates, // Проп для Обраного
  onBack, 
  onOpenDetails, 
  onToggleFavorite, 
  onLogoClick 
}) => {
  const { likedRoommates: contextLikedRoommates } = useFavorites();
  const [activeTab, setActiveTab] = useState('home');

  // Визначаємо, який список лайків використовувати
  const likedData = externalLikedRoommates || contextLikedRoommates;

  const isLiked = (id) => {
    // Перетворюємо ID на рядок для безпечного порівняння
    const stringId = String(id);
    
    if (likedData instanceof Set) {
      // Перевіряємо через масив значень Set
      return Array.from(likedData).some(item => String(item) === stringId);
    }
    return likedData?.some(item => String(item) === stringId);
  };

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-white overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(148,93,233,0.55) 0%, rgba(99,138,255,0.7) 8%, rgba(79,118,255,0.5) 14%, #ffffff 28%, #ffffff 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 min-h-0 pb-28" style={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
        {/* ХЕДЕР */}
        <div className="flex items-center justify-between px-6 pt-14 pb-2.5">
          <button onClick={onLogoClick} className="bg-transparent border-none cursor-pointer p-0"><RentoLogo /></button>
          <div className="flex items-center gap-2.5">
            <button className="bg-transparent border-none cursor-pointer p-0"><BellIcon /></button>
            <button className="bg-transparent border-none cursor-pointer p-0"><ProfileIcon /></button>
          </div>
        </div>

        {/* ЗАГОЛОВОК */}
        <div className="flex items-center gap-3 px-6 pt-9 pb-6">
          <button onClick={onBack} className="bg-transparent border-none cursor-pointer p-0"><BackIcon /></button>
          <h1 className="font-bold text-[32px] leading-[100%] text-[#012A81]">Співмешканці</h1>
        </div>

        {/* СІТКА */}
        {!roommatesList || roommatesList.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6">
            <p className="text-[#8a9ab8] text-[16px] font-medium text-center">Список співмешканців порожній</p>
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
                isLiked={isLiked(roommate.id)} // Перевірка за id
                onLike={() => onToggleFavorite(roommate.id)}
                onClick={() => onOpenDetails(roommate)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default FavRoommatesListScreen;