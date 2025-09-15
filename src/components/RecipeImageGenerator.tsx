import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Download, RefreshCw } from 'lucide-react';
import { RunwareService } from '@/services/aiImageService';
import { generateRecipeImagePrompt } from '@/services/recipeImageService';
import { useToast } from '@/hooks/use-toast';

interface RecipeImageGeneratorProps {
  recipeName?: string;
  ingredients?: string[];
  onImageGenerated?: (imageUrl: string) => void;
}

export const RecipeImageGenerator = ({ 
  recipeName = '', 
  ingredients = [], 
  onImageGenerated 
}: RecipeImageGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleGenerateImage = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Runware API key to generate images.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const runwareService = new RunwareService(apiKey);
      
      // Use custom prompt or generate one based on recipe
      const prompt = customPrompt || generateRecipeImagePrompt(recipeName, ingredients);
      
      const result = await runwareService.generateImage({
        positivePrompt: prompt,
        width: 1024,
        height: 768,
        model: "runware:100@1",
        outputFormat: "WEBP"
      });

      setGeneratedImage(result.imageURL);
      onImageGenerated?.(result.imageURL);
      
      toast({
        title: "Image Generated!",
        description: "Your recipe image has been created successfully.",
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate image. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = async () => {
    if (!generatedImage) return;
    
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${recipeName || 'recipe'}-image.webp`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the image.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Recipe Image Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* API Key Input */}
        <div className="space-y-2">
          <Label htmlFor="apiKey">Runware API Key</Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="Enter your Runware API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Get your API key from{' '}
            <a 
              href="https://runware.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              runware.ai
            </a>
          </p>
        </div>

        {/* Custom Prompt Input */}
        <div className="space-y-2">
          <Label htmlFor="prompt">Custom Prompt (Optional)</Label>
          <Input
            id="prompt"
            placeholder={`Leave empty to auto-generate for: ${recipeName || 'your recipe'}`}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
        </div>

        {/* Generated Image Preview */}
        {generatedImage && (
          <div className="space-y-2">
            <Label>Generated Image</Label>
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={generatedImage} 
                alt="Generated recipe image" 
                className="w-full h-64 object-cover"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2"
                onClick={downloadImage}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <Button 
          onClick={handleGenerateImage}
          disabled={isGenerating || !apiKey}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Recipe Image
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};