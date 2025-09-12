
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/context/AppContext';
import { fontBody, fontHeadline } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';
import ResponsiveLayout from '@/components/layout/ResponsiveLayout';
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Culinary Canvas",
  description: "Group D cooking companion app for HCI project",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["cooking" , "ai"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "GroupD",
      url: "https://github.com/yflrafiki/cookingapp.git",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

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
