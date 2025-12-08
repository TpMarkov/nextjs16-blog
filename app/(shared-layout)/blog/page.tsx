"use client"

import React, {useTransition} from 'react'
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {motion} from "framer-motion";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

const images = [
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      "https://images.unsplash.com/photo-1599058917212-d750089bc07c",
      "https://images.unsplash.com/photo-1550345332-09e3ac987658",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      "https://images.unsplash.com/photo-1558611848-73f7eb4001a1",
      "https://images.unsplash.com/photo-1594737625785-cf1bd7be8214",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    ]
;


const Page = () => {
  const data = useQuery(api.posts.getPosts)

  return (
      <div className={"py-12"}>
        <div className={"text-center pb-12"}>
          <h1 className={"text-4xl font-extrabold tracking-tight sm:text-5xl"}>Our Blog</h1>
          <p className={"pt-4 max-w-2xl text-muted-foreground text-xl mx-auto"}>Insights, thoughts, and trends from
            our
            team</p>
        </div>

        <div className={"grid gap-6 md:grid-cols-2 lg:grid-cols-3"}>
          {data?.map((item, index) => (
              <motion.div
                  key={item._id}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.4, delay: index * 0.1}}
              >
                <Card className="rounded-2xl pt-0 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                  <motion.div whileHover={{scale: 1.05}} className="h-48 w-full relative overflow-hidden">
                    <Image
                        src={images[index] || images[0]}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300"
                    />
                  </motion.div>

                  <CardHeader>
                    <CardTitle
                        className="text-xl font-semibold hover:text-blue-500/50">
                      <Link href={`/blog/${item._id}`}>
                        {item.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground hover:text-muted-foreground/50 dark:text-gray-300">
                      {item.body}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link className={buttonVariants({variant: "outline"})}
                          href={`/blog/${item._id}`}>
                      Read more
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
          ))}
        </div>
      </div>
  )
}
export default Page;