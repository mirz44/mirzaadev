import client from "@/apolloClient";
import { gql } from "@apollo/client";
import Layout from "@/components/layout";
import PostCard from "@/components/postCard";
import Head from "next/head";

export default function Category({ category, posts, global }) {
  return (
    <Layout data={global}>
      <Head>
        <title>Category: {category.categoryTitle} | {global.sitename} | {global.siteDescription}</title>
      </Head>
      <h1>Category: {category.categoryTitle}</h1>
      <PostCard posts={posts} global={global} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Categories {
        categories {
          id
          slug
        }
      }
    `
  })

  const { categories } = data
  const paths = categories.map( category => ({
    params: {slug: [category.slug]}
  }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const slug = params.slug[0]
  const { data } = await client.query({
    query: gql`
      query Category($slug: String!) {
        category (where: { slug: $slug }) {
          id
          categoryTitle
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

  const category = data.category

  return {
    props: {
      category,
      posts: category.posts,
      global: data.globals[0]
    }
  }
}