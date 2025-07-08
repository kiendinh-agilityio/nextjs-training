import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductRating = ({
  rating,
  max = 5,
}: {
  rating: number;
  max?: number;
}) => {
  const fullStars = Math.floor(rating);

  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;

  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-1 mt-8')}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          fill="#ffc107"
          stroke="#ffc107"
          className={cn('w-8 h-8')}
        />
      ))}
      {hasHalfStar && (
        <span
          key="half"
          className={cn('relative inline-block w-8 h-8 align-middle')}
        >
          <Star fill="#ffc107" stroke="#ffc107" className={cn('w-8 h-8')} />
          <span
            className={cn('absolute top-0 left-1/2 w-1/2 h-full bg-white')}
            style={{ pointerEvents: 'none' }}
          />
          <Star
            fill="none"
            stroke="#ffc107"
            className={cn('w-8 h-8 absolute top-0 left-0')}
          />
        </span>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          fill="white"
          stroke="#ffc107"
          className={cn('w-8 h-8')}
        />
      ))}
      <span className={cn('ml-2 text-black font-bold')}>
        {rating.toFixed(2)}
      </span>
      <span className={cn('text-gray-500 text-base')}>/5</span>
    </div>
  );
};

export default ProductRating;
