'use client';

import ErrorPage from '@/components/ErrorHandling/ErrorPage';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <ErrorPage
      title="Profile Error"
      message="There was a problem loading your profile. Please try again."
      onRetry={reset}
    />
  );
}
