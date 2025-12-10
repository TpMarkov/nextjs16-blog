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

  try {
    const token = await getToken();

    const imageUrl = await fetchMutation(api.posts.generateImageUploadUrl, {}, {token})

    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type":
        parsedData.data.image.type,
      },
      body: parsedData.data.image
    })

    if (!uploadResult.ok) {
      return {
        error: "Failed to upload image"
      }
    }


    const {storageId} = await uploadResult.json();

    await fetchMutation(api.posts.createPost, {
      body: parsedData.data.content,
      title: parsedData.data.title,
      imageStorageId: storageId
    }, {
      token
    })

  } catch (e) {
    return {
      error: "Failed to create a post"
    }
  }

  redirect(`/blog`)

}


