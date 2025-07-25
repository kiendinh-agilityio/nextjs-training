import { Heading } from '@/components/common/ui/heading';
import ProfilePanel from '@/components/ProfileContent/ProfilePanel/ProfilePanel';

const ProfileContent = () => {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-start pt-12 sm:px-0">
      <Heading as="h1" size="lg" className="mb-12">
        Profile
      </Heading>
      <ProfilePanel />
    </div>
  );
};

export default ProfileContent;
