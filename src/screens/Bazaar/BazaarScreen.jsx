import BottomNav from '../../components/BottomNav/BottomNav';
import { useState } from 'react';
import { BackIcon } from '../../components/Icons/Icons';

// ─── ДАНІ ТОВАРІВ ─────────────────────────────────────────────────────────

const CATEGORIES = ['Всі', 'Меблі', 'Техніка', 'Декор', 'Кухня', 'Текстиль'];

const ITEMS = [
  {
    id: 'b1',
    title: 'Диван-ліжко',
    price: '$120',
    city: 'Львів',
    category: 'Меблі',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
    badge: 'Нове',
  },
  {
    id: 'b2',
    title: 'Мікрохвильовка',
    price: '$45',
    city: 'Київ',
    category: 'Техніка',
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=400&q=80',
    badge: null,
  },
  {
    id: 'b3',
    title: 'Настільна лампа',
    price: '$18',
    city: 'Одеса',
    category: 'Декор',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80',
    badge: null,
  },
  {
    id: 'b4',
    title: 'Комплект постільної білизни',
    price: '$30',
    city: 'Львів',
    category: 'Текстиль',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80',
    badge: 'Хіт',
  },
  {
    id: 'b5',
    title: 'Кухонний стіл',
    price: '$85',
    city: 'Київ',
    category: 'Меблі',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=400&q=80',
    badge: null,
  },
  {
    id: 'b6',
    title: 'Кавоварка',
    price: '$55',
    city: 'Харків',
    category: 'Техніка',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400&q=80',
    badge: 'Нове',
  },
  {
    id: 'b7',
    title: 'Дзеркало кругле',
    price: '$40',
    city: 'Одеса',
    category: 'Декор',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=400&q=80',
    badge: null,
  },
  {
    id: 'b8',
    title: 'Стілець офісний',
    price: '$70',
    city: 'Львів',
    category: 'Меблі',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80',
    badge: null,
  },
  {
    id: 'b9',
    title: 'Килим 2×3м',
    price: '$60',
    city: 'Тернопіль',
    category: 'Текстиль',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80',
    badge: 'Торг',
  },
  {
    id: 'b10',
    title: 'Набір посуду',
    price: '$35',
    city: 'Харків',
    category: 'Кухня',
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=400&q=80',
    badge: null,
  },
  {
    id: 'b12',
    title: 'Полиця настінна',
    price: '$28',
    city: 'Львів',
    category: 'Декор',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
    badge: null,
  },
];

// ─── ЛОКАЛЬНИЙ КОМПОНЕНТ ЧІПСА (Аналог FilterChip з вашого проекту) ──────

const BazaarFilterChip = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[13px] font-bold border-none cursor-pointer transition-all duration-200 select-none ${
        active
          ? 'text-white shadow-[0_4px_12px_rgba(41,121,255,0.35),inset_0_1.5px_0_rgba(255,255,255,0.4)]'
          : 'text-[#4b5b7e] bg-[#dde5f6] shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)] hover:bg-[#d2dcef]'
      }`}
      style={{
        background: active
          ? 'linear-gradient(135deg, #60aaff 0%, #2979ff 35%, #1a5fff 70%, #0040dd 100%)'
          : undefined,
      }}
    >
      {label}
    </button>
  );
};

// ─── КАРТКА ТОВАРУ ────────────────────────────────────────────────────────

const ItemCard = ({ item }) => (
  <div
    className="bg-white rounded-[20px] overflow-hidden transition-transform duration-200 active:scale-[0.98]"
    style={{ boxShadow: '0 4px 14px rgba(0,30,140,0.06)' }}
  >
    {/* Фото */}
    <div className="relative w-full" style={{ paddingBottom: '75%' }}>
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {item.badge && (
        <span
          className="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg"
          style={{ background: 'linear-gradient(135deg,#0052FF,#3b82f6)' }}
        >
          {item.badge}
        </span>
      )}
    </div>

    {/* Інфо */}
    <div className="px-3 py-2.5">
      <p className="font-bold text-[13px] text-[#012A81] leading-tight truncate">
        {item.title}
      </p>
      <div className="flex items-center justify-between mt-1">
        <span className="font-extrabold text-[15px] text-[#0052FF]">{item.price}</span>
        <span className="text-[11px] text-[#a0aec0] font-medium">{item.city}</span>
      </div>
    </div>
  </div>
);

// ─── ГОЛОВНИЙ КОМПОНЕНТ ────────────────────────────────────────────────────

const BazaarScreen = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [activeCategory, setActiveCategory] = useState('Всі');

  const filtered = activeCategory === 'Всі'
    ? ITEMS
    : ITEMS.filter(i => i.category === activeCategory);

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat bg-[#f1f2f6] overflow-hidden">
      
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
            {CATEGORIES.map(cat => (
              <BazaarFilterChip
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
            <ItemCard key={item.id} item={item} />
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
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-transparent">
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'home') { onBack?.(); return; }
            setActiveTab(tab);
          }}
        />
      </div>
    </div>
  );
};

export default BazaarScreen;