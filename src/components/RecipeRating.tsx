import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecipeRatingProps {
  rating: number;
  totalRatings: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RecipeRating = ({ 
  rating, 
  totalRatings, 
  onRate, 
  readonly = false,
  size = 'md' 
}: RecipeRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const handleRate = (newRating: number) => {
    if (readonly) return;
    setUserRating(newRating);
    onRate?.(newRating);
  };

  const displayRating = userRating || rating;
  const showRating = readonly ? displayRating : (hoverRating || displayRating);

  const starSize = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }[size];

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }[size];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover-scale'} transition-smooth`}
            onClick={() => handleRate(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            disabled={readonly}
          >
            <Star
              className={`${starSize} transition-smooth ${
                star <= showRating
                  ? 'fill-accent text-accent'
                  : 'text-muted-foreground'
              }`}
            />
          </button>
        ))}
      </div>
      
      <div className={`${textSize} text-muted-foreground`}>
        {displayRating.toFixed(1)} ({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})
      </div>
      
      {userRating > 0 && !readonly && (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground p-1 h-auto"
          onClick={() => {
            setUserRating(0);
            onRate?.(0);
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
};