import { useState } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const POPULAR_INGREDIENTS = [
  'chicken', 'beef', 'fish', 'eggs', 'tomatoes', 'onions', 'garlic', 'cheese',
  'rice', 'pasta', 'potatoes', 'carrots', 'peppers', 'mushrooms', 'spinach',
  'broccoli', 'herbs', 'lemon', 'olive oil', 'milk', 'flour', 'beans'
];

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

export const IngredientSelector = ({ selectedIngredients, onIngredientsChange }: IngredientSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customIngredient, setCustomIngredient] = useState('');

  const filteredIngredients = POPULAR_INGREDIENTS.filter(
    ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedIngredients.includes(ingredient)
  );

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      onIngredientsChange([...selectedIngredients, ingredient]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    onIngredientsChange(selectedIngredients.filter(i => i !== ingredient));
  };

  const addCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      addIngredient(customIngredient.trim());
      setCustomIngredient('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Add Custom */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 transition-smooth focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Add custom ingredient..."
            value={customIngredient}
            onChange={(e) => setCustomIngredient(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomIngredient()}
            className="transition-smooth"
          />
          <Button 
            onClick={addCustomIngredient}
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selected Ingredients */}
      {selectedIngredients.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Selected Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map(ingredient => (
              <Badge 
                key={ingredient}
                variant="default"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth cursor-pointer"
                onClick={() => removeIngredient(ingredient)}
              >
                {ingredient}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Popular Ingredients */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Popular Ingredients</h3>
        <div className="flex flex-wrap gap-2">
          {filteredIngredients.map(ingredient => (
            <Badge 
              key={ingredient}
              variant="outline"
              className="hover:bg-muted cursor-pointer transition-smooth border-border hover:border-primary/30"
              onClick={() => addIngredient(ingredient)}
            >
              {ingredient}
              <Plus className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};