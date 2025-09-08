
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/context/AppContext';
import { fontBody, fontHeadline } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';
import ResponsiveLayout from '@/components/layout/ResponsiveLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <title>Culinary Canvas</title>
        <meta name="description" content="A modern cooking and recipe application." />
      </head>
      <body className={cn(fontBody.variable, fontHeadline.variable)}>
        <AppProvider>
          <SidebarProvider>
            <ResponsiveLayout>
              {children}
            </ResponsiveLayout>
          </SidebarProvider>
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
