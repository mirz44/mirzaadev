import FormatDate from "@/components/formatDate"
import Link from "next/link"

export default function PostMeta({ post }) {
  return (
    <div className='meta flex mb-3'>
      <Link className='mr-3 text-sm' href={`/category/${post.category.slug}`} title={`Link to ${post.category.categoryTitle} category listing`}>{post.category.categoryTitle}</Link>
      {post.postedDate && (
        <p className="mr-3 opacity-70 text-sm">{FormatDate(post.postedDate)}</p>
      )}
      {post.readTime && (
        <p className="mr-3 opacity-70 text-sm italic">{post.readTime} {post.readTime === '1' ? 'min' : 'mins'} reading time</p>
      )}
    </div>
  )
}