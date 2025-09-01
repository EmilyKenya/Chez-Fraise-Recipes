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
    matchedIngredients: [],
    instructions: [
      'Cut chicken into bite-sized pieces and season with salt and pepper.',
      'Heat oil in a large wok or skillet over high heat.',
      'Add chicken and cook for 3-4 minutes until golden brown.',
      'Add garlic and ginger, stir-fry for 30 seconds until fragrant.',
      'Add bell peppers and onions, cook for 2-3 minutes until crisp-tender.',
      'Pour in soy sauce and toss everything together.',
      'Serve immediately over rice or noodles.'
    ]
  },
  {
    id: '2',
    title: 'Creamy Tomato Pasta',
    description: 'Rich and creamy pasta dish with fresh tomatoes, herbs, and parmesan cheese.',
    ingredients: ['pasta', 'tomatoes', 'cream', 'cheese', 'garlic', 'herbs', 'olive oil'],
    cookingTime: 25,
    difficulty: 'Easy',
    servings: 4,
    matchedIngredients: [],
    instructions: [
      'Cook pasta according to package directions until al dente.',
      'Heat olive oil in a large pan over medium heat.',
      'Add minced garlic and cook for 1 minute until fragrant.',
      'Add diced tomatoes and cook for 5 minutes until softened.',
      'Pour in cream and simmer for 3-4 minutes.',
      'Add cooked pasta and toss to combine.',
      'Stir in grated cheese and fresh herbs.',
      'Season with salt and pepper to taste.'
    ]
  },
  {
    id: '3',
    title: 'Beef and Mushroom Stroganoff',
    description: 'Tender beef strips in a rich mushroom cream sauce served over rice or noodles.',
    ingredients: ['beef', 'mushrooms', 'onions', 'cream', 'flour', 'butter', 'herbs'],
    cookingTime: 35,
    difficulty: 'Medium',
    servings: 6,
    matchedIngredients: [],
    instructions: [
      'Cut beef into thin strips and season with salt and pepper.',
      'Heat butter in a large skillet over medium-high heat.',
      'Brown beef strips in batches, about 2-3 minutes per side.',
      'Remove beef and set aside.',
      'Add sliced mushrooms and onions to the same pan.',
      'Cook for 5-6 minutes until vegetables are softened.',
      'Sprinkle flour over vegetables and cook for 1 minute.',
      'Gradually add cream, stirring constantly.',
      'Return beef to pan and simmer for 10 minutes.',
      'Stir in fresh herbs and serve over rice or noodles.'
    ]
  },
  {
    id: '4',
    title: 'Mediterranean Fish Bake',
    description: 'Fresh fish fillets baked with tomatoes, olives, and Mediterranean herbs.',
    ingredients: ['fish', 'tomatoes', 'olives', 'onions', 'herbs', 'olive oil', 'lemon'],
    cookingTime: 30,
    difficulty: 'Medium',
    servings: 4,
    matchedIngredients: [],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Place fish fillets in a baking dish.',
      'Drizzle with olive oil and lemon juice.',
      'Top with sliced tomatoes, onions, and olives.',
      'Sprinkle with Mediterranean herbs and season with salt and pepper.',
      'Bake for 20-25 minutes until fish flakes easily.',
      'Garnish with fresh herbs and serve immediately.'
    ]
  },
  {
    id: '5',
    title: 'Vegetarian Fried Rice',
    description: 'Colorful fried rice packed with vegetables and scrambled eggs.',
    ingredients: ['rice', 'eggs', 'carrots', 'peas', 'onions', 'soy sauce', 'oil'],
    cookingTime: 20,
    difficulty: 'Easy',
    servings: 4,
    matchedIngredients: [],
    instructions: [
      'Cook rice according to package directions and let cool.',
      'Beat eggs in a bowl and scramble in a hot pan with oil.',
      'Remove eggs and set aside.',
      'Add more oil to pan and sauté diced carrots for 3 minutes.',
      'Add onions and cook for 2 minutes until softened.',
      'Add peas and cook for 1 minute.',
      'Add cold rice and stir-fry for 3-4 minutes.',
      'Return scrambled eggs to pan and add soy sauce.',
      'Toss everything together and serve hot.'
    ]
  },
  {
    id: '6',
    title: 'Cheese and Herb Omelette',
    description: 'Fluffy omelette filled with melted cheese and fresh herbs.',
    ingredients: ['eggs', 'cheese', 'herbs', 'butter', 'milk'],
    cookingTime: 10,
    difficulty: 'Easy',
    servings: 2,
    matchedIngredients: [],
    instructions: [
      'Beat eggs with milk and a pinch of salt in a bowl.',
      'Heat butter in a non-stick pan over medium heat.',
      'Pour in beaten eggs and let them set for 30 seconds.',
      'Gently push cooked edges toward center, tilting pan.',
      'When eggs are almost set, add cheese and herbs to one half.',
      'Fold omelette in half and slide onto plate.',
      'Serve immediately while hot and fluffy.'
    ]
  },
  {
    id: '7',
    title: 'Spicy Potato Curry',
    description: 'Hearty curry with tender potatoes in a rich, spiced tomato sauce.',
    ingredients: ['potatoes', 'tomatoes', 'onions', 'garlic', 'spices', 'oil', 'herbs'],
    cookingTime: 40,
    difficulty: 'Medium',
    servings: 6,
    matchedIngredients: [],
    instructions: [
      'Peel and cube potatoes into bite-sized pieces.',
      'Heat oil in a large pot over medium heat.',
      'Add onions and cook until golden brown, about 5 minutes.',
      'Add garlic and spices, cook for 1 minute until fragrant.',
      'Add diced tomatoes and cook for 5 minutes until softened.',
      'Add potatoes and enough water to cover.',
      'Bring to a boil, then reduce heat and simmer for 20 minutes.',
      'Cook until potatoes are tender and sauce has thickened.',
      'Garnish with fresh herbs and serve with rice or bread.'
    ]
  },
  {
    id: '8',
    title: 'Grilled Chicken Salad',
    description: 'Fresh mixed greens topped with grilled chicken and seasonal vegetables.',
    ingredients: ['chicken', 'lettuce', 'tomatoes', 'cucumber', 'onions', 'olive oil'],
    cookingTime: 20,
    difficulty: 'Easy',
    servings: 2,
    matchedIngredients: [],
    instructions: [
      'Season chicken breasts with salt, pepper, and herbs.',
      'Preheat grill or grill pan to medium-high heat.',
      'Grill chicken for 6-7 minutes per side until cooked through.',
      'Let chicken rest for 5 minutes, then slice.',
      'Wash and chop lettuce, tomatoes, cucumber, and onions.',
      'Arrange salad vegetables on plates.',
      'Top with sliced grilled chicken.',
      'Drizzle with olive oil and your favorite dressing.'
    ]
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