"use client"
import React, {startTransition, useTransition} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {signInFormVlues, signInSchema, signUpSchema} from "@/app/schemas/auth";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Loader2Icon} from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: signInFormVlues) => {
    startTransition(async () => {
      await authClient.signIn.email({
        email: values.email,
        password: values.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Login successfully!");
            router.push("/")
          }, onError: (err) => {
            toast.error(err.error.message)
          }
        }
      })
    })
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Sign in to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller render={({field, fieldState}) => (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input type={"email"} placeholder="example@mail.com" {...field}/>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]}/>
                    )}
                  </Field>
              )} name={"email"} control={form.control}/>
              <Controller render={({field, fieldState}) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input type={"password"} placeholder="********" {...field}/>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]}/>
                    )}
                  </Field>
              )} name={"password"} control={form.control}/>
              <span className={"text-sm text-muted-foreground"}>
                You dont have an account yet. Please <Link className="text-blue-500 underline text-sm"
                                                           href={"/sign-up"}>Sign Up </Link>here
              </span>
              <Button disabled={isPending} type="submit">
                {isPending ? (
                    <Loader2Icon className={"size-4 animate-spin"}/>
                ) : "Sign In"}
              </Button>
            </FieldGroup>

          </form>
        </CardContent>
      </Card>
  )
}
export default Page
