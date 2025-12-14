"use client"

import {useState} from 'react'
import {Input} from "@/components/ui/input"
import {Loader2Icon, SearchIcon} from "lucide-react";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import Link from "next/link";

export const SearchInput = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = useState(false);

  const results = useQuery(api.posts.searchPosts, searchQuery.length >= 2 ? {limit: 5, term: searchQuery} : "skip")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(true)
    setSearchQuery(e.currentTarget.value)

  }

  return (
      <div className="relative w-full max-w-sm">
        <div className={"relative"}>
          <SearchIcon className={"absolute left-2.5 top-2.5 size-4 text-muted-foreground"}/>
          <Input type={"search"} placeholder={"Search posts..."}
                 className={"w-full pl-8 bg-background"}
                 value={searchQuery}
                 onChange={handleInputChange}
          />
        </div>
        {open && searchQuery.length >= 2 && (
            <div
                className={"z-10 absolute top-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"}>
              {results === undefined ? (
                  <div className={"flex items-center justify-center p-4 text-sm text-muted-foreground"}>
                    <Loader2Icon className={"mr-2 animate-spin size-4"}/>
                    Searching...
                  </div>
              ) : results.length === 0 ? (
                  <p className={"p-4 text-sm text-muted-foreground text-center"}>No results found!</p>
              ) : (
                  <div className="py-1 z-10">
                    {results.map((result) => (
                        <Link href={`/blog/${result._id}`} key={result._id}
                              onClickCapture={() => setOpen(false)}
                              className={"w-full flex flex-col px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"}
                        >
                          <p className={"font-medium truncate"}>{result.title}</p>
                          <p className={"text-xs text-muted-foreground pt-1"}>{result.body.substring(0, 60)}</p>
                        </Link>
                    ))}
                  </div>
              )}

            </div>
        )}
      </div>
  )
}
