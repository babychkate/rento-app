import {
  NavHomeIcon, NavMessagesIcon, NavFavIcon,
  NavCommunityIcon, NavTinderIcon,
} from '../Icons/NavIcons';

const NAV_ITEMS = [
  { id: 'home',      Icon: NavHomeIcon    },
  { id: 'messages',    Icon: NavMessagesIcon  },
  { id: 'favorites', Icon: NavFavIcon     },
  { id: 'community',   Icon: NavCommunityIcon },
  { id: 'tinder',     Icon: NavTinderIcon   },
];

const BottomNav = ({ activeTab, onTabChange }) => (
  <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-6">
    <div className="w-full max-w-85.5 h-16 flex justify-between items-center
      bg-[rgba(130,170,255,0.75)] backdrop-blur-[20px]
      rounded-4xl border border-white/40
      shadow-[0_8px_24px_rgba(41,121,255,0.15)]
      px-1.5">
      {NAV_ITEMS.map(({ id, Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className="flex-1 flex items-center justify-center h-full bg-transparent border-none cursor-pointer"
        >
          <Icon active={activeTab === id} />
        </button>
      ))}
    </div>
  </div>
);

export default BottomNav;
