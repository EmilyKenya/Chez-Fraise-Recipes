import { Clock, Users, ChefHat, Heart, ShoppingCart, Check } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RecipeRating } from './RecipeRating';
import { useRecipeImage } from '@/hooks/useRecipeImage';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  cookingTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  image?: string;
  matchedIngredients: string[];
  instructions: string[];
  rating: number;
  totalRatings: number;
  dietaryInfo: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onViewRecipe: (recipe: Recipe) => void;
  onToggleForShopping?: () => void;
  isSelectedForShopping?: boolean;
}

export const RecipeCard = ({ recipe, onViewRecipe, onToggleForShopping, isSelectedForShopping = false }: RecipeCardProps) => {
  const matchPercentage = Math.round((recipe.matchedIngredients.length / recipe.ingredients.length) * 100);
  const { imageUrl, isLoading } = useRecipeImage(recipe.title, recipe.ingredients);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-secondary text-secondary-foreground';
      case 'Medium': return 'bg-accent text-accent-foreground';
      case 'Hard': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="group hover:shadow-food transition-smooth cursor-pointer overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 bg-gradient-subtle">
          {isLoading ? (
            <div className="w-full h-full bg-gradient-food flex items-center justify-center">
              <ChefHat className="h-12 w-12 text-primary-foreground/80 animate-pulse" />
            </div>
          ) : imageUrl ? (
            <img 
              src={imageUrl} 
              alt={`${recipe.title} - Recipe photo`}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              onError={(e) => {
                // Fallback to chef hat icon if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full bg-gradient-food flex items-center justify-center">
                      <svg class="h-12 w-12 text-primary-foreground/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  `;
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-food flex items-center justify-center">
              <ChefHat className="h-12 w-12 text-primary-foreground/80" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge className={`${getDifficultyColor(recipe.difficulty)} shadow-sm`}>
              {recipe.difficulty}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-card/90 text-card-foreground shadow-sm">
              {matchPercentage}% match
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-smooth">
            {recipe.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {recipe.description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookingTime}min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        {/* Rating */}
        <RecipeRating 
          rating={recipe.rating} 
          totalRatings={recipe.totalRatings} 
          readonly 
          size="sm"
        />

        {/* Dietary Info */}
        {recipe.dietaryInfo.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.dietaryInfo.slice(0, 2).map(diet => (
              <Badge key={diet} variant="outline" className="text-xs bg-secondary/10 text-secondary">
                {diet}
              </Badge>
            ))}
            {recipe.dietaryInfo.length > 2 && (
              <Badge variant="outline" className="text-xs bg-muted/50">
                +{recipe.dietaryInfo.length - 2}
              </Badge>
            )}
          </div>
        )}

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 4).map(ingredient => (
              <Badge 
                key={ingredient}
                variant={recipe.matchedIngredients.includes(ingredient) ? "default" : "outline"}
                className={`text-xs ${
                  recipe.matchedIngredients.includes(ingredient) 
                    ? 'bg-primary/10 text-primary border-primary/20' 
                    : 'bg-muted/50'
                }`}
              >
                {ingredient}
              </Badge>
            ))}
            {recipe.ingredients.length > 4 && (
              <Badge variant="outline" className="text-xs bg-muted/50">
                +{recipe.ingredients.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => onViewRecipe(recipe)}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth"
          >
            View Recipe
          </Button>
          {onToggleForShopping && (
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleForShopping}
              className={`${isSelectedForShopping ? 'bg-secondary text-secondary-foreground' : ''} hover-scale`}
            >
              {isSelectedForShopping ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};