import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, ChefHat, Heart, X } from 'lucide-react';
import { Recipe } from './RecipeCard';

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeModal = ({ recipe, isOpen, onClose }: RecipeModalProps) => {
  if (!recipe) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-secondary text-secondary-foreground';
      case 'Medium': return 'bg-accent text-accent-foreground';
      case 'Hard': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {recipe.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipe Image */}
          <div className="relative h-64 bg-gradient-subtle rounded-lg overflow-hidden">
            {recipe.image ? (
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-food flex items-center justify-center">
                <ChefHat className="h-16 w-16 text-primary-foreground/80" />
              </div>
            )}
            <div className="absolute top-4 left-4">
              <Badge className={`${getDifficultyColor(recipe.difficulty)} shadow-sm`}>
                {recipe.difficulty}
              </Badge>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <Clock className="h-5 w-5 mx-auto text-primary" />
              <div className="text-sm font-medium">{recipe.cookingTime} min</div>
              <div className="text-xs text-muted-foreground">Cooking Time</div>
            </div>
            <div className="space-y-1">
              <Users className="h-5 w-5 mx-auto text-primary" />
              <div className="text-sm font-medium">{recipe.servings}</div>
              <div className="text-xs text-muted-foreground">Servings</div>
            </div>
            <div className="space-y-1">
              <Heart className="h-5 w-5 mx-auto text-primary" />
              <div className="text-sm font-medium">
                {Math.round((recipe.matchedIngredients.length / recipe.ingredients.length) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Match</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{recipe.description}</p>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Ingredients</h3>
            <div className="grid gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-2 p-2 rounded-md transition-smooth ${
                    recipe.matchedIngredients.includes(ingredient)
                      ? 'bg-primary/5 border border-primary/20'
                      : 'bg-muted/30'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    recipe.matchedIngredients.includes(ingredient)
                      ? 'bg-primary'
                      : 'bg-muted-foreground'
                  }`} />
                  <span className={`flex-1 ${
                    recipe.matchedIngredients.includes(ingredient)
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  }`}>
                    {ingredient}
                  </span>
                  {recipe.matchedIngredients.includes(ingredient) && (
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                      You have this
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cooking Instructions */}
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Cooking Instructions</h3>
            <div className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <p className="text-foreground leading-relaxed">{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Start Cooking
            </Button>
            <Button variant="outline" className="flex-1">
              Save Recipe
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};