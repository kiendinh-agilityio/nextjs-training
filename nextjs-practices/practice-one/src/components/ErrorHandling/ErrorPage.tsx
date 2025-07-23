'use client';

import { useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import { Heading } from '@/components/common/ui/heading';
import { Button } from '@/components/common/ui/button';

interface ErrorPageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorPage = ({
  title = 'Oops! Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}: ErrorPageProps) => {
  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-8">
      <AlertTriangle className="text-destructive mb-8 h-16 w-16" />
      <Heading size="md" className="mb-8 text-error">
        {title}
      </Heading>
      <p className="mb-8 max-w-[500px] text-center text-lg font-semiBold text-[#a0aec0]">
        {message}
      </p>
      <div className="flex gap-4">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="rounded-xl bg-blue-600 px-8 py-2 text-white transition hover:bg-blue-700"
            ariaLabel="Button Try Again"
          >
            Try again
          </Button>
        )}
        <Button
          onClick={handleGoBack}
          className="rounded-xl bg-gray-200 px-8 py-2 text-gray-800 transition hover:bg-gray-300"
          ariaLabel="Button Go Back"
        >
          Go back
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
