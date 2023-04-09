import { gql } from '@apollo/client'
import Head from 'next/head'
import client from "@/apolloClient";
import Image from "next/image";
import Link from "next/link";

export default function Home({posts}) {
  console.log(posts)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>mirzaa.dev - Tech Blog for Frontend Developers</title>
        <meta name="description" content="Mirzaa's Tech Blog for Frontend Developers" />
      </Head>
      <h1>mirzaa.dev</h1>
      <div className='wrapper'>
        <div className='posts'>
          {posts.map((post, i) => {
            return (
              <Link href={`post/${post.slug}`}>
                <div className='post' key={i}>
                  <h3>{post.blogTitle}</h3>
                  <div className='post-img'>
                    <Image src={post.bannerImage.url} alt={post.blogTitle} width={500} height={500} />
                  </div>
                  <p>{post.excerpt}</p>
                  <p>{post.postedDate}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Posts {
        posts {
          blogTitle
          createdAt
          excerpt
          id
          postedDate
          publishedAt
          readTime
          slug
          updatedAt
          bannerImage {
            url
          }
          content {
            raw
          }
        }
      }
    `
  })

  const { posts } = data
  return {
    props: {
      posts
    }
  }
}
