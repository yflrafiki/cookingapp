
'use client';

import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isVideoPage = pathname === '/videos';
  const { largeText, textSize, highContrast } = useAppContext();

  const dynamicTextStyle = largeText ? { fontSize: `clamp(1rem, ${1 + (textSize / 100) * 0.5}rem, 2rem)` } : {};

  return (
    <main 
      className={cn(
        "flex-1 p-4 sm:p-6 lg:p-8 pb-28 md:pb-8",
        isVideoPage && "p-0 md:p-8",
        highContrast && 'high-contrast'
      )}
      style={dynamicTextStyle}
    >
      <div className={cn(
        "mx-auto h-full w-full",
        !isVideoPage && "max-w-md md:max-w-7xl"
      )}>
        {children}
      </div>
    </main>
  );
}
