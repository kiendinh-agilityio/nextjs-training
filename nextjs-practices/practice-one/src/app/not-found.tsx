import Link from 'next/link';

// import icons
import { AlertTriangle } from 'lucide-react';

// import components
import { Heading } from '@/components/common/ui/heading';
import { Button } from '@/components/common/ui/button';

const NotFound = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-8">
    <AlertTriangle className="text-destructive mb-8 h-16 w-16" />
    <Heading size="md" className="mb-8 text-error">
      404 - Page Not Found
    </Heading>
    <p className="mb-8 max-w-[500px] text-center text-lg font-semiBold text-gray-450">
      Sorry, we couldn’t find the page you’re looking for. It might have been
      moved, deleted, or you entered the wrong URL.
    </p>
    <div className="flex gap-4">
      <Link href="/">
        <Button
          className="rounded-xl bg-blue-600 px-8 py-2 text-white transition hover:bg-blue-700 lg:w-[243px]"
          ariaLabel="Button Go Home"
        >
          Go Home
        </Button>
      </Link>
      <Link href="/restaurant">
        <Button
          className="rounded-xl bg-gray-200 px-8 py-2 text-gray-800 transition hover:bg-gray-300"
          ariaLabel="Button Browse Restaurants"
        >
          Browse Restaurants
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
