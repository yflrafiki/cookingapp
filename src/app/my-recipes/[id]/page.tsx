
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Recipe } from '@/types';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { X } from 'lucide-react';
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
import { useGetRecipe , useUpdateRecipe , useDeleteRecipe } from '@/hooks/use-recipes';
import { set } from 'date-fns';

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
  const updateRecipe = useUpdateRecipe();
  const deleteRecipe = useDeleteRecipe();
  const getRecipe = useGetRecipe();
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating , setIsUpdating] = useState(false);
  const [isDeleting , setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const recipeId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  useEffect(() => {


    getRecipe(recipeId).then((data) => {

      setRecipe(data);
      setTitle(data?.title || '');
      setDescription(data?.description || '');
      setImage(data?.image || '');
      setIsLoading(false);
    }).catch(() => {
        setIsLoading(false);
    });

  }
  
  , [getRecipe, recipeId]);

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

  const handleSave = async () => {
    if (!recipe) return;

    if (!title.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a title for your recipe.',
      });


      return;
    }

    else if (!description.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide notes for your recipe.',
        
      });
      return;
    }


    try{
      setIsUpdating(true);

      const updatedRecipeData: Recipe = {
      ...recipe,
      title,
      description,
      image : image || recipe.image,
    };

    await updateRecipe(recipe.id, updatedRecipeData);

    toast({
      title: 'Recipe Updated!',
      description: `${title} has been saved.`,
    });

    router.push('/my-recipes');


    }

      catch(error){
         toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error updating your recipe. Please try again.',
      });

      return

    }

    finally{
      setIsUpdating(false);
    }


  };
  
  const handleDelete = async () => {
    if(recipe) {
        await deleteRecipe(recipe.id);
        toast({
            variant: 'destructive',
            title: 'Recipe Deleted',
            description: `${recipe.title} has been deleted.`,
        });
        router.push('/my-recipes');
    }
  };


  const handleRemoveImage = () => {
    setImage(null);
  };


  if (isLoading || !recipe) {
    return <EditRecipePageLoader />;
  }

  return (
    <div className="flex flex-col h-full bg-background space-y-4">
       <header className="flex items-center justify-between">
         <h1 className="font-headline text-2xl font-semibold text-foreground">Edit Recipe</h1>
         <div className="flex items-center gap-2">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button  size="icon" className="text-destructive bg-transparent rounded-full 
                    active:bg-none">
                        <Trash2 className="h-10 w-10" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='w-[95%] rounded-[5px] mx-auto'>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the recipe for {recipe?.title}.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel className='active:bg-transparent text-muted-foreground
                    hover:text-muted-foreground bg-transparent'>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}
                    disabled={isDeleting}
                     className="bg-destructive hover:bg-destructive/90 text-white">{isDeleting ? "Deleting..." : "Delete"}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Button variant="ghost" size="icon" 
            className="rounded-full bg-card shadow-sm border" onClick={() => router.push('/my-recipes')}>
                <ChevronLeft className="h-6 w-6 text-foreground" />
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
      <div className="flex flex-1 flex-col space-y-4">
        <Input 
          id="title" 
          value={title} 
          className="border-border/50 bg-card p-5 rounded-[5px] h-12 text-foreground" 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title"
          />
        <div className="flex flex-1 flex-col rounded-[5px] border border-border/50 bg-cardspace-y-4 relative">
            <Textarea 
                id="notes" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Notes"
                className="flex-1 w-full bg-transparent resize-none
                border-none rounded-[5px]
                 focus:outline-none text-muted-foreground 
                 min-h-[200px] md:min-h-0"
            />
          {image && (
                <div className="flex flex-wrap gap-2 pt-2 absolute bottom-14 left-0 m-4">
                   <div className="relative group">
                        <Image 
                            src={image} 
                            alt="Recipe preview" 
                            width={100} 
                            height={100} 
                            className="rounded-[5px] object-cover h-24 w-24"
                            data-ai-hint="recipe image"
                        />
                         <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-1 -right-1 h-6 w-6 rounded-full"
                            onClick={handleRemoveImage}
                         >
                            <X className="h-4 w-4" />
                         </Button>
                    </div>
                </div>
            )}
        <div className="flex items-center flex-start mt-auto px-1 absolute bottom-0 left-0 mb-2">
              <Button onClick={handleSave} 
              disabled={isLoading}
              className='ml-[10px] rounded-[5px] text-white disabled:opacity-50'>
                {isLoading ? "Updating..." : "Update Recipe"}
              </Button>
              <button onClick={() => fileInputRef.current?.click()} className="text-muted-foreground hover:text-primary p-4">
                <Camera className="h-6 w-6" />
              </button>
         
        </div>
        </div>
      </div>
    </div>
  );
}
