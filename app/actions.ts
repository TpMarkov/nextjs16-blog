"use server"

import {postSchema} from "@/app/schemas/blog";
import {z} from "zod"
import {fetchMutation} from "convex/nextjs";
import {api} from "@/convex/_generated/api";
import {redirect} from "next/navigation";
import {getToken} from "@/lib/auth-server";

export async function createBlogPost(values: z.infer<typeof postSchema>) {
  const parsedData = postSchema.safeParse(values)

  if (!parsedData.success) {
    throw new Error("Failed to parse blog form")
  }

  const token = await getToken();

  await fetchMutation(api.posts.createPost, {
    body: parsedData.data.content,
    title: parsedData.data.title,
  }, {
    token
  })

  return redirect(`/blog`)

}


