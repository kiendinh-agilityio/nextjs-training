import Image from 'next/image';

// import components
import { Heading } from '@/components/common/ui/heading';

interface ProfileHeaderProps {
  avatarUrl: string;
  name: string;
}

const ProfileHeader = ({ avatarUrl, name }: ProfileHeaderProps) => (
  <div className="flex w-full flex-col items-center justify-between rounded-t-xl bg-navy px-8 pb-6 pt-8 md:flex-row">
    <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-orange-400 shadow-lg">
      <Image
        src={avatarUrl}
        alt="Avatar"
        fill
        className="object-cover"
        sizes="96px"
        priority
      />
    </div>
    <div>
      <Heading className="mb-1 text-3xl font-bold text-white">
        Hello, {name}
      </Heading>
      <p className="text-lg text-white opacity-80">Ready for your next meal?</p>
    </div>
  </div>
);

export default ProfileHeader;
