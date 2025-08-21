
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThumbsUp, Heart, Share2, Download, PlayCircle } from "lucide-react";
import Image from "next/image";
import { cn } from '@/lib/utils';

const videos = [
  {
    id: '1',
    title: 'Mastering the Art of Sourdough',
    description: 'A comprehensive guide to baking the perfect sourdough bread from scratch. Learn the techniques for a crispy crust and a chewy crumb.',
    thumbnail: 'https://media.istockphoto.com/id/1216269846/photo/man-holding-beautiful-loaf-of-sourdough-bread.webp?a=1&b=1&s=612x612&w=0&k=20&c=2bZBi0H4Uhwv4pCvRg4FLmzBw5hJlpwLuZL3f9dhxLw=',
    duration: '15:23',
    dataAiHint: 'sourdough bread'
  },
  {
    id: '2',
    title: 'Quick & Healthy Weeknight Dinners',
    description: 'Five easy and nutritious dinner recipes that you can whip up in under 30 minutes. Perfect for busy weeknights!',
    thumbnail: 'https://media.istockphoto.com/id/1182477530/photo/baked-spicy-chicken-breast-with-sweet-pepper-and-rice-delicious-mexican-style-lunch-on-a.webp?a=1&b=1&s=612x612&w=0&k=20&c=FVJGPLrKQt5yphdNez0TM3VSXHFS1r6fQ9GLDY0sZlM=',
    duration: '10:05',
    dataAiHint: 'healthy dinner'
  },
  {
    id: '3',
    title: 'The Ultimate Chocolate Cake',
    description: 'Indulge your sweet tooth with this decadent and moist chocolate cake recipe. A guaranteed crowd-pleaser for any occasion.',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1722686428300-079b0f62182c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFRoZSUyMFVsdGltYXRlJTIwQ2hvY29sYXRlJTIwQ2FrZSUyQyUyMEluZHVsZ2UlMjB5b3VyJTIwc3dlZXQlMjB0b290aCUyMHdpdGglMjB0aGlzJTIwZGVjYWRlbnQlMjBhbmQlMjBtb2lzdCUyMGNob2NvbGF0ZSUyMGNha2UlMjByZWNpcGUuJTIwQSUyMGd1YXJhbnRlZWQlMjBjcm93ZCUyMHBsZWFzZXIlMjBmb3IlMjBhbnklMjBvY2Nhc2lvbi58ZW58MHx8MHx8fDA%3D',
    duration: '8:45',
    dataAiHint: 'chocolate cake'
  },
  {
    id: '4',
    title: 'Exploring Street Food in Thailand',
    description: 'Join us on a culinary journey through the vibrant street food scene of Bangkok, from Pad Thai to Mango Sticky Rice.',
    thumbnail: 'https://media.istockphoto.com/id/1055927418/photo/chinese-vegetarian-festival-in-bangkok-thailand-asia-vegetarian-traditional-street-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=3bGvBzXtAZWs3s0XxLAphuGN6kADKhKQwLFlL4yCXVk=',
    duration: '22:18',
    dataAiHint: 'thai street food'
  },
    {
    id: '5',
    title: 'Perfecting Your Pasta Carbonara',
    description: 'Learn the authentic Italian way to make a creamy, delicious Pasta Carbonara with just a few simple ingredients.',
    thumbnail: 'https://media.istockphoto.com/id/700660724/photo/italian-pasta-carbonara.webp?a=1&b=1&s=612x612&w=0&k=20&c=0Id5uUEv6NwtkOV4FICKj3NMudkwBz4EoyNdjxhIP8M=',
    duration: '12:50',
    dataAiHint: 'pasta carbonara'
  },
];

type Video = typeof videos[0];

export default function VideosPage() {
    const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <div className="md:space-y-6 h-full">
      {/* Mobile view: Fullscreen story-style player */}
       <div className="md:hidden h-screen w-screen fixed inset-0 z-0">
         <Image
            src="/video.png"
            alt={selectedVideo.title}
            fill
            objectFit="cover"
            className="h-full w-full"
            data-ai-hint={selectedVideo.dataAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white h-12 w-12"><ThumbsUp className="h-7 w-7" /></Button>
            <Button variant="ghost" size="icon" className="text-white h-12 w-12"><Heart className="h-7 w-7" /></Button>
            <Button variant="ghost" size="icon" className="text-white h-12 w-12"><Share2 className="h-7 w-7" /></Button>
            <Button variant="ghost" size="icon" className="text-white h-12 w-12"><Download className="h-7 w-7" /></Button>
        </div>
         <div className="absolute left-4 bottom-24 text-white z-10 max-w-[calc(100%-6rem)]">
          <h2 className="font-bold text-lg">{selectedVideo.title}</h2>
          <p className="text-sm text-white/80 line-clamp-2">{selectedVideo.description}</p>
        </div>
      </div>


      {/* Desktop view */}
      <div className="hidden md:flex flex-col h-full space-y-6">
        <header className="flex items-center justify-between">
            <h1 className="font-headline text-3xl">Videos</h1>
        </header>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-10 gap-8 min-h-0">
            {/* Main Video Section */}
            <div className="lg:col-span-7 flex flex-col gap-4">
                <Card className="overflow-hidden shadow-lg w-full aspect-video relative group">
                <Image
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    fill
                    objectFit="cover"
                    data-ai-hint={selectedVideo.dataAiHint}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                        {selectedVideo.duration}
                    </div>
                </Card>
                <div className='space-y-3'>
                    <h2 className="font-headline text-2xl">{selectedVideo.title}</h2>
                    <p className="text-muted-foreground">{selectedVideo.description}</p>
                    <div className="flex items-center gap-2 pt-2">
                        <Button variant="outline" size="sm"><ThumbsUp className="h-4 w-4 mr-2" /> Like</Button>
                        <Button variant="outline" size="sm"><Heart className="h-4 w-4 mr-2" /> Favorite</Button>
                        <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2" /> Share</Button>
                        <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Download</Button>
                    </div>
                </div>
            </div>
            
            {/* Video Playlist Section */}
            <div className="lg:col-span-3 flex flex-col gap-4 min-h-0">
                <h3 className="font-headline text-xl">Up Next</h3>
                <ScrollArea className="flex-1 lg:h-full pr-4 -mr-4 [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)] no-scrollbar">
                    <div className="space-y-4">
                        {videos.map(video => (
                            <Card 
                                key={video.id} 
                                 className={cn(
                                    "overflow-hidden hover:bg-muted/50 cursor-pointer transition-all",
                                    selectedVideo.id === video.id && "border-primary/50"
                                )}
                                onClick={() => setSelectedVideo(video)}
                            >
                            <CardContent className="p-3 flex items-center gap-4">
                                    <div className="w-24 h-16 rounded-md overflow-hidden relative shrink-0">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.title}
                                            fill
                                            objectFit="cover"
                                            data-ai-hint={video.dataAiHint}
                                        />
                                        <div className="absolute inset-0 bg-black/30"></div>
                                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-sm">
                                            {video.duration}
                                        </div>
                                    </div>
                                    <div className='space-y-1'>
                                        <h4 className="font-semibold text-sm line-clamp-2">{video.title}</h4>
                                        <p className="text-xs text-muted-foreground">Playing next</p>
                                    </div>
                            </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
      </div>
    </div>
  );
}
