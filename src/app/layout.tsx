'use client'

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import ResponsiveLayout from '@/components/layout/ResponsiveLayout';
import { cn } from '@/lib/utils';

// export const metadata: Metadata = {
//   title: 'Culinary Canvas',
//   description: 'A modern cooking and recipe application.',
// };

import { AppProvider, useAppContext } from '@/context/AppContext';

function AppBody({ children }: { children: React.ReactNode }) {
  const { largeText, textSize } = useAppContext();

  const baseFontSize = 16;
  const dynamicFontSize = largeText ? baseFontSize * (1 + (textSize / 100) * 0.5) : baseFontSize;

  return (
    <body 
      className={cn("font-body antialiased bg-background")}
      style={{ fontSize: `${dynamicFontSize}px`}}
    >
      <ResponsiveLayout>
        {children}
      </ResponsiveLayout>
      <Toaster />
    </body>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
         <title>Cooking Companion</title>
      <meta name="description" content="A modern cooking and recipe application." />
      </head>
      <AppProvider>
        <AppBody>{children}</AppBody>
      </AppProvider>
    </html>
  );
}
