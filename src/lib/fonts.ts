import { PT_Sans, Space_Grotesk } from "next/font/google";

export const fontBody = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

export const fontHeadline = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
});
