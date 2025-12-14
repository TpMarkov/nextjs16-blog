import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ConvexClientProvider } from "@/app/ConvexClientProvider";
import { Toaster } from "sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'NextPro Blog - Share Your Ideas with the World',
    template: '%s | NextPro Blog'
  },
  description: 'A modern blogging platform with real-time collaboration, rich commenting, and beautiful content creation tools. Join our community of writers and share your ideas.',
  keywords: ['blog', 'nextjs', 'writing', 'community', 'real-time collaboration', 'content creation', 'nextjs 16', 'modern blog', 'blogging platform'],
  authors: [{ name: 'Tsvetan Markov' }],
  creator: 'Tsvetan Markov',
  publisher: 'NextPro Blog',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'NextPro Blog',
    title: 'NextPro Blog - Share Your Ideas with the World',
    description: 'A modern blogging platform with real-time collaboration, rich commenting, and beautiful content creation tools.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'NextPro Blog - Modern Blogging Platform',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextPro Blog - Share Your Ideas with the World',
    description: 'A modern blogging platform with real-time collaboration, rich commenting, and beautiful content creation tools.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className={"max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8"}>

            <ConvexClientProvider>
              {children}
              <Toaster />
            </ConvexClientProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
