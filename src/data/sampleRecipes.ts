import { Recipe } from '@/components/RecipeCard';

export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Classic Chicken Stir-Fry',
    description: 'Quick and healthy stir-fry with fresh vegetables and tender chicken in a savory sauce.',
    ingredients: ['chicken', 'bell peppers', 'onions', 'garlic', 'soy sauce', 'oil', 'ginger'],
    cookingTime: 15,
    difficulty: 'Easy',
    servings: 4,
    matchedIngredients: []
  },
  {
    id: '2',
    title: 'Creamy Tomato Pasta',
    description: 'Rich and creamy pasta dish with fresh tomatoes, herbs, and parmesan cheese.',
    ingredients: ['pasta', 'tomatoes', 'cream', 'cheese', 'garlic', 'herbs', 'olive oil'],
    cookingTime: 25,
    difficulty: 'Easy',
    servings: 4,
    matchedIngredients: []
  },
  {
    id: '3',
    title: 'Beef and Mushroom Stroganoff',
    description: 'Tender beef strips in a rich mushroom cream sauce served over rice or noodles.',
    ingredients: ['beef', 'mushrooms', 'onions', 'cream', 'flour', 'butter', 'herbs'],
    cookingTime: 35,
    difficulty: 'Medium',
    servings: 6,
    matchedIngredients: []
  },
  {
    id: '4',
    title: 'Mediterranean Fish Bake',
    description: 'Fresh fish fillets baked with tomatoes, olives, and Mediterranean herbs.',
    ingredients: ['fish', 'tomatoes', 'olives', 'onions', 'herbs', 'olive oil', 'lemon'],
    cookingTime: 30,
    difficulty: 'Medium',
    servings: 4,
    matchedIngredients: []
  },
  {
    id: '5',
    title: 'Vegetarian Fried Rice',
    description: 'Colorful fried rice packed with vegetables and scrambled eggs.',
    ingredients: ['rice', 'eggs', 'carrots', 'peas', 'onions', 'soy sauce', 'oil'],
    cookingTime: 20,
    difficulty: 'Easy',
    servings: 4,
    matchedIngredients: []
  },
  {
    id: '6',
    title: 'Cheese and Herb Omelette',
    description: 'Fluffy omelette filled with melted cheese and fresh herbs.',
    ingredients: ['eggs', 'cheese', 'herbs', 'butter', 'milk'],
    cookingTime: 10,
    difficulty: 'Easy',
    servings: 2,
    matchedIngredients: []
  },
  {
    id: '7',
    title: 'Spicy Potato Curry',
    description: 'Hearty curry with tender potatoes in a rich, spiced tomato sauce.',
    ingredients: ['potatoes', 'tomatoes', 'onions', 'garlic', 'spices', 'oil', 'herbs'],
    cookingTime: 40,
    difficulty: 'Medium',
    servings: 6,
    matchedIngredients: []
  },
  {
    id: '8',
    title: 'Grilled Chicken Salad',
    description: 'Fresh mixed greens topped with grilled chicken and seasonal vegetables.',
    ingredients: ['chicken', 'lettuce', 'tomatoes', 'cucumber', 'onions', 'olive oil'],
    cookingTime: 20,
    difficulty: 'Easy',
    servings: 2,
    matchedIngredients: []
  }
];

export const generateAIRecipeSuggestions = (ingredients: string[]): Recipe[] => {
  // Simulate AI recipe generation based on ingredients
  if (ingredients.length === 0) return SAMPLE_RECIPES;
  
  return SAMPLE_RECIPES.map(recipe => ({
    ...recipe,
    matchedIngredients: recipe.ingredients.filter(ingredient => 
      ingredients.some(selected => 
        selected.toLowerCase().includes(ingredient.toLowerCase()) ||
        ingredient.toLowerCase().includes(selected.toLowerCase())
      )
    )
  })).sort((a, b) => b.matchedIngredients.length - a.matchedIngredients.length);
};