import type {Metadata} from 'next';
import React from 'react'
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";
import {buttonVariants} from "@/components/ui/button";
import Image from "next/image";
import {api} from "@/convex/_generated/api";
import {fetchQuery, preloadQuery} from "convex/nextjs";
import {Id} from "@/convex/_generated/dataModel"
import {FALLBACK_IMAGE} from "@/app/(shared-layout)/blog/blog-card";
import {Separator} from "@/components/ui/separator";
import CommentSection from "@/components/web/comment-section";
import PostPresence from "@/components/web/post-presence";
import {getToken} from "@/lib/auth-server";
import {redirect} from "next/navigation";
import Loading from "@/components/web/loading";

interface Props {
  params: Promise<{
    postId: Id<"posts">
  }>
}


export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {postId} = await params

  const post = await fetchQuery(api.posts.getPostById, {postId: postId});

  if (!post) {
    return {
      title: "Post not found",
    }
  }

  return {
    title: post.title,
    description: post.body,
  }
}

const Page = async ({params}: Props) => {
  const {postId} = await params

  const token = await getToken()

  const [post, preloadedComments, userId] = await Promise.all([
    await fetchQuery(api.posts.getPostById, {
      postId
    }),
    await preloadQuery(api.comments.getCommentsByPostId, {
      postId: postId
    }),
    await fetchQuery(api.presence.getUserId, {}, {token})
  ])

  if (!userId) {
    return redirect("/login")
  }


  if (!post) {
    return (
        <div>
          <Loading/>
        </div>
    )
  }


  return (
      <div className={"max-w-3xl max-auto py-8 px-4 transition-transform duration-500 ease-out group-hover relative"}>
        <Link href="/blog" className={buttonVariants({variant: "ghost", className: "mb-4"})}>
          <ArrowLeftIcon className={"size-4"}/>
          Back to blog
        </Link>
        <div
            className={"relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm"}>
          <Image src={post.imageUrl ?? FALLBACK_IMAGE} alt={post.title} fill/>
        </div>

        <div className={"space-y-4 flex flex-col"}>
          <h1 className={"text-4xl font-bold tracking-tight text-foreground"}>
            {post.title}
          </h1>

          <div className={"text-black flex items-center gap-2"}>
            <p className={"text-muted-foreground text-sm"}>Posted on:
              {new Date(post._creationTime).toLocaleDateString()}
            </p>
            {userId && <PostPresence userId={userId} roomId={post._id}/>}
          </div>
        </div>

        <Separator className={"my-8"}/>

        <p className={"text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap"}>{post.body}</p>

        <Separator className={"my-8"}/>

        <CommentSection preloadedComments={preloadedComments}/>

      </div>
  )
}


export default Page
