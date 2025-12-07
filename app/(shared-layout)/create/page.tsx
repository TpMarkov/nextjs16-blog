import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const Page = () => {
  return (
      <div className="py-12">
        {/*Header*/}
        <div className={"text-center mb-12"}>
          <h1 className={"text-4xl font-extrabold tracking-tight sm:text-5xl"}>Create post</h1>
          <p className={"text-xl text-muted-foreground"}>Create your own blog article...</p>
        </div>

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

          </CardContent>
        </Card>
      </div>
  )
}
export default Page
