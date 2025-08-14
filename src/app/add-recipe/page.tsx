
'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

export default function AddRecipePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl">Add Recipe</h1>
      <form className="space-y-4">
        <div className="border-color-[#91A571] rounded[16px]">
          <Input id="title" placeholder="Title"   className="placeholder:text-[#5D5A5A73]" />
        </div>
        <div>
          <Textarea id="notes" placeholder="Notes" rows={8} />
        </div>
      </form>
    </div>
  );
}
