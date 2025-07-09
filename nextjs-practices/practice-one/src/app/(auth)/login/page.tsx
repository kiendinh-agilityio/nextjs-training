import { BASE_URL } from '@/constants/url';
import { ROUTERS } from '@/constants/router';
import { Heading } from '@/components/common/ui/heading';
import { createMetadata } from '@/utils/metadata';

import LoginForm from '@/components/Auth/LoginForm';

export const metadata = createMetadata({
  title: 'Login',
  description:
    'Log in to your Order.Uk account to order food and drink, as well as manage your profile."',
  keywords: ['login', 'restaurants', 'user', 'Order.uk'],
  url: `${BASE_URL}${ROUTERS.LOGIN}`,
  imageAlt: 'Order.uk Login',
});

const LoginPage = () => (
  <div className="min-h-screen px-4 pt-[27px] md:px-[100px]">
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
      <div className="w-fit rounded-xl border border-muted bg-white p-16 shadow-base lg:w-[578px]">
        <Heading size="md" className="text-primary">
          Welcome
        </Heading>
        <p className="text-md my-[15px] font-bold text-[#a0aec0]">
          Enter your email and password to log in
        </p>
        <LoginForm />
      </div>
    </div>
  </div>
);

export default LoginPage;
