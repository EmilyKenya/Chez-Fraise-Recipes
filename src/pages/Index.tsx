import { useState, useMemo, useEffect } from 'react';
import { Search, ChefHat, Sparkles, ShoppingCart, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IngredientSelector } from '@/components/IngredientSelector';
import { RecipeCard, Recipe } from '@/components/RecipeCard';
import { RecipeModal } from '@/components/RecipeModal';
import { AdvancedFilters, FilterOptions } from '@/components/AdvancedFilters';
import { ShoppingList } from '@/components/ShoppingList';
import { AuthForm } from '@/components/AuthForm';
import { UserMenu } from '@/components/UserMenu';
import { generateAIRecipeSuggestions } from '@/data/sampleRecipes';
import { useAuth } from '@/hooks/useAuth';
import heroImage from '@/assets/hero-ingredients.jpg';

const Index = () => {
  const { user, loading } = useAuth();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    maxCookingTime: 120,
    difficulty: [],
    servings: [],
    dietaryRestrictions: [],
    sortBy: 'match'
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [selectedRecipesForShopping, setSelectedRecipesForShopping] = useState<string[]>([]);

  const recipes = useMemo(() => {
    return generateAIRecipeSuggestions(selectedIngredients, filters);
  }, [selectedIngredients, filters]);

  const filteredRecipes = useMemo(() => {
    if (!searchQuery) return recipes;
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [recipes, searchQuery]);

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const toggleRecipeForShopping = (recipeId: string) => {
    setSelectedRecipesForShopping(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const generateAIRecipes = () => {
    // Simulate AI generation - in real app this would call OpenAI API
    if (selectedIngredients.length > 0) {
      // Recipes are already filtered by ingredients, so just scroll to results
      document.getElementById('recipes-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Auth Sidebar for non-authenticated users */}
      {!user && (
        <div className="fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-md z-50 flex flex-col">
          <div className="p-6 flex-1 flex flex-col justify-center">
            <div className="mb-6 text-center">
              <ChefHat className="h-12 w-12 mx-auto mb-4 text-white animate-float" />
              <h2 className="text-2xl font-bold text-white mb-2">Join Recipe Finder</h2>
              <p className="text-white/80 text-sm">Sign up to save favorites, create shopping lists, and get personalized recommendations</p>
            </div>
            <AuthForm />
            <div className="mt-6 text-center">
              <p className="text-white/60 text-xs">Or continue browsing as a guest →</p>
            </div>
          </div>
        </div>
      )}
      
      {/* User Menu for authenticated users */}
      {user && (
        <div className="absolute top-4 right-4 z-20">
          <UserMenu />
        </div>
      )}

      {/* Main content area */}
      <div className={`${!user ? 'pr-80' : ''} transition-all duration-300`}>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <ChefHat className="h-16 w-16 mx-auto mb-6 animate-float" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Recipe <span className="text-accent">Recommender</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Transform your ingredients into delicious meals with AI-powered recipe suggestions
            </p>
            
            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
              <div className="text-center">
                <Sparkles className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-white/90 text-sm">AI-Powered Recipes</p>
              </div>
              <div className="text-center">
                <ChefHat className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-white/90 text-sm">Smart Matching</p>
              </div>
              <div className="text-center">
                <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-white/90 text-sm">Shopping Lists</p>
              </div>
            </div>
            
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-food"
              onClick={() => document.getElementById('ingredient-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {user ? 'Start Cooking' : 'Try It Now'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            
            {!user && (
              <p className="mt-4 text-white/70 text-sm">No account required to explore</p>
            )}
          </div>
        </section>

        {/* Demo banner for non-authenticated users */}
        {!user && (
          <div className="bg-accent/10 border-b border-accent/20 py-3">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <p className="text-foreground">
                <span className="font-semibold">Demo Mode:</span> Exploring as a guest. 
                <span className="text-accent ml-2">Sign up to save favorites and create shopping lists →</span>
              </p>
            </div>
          </div>
        )}
        
        {/* Ingredient Selection Section - Always visible */}
        <section id="ingredient-section" className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                What's in your kitchen?
              </h2>
              <p className="text-lg text-muted-foreground">
                Select your available ingredients and let AI suggest perfect recipes for you
              </p>
            </div>

              <div className="bg-card rounded-xl p-8 shadow-food">
                <IngredientSelector 
                  selectedIngredients={selectedIngredients}
                  onIngredientsChange={setSelectedIngredients}
                />
                
                {selectedIngredients.length > 0 && (
                  <div className="mt-8 text-center">
                    <Button 
                      onClick={generateAIRecipes}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-semibold"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate AI Recipes ({filteredRecipes.length} found)
                    </Button>
                  </div>
                )}
              </div>

              {/* Advanced Features */}
              {filteredRecipes.length > 0 && (
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  <AdvancedFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    isOpen={isFiltersOpen}
                    onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
                  />
                  <ShoppingList
                    recipes={filteredRecipes}
                    selectedRecipes={selectedRecipesForShopping}
                    onToggleRecipe={toggleRecipeForShopping}
                    isOpen={isShoppingListOpen}
                    onToggle={() => setIsShoppingListOpen(!isShoppingListOpen)}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Recipes Section */}
          {filteredRecipes.length > 0 && (
            <section id="recipes-section" className="py-16 px-6 bg-gradient-subtle">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2 text-foreground">
                      Recipe Suggestions
                    </h2>
                    <p className="text-muted-foreground">
                      {filteredRecipes.length} recipes found • Sorted by ingredient match
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 w-full md:w-80">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe, index) => (
                    <div key={recipe.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <RecipeCard 
                        recipe={recipe} 
                        onViewRecipe={handleViewRecipe}
                        onToggleForShopping={() => toggleRecipeForShopping(recipe.id)}
                        isSelectedForShopping={selectedRecipesForShopping.includes(recipe.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Recipe Modal */}
          <RecipeModal 
            recipe={selectedRecipe}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    );
  };

export default Index;
