import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext   = createContext(null);
const STORAGE_KEY   = 'rento_user';
const ALL_USERS_KEY = 'rento_users';

// ─── helpers ───────────────────────────────────────────────────────────────

const loadCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? null; }
  catch { return null; }
};

const loadAllUsers = () => {
  try { return JSON.parse(localStorage.getItem(ALL_USERS_KEY)) ?? []; }
  catch { return []; }
};

const saveAllUsers = (users) =>
  localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));

const generateId = () =>
  `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

// ─── валідація email ────────────────────────────────────────────────────────

const ALLOWED_DOMAINS = [
  'gmail.com', 'ukr.net', 'i.ua', 'meta.ua', 'ukrpost.ua',
  'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com',
  'lnu.edu.ua', 'lnam.edu.ua', 'kpi.ua', 'nau.edu.ua',
];

const validateEmail = (raw) => {
  const email = raw.trim().toLowerCase();
  if (!email) return 'Введіть email';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Невірний формат email';
  const domain = email.split('@')[1];
  if (!ALLOWED_DOMAINS.includes(domain)) {
    return `Домен @${domain} не підтримується. Використовуйте gmail.com, ukr.net, outlook.com тощо`;
  }
  return null;
};

// ─── валідація пароля ───────────────────────────────────────────────────────

const validatePassword = (password) => {
  if (!password) return 'Введіть пароль';
  if (password.length < 8) return 'Пароль має містити мінімум 8 символів';
  if (!/[0-9]/.test(password)) return 'Пароль має містити хоча б одну цифру';
  if (!/[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(password)) return 'Пароль має містити хоча б одну літеру';
  return null;
};

// ─── provider ──────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadCurrentUser);
  const [pendingUser, setPendingUser] = useState(null);

  const persistUser = useCallback((userData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  }, []);

  const register = useCallback(({ name, email, password, confirm }) => {
    if (!name.trim()) return { ok: false, field: 'name', error: "Введіть ваше ім'я" };

    const emailError = validateEmail(email);
    if (emailError) return { ok: false, field: 'email', error: emailError };

    const passwordError = validatePassword(password);
    if (passwordError) return { ok: false, field: 'password', error: passwordError };

    if (password !== confirm) return { ok: false, field: 'confirm', error: 'Паролі не збігаються' };

    const trimmedEmail = email.trim().toLowerCase();
    const allUsers = loadAllUsers();
    if (allUsers.find((u) => u.email === trimmedEmail)) {
      return { ok: false, field: 'email', error: 'Цей email вже зареєстровано' };
    }

    const newUser = {
      id:        generateId(),
      name:      name.trim(),
      email:     trimmedEmail,
      password,
      category:  null,
      role:      null,
      createdAt: new Date().toISOString(),
    };

    setPendingUser(newUser);
    return { ok: true };
  }, []);

  const confirmRegistration = useCallback((category) => {
    if (!pendingUser) return;
    const finalUser = { ...pendingUser, category };
    const allUsers = loadAllUsers();
    saveAllUsers([...allUsers, finalUser]);
    persistUser(finalUser);
    setPendingUser(null);
  }, [pendingUser, persistUser]);

  const login = useCallback(({ email, password }) => {
    const emailError = validateEmail(email);
    if (emailError) return { ok: false, field: 'email', error: emailError };

    if (!password) return { ok: false, field: 'password', error: 'Введіть пароль' };

    const trimmedEmail = email.trim().toLowerCase();
    const allUsers = loadAllUsers();

    const byEmail = allUsers.find((u) => u.email === trimmedEmail);
    if (!byEmail) {
      return { ok: false, field: 'email', error: 'Акаунт з таким email не знайдено. Спочатку зареєструйтесь' };
    }

    if (byEmail.password !== password) {
      return { ok: false, field: 'password', error: 'Невірний пароль' };
    }

    persistUser(byEmail);
    return { ok: true };
  }, [persistUser]);

  const updateUser = useCallback((fields) => {
    if (!user) return;
    const updated = { ...user, ...fields };
    const allUsers = loadAllUsers();
    saveAllUsers(allUsers.map((u) => (u.id === updated.id ? updated : u)));
    persistUser(updated);
  }, [user, persistUser]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, confirmRegistration, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};