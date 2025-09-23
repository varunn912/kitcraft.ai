
import type { User } from '../types';

const USERS_KEY = 'kitcraft_users';
const SESSION_KEY = 'kitcraft_session';

const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authService = {
  register: (email: string, password: string): User | null => {
    const users = getUsers();
    if (users.some(user => user.email === email)) {
      return null; // User already exists
    }
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      passwordHash: password, // In a real app, hash this securely.
    };
    saveUsers([...users, newUser]);
    return newUser;
  },

  login: (email: string, password: string): User | null => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.passwordHash === password);
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser: (): User | null => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },
};