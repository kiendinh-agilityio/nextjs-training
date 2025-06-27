import { BASE_URL } from '@/constants/url';
import { ROUTERS } from '@/constants/router';
import { Logo } from '@/components/common/ui/logo';
import { Heading } from '@/components/common/ui/heading';
import LoginForm from '@/components/Auth/LoginForm';

import { createMetadata } from '@/utils/metadata';

export const metadata = createMetadata({
  title: 'Login',
  description:
    'Log in to your Order.Uk account to order food and drink, as well as manage your profile."',
  keywords: ['login', 'restaurants', 'user', 'Order.uk'],
  url: `${BASE_URL}${ROUTERS.LOGIN}`,
  imageAlt: 'Order.uk Login',
});

const LoginPage = () => {
  return (
    <div className="px-4 pt-[27px] md:px-[100px]">
      <Logo href="/" src="/images/logo.svg" />
      <div className="border border-muted shadow-base mx-auto mt-60 w-fit rounded-xl p-16">
        <Heading size="md" className="text-primary">
          Welcome
        </Heading>
        <p className="text-md font-bold text-[#a0aec0] my-[15px]">
          Enter your email and password to log in
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
