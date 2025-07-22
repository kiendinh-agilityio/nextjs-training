'use client';

import ErrorPage from '@/components/ErrorHandling/ErrorPage';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <ErrorPage
      title="Cart Error"
      message="There was a problem loading your cart. Please try again."
      onRetry={reset}
    />
  );
}
