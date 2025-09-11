'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Volume2, Loader2, PlayCircle, PauseCircle, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { useToast } from "@/hooks/use-toast";
import type { Recipe } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { getRecipe } from "../actions";

function CookingViewLoader() {
    return (
        <div className="container mx-auto w-ful border-none rounded-none">
            {/* <Skeleton className="h-10 w-48 mb-4" /> */}
            <Card className="overflow-hidden rounded-none border-none shadow-none">
                <Skeleton className="w-full h-[400px] border-none rounded-none" />
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        {/* <Skeleton className="h-10 w-32" /> */}
                    </div>
                    <div className="mt-6 space-y-4">
                        <Skeleton className="h-6 w-40" />
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                     
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function CookModePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const [isContentLoading , setIsContentLoading] = useState(true)
  const [recipe, setRecipe] = useState<Recipe | null>(null);


  const recipeId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {


    getRecipe(recipeId).then((data)=>{
      setRecipe(data)
      console.log(data)
      setIsContentLoading(false)
    }).catch(()=>{
         toast({
        variant: "destructive",
        title: "Recipe Not Found",
        description: "Could not find the recipe to cook.",
      });
      setIsContentLoading(false)
      router.back()
    })

  }, [params.id]);


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
    if (!recipe) return;
    setIsLoading(true);
    try {
      const steps = JSON.parse(recipe.steps) || []
      const recipeText = steps?.join(' ') || recipe.description;
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
        description: "Could not generate the voice guidance. Please check your internet connection and refresh the page.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isContentLoading || !recipe) {
    return <CookingViewLoader />;
  }
  
  return (
    <div className="container relative">
      <Button onClick={() => router.back()} variant="ghost" className="mb-4 absolute top-4 right-1 text-white z-10" >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Recipes
      </Button>
      <Card className="overflow-hidden border-none rounded-none shadow-none w-full">
        <CardHeader className="p-0 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>

          <Image src={recipe.image} alt={recipe.title} width={800}
          unoptimized
          style={{marginTop : 0}}
           height={400} className="w-full h-auto max-h-[400px] mt-0 object-cover" data-ai-hint={recipe.dataAiHint} />
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
              
            </div>
             <Button onClick={handleReadAloud} disabled={isLoading} className="text-white rounded-[5px]">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Volume2 className="mr-2 h-4 w-4" />
              )}
              Read Aloud
            </Button>
          </div>

          <CardDescription className="mt-2 text-muted-foreground">{recipe.description}</CardDescription>

          <div className="mt-6 space-y-4">
            <h3 className="font-bold text-xl font-headline">Steps</h3>
             {recipe.steps && recipe.steps.length > 0 ? (
                <ol className="list-decimal list-inside space-y-3">
                {JSON.parse(recipe.steps).map((step: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
                    <li key={index} className="text-muted-foreground leading-relaxed">{step}</li>
                ))}
                </ol>
            ) : (
                <p className="text-muted-foreground">No step by step tutorial available for this recipe. Please 
                follow the general guide above</p>
            )}
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
