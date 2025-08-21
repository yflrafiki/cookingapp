
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Check, CheckSquare, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AddRecipePage() {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDirty) setIsDirty(true);
    setTitle(e.target.value);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isDirty) setIsDirty(true);
    setNotes(e.target.value);
  };

  const handleSave = () => {
    console.log('Saving:', { title, notes, images: imagePreviews });
    setIsDirty(false); 
  };
  
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (!isDirty) setIsDirty(true);
      const files = Array.from(e.target.files);
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...imageUrls]);
    }
  };


  return (
    <div className="flex h-full flex-col md:h-[calc(100vh-4rem)] space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="font-headline text-3xl">Add Recipe</h1>
        {isDirty ? (
          <Button variant="ghost" size="icon" className="rounded-full bg-primary/20 text-primary-foreground border border-primary/30" onClick={handleSave}>
            <Check className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" asChild>
            <Link href="/">
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
        )}
      </header>
      <div className="flex flex-1 flex-col space-y-4">
        <div>
          <Input 
            id="title" 
            placeholder="Title" 
            className="rounded-xl border-border/50 bg-card p-4 h-12 text-lg" 
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="flex flex-1 flex-col rounded-xl border border-border/50 bg-card p-4 space-y-4">
            <textarea
                placeholder="Write your recipe notes here..."
                className="flex-1 w-full bg-transparent resize-none focus:outline-none text-muted-foreground min-h-[550px]"
                value={notes}
                onChange={handleNotesChange}
            />
            {imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                {imagePreviews.map((src, index) => (
                    <Image 
                    key={index}
                    src={src} 
                    alt="Recipe preview" 
                    width={100} 
                    height={100} 
                    className="rounded-lg object-cover"
                    data-ai-hint="recipe image"
                    />
                ))}
                </div>
            )}
            <div className="flex items-center gap-4 mt-auto pt-2">
                <button onClick={handleCameraClick} className="text-muted-foreground hover:text-primary">
                <Camera className="h-6 w-6" />
                </button>
                <button className="text-muted-foreground hover:text-primary">
                <CheckSquare className="h-6 w-6" />
                </button>
                <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                className="hidden" 
                accept="image/*"
                multiple
                />
            </div>
        </div>
      </div>
    </div>
  );
}
