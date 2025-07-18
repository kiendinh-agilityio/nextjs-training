import Link from 'next/link';
import { toast } from 'sonner';
import { ROUTERS } from '@/constants/router';

const LoginToast = () => {
  toast(
    <div className="text-secondary">
      You need to{' '}
      <Link href={ROUTERS.LOGIN} className="font-bold text-primary underline">
        log in
      </Link>{' '}
      to add or remove products from your cart.
    </div>,
    { duration: 3000 },
  );
};

export default LoginToast;
