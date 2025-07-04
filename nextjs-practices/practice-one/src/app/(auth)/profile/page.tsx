'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/common/ui/button';
import { Heading } from '@/components/common/ui/heading';
import { Skeleton } from '@/components/common/ui/skeleton';
import { ROUTERS } from '@/constants/router';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (status === 'loading') {
    return (
      <div className="container px-0 min-h-screen flex flex-col items-start pt-12">
        <Skeleton className="mb-8 h-10 w-32 rounded" />
        <div className="bg-white rounded-xl border border-muted shadow-base px-8 py-6 mb-6 min-w-[400px]">
          <Skeleton className="h-6 w-20 mb-2 rounded" />
          <Skeleton className="h-6 w-48 rounded" />
        </div>
        <Skeleton className="px-6 py-2 rounded-md w-[140px] h-12" />
      </div>
    );
  }

  if (!session || !session.user?.email) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await signOut({ callbackUrl: ROUTERS.HOME });
    } catch {
      toast.error('Failed to log out. Please try again.');

      setIsLoggingOut(false);
    }
  };

  return (
    <div className="container px-0 min-h-screen flex flex-col items-start pt-12">
      <Heading as="h1" size="md" className="mb-8">
        Profile
      </Heading>
      <div className="bg-white rounded-xl border border-muted shadow-base px-8 py-6 mb-6 min-w-[400px]">
        <p className="font-bold text-lg mb-2">Email</p>
        <p className="text-gray-500 text-base">{session.user.email}</p>
      </div>
      <Button
        variant="primary"
        type="submit"
        className="px-6 py-2 rounded-md"
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
