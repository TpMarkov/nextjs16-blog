"use client"
import React, {useTransition} from 'react'
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Loader2Icon, MessageSquareIcon} from "lucide-react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {commentSchema} from "@/app/schemas/comments";
import {z} from "zod"
import {Field, FieldError, FieldLabel} from "@/components/ui/field";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";
import {Id} from "@/convex/_generated/dataModel";
import {Preloaded, usePreloadedQuery, useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";

const CommentSection = (props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>
}) => {
  const params = useParams<{ postId: Id<"posts"> }>();

  const data = usePreloadedQuery(
      props.preloadedComments,
  );

  const createComment = useMutation(api.comments.createComment);

  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: params.postId
    }
  });

  if (data === undefined) {
    return (
        <div className={"h-full items-center justify-center mx-auto"}>
          <Loader2Icon className={"animate-spin size-4"}/>
        </div>
    )
  }

  const onSubmit = (data: z.infer<typeof commentSchema>) => {

    startTransition(async () => {
      try {
        await createComment(data)
        toast.success("Comment successfully created!", {
          position: "top-center",
        })
        form.reset()
      } catch {
        toast.error("Failed to create post!")
      }
    })

  }

  return (
      <Card>
        <CardHeader className={"text-center flex items-center gap-2 border-b"}>
          <MessageSquareIcon className={"size-4"}/>
          <h2 className="text-xl font-bold">
            {data?.length === 0
                ? "No Comments Yet"
                : data?.length === 1
                    ? "1 Comment"
                    : `${data.length} Comments`}
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)();
                  }
                }}
                className={"space-y-4 flex flex-col mb-5"}>
            <Controller render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Add Comment</FieldLabel>
                  <Textarea
                      className={"max-h-[150px] overflow-y-auto"}
                      placeholder="Share your thoughts" {...field}/>
                  {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]}/>
                  )}
                  {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                </Field>
            )} name={"body"} control={form.control}/>
            <Button type={"submit"} disabled={isPending} className={"self-end"}>
              {isPending ? (<>
                    <Loader2Icon className={"size-4 animate-spin"}/>
                    <p>Sending...</p>
                  </>
              ) : "Submit"}
            </Button>
          </form>
          {data?.length > 0 && (
              <Separator className={"my-5"}/>
          )}
          <section className={"flex gap-y-5 flex-col"}>
            {data?.map((comment) => (
                <div key={comment._id} className={"flex gap-2"}>
                  <Avatar className={"size-10 shrink-0"}>
                    <AvatarImage src={`https://avatar.vercel.sh/${comment.authorName}`} alt={"user-avatar"}
                    />
                    <AvatarFallback>
                      {comment.authorName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className={"flex flex-col w-full"}>
                    <div className={"flex items-center gap-2 w-full justify-between"}>
                      <p className={"font-semibold text-sm"}>{comment.authorName}</p>
                      <p className={"text-muted-foreground text-xs"}>{new Date(comment._creationTime).toLocaleDateString()}</p>
                    </div>
                    <p className={"text-foreground/90 text-sm"}>{comment.body}</p>
                  </div>

                </div>
            ))}
          </section>

        </CardContent>
      </Card>
  )
}
export default CommentSection
