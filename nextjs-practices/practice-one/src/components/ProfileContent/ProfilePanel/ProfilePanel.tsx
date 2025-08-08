'use client';

// import react hooks
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

// import toast
import { toast } from 'sonner';

// import constants
import { ROUTERS } from '@/constants/router';

// import stores
import { useCartStore } from '@/stores/useCartStore';
import { useUserStore } from '@/stores/useUserStore';

// import lib
import { fetchProfile } from '@/lib/get-user-from-api';

// import types
import { User } from '@/types/user';

// import components
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import AccountInfoCard from '../AccountInfoCard/AccountInfoCard';
import ProfileActions from '../ProfileActions/ProfileActions';
import ProfileSkeleton from '../ProfileSkeleton/ProfileSkeleton';

const ProfilePanel = () => {
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const clearCart = useCartStore((state) => state.clearCart);
  const { setProfile: setUserProfile } = useUserStore();

  useEffect(() => {
    const getProfile = async () => {
      if (session?.user?.email) {
        setLoadingProfile(true);
        const { user, error } = await fetchProfile(session.user.email);

        if (error) {
          toast.error(error);
        }

        setProfile(user);

        // Sync to user store for header display
        if (user) {
          setUserProfile({
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
          });
        }

        setLoadingProfile(false);
      }
    };
    getProfile();
  }, [session?.user?.email, setUserProfile]);

  if (status === 'loading' || loadingProfile) {
    return <ProfileSkeleton />;
  }

  if (!profile) return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    clearCart();

    await signOut({ callbackUrl: ROUTERS.HOME });
    setIsLoggingOut(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-base">
      <ProfileHeader avatarUrl={profile.avatar} name={profile.name} />
      <div className="flex flex-col items-center bg-gray-270 px-8 pb-8">
        <div className="flex w-full justify-center">
          <AccountInfoCard
            email={profile.email}
            phone={profile.phone}
            address={profile.address}
          />
        </div>
        <ProfileActions onLogout={handleLogout} isLoggingOut={isLoggingOut} />
      </div>
    </div>
  );
};

export default ProfilePanel;
