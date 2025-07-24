import { Star } from 'lucide-react';
import { getRatingStars } from '@/utils/getRatingStars';

const ProductRating = ({
  rating,
  max = 5,
}: {
  rating: number;
  max?: number;
}) => {
  const { fullStarCount, hasHalfStar, emptyStarCount } = getRatingStars(
    rating,
    max,
  );

  return (
    <div className="mt-8 flex items-center gap-1">
      {Array.from({ length: fullStarCount }).map((_, i) => (
        <Star
          key={`full-${i}`}
          fill="#ffc107"
          stroke="#ffc107"
          className="h-8 w-8"
        />
      ))}
      {hasHalfStar && (
        <span key="half" className="relative inline-block h-8 w-8 align-middle">
          <Star fill="#ffc107" stroke="#ffc107" className="h-8 w-8" />
          <span
            className="absolute left-1/2 top-0 h-full w-1/2 bg-white"
            style={{ pointerEvents: 'none' }}
          />
          <Star
            fill="none"
            stroke="#ffc107"
            className="absolute left-0 top-0 h-8 w-8"
          />
        </span>
      )}
      {Array.from({ length: emptyStarCount }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          fill="white"
          stroke="#ffc107"
          className="h-8 w-8"
        />
      ))}
      <span className="ml-2 font-bold text-black">{rating.toFixed(2)}</span>
      <span className="text-base text-gray-500">/5</span>
    </div>
  );
};

export default ProductRating;
