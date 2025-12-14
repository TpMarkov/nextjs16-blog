"use client"
import React from 'react'
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {ThemeToggle} from "@/components/ui/theme-toggle";
import {useConvexAuth} from "convex/react";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {SearchInput} from "@/components/web/search-input";


const Navbar = () => {
  const {isAuthenticated} = useConvexAuth()
  const router = useRouter()

  return (
      <nav className={"w-full py-5 flex items-center justify-between"}>

        <div className="flex items-center gap-8">
          <Link href="/">
            <h1 className={"text-3xl font-bold"}>
              Next<span className={"text-blue-500"}>Pro</span>
            </h1>
          </Link>
          {isAuthenticated && (<div className="flex items-center gap-2">
            <Link className={buttonVariants({variant: "ghost"})} href="/">
              Home
            </Link>
            <Link className={buttonVariants({variant: "ghost"})} href="/blog">
              Blog
            </Link>
            <Link className={buttonVariants({variant: "ghost"})} href="/create">
              Create
            </Link>
          </div>)}
        </div>

        {isAuthenticated ? (<div className={"flex items-center gap-2"}>
              {/*Search bar*/}
              <div className="hidden md:block mr-2">
                <SearchInput/>
              </div>
              <Button onClick={() => authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logged out successfully!");
                    router.push("/")
                  }, onError: (error) => {
                    toast.error(error.error.message)
                  }
                }
              })}>

                Sign Out
              </Button>
              <ThemeToggle/>
            </div>
        ) : (<div className="flex items-center gap-2">
          <Link className={buttonVariants({variant: "outline"})} href="/login">Login</Link>
          <Link className={buttonVariants({variant: "default"})} href={"/sign-up"}>Sign Up</Link>
          <ThemeToggle/>
        </div>)}

      </nav>
  )
}
export default Navbar
