import { gql } from '@apollo/client'
import Head from 'next/head'
import client from "@/apolloClient"
import Image from "next/image"
import Link from "next/link"
import FormatDate from "@/components/formatDate"
import Layout from "@/components/layout"
import PostCard from "@/components/postCard";

export default function Home( {posts, global} ) {
  return (
    <Layout data={global}>
        <Head>
          <title>Home | {global.sitename} | {global.siteDescription}</title>
        </Head>
        <div className='wrapper'>
          <PostCard posts={posts} global={global} />
        </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Posts {
        posts (orderBy: postedDate_DESC) {
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
    `
  })

  const { posts, globals } = data
  return {
    props: {
      posts,
      global: globals[0]
    }
  }
}
