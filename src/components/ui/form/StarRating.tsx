import React, { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  totalStars?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating = ({
  totalStars = 5,
  initialRating = 0,
  onRatingChange,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRating = (currentRating: number) => {
    setRating(currentRating);
    if (onRatingChange) {
      onRatingChange(currentRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            className={`transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full p-1 ${
              starValue <= (hover || rating)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            aria-label={`Rate ${starValue} out of ${totalStars} stars`}
          >
            <Star
              size={24}
              fill={starValue <= (hover || rating) ? "currentColor" : "none"}
              strokeWidth={2}
            />
          </button>
        );
      })}
      <span className="ml-2 text-sm text-gray-600 font-medium">
        {rating > 0 ? `${rating} / ${totalStars}` : "Click to rate"}
      </span>
    </div>
  );
};

export default StarRating;
