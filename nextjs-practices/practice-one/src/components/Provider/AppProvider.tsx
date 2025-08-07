'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const AppProvider = ({ children }: { children: ReactNode }) => (
  <SessionProvider>{children}</SessionProvider>
);

export default AppProvider;
