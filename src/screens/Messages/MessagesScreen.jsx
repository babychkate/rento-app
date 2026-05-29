import { useState, useMemo } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { CHATS } from '../../data/chats';
import BottomNav from '../../components/BottomNav/BottomNav';
import { SearchIcon } from '../../components/Icons/Icons';
import { BellIcon, ProfileIcon } from '../../components/Icons/NavIcons';
import { ChatCard } from '../../components/Cards/ChatCard/ChatCard';
import ChatScreen from '../Chat/ChatScreen';
import { GRADIENTS } from '../../visual effects/headerGradient';

const MessagesScreen = ({ onBack, activeTab, onTabChange, onProfile, onNotifications }) => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [openChat, setOpenChat] = useState(null);

  const firstName = user?.firstName ?? user?.name?.split(' ')[0] ?? 'користувачу';

  const filtered = useMemo(() =>
    CHATS.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  if (openChat) {
    return (
      <ChatScreen
        chat={openChat}
        onBack={() => setOpenChat(null)}
        onGoHome={onBack}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onNotifications={onNotifications}
        onProfile={onProfile}
      />
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col font-montserrat">

      {/* Градієнт + хедер */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{ background: GRADIENTS.homeHeader }} />
        <div className="relative z-10 flex items-center justify-between px-6 pt-20 pb-16 h-35">
          <span className="font-bold text-[24px] text-white leading-none">
            Привіт, {firstName}
          </span>
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

      {/* Скролл-зона */}
      <div className="relative z-10 flex flex-col flex-1 min-h-0 pb-28"
        style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        <p className="px-6 font-semibold text-[22px] text-[#0052FF]">Повідомлення</p>

        <div className="px-6 pt-4 pb-5">
          <div className="relative flex items-center">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Введіть імʼя або роль"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4.5 py-3.5 rounded-full border-[2.5px] border-[#2979ff] bg-[#dde5f6] font-montserrat text-[14px] text-[#0f1e5c] outline-none appearance-none shadow-[inset_0_3px_8px_rgba(41,121,255,0.08),0_4px_14px_rgba(41,121,255,0.15),inset_0_-2px_0_rgba(41,121,255,0.12)] placeholder:text-[#4b5b7e]"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 gap-3">
            <span className="text-[40px]">💬</span>
            <p className="font-bold text-[16px] text-[#012A81] text-center">Нікого не знайдено</p>
            <p className="text-[13px] text-[#718096] text-center">Спробуй змінити запит</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-6">
            {filtered.map(chat => (
              <ChatCard key={chat.id} chat={chat} onClick={() => setOpenChat(chat)} />
            ))}
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

export default MessagesScreen;