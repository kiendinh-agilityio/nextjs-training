'use client';

import ErrorPage from '@/components/ErrorHandling/ErrorPage';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <ErrorPage
      title="Product Not Found"
      message="We couldn't find the product you are looking for. Please try again or return to the restaurant list."
      onRetry={reset}
    />
  );
}
