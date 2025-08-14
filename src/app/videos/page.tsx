
import { Button } from "@/components/ui/button";
import { ThumbsUp, Heart, Share2, Download } from "lucide-react";
import Image from "next/image";

export default function VideosPage() {
  return (
      <div className="relative md:w-full h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)] -mx-4 -mt-4 sm:-mt-6 lg:-mt-8 rounded-none md:rounded-2xl overflow-hidden">
        <Image
          src="/video.png"
          alt="Cooking video"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <div className="absolute bottom-20 right-4 z-20 flex flex-col gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80 h-10 w-10">
                <ThumbsUp className="h-6 w-6"/>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80 h-10 w-10">
                <Heart className="h-6 w-6"/>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80 h-10 w-10">
                <Share2 className="h-6 w-6"/>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80 h-10 w-10">
                <Download className="h-6 w-6"/>
            </Button>
        </div>
      </div>
  );
}
