import { useAuth } from '../Context/AuthContext';

const HomeScreen = ({ onLogout }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#f1f2f6] font-montserrat px-6 gap-6">
      <h1 className="text-[28px] font-bold text-[#012A81] text-center">
        Головна 🏠
      </h1>
      <p className="text-[16px] text-[#012A81] text-center">
        Привіт, <span className="font-bold">{user?.name}</span>!
      </p>
      <p className="text-[13px] text-gray-500 text-center">
        Категорія: <span className="font-semibold">{user?.category}</span>
      </p>
      <button
        onClick={handleLogout}
        className="mt-8 px-8 py-3 rounded-full bg-[#0052ff] text-white text-[15px] font-semibold"
      >
        Вийти
      </button>
    </div>
  );
};

export default HomeScreen;
