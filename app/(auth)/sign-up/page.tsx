"use client"
import React, {useTransition} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {signUpFormVlues, signUpSchema} from "@/app/schemas/auth";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Loader2Icon} from "lucide-react";

const Page = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: signUpFormVlues) => {
    startTransition(async () => {
      await authClient.signUp.email({
        email: values.email,
        name: values.name,
        password: values.password,
        fetchOptions: {
          onSuccess: values => {
            toast.success("Email successfully signed up!");

          }, onError: (err) => {
            toast.error(err.error.message)
          },
        }
      })
    })
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller render={({field, fieldState}) => (
                  <Field>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input placeholder="John Doe" {...field}/>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]}/>
                    )}
                  </Field>
              )} name={"name"} control={form.control}/>
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
                                                           href={"/login"}>Login </Link>here
              </span>
              <Button type={"submit"} disabled={isPending}>
                {isPending ? (
                    <Loader2Icon className={"size-4 animate-spin"}/>
                ) : "Sign Up"}
              </Button>
            </FieldGroup>

          </form>
        </CardContent>
      </Card>
  )
}
export default Page
