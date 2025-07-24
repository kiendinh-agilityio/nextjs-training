export const getRatingStars = (rating: number, maxStars = 5) => {
  const fullStarCount = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStarCount = maxStars - fullStarCount - (hasHalfStar ? 1 : 0);

  return { fullStarCount, hasHalfStar, emptyStarCount };
};
