import { createMetadata } from '@/utils/metadata';
import { BASE_URL } from '@/constants/url';
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
