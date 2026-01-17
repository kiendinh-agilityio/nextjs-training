'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';

const AppProvider = ({ children }: { children: ReactNode }) => {
  const { setHasHydrated } = useUserStore();

  useEffect(() => {
    setHasHydrated(true);
  }, [setHasHydrated]);

  return <SessionProvider>{children}</SessionProvider>;
};

export default AppProvider;
