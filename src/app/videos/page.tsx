'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, X, Heart, Share2, ThumbsUp , ReceiptText } from "lucide-react";
import Image from "next/image";
import { cn } from '@/lib/utils';

// Dummy cooking tutorial data
const cookingVideos = [
  {
    id: '1',
    title: '5-Minute Pasta',
    description: 'Quick and delicious pasta recipe with garlic, olive oil, and chili flakes. Perfect for weeknights when you need something fast and comforting.',
    comments: 25000,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&auto=format&fit=crop&q=60',
    likes: 12500,
    shares: 3200
  },
  {
    id: '2',
    title: 'Fluffy Pancakes',
    description: 'Learn the secret to making soft, fluffy pancakes with just 5 ingredients. A perfect breakfast treat topped with syrup and berries.',
    comments: 18000,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&auto=format&fit=crop&q=60',
    likes: 8900,
    shares: 2100
  },
  {
    id: '3',
    title: 'Classic Fried Rice',
    description: 'Turn leftover rice into a tasty fried rice dish with eggs, veggies, and soy sauce. A family favorite that\'s quick and filling.',
    comments: 10000,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=60',
    likes: 6700,
    shares: 1800
  },
  {
    id: '4',
    title: 'Perfect Scrambled Eggs',
    description: 'Master the art of creamy, restaurant-quality scrambled eggs with this foolproof technique. The secret is in the timing and temperature.',
    comments: 15000,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60',
    likes: 11200,
    shares: 2900
  },
  {
    id: '5',
    title: 'Homemade Pizza Dough',
    description: 'Create the perfect pizza dough from scratch with just flour, water, yeast, and salt. Crispy crust with a chewy center every time.',
    comments: 22000,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60',
    likes: 15600,
    shares: 4100
  }
];

type Video = typeof cookingVideos[0];

export default function VideosPage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isRecipieOpen, setIsRecipieOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const currentVideo = cookingVideos[currentVideoIndex];

  // Handle scroll to snap to videos
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const videoHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / videoHeight);
      
      if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < cookingVideos.length) {
        setCurrentVideoIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentVideoIndex]);

  // Auto-play current video and pause others
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.play().catch(console.error);
          setIsPlaying(true);
        } else {
          video.pause();
        }
      }
    });
  }, [currentVideoIndex]);

  const handleVideoClick = () => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
        setIsPlaying(false);
      } else {
        currentVideo.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const scrollToVideo = (index: number) => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const nextVideo = () => {
    if (currentVideoIndex < cookingVideos.length - 1) {
      scrollToVideo(currentVideoIndex + 1);
    }
  };

  const prevVideo = () => {
    if (currentVideoIndex > 0) {
      scrollToVideo(currentVideoIndex - 1);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cookingVideos.map((video, index) => (
          <div
            key={video.id}
            className="relative w-full h-screen snap-start snap-always flex items-center justify-center"
          >
            {/* Video Element */}
            <video
              ref={(el) => { videoRefs.current[index] = el; }}
              className="w-full h-full object-cover"
              loop
              playsInline
              poster={video.thumbnail}
              onClick={handleVideoClick}
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              onClick={handleVideoClick}
            />

            {/* Bottom Left Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 mb-[5rem] text-white z-10">
              <div className="max-w-[calc(100%-80px)]">
                <h2 className="text-2xl font-bold mb-2 line-clamp-1">{video.title}</h2>
                <p className="text-sm text-white/90 line-clamp-3 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>

            {/* Right Side Action Bar */}
            <div className="absolute right-4 bottom-20 flex flex-col mb-[5rem] items-center gap-4 z-10">
              {/* Comment/Details Button */}
              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 text-white hover:bg-black/40"
                  onClick={() => setIsRecipieOpen(true)}
                >
                  <ReceiptText className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Play/Pause Overlay */}
            {!isPlaying && index === currentVideoIndex && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-20 w-20 rounded-full bg-black/30 backdrop-blur-sm border border-white/30 text-white hover:bg-black/50"
                  onClick={handleVideoClick}
                >
                  <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[12px] border-y-transparent ml-1" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comments/Details Panel */}
      {isRecipieOpen && (
        <DetailsPanel
          video={currentVideo}
          onClose={() => setIsRecipieOpen(false)}
        />
      )}
    </div>
  );
}

// Comments Panel Component
function DetailsPanel({ video, onClose }: { video: Video; onClose: () => void }) {

  


  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl pb-[5rem]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-foreground">Recipie Details</h3>
            <Button variant="ghost" size="icon" onClick={onClose} className='border border-foreground rounded-full'>
              <X className="h-5 w-5 text-foreground" />
            </Button>
          </div>

          {/* Video Info */}
          <div className="p-4 border-b">
            <h4 className="font-semibold text-foreground mb-2">{video.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
          
          </div>

          <div className="p-4">
          <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
          </div>

     
        </div>
      </div>
    </div>
  );
}