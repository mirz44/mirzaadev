import PostItem from "@/components/postItem"

export default function Posts({ posts, global }) {
  return (
    <>
      {posts.map((post, i) => {
        return (
          <PostItem i={i} post={post} global={global} />
        )
      })}
    </>
  )
}