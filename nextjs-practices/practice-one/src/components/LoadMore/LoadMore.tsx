'use client';

import { useState } from 'react';
import { LoadMoreProps } from '@/types/common';
import { Button } from '@/components/common/ui/button';

const LoadMore = <T,>({
  items,
  renderItem,
  step = 3,
  initialCount = 3,
  buttonText = 'Load More',
  className = '',
}: LoadMoreProps<T>) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const canLoadMore = visibleCount < items.length;

  const handleLoadMore = () =>
    setVisibleCount((c) => Math.min(c + step, items.length));

  return (
    <div className={className}>
      {items.slice(0, visibleCount).map(renderItem)}
      {canLoadMore && (
        <Button
          ariaLabel={buttonText}
          onClick={handleLoadMore}
          className="mx-auto mb-32 flex w-[250px] rounded-xl lg:mb-0"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default LoadMore;
