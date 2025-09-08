
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Volume2, Loader2, PlayCircle, PauseCircle } from "lucide-react";
import { useState, useRef } from "react";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { useToast } from "@/hooks/use-toast";

const recipe = {
  title: 'Classic Tomato Soup',
  description: 'A creamy and delicious tomato soup, perfect for any season.',
  image: 'https://picsum.photos/800/600',
  dataAiHint: 'tomato soup',
  steps: [
    "Heat olive oil in a large pot over medium heat. Add chopped onions and cook until softened, about 5 minutes.",
    "Add minced garlic and cook for another minute until fragrant.",
    "Pour in crushed tomatoes, vegetable broth, and a pinch of sugar. Season with salt and pepper.",
    "Bring the soup to a simmer, then reduce heat and let it cook for at least 20 minutes to allow the flavors to meld.",
    "For a creamy texture, use an immersion blender to blend the soup until smooth. Alternatively, you can carefully transfer it to a regular blender.",
    "Stir in the heavy cream and heat through, but do not boil. Serve hot, garnished with fresh basil."
  ]
};


export default function CookModePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleReadAloud = async () => {
    setIsLoading(true);
    try {
      const recipeText = recipe.steps.join(' ');
      const response = await textToSpeech(recipeText);
      if (response.media) {
        setAudioSrc(response.media);
        setIsPlaying(true);
        setTimeout(() => {
          audioRef.current?.play();
        }, 100);
      } else {
        throw new Error('No audio data received.');
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      toast({
        variant: "destructive",
        title: "Audio Generation Failed",
        description: "Could not generate the voice guidance. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <Card className="overflow-hidden">
        <CardHeader className="p-0 relative">
          <Image src={recipe.image} alt={recipe.title} width={800} height={600} className="w-full h-auto" data-ai-hint={recipe.dataAiHint} />
           <div className="absolute bottom-4 right-4">
            {audioSrc && (
              <Button onClick={handlePlayPause} size="icon" className="rounded-full h-12 w-12 bg-primary/80 backdrop-blur-sm hover:bg-primary">
                {isPlaying ? <PauseCircle className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
              </Button>
            )}
           </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-3xl">{recipe.title}</CardTitle>
              <p className="mt-2 text-muted-foreground">{recipe.description}</p>
            </div>
             <Button onClick={handleReadAloud} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Volume2 className="mr-2 h-4 w-4" />
              )}
              Read Aloud
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="font-bold text-xl font-headline">Instructions</h3>
            <ol className="list-decimal list-inside space-y-3">
              {recipe.steps.map((step, index) => (
                <li key={index} className="text-muted-foreground leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
      {audioSrc && (
        <audio 
          ref={audioRef} 
          src={audioSrc} 
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          hidden
        />
      )}
    </div>
  );
}
