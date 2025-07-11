'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/common/ui/button';
import { Heading } from '@/components/common/ui/heading';
import { Skeleton } from '@/components/common/ui/skeleton';
import { ROUTERS } from '@/constants/router';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/useCartStore';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);

  if (status === 'loading') {
    return (
      <div className="container flex min-h-screen flex-col items-start px-0 pt-12">
        <Skeleton className="mb-8 h-10 w-32 rounded" />
        <div className="mb-6 min-w-[400px] rounded-xl border border-muted bg-white px-8 py-6 shadow-base">
          <Skeleton className="mb-2 h-6 w-20 rounded" />
          <Skeleton className="h-6 w-48 rounded" />
        </div>
        <Skeleton className="h-12 w-[140px] rounded-md px-6 py-2" />
      </div>
    );
  }

  if (!session || !session.user?.email) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    clearCart();
    try {
      await signOut({ callbackUrl: ROUTERS.HOME });
    } catch {
      toast.error('Failed to log out. Please try again.');

      setIsLoggingOut(false);
    }
  };

  return (
    <div className="container flex min-h-screen flex-col items-start pt-12 sm:px-0">
      <Heading as="h1" size="md" className="mb-8">
        Profile
      </Heading>
      <div
        className={cn(
          'mb-6 min-w-[400px] px-8 py-6',
          'rounded-xl border border-muted bg-white shadow-base',
        )}
      >
        <p className="mb-2 text-lg font-bold">Email</p>
        <p className="text-base text-gray-500">{session.user.email}</p>
      </div>
      <Button
        variant="primary"
        type="submit"
        className="rounded-md px-6 py-2"
        ariaLabel="Logout"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  );
};

export default ProfilePage;
