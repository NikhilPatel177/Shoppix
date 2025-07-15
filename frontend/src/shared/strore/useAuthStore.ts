import { create } from 'zustand';
import type { User } from '../types/User.type';

type AuthStore = {
  user: User | null;
  accessToken: string | null;

  setToken: (accesssToken: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  
  setToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  clearAuth: () => set({ accessToken: null, user: null }),
}));
