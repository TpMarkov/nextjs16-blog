import {z} from "zod"


/**
 * Types for create new blog post form
 */

export const postSchema = z.object({
  title: z.string().min(8).max(50),
  content: z.string().min(10)
})
export type postSchemaValues = z.infer<typeof postSchema>