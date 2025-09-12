'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, X, Heart, Share2, ThumbsUp , ReceiptText , Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from '@/lib/utils';
import { getVideos } from './actions';
import { Video as VideoType } from '@/types';






export default function VideosPage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isRecipieOpen, setIsRecipieOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [videoLoadingStates, setVideoLoadingStates] = useState<boolean[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const currentVideo = videos[currentVideoIndex];

  useEffect(() => {
    getVideos().then((data) => {
      setVideos(data);
      setVideoLoadingStates(new Array(data.length).fill(true));
      setLoading(false);
      setError(null);
    }).catch((error) => {
      console.error(error);
      setLoading(false);
      setError(error);
    });
  }, []);



  // Enhanced scroll handling with Intersection Observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container || videos.length === 0) return;

    // Clear previous timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      const scrollTop = container.scrollTop;
      const videoHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / videoHeight);
      
      if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
        setCurrentVideoIndex(newIndex);
        setIsUserInteracting(false); // Reset user interaction when scrolling
      }
    };

    // Set up Intersection Observer for better video detection
    const observerOptions = {
      root: container,
      rootMargin: '-10% 0px -10% 0px', // Only trigger when video is mostly visible
      threshold: 0.5
    };

    intersectionObserverRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoIndex = parseInt(entry.target.getAttribute('data-video-index') || '0');
          if (videoIndex !== currentVideoIndex) {
            setCurrentVideoIndex(videoIndex);
          }
        }
      });
    }, observerOptions);

    // Observe all video containers
    const videoContainers = container.querySelectorAll('[data-video-index]');
    videoContainers.forEach(container => {
      intersectionObserverRef.current?.observe(container);
    });

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, [videos.length, currentVideoIndex]);

  // Enhanced video autoplay with preloading and better controls
  useEffect(() => {
    if (videos.length === 0) return;

    const playCurrentVideo = async () => {
      const currentVideo = videoRefs.current[currentVideoIndex];
      if (!currentVideo) return;

      try {
        // Preload current video
        currentVideo.load();
        
        // Play if autoplay is enabled and user isn't interacting
        if (autoplayEnabled && !isUserInteracting && !isScrolling) {
          await currentVideo.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error playing video:', error);
        setIsPlaying(false);
      }
    };

    // Pause all other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentVideoIndex) {
        video.pause();
        video.currentTime = 0; // Reset to beginning
      }
    });

    // Play current video
    playCurrentVideo();

    // Preload adjacent videos for better performance
    const preloadAdjacentVideos = () => {
      const prevIndex = currentVideoIndex - 1;
      const nextIndex = currentVideoIndex + 1;
      
      [prevIndex, nextIndex].forEach(index => {
        if (index >= 0 && index < videos.length) {
          const video = videoRefs.current[index];
          if (video && video.readyState < 3) { // HAVE_FUTURE_DATA
            video.preload = 'metadata';
            video.load();
          }
        }
      });
    };

    preloadAdjacentVideos();
  }, [currentVideoIndex, autoplayEnabled, isUserInteracting, isScrolling, videos.length]);

  // Handle video loading states
  const handleVideoLoad = (index: number) => {
    setVideoLoadingStates(prev => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  const handleVideoClick = () => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (!currentVideo) return;

    setIsUserInteracting(true);
    
    if (isPlaying) {
      currentVideo.pause();
      setIsPlaying(false);
    } else {
      currentVideo.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const toggleAutoplay = () => {
    setAutoplayEnabled(prev => !prev);
    if (!autoplayEnabled) {
      // If enabling autoplay, play current video
      const currentVideo = videoRefs.current[currentVideoIndex];
      if (currentVideo && !isPlaying) {
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
    if (currentVideoIndex < videos.length - 1) {
      scrollToVideo(currentVideoIndex + 1);
    }
  };

  const prevVideo = () => {
    if (currentVideoIndex > 0) {
      scrollToVideo(currentVideoIndex - 1);
    }
  };



  if (loading) {  
    return <div className="flex justify-center items-center h-full">
      <Loader2 className="animate-spin" />
    </div>
  }
  
  if (error) {
    return <div className="flex justify-center items-center h-full
    flex-col gap-4">
      <p className="text-foreground w-[70%] text-center">A network error occurred. Please try again later.</p>
      <Button variant="outline"
      className='rounded-[5px]'
       onClick={() => window.location.reload()}>Reload</Button>
    </div>
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            data-video-index={index}
            className="relative w-full h-[100%] snap-start snap-always flex items-center justify-center"
          >
            {/* Loading Overlay */}
            {videoLoadingStates[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-30">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}

            {/* Video Element */}
            <video
              ref={(el) => { videoRefs.current[index] = el; }}
              className="w-full h-full object-cover"
              loop
              playsInline
              poster={video.thumbnail}
              onClick={handleVideoClick}
              onLoadedData={() => handleVideoLoad(index)}
              onError={() => handleVideoLoad(index)}
              preload="metadata"
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              onClick={handleVideoClick}
            />

            {/* Bottom Left Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-[120px] text-white z-10">
              <div className="max-w-[calc(100%-80px)]">
                <h2 className="text-2xl font-bold mb-2 line-clamp-1">{video.title}</h2>
                <p className="text-sm text-white/90 line-clamp-3 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>

            {/* Right Side Action Bar */}
            <div className="absolute right-4 bottom-20 flex flex-col pb-[100px] items-center gap-4 z-10">
              {/* Autoplay Toggle */}
              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full backdrop-blur-sm border text-white hover:bg-black/40",
                    autoplayEnabled 
                      ? "bg-primary/20 border-primary/50" 
                      : "bg-black/20 border-white/20"
                  )}
                  onClick={toggleAutoplay}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 transition-colors",
                    autoplayEnabled ? "bg-primary border-primary" : "bg-transparent border-white"
                  )}>
                    {autoplayEnabled && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </Button>
                <span className="text-xs text-white">Autoplay</span>
              </div>

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
                <span className="text-xs text-white">Recipe</span>
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
function DetailsPanel({ video, onClose }: { video: VideoType; onClose: () => void }) {

  


  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl pb-[100px]">
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
            {
              video.steps ? 
              video.steps.map((step: string, index: number) => (
                <p key={index} className="text-sm text-muted-foreground mb-3">{step}</p>
              ))
              
              : <></>
            }
          
          </div>

     
        </div>
      </div>
    </div>
  );
}