import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Users, Filter, X } from 'lucide-react';

export interface FilterOptions {
  maxCookingTime: number;
  difficulty: string[];
  servings: number[];
  dietaryRestrictions: string[];
  sortBy: string;
}

interface AdvancedFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Low-Carb',
  'Keto',
  'Paleo',
  'Mediterranean'
];

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];
const SORT_OPTIONS = [
  { value: 'match', label: 'Best Match' },
  { value: 'time', label: 'Cooking Time' },
  { value: 'difficulty', label: 'Difficulty' },
  { value: 'servings', label: 'Servings' },
  { value: 'rating', label: 'Rating' }
];

export const AdvancedFilters = ({ filters, onFiltersChange, isOpen, onToggle }: AdvancedFiltersProps) => {
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayValue = (key: keyof FilterOptions, value: string | number) => {
    const currentValues = filters[key] as (string | number)[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    updateFilter(key, newValues);
  };

  const clearFilters = () => {
    onFiltersChange({
      maxCookingTime: 120,
      difficulty: [],
      servings: [],
      dietaryRestrictions: [],
      sortBy: 'match'
    });
  };

  const hasActiveFilters = 
    filters.maxCookingTime < 120 ||
    filters.difficulty.length > 0 ||
    filters.servings.length > 0 ||
    filters.dietaryRestrictions.length > 0 ||
    filters.sortBy !== 'match';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onToggle}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Advanced Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              !
            </Badge>
          )}
        </Button>
        
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="animate-fade-in">
          <CardContent className="p-6 space-y-6">
            {/* Sort By */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cooking Time */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">
                  Max Cooking Time: {filters.maxCookingTime} minutes
                </label>
              </div>
              <Slider
                value={[filters.maxCookingTime]}
                onValueChange={(value) => updateFilter('maxCookingTime', value[0])}
                max={120}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-sm font-medium mb-3 block">Difficulty Level</label>
              <div className="flex flex-wrap gap-2">
                {DIFFICULTY_OPTIONS.map(difficulty => (
                  <Badge
                    key={difficulty}
                    variant={filters.difficulty.includes(difficulty) ? "default" : "outline"}
                    className="cursor-pointer hover-scale"
                    onClick={() => toggleArrayValue('difficulty', difficulty)}
                  >
                    {difficulty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Servings */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">Servings</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {[2, 4, 6, 8].map(serving => (
                  <Badge
                    key={serving}
                    variant={filters.servings.includes(serving) ? "default" : "outline"}
                    className="cursor-pointer hover-scale"
                    onClick={() => toggleArrayValue('servings', serving)}
                  >
                    {serving}+ people
                  </Badge>
                ))}
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div>
              <label className="text-sm font-medium mb-3 block">Dietary Preferences</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DIETARY_OPTIONS.map(diet => (
                  <div key={diet} className="flex items-center space-x-2">
                    <Checkbox
                      id={diet}
                      checked={filters.dietaryRestrictions.includes(diet)}
                      onCheckedChange={() => toggleArrayValue('dietaryRestrictions', diet)}
                    />
                    <label
                      htmlFor={diet}
                      className="text-sm cursor-pointer hover:text-primary transition-smooth"
                    >
                      {diet}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};