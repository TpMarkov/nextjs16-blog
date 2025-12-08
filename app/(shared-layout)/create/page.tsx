"use client"
import React, { useTransition } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { postSchema, postSchemaValues } from "@/app/schemas/blog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { createBlogPost } from "@/app/actions";


const Page = () => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    }
  });

  const createBlog = useMutation(api.posts.createPost);

  const onSubmit = (data: z.infer<typeof postSchema>) => {
    try {
      startTransition(async () => {
        await createBlogPost(data)
      })
    } catch {
      toast.error("Failed to create post")
    } finally {
      form.reset()
    }
  }

  return (
    <div className="py-12">
      {/*Header*/}
      <div className={"text-center mb-12"}>
        <h1 className={"text-4xl font-extrabold tracking-tight sm:text-5xl mb-3"}>Create post</h1>
        <p className={"text-xl text-muted-foreground"}>Create your own blog article...</p>
      </div>

      {/*Form card*/}
      <Card className={"w-full max-w-xl mx-auto"}>
        <CardHeader>
          <CardTitle>
            Create blog article
          </CardTitle>
          <CardDescription>
            Create a new blog article
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input placeholder="Type the title of your article" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )} name={"title"} control={form.control} />
              <Controller render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Content</FieldLabel>
                  <Textarea placeholder="Type your text in here"
                    className={"min-h-[80px] max-h-[120px] overflow-auto"} {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )} name={"content"} control={form.control} />
              <Button disabled={isPending} type={"submit"}>
                {isPending ? (<Loader2Icon className={"size-4 animate-spin"} />) : "Create Post"}
              </Button>
            </FieldGroup>

          </form>

        </CardContent>
      </Card>

    </div>
  )
}
export default Page
