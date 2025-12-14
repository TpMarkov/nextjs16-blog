"use client"

import React from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

interface BlogCardProps {
  id: string;
  title: string;
  body: string;
  imageUrl: string | null;
}

// Neutral fallback image that works well in both light and dark modes
export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1686491970798-a9492598f6e0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://plus.unsplash.com/premium_photo-1701590725721-add548ecdf61?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function BlogCard({id, title, body, imageUrl}: BlogCardProps) {
  const displayImage = imageUrl ?? FALLBACK_IMAGE;

  return (
      <Card className="group rounded-2xl pt-0 shadow-lg hover:shadow-xl transition-all overflow-hidden">
        <div className="h-48 w-full relative overflow-hidden">
          <Image
              src={displayImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <CardHeader>
          <CardTitle className="text-xl font-semibold hover:text-blue-500/50">
            <Link href={`/blog/${id}`}>
              {title}
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground hover:text-muted-foreground/50 dark:text-gray-300">
            {body}
          </p>
        </CardContent>

        <CardFooter>
          <Link className={buttonVariants({variant: "outline"})} href={`/blog/${id}`}>
            Read more
          </Link>
        </CardFooter>
      </Card>
  )
}
