import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

interface UserStore {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        profile: state.profile,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          state?.setHasHydrated?.(false);
        } else {
          state?.setHasHydrated?.(true);
        }
      },
    },
  ),
);
