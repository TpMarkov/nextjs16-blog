import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


export const signUpSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.email(),
  password: z.string().min(8).max(30)
})
export type signUpFormVlues = z.infer<typeof signUpSchema>


export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(30)
})
export type signInFormVlues = z.infer<typeof signInSchema>
