import { create } from 'zustand';

export interface User {
  name: string;
  email: string;
  avatarColor: string;
  initials: string;
}

interface AuthState {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

// Helper to generate a random nice HSL color for the user avatar
const getRandomAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash % 360);
  return `hsl(${h}, 65%, 45%)`;
};

// Helper to extract initials
const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return 'U';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const useAuthStore = create<AuthState>((set) => {
  // Load initial user from localStorage if available
  const storedUser = localStorage.getItem('matisse_auth_user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: initialUser,
    login: (name, email) => {
      const initials = getInitials(name || 'User');
      const avatarColor = getRandomAvatarColor(name || 'User');
      const newUser = {
        name: name || 'Demo User',
        email: email || 'user@example.com',
        avatarColor,
        initials,
      };
      localStorage.setItem('matisse_auth_user', JSON.stringify(newUser));
      set({ user: newUser });
    },
    logout: () => {
      localStorage.removeItem('matisse_auth_user');
      set({ user: null });
    },
  };
});
