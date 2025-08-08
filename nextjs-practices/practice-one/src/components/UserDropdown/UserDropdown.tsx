'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// import icon
import { ChevronDownIcon } from 'lucide-react';

// import constants
import { ROUTERS } from '@/constants/router';

// import store
import { useUserStore } from '@/stores/useUserStore';

// import components
import { Button } from '@/components/common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';

const UserDropdown = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { profile, clearProfile } = useUserStore();

  const handleProfileClick = () => router.push(ROUTERS.PROFILE);

  const handleLogout = async () => {
    clearProfile();

    await signOut({ callbackUrl: ROUTERS.HOME });
  };

  if (!session?.user?.email || !profile) {
    return null;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex w-[202px] items-center gap-2 rounded-full px-[25px] py-[17px]"
          ariaLabel="User menu"
          variant="secondary"
        >
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={30}
              height={30}
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-secondary">
              {profile.name.charAt(0).toUpperCase()}
            </span>
          )}
          <span className="hidden font-medium lg:block">{profile.name}</span>
          <ChevronDownIcon className="h-4 w-4 transition-transform" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-50 w-48 border border-gray-200 bg-white shadow-xl"
        align="end"
        sideOffset={8}
        avoidCollisions={true}
        collisionPadding={8}
      >
        <DropdownMenuLabel className="bg-white px-4 py-2">
          <p className="text-sm font-medium text-gray-900">{profile.name}</p>
          <p className="text-xs text-gray-500">{profile.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfileClick}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
