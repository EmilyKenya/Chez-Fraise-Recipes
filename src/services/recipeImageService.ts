export const generateRecipeImagePrompt = (title: string, ingredients: string[]): string => {
  // Create a detailed prompt for food photography
  const mainIngredients = ingredients.slice(0, 3).join(', ');
  
  const prompt = `Professional food photography of ${title}, featuring ${mainIngredients}. 
    Beautifully plated dish with vibrant colors, appetizing presentation, 
    natural lighting, shallow depth of field, restaurant quality, 
    clean background, high resolution, mouth-watering, 
    professional culinary photography style, 16:9 aspect ratio`;
    
  return prompt;
};

export const getRecipeImageUrl = async (title: string, ingredients: string[]): Promise<string | null> => {
  // For now, return null to use the default chef hat icon
  // This can be enhanced with actual AI image generation service
  return null;
};

// Placeholder high-quality recipe images URLs
export const RECIPE_PLACEHOLDER_IMAGES: Record<string, string> = {
  'Classic Chicken Stir-Fry': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop&crop=center',
  'Creamy Tomato Pasta': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
  'Beef and Mushroom Stroganoff': 'https://images.unsplash.com/photo-1619740455993-d4e26f8d0c29?w=800&h=600&fit=crop&crop=center',
  'Mediterranean Fish Bake': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop&crop=center',
  'Vegetarian Fried Rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop&crop=center',
  'Cheese and Herb Omelette': 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&h=600&fit=crop&crop=center',
  'Spicy Potato Curry': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop&crop=center',
  'Grilled Chicken Salad': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop&crop=center',
  'Ugali': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&h=600&fit=crop&crop=center',
  'Sukuma Wiki (Collard Greens)': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&h=600&fit=crop&crop=center',
  'Kenyan Chapati': 'https://images.unsplash.com/photo-1574653336275-3333d6cf8e9e?w=800&h=600&fit=crop&crop=center',
  'Githeri': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&h=600&fit=crop&crop=center',
  'Kenyan Pilau': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop&crop=center',
  'Mandazi': 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=600&fit=crop&crop=center'
};