import React, {Suspense} from 'react'
import {api} from "@/convex/_generated/api";
import {fetchQuery} from "convex/nextjs";
import {Skeleton} from "@/components/ui/skeleton";
import {BlogCard} from "./blog-card";
import {Metadata} from "next";
import {cacheLife, cacheTag} from "next/cache";

export const metadata: Metadata = {
  title: "Blog | Next.js 16 Tutorial",
  description: "Read our latest blog articles and insights",
  category: "Web development",
  authors: [{name: "Tsvetan Markov"}],
}


const Page = () => {

  return (
      <div className={"py-12"}>
        <div className={"text-center pb-12"}>
          <h1 className={"text-4xl font-extrabold tracking-tight sm:text-5xl"}><span
              className={"text-primary"}>Our</span> Blog</h1>
          <p className={"pt-4 max-w-2xl text-muted-foreground text-xl mx-auto"}>Insights, thoughts, and trends from
            our
            team</p>
        </div>
        <Suspense fallback={<SkeletonLoadingUI/>}>
          <LoadBlogList/>
        </Suspense>
      </div>
  )
}
export default Page;


async function LoadBlogList() {


  const data = await fetchQuery(api.posts.getPosts);


  return (
      <div className={"grid gap-6 md:grid-cols-2 lg:grid-cols-3"}>
        {data?.map((item) => (
            <BlogCard
                key={item._id}
                id={item._id}
                title={item.title}
                body={item.body}
                imageUrl={item.imageUrl}
            />
        ))}
      </div>
  )
}


function SkeletonLoadingUI() {
  return (
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
            <div key={i} className={"flex flex-col space-y-3"}>
              <Skeleton className={"h-48 w-full rounded-xl"}/>
              <div className={"space-y-2 flex flex-col"}>
                <Skeleton className={"h-6 w-3/4"}/>
                <Skeleton className={"h-4 w-full"}/>
                <Skeleton className={"h-4 w-3/4"}/>
              </div>
            </div>
        ))}
      </div>
  )
}