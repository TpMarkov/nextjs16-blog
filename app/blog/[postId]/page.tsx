import React from 'react'

interface Props {
  params: Promise<{
    postId: string
  }>
}

const Page = async ({params}: Props) => {
  const {postId} = await params

  return (
      <div>Id: {postId}</div>
  )
}
export default Page
