
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Check, CheckSquare, ChevronLeft, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/context/AppContext';
import type { Recipe } from '@/types';
import { useToast } from '@/hooks/use-toast';


export default function AddRecipePage() {
  const { addRecipe } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!title) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a title for your recipe.',
      });
      return;
    }

    const newRecipe: Recipe = {
      id: String(Date.now()), // Simple unique id
      title,
      description: notes,
      image: image || `https://picsum.photos`, // Use selected image or a new placeholder
      ingredients: [],
      steps: [],
      dataAiHint: title.toLowerCase().split(' ').slice(0, 2).join(' '),
    };

    addRecipe(newRecipe);

    toast({
      title: 'Recipe Added!',
      description: `${title} has been added to your collection.`,
    });

    router.push('/recipes');
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
    <div className="flex h-full flex-col space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="font-headline text-3xl">Add Recipe</h1>
        <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" asChild>
          <Link href="/recipes">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
      </header>

      <div className="flex flex-1 flex-col space-y-4">
        <Input 
          id="title" 
          placeholder="Title" 
          className="rounded-xl border-border/50 bg-card p-4 h-12" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex flex-1 flex-col rounded-xl border border-border/50 bg-card p-4 space-y-4">
            <Textarea
                placeholder="Write your recipe notes here..."
                className="flex-1 w-full bg-transparent resize-none focus:outline-none text-muted-foreground min-h-[200px] md:min-h-0"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            {image && (
                <div className="flex flex-wrap gap-2 pt-2">
                   <div className="relative group">
                        <Image 
                            src={image} 
                            alt="Recipe preview" 
                            width={100} 
                            height={100} 
                            className="rounded-lg object-cover h-24 w-24"
                            data-ai-hint="recipe image"
                        />
                         <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={handleRemoveImage}
                         >
                            <X className="h-4 w-4" />
                         </Button>
                    </div>
                </div>
            )}
            <div className="flex items-center justify-between mt-auto pt-2">
              <button onClick={handleCameraClick} className="text-muted-foreground hover:text-primary">
                <Camera className="h-6 w-6" />
              </button>
              <Button onClick={handleSave}>
                <CheckSquare className="h-5 w-5 mr-2" />
                Save Recipe
              </Button>
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
