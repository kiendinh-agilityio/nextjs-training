'use client';

import ErrorPage from '@/components/ErrorHandling/ErrorPage';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <ErrorPage
      title="Failed to load restaurant list"
      message="We couldn't fetch the restaurant data. Please try again later."
      onRetry={reset}
    />
  );
}
