import Link from "next/link"

export default function PostTags({ post }) {
  return (
    <div className='tags flex'>
      {post.tags.length > 0 && (
        <>
          {post.tags.map((tag, i) => (
            <div className='tag-item' key={i}>
              <Link key={i} className='text-sm p-2 pt-1 pb-1 bg-gray-800 rounded text-yellow ml-2' href={`/tag/${tag.slug}`} title={`Link to ${tag.tagTitle} tag listing`}>{tag.tagTitle}</Link>
            </div>
          ))}
        </>
      )}
    </div>
  )
}