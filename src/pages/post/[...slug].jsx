import React from "react"
import client from "@/apolloClient";
import {gql} from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import FormatDate from "@/components/formatDate";
import Layout from "@/components/layout";

export default function Post({ post, global }) {
  return (
    <Layout data={global}>
      <div className='post-img'>
        <Image src={post?.bannerImage ? post?.bannerImage.url : global?.placeholderImage.url} alt={post.blogTitle} title={post.blogTitle} width={500} height={500} />
      </div>
      <h1>{post.blogTitle}</h1>
      <div className='meta'>
        <p>Posted date: {FormatDate(post.postedDate)}</p>
        <p>Reading time: {post.readTime} {post.readTime === '1' ? 'minute' : 'minutes'}</p>
        {post.tags.length > 0 && (
          <div>Tags: {post.tags.map((tag, i, row) => (
            <div key={i}>
              <Link href={`/tag/${tag.slug}`}>{tag.tagTitle}</Link>
              {i + 1 === row.length ? '' : `, `}
            </div>
          ))}</div>
        )}
        Category: <Link href={`/category/${post.category.slug}`}>{post.category.categoryTitle}</Link>
      </div>
      <div dangerouslySetInnerHTML={{__html:post.content.html}} />
    </Layout>
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
            html
          }
          category {
            categoryTitle
            slug
          }
          tags {
            tagTitle
            slug
          }
        }
        globals {
          sitename
          siteDescription
          copyrightText
          id
          logo {
            url
          }
          placeholderImage {
            url
          }
          favicon {
            url
          }
        }
      }
    `,
    variables: {slug}
  })

  const { posts, globals } = data
  const post = posts[0]

  return {
    props: {
      post,
      global: globals[0]
    }
  }
}