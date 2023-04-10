import Image from "next/image"
import Link from "next/link"
import PostMeta from "@/components/postMeta"
import PostTags from "@/components/postTags"

export default function PostItem({ post, global }) {
  return (
    <div className="flex flex-col mb-12">
      <div className='post-img w-full'>
        <Link href={`/post/${post.slug}`}>
          <Image
            src={post?.bannerImage ? post?.bannerImage.url : global?.placeholderImage.url}
            alt={post.blogTitle}
            title={post.blogTitle}
            width={600}
            height={300}
            className="w-full rounded-md mb-5"
          />
        </Link>
      </div>
      <PostMeta post={post} />
      <h3 className="pb-3 text-2xl font-semibold">{post.blogTitle}</h3>
      <p className="pb-7">{post.excerpt}</p>
      <div className='flex justify-start items-center'>
        <Link
          href={`/post/${post.slug}`}
          title='Read more'
          className="pt-2 pb-2 pl-3 pr-3 bg-yellow rounded text-black font-semibold w-fit mr-auto"
        >Read more</Link>
        <PostTags post={post} />
      </div>
    </div>
  )
}