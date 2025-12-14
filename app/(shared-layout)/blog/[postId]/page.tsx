import type { Metadata } from 'next';
import React from 'react'
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel"
import { FALLBACK_IMAGE } from "@/app/(shared-layout)/blog/blog-card";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/web/comment-section";
import PostPresence from "@/components/web/post-presence";
import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import Loading from "@/components/web/loading";
import { generateArticleStructuredData, generateBreadcrumbStructuredData } from "@/lib/structured-data";

interface Props {
  params: Promise<{
    postId: Id<"posts">
  }>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = await params

  const post = await fetchQuery(api.posts.getPostById, { postId: postId });

  if (!post) {
    return {
      title: "Post not found",
      description: "The requested blog post could not be found.",
    }
  }

  // Truncate description to 155-160 characters for optimal SEO
  const truncatedDescription = post.body.length > 160
    ? post.body.slice(0, 157) + '...'
    : post.body;

  const postUrl = `/blog/${postId}`;
  const imageUrl = post.imageUrl || FALLBACK_IMAGE;

  return {
    title: post.title,
    description: truncatedDescription,
    keywords: post.title.split(' ').slice(0, 5), // Extract keywords from title
    authors: [{ name: 'Tsvetan Markov' }],
    openGraph: {
      title: post.title,
      description: truncatedDescription,
      type: 'article',
      url: postUrl,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: post.title,
      }],
      publishedTime: new Date(post._creationTime).toISOString(),
      authors: ['Tsvetan Markov'],
      section: 'Technology',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: truncatedDescription,
      images: [imageUrl],
    },
  }
}

const Page = async ({ params }: Props) => {
  const { postId } = await params

  const token = await getToken()

  const [post, preloadedComments, userId] = await Promise.all([
    await fetchQuery(api.posts.getPostById, {
      postId
    }),
    await preloadQuery(api.comments.getCommentsByPostId, {
      postId: postId
    }),
    await fetchQuery(api.presence.getUserId, {}, { token })
  ])

  if (!userId) {
    return redirect("/login")
  }



  if (!post) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  // Generate structured data for SEO
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const articleStructuredData = generateArticleStructuredData(post, baseUrl);
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blog` },
    { name: post.title, url: `${baseUrl}/blog/${post._id}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <div className={"max-w-3xl max-auto py-8 px-4 transition-transform duration-500 ease-out group-hover relative"}>
        <Link href="/blog" className={buttonVariants({ variant: "ghost", className: "mb-4" })}>
          <ArrowLeftIcon className={"size-4"} />
          Back to blog
        </Link>
        <div
          className={"relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm"}>
          <Image src={post.imageUrl ?? FALLBACK_IMAGE} alt={post.title} fill />
        </div>

        <div className={"space-y-4 flex flex-col"}>
          <h1 className={"text-4xl font-bold tracking-tight text-foreground"}>
            {post.title}
          </h1>

          <div className={"text-black flex items-center gap-2"}>
            <p className={"text-muted-foreground text-sm"}>Posted on:
              {new Date(post._creationTime).toLocaleDateString()}
            </p>
            {userId && <PostPresence userId={userId} roomId={post._id} />}
          </div>
        </div>

        <Separator className={"my-8"} />

        <p className={"text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap"}>{post.body}</p>

        <Separator className={"my-8"} />

        <CommentSection preloadedComments={preloadedComments} />

      </div>
    </>
  )
}


export default Page
