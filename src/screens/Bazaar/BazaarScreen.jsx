import BottomNav from '../../components/BottomNav/BottomNav';
import { useState } from 'react';
import { BackIcon } from '../../components/Icons/Icons';
import { BazaarCard } from '../../components/Cards/BazaarCard/BazaarCard';
import FilterChip from '../../components/FilterChip/FilterChip';
import {BAZAAR_CATEGORIES, BAZAAR_ITEMS} from "../../data/bazaar"

const BazaarScreen = ({ onBack, activeTab, onTabChange }) => {
  const [activeCategory, setActiveCategory] = useState('Всі');

  const filtered = activeCategory === 'Всі'
    ? BAZAAR_ITEMS
    : BAZAAR_ITEMS.filter(i => i.category === activeCategory);

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-[#f1f2f6]">
      
      {/* Скрол-контейнер для контенту */}
      <div
        className="flex-1 min-h-0 pb-28 overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 pt-14 pb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none cursor-pointer"
          >
            <BackIcon />
          </button>
          <span className="font-bold text-[22px] text-[#012A81]">Барахолка</span>
          <div className="w-9" />
        </div>

        {/* Підзаголовок */}
        <p className="px-6 pb-5 text-[13px] font-semibold text-[#718096]">
          продавай, купуй, обмінюйся
        </p>

        {/* НОВІ КАТЕГОРІЇ (Стиль чіпсів з HomeScreen) */}
        <div className="px-6 pb-5">
          <div 
            className="flex gap-2.5 overflow-x-auto whitespace-nowrap" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '4px' }}
          >
            {BAZAAR_CATEGORIES.map(cat => (
              <FilterChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>

        {/* СІТКА ТОВАРІВ */}
        <div className="grid grid-cols-2 gap-3 px-6">
          {filtered.map(item => (
            <BazaarCard key={item.id} item={item} />
          ))}
        </div>

        {/* Якщо товарів у категорії немає */}
        {filtered.length === 0 && (
          <div className="flex items-center justify-center px-6 py-20">
            <p className="text-[#8a9ab8] text-[15px] font-medium text-center">
              У цій категорії поки немає оголошень
            </p>
          </div>
        )}

      </div>

      {/* BOTTOM NAV */}
      <div className="relative z-10">
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'home') { onBack?.(); return; }
            onTabChange(tab);
          }}
        />
      </div>
    </div>
  );
};

export default BazaarScreen;