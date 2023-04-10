import Image from "next/image"
import FormatDate from "@/components/formatDate"
import Link from "next/link"
import PostMeta from "@/components/postMeta";

export default function Posts({ posts, global }) {
  return (
    <>
      {posts.map((post, i) => {
        return (
          <div key={i} className="flex flex-col mb-12">
            <div className='post-img w-full'>
              <Image
                src={post?.bannerImage ? post?.bannerImage.url : global?.placeholderImage.url}
                alt={post.blogTitle}
                title={post.blogTitle}
                width={600}
                height={300}
                className="w-full rounded-md mb-3"
              />
            </div>
            <h3 className="pb-3 text-2xl font-semibold">{post.blogTitle}</h3>
            <PostMeta post={post} />
            <p className="pb-3">{post.excerpt}</p>
            <Link
              href={`/post/${post.slug}`}
              title='Read more'
              className="p-3 bg-yellow rounded text-black font-semibold w-fit hover:bg-yellow/75 transition-all"
            >Read more</Link>
          </div>
        )
      })}
    </>
  )
}