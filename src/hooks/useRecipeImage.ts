import { useState, useEffect } from 'react';
import { getRecipeImageUrl, DEFAULT_RECIPE_IMAGE } from '@/services/recipeImageService';

export const useRecipeImage = (title: string, ingredients: string[]) => {
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_RECIPE_IMAGE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true);
        const url = await getRecipeImageUrl(title, ingredients);
        setImageUrl(url);
      } catch (error) {
        console.error('Failed to load recipe image:', error);
        setImageUrl(DEFAULT_RECIPE_IMAGE);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [title, ingredients]);

  return { imageUrl, isLoading };
};