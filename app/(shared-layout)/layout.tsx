import React from 'react'
import Navbar from "@/components/web/navbar";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create Post",
  description: "Create and share your blog posts with the NextPro Blog community. Write, upload images, and publish your ideas.",
  robots: {
    index: false, // Don't index the create page
    follow: true,
  },
};


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (

    <>
      <Navbar />
      {children}
    </>
  )
}
export default Layout
