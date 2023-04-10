import FormatDate from "@/components/formatDate"
import Link from "next/link"

export default function PostMeta({ post }) {
  return (
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
  )
}