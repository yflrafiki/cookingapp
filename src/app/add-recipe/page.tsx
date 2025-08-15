'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Check, ChevronLeft, CheckSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AddRecipePage() {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isDirty) {
      setIsDirty(true);
    }
    if (e.target.id === 'title') {
      setTitle(e.target.value);
    } else {
      setNotes(e.target.value);
    }
  };

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving recipe:', { title, notes, image: imagePreview });
    setIsDirty(false); // Reset dirty state after saving
  };
  
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      if (!isDirty) {
        setIsDirty(true);
      }
    }
  };

  return (
    <div className="flex h-full flex-col space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="font-headline text-3xl">Add Recipe</h1>
        {isDirty ? (
          <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" onClick={handleSave}>
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
            className="rounded-xl border-border/50 bg-card p-4 h-12" 
            value={title}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative flex flex-1 flex-col rounded-xl border border-border/50 bg-card">
        <div className="p-4 space-y-4">
         {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Recipe preview"
                  width={400}
                  height={200}
                  className="w-full h-auto rounded-lg object-cover"
                />
            )}

          <Textarea
            id="notes"
            placeholder="Your notes..."
            className="h-full flex-1 resize-none rounded-b-none border-0 bg-transparent p-4 focus-visible:ring-0 min-h-[400px]"
            value={notes}
            onChange={handleInputChange}
          />
          </div>
          <div className="flex items-center justify-start gap-3 p-3">
            <button className="cursor-pointer">
              <CheckSquare className="h-5 w-5 text-muted-foreground" />
            </button>
            <button onClick={handleCameraClick} className="cursor-pointer">
              <Camera className="h-5 w-5 text-muted-foreground" />
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