import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/stores/useUserStore';
import { fetchProfile } from '@/lib/get-user-from-api';

export const useUserProfile = () => {
  const { data: session, status } = useSession();
  const { profile, setProfile, clearProfile } = useUserStore();

  useEffect(() => {
    const syncUserProfile = async () => {
      if (!session?.user?.email) {
        clearProfile();
        return;
      }

      if (profile && profile.email === session.user.email) {
        return;
      }

      const { user } = await fetchProfile(session.user.email);

      if (user) {
        setProfile({
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        });
      }
    };

    if (status === 'authenticated' && session?.user?.email) {
      syncUserProfile();
    } else if (status === 'unauthenticated') {
      clearProfile();
    }
  }, [session?.user?.email, status, profile, setProfile, clearProfile]);

  return { profile, status };
};
