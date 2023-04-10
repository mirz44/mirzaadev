import Image from "next/image"
import FormatDate from "@/components/formatDate"
import Link from "next/link"

export default function Posts({ posts, global }) {
  return (
    <>
      {posts.map((post, i) => {
        return (
          <div key={i}>
            <div className='post-img'>
              <Image src={post?.bannerImage ? post?.bannerImage.url : global?.placeholderImage.url} alt={post.blogTitle} title={post.blogTitle} width={500} height={500} />
            </div>
            <h3>{post.blogTitle}</h3>
            <div className='meta'>
              {post.postedDate && (
                <p>Posted date: {FormatDate(post.postedDate)}</p>
              )}
              {post.readTime && (
                <p>Reading time: {post.readTime} {post.readTime === '1' ? 'minute' : 'minutes'}</p>
              )}
              {post.tags.length > 0 && (
                <div>Tags: {post.tags.map((tag, i, row) => (
                  <div key={i}>
                    <Link href={`/tag/${tag.slug}`} title={`Link to ${tag.tagTitle} tag listing`}>{tag.tagTitle}</Link>
                    {i + 1 === row.length ? '' : `, `}
                  </div>
                ))}</div>
              )}
              Category: <Link href={`/category/${post.category.slug}`} title={`Link to ${post.category.categoryTitle} category listing`}>{post.category.categoryTitle}</Link>
            </div>
            <p>{post.excerpt}</p>
            <Link href={`/post/${post.slug}`} title='Read more'>Read more</Link><br /><br />
          </div>
        )
      })}
    </>
  )
}