import React from "react"
import client from "@/apolloClient"
import {gql} from "@apollo/client"
import Image from "next/image"
import Layout from "@/components/layout"
import PostMeta from "@/components/postMeta"
import PostTags from "@/components/postTags"

export default function Post({ post, global }) {
  return (
    <Layout title={post.blogTitle} data={global}>
      <h1 className="text-center text-3xl mb-10 max-w-3xl ml-auto mr-auto">{post.blogTitle}</h1>
      <div className='flex text-center items-center justify-center mb-10'>
        <PostMeta post={post} single />
        <PostTags post={post} />
      </div>
      {post?.bannerImage && (
        <div className='post-img md:w-full max-w-6xl ml-auto mr-auto'>
          <Image className='w-full mb-10' src={post?.bannerImage ? post?.bannerImage.url : global?.placeholderImage.url} alt={post.blogTitle} title={post.blogTitle} width={500} height={500} />
        </div>
      )}

      <div className='w-full md:w-3/4 xl:1/2 xl:max-w-7xl ml-auto mr-auto flex flex-col'>
        <div className='post-content single' dangerouslySetInnerHTML={{__html:post.content.html}} />
      </div>
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