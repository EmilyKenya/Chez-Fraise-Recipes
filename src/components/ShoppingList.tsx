import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X, Check, Plus } from 'lucide-react';
import { Recipe } from './RecipeCard';

interface ShoppingListProps {
  recipes: Recipe[];
  selectedRecipes: string[];
  onToggleRecipe: (recipeId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ShoppingList = ({ recipes, selectedRecipes, onToggleRecipe, isOpen, onToggle }: ShoppingListProps) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());

  const selectedRecipeData = recipes.filter(recipe => selectedRecipes.includes(recipe.id));
  
  // Combine all ingredients from selected recipes
  const allIngredients = selectedRecipeData.reduce((acc, recipe) => {
    recipe.ingredients.forEach(ingredient => {
      if (!acc.some(item => item.ingredient === ingredient)) {
        acc.push({ 
          ingredient, 
          recipes: [recipe.title],
          count: 1
        });
      } else {
        const existing = acc.find(item => item.ingredient === ingredient);
        if (existing && !existing.recipes.includes(recipe.title)) {
          existing.recipes.push(recipe.title);
          existing.count++;
        }
      }
    });
    return acc;
  }, [] as Array<{ ingredient: string; recipes: string[]; count: number }>);

  const toggleIngredient = (ingredient: string) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(ingredient)) {
      newChecked.delete(ingredient);
    } else {
      newChecked.add(ingredient);
    }
    setCheckedIngredients(newChecked);
  };

  const completedCount = checkedIngredients.size;
  const totalCount = allIngredients.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onToggle}
          className="flex items-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Shopping List
          {selectedRecipes.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selectedRecipes.length}
            </Badge>
          )}
        </Button>
      </div>

      {isOpen && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Shopping List</span>
              <div className="text-sm text-muted-foreground">
                {completedCount}/{totalCount} items
              </div>
            </CardTitle>
            {totalCount > 0 && (
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </CardHeader>
          
          <CardContent className="space-y-4">
            {selectedRecipeData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select recipes to generate a shopping list</p>
              </div>
            ) : (
              <>
                {/* Selected Recipes */}
                <div>
                  <h4 className="font-medium mb-2">Selected Recipes ({selectedRecipeData.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecipeData.map(recipe => (
                      <Badge
                        key={recipe.id}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {recipe.title}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => onToggleRecipe(recipe.id)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Ingredients List */}
                <div>
                  <h4 className="font-medium mb-3">Ingredients ({allIngredients.length})</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {allIngredients.map(({ ingredient, recipes, count }) => (
                      <div
                        key={ingredient}
                        className={`flex items-center gap-3 p-2 rounded-md transition-smooth ${
                          checkedIngredients.has(ingredient) 
                            ? 'bg-muted/50 opacity-75' 
                            : 'hover:bg-muted/30'
                        }`}
                      >
                        <Checkbox
                          checked={checkedIngredients.has(ingredient)}
                          onCheckedChange={() => toggleIngredient(ingredient)}
                        />
                        <div className="flex-1">
                          <span className={`${
                            checkedIngredients.has(ingredient) 
                              ? 'line-through text-muted-foreground' 
                              : 'text-foreground'
                          }`}>
                            {ingredient}
                          </span>
                          {count > 1 && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Used in {count} recipes
                            </Badge>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            {recipes.join(', ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCheckedIngredients(new Set())}
                    disabled={checkedIngredients.size === 0}
                  >
                    Clear Checked
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCheckedIngredients(new Set(allIngredients.map(i => i.ingredient)))}
                    disabled={checkedIngredients.size === allIngredients.length}
                  >
                    Check All
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};