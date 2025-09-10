
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Recipe } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppContext } from '@/context/AppContext';
import { ChevronLeft, Trash2, Camera, CheckSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function EditRecipePageLoader() {
    return (
        <div className="flex flex-col h-full bg-background space-y-4">
            <header className="flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </header>

            <div className="flex-grow flex flex-col gap-4">
                 <Skeleton className="w-full h-16 rounded-md" />
                <div className="relative flex-grow">
                    <Skeleton className="w-full h-full rounded-md" />
                </div>
            </div>
        </div>
    )
}


export default function EditRecipePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { recipes, updateRecipe, deleteRecipe, isLoading } = useAppContext();
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isLoading) {
      return; 
    }

    const recipeId = Array.isArray(params.id) ? params.id[0] : params.id;
    const foundRecipe = recipes.find(r => r.id === recipeId);
    
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setTitle(foundRecipe.title);
      setDescription(foundRecipe.description);
      setImage(foundRecipe.image);
    } else if (!isLoading) {
      toast({
          variant: "destructive",
          title: "Recipe Not Found",
          description: "Could not find the recipe you were looking for.",
      });
      router.push('/recipes');
    }
    
  }, [params.id, isLoading, recipes, router, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
            toast({
              title: 'Image Selected',
              description: 'The new image is ready to be saved.',
            });
        }
        reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!recipe) return;

    if (!title) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out the title.',
      });
      return;
    }

    const updatedRecipeData: Recipe = {
      ...recipe,
      title,
      description,
      image,
    };

    updateRecipe(updatedRecipeData);
    toast({
      title: 'Recipe Updated!',
      description: `${title} has been saved.`,
    });
    router.push('/recipes');
  };
  
  const handleDelete = () => {
    if(recipe) {
        deleteRecipe(recipe.id);
        toast({
            variant: 'destructive',
            title: 'Recipe Deleted',
            description: `${recipe.title} has been deleted.`,
        });
        router.push('/recipes');
    }
  };

  if (isLoading || !recipe) {
    return <EditRecipePageLoader />;
  }

  return (
    <div className="flex flex-col h-full bg-background space-y-4">
       <header className="flex items-center justify-between">
         <h1 className="font-headline text-2xl font-semibold">Edit Recipe</h1>
         <div className="flex items-center gap-2">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the recipe for {recipe?.title}.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" onClick={() => router.push('/recipes')}>
                <ChevronLeft className="h-6 w-6" />
            </Button>
         </div>
      </header>
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*"
            className="hidden" 
        />
      <div className="flex-grow flex flex-col gap-4">
        <Input 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title"
          className="bg-card border-border/50 py-6 text-lg"
        />
        <div className="relative flex-grow">
            <Textarea 
                id="notes" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Notes"
                className="bg-card border-border/50 h-full resize-none p-4 text-base"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-3">
                <button onClick={() => fileInputRef.current?.click()} aria-label="Upload image">
                    <Camera className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                </button>
                <button onClick={handleSave} aria-label="Save recipe">
                    <CheckSquare className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
