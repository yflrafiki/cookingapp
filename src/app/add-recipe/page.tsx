
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Check, CheckSquare, ChevronLeft, X , Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/context/AppContext';
import type { Recipe } from '@/types';
import { useToast } from '@/hooks/use-toast';

import { useCreateRecipe } from '@/hooks/use-recipes';
import { set } from 'date-fns';


export default function AddRecipePage() {
  // const { addRecipe } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading , setIsLoading] = useState(false);

  const createRecipe = useCreateRecipe();

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a title for your recipe.',
      });


      return;
    }

    else if (!notes.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide notes for your recipe.',
        
      });
      return;
    }


    try{


      setIsLoading(true);

      const newRecipe: Recipe = {
      id: String(Date.now()), 
      title,
      description: notes,
      image: image || ``, 
      ingredients: [],
      steps: [],
      dataAiHint: title.toLowerCase().split(' ').slice(0, 2).join(' '),
    };

    await createRecipe(newRecipe);

    toast({
      title: 'Recipe Added!',
      description: `${title} has been added to your collection.`,
    });

    router.push('/my-recipes');


    }

    catch(error){
      console.error('Error adding recipe:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error adding your recipe. Please try again.',
      });
      return;
    } 

    finally{
      setIsLoading(false);
    }


  };
  
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

   const handleRemoveImage = () => {
    setImage(null);
  };


  return (
    <div className="flex h-full flex-col space-y-4 px-4 py-4">
      <header className="flex items-center justify-between">
        <h1 className="font-headline text-3xl text-foreground">Add Recipe</h1>
        <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" asChild>
          <Link href="/my-recipes">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
      </header>

      <div className="flex flex-1 flex-col space-y-4">
        <Input 
          id="title" 
          placeholder="Title" 
          className="border-border/50 bg-card p-5 rounded-[5px] h-12 text-foreground" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex flex-1 flex-col rounded-[5px] border border-border/50 bg-cardspace-y-4 relative">
            <Textarea
                placeholder="Write your recipe notes here..."
                className="flex-1 w-full bg-transparent resize-none
                border-none rounded-[5px]
                 focus:outline-none text-muted-foreground 
                 min-h-[200px] md:min-h-0"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            {image && (
                <div className="flex flex-wrap gap-2 pt-2 absolute bottom-14 left-0 m-4">
                   <div className="relative group">
                        <Image 
                            src={image} 
                            alt="Recipe preview" 
                            width={100} 
                            unoptimized
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
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Save Recipe"
                )}
              </Button>
              <button onClick={handleCameraClick} className="text-muted-foreground hover:text-primary p-4">
                <Camera className="h-6 w-6" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                className="hidden" 
                accept="image/*"
              />
            </div>
        </div>
      </div>
    </div>
  );
}
