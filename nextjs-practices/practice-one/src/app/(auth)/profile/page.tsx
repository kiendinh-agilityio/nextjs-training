// import function utils
import { createMetadata } from '@/utils/metadata';

// import constants
import { BASE_URL } from '@/constants/url';

// import components
import ProfileContent from '@/components/ProfileContent/ProfileContent';

export const metadata = createMetadata({
  title: 'Profile',
  description: 'View and manage your user profile on Order.uk',
  keywords: ['profile', 'user', 'account', 'Order.uk'],
  url: `${BASE_URL}/profile`,
  imageAlt: 'OrderUk Profile',
  type: 'profile',
});

const ProfilePage = () => <ProfileContent />;

export default ProfilePage;
