'use client';

import Link from 'next/link';

// import icons
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

// import components
import { Heading } from '@/components/common/ui/heading';
import { Button } from '@/components/common/ui/button';

interface ErrorProps {
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-8">
      <AlertTriangle className="text-destructive mb-8 h-16 w-16" />
      <Heading size="md" className="mb-8 text-error">
        Oops! Something went wrong
      </Heading>
      <p className="mb-8 max-w-[500px] text-center text-lg font-semiBold text-gray-450">
        Failed to fetch data. Please try again later!
      </p>
      <div className="flex gap-4">
        <Button
          onClick={reset}
          className="rounded-xl bg-blue-600 px-8 py-2 text-white transition hover:bg-blue-700 lg:w-[243px]"
          ariaLabel="Button Try Again"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Link href="/">
          <Button
            className="rounded-xl bg-gray-200 px-8 py-2 text-gray-800 transition hover:bg-gray-300"
            ariaLabel="Button Go Home"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
