import { createContext, useContext, useState, useCallback } from 'react';

// ─── CONTEXT ────────────────────────────────────────────────────────────────

const FavoritesContext = createContext(null);

// ─── PROVIDER ───────────────────────────────────────────────────────────────

export const FavoritesProvider = ({ children }) => {
  // Зберігаємо Set id-шників для кожної категорії
  const [likedProperties, setLikedProperties] = useState(new Set());
  const [likedLandlords, setLikedLandlords]   = useState(new Set());
  const [likedRoommates, setLikedRoommates]   = useState(new Set());

  const toggleProperty = useCallback((id) => {
    setLikedProperties(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleLandlord = useCallback((id) => {
    setLikedLandlords(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleRoommate = useCallback((id) => {
    setLikedRoommates(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return (
    <FavoritesContext.Provider value={{
      likedProperties,
      likedLandlords,
      likedRoommates,
      toggleProperty,
      toggleLandlord,
      toggleRoommate,
      isPropertyLiked:  (id) => likedProperties.has(id),
      isLandlordLiked:  (id) => likedLandlords.has(id),
      isRoommateLiked:  (id) => likedRoommates.has(id),
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// ─── HOOK ────────────────────────────────────────────────────────────────────

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider');
  return ctx;
};

export default FavoritesContext;
