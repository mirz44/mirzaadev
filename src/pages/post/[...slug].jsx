import React from "react"
import client from "@/apolloClient";
import {gql} from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

export default function Post({ post }) {
  return (
    <main>
      <Link href='/'>Back</Link>
      <div className='post-img'>
        <Image src={post.bannerImage.url} alt={post.blogTitle} width={500} height={500} />
      </div>
      <h1>{post.blogTitle}</h1>
      <div className='meta'>
        <p>Posted date: {post.postedDate}</p>
        <p>Reading time: {post.readTime} {post.readTime === '1' ? 'min' : 'mins'}</p>
        <p>Category: {post.postCategories[0]}</p>
      </div>
      <div dangerouslySetInnerHTML={{__html:post.content.html}} />
    </main>
  )
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Posts {
        posts {
          slug
        }
      }
    `
  })

  const { posts } = data
  const paths = posts.map( post => ({
    params: {slug: [post.slug]}
  }))
  return {paths, fallback: false}
}

export async function getStaticProps({params}) {
  const slug = params.slug[0]
  const { data } = await client.query({
    query: gql`
      query Post($slug: String!) {
        posts (where: { slug: $slug }) {
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
            html
          }
          postCategories
        }
      }
    `,
    variables: {slug}
  })

  const { posts } = data
  const post = posts[0]

  return {
    props: {
      post
    }
  }
}