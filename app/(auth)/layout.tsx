import React from 'react'
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
    >
      <div className={"absolute top-5 left-5"}>
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
          <ArrowLeftIcon />
          Go back
        </Link>
      </div>
      <div className={"w-full max-w-md mx-auto"}>
        {children}
      </div>
    </div>
  )
}
export default Layout
