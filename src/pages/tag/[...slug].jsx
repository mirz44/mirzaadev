import client from "@/apolloClient"
import { gql } from "@apollo/client"
import Layout from "@/components/layout"
import Posts from "@/components/posts"

export default function Tag({ tag, posts, global }) {
  return (
    <Layout data={global} title={`Tag: ${tag.tagTitle} posts`}>
      <h1 className="text-center text-3xl mb-16 max-w-3xl ml-auto mr-auto">Tag: {tag.tagTitle}</h1>
      <Posts posts={posts} global={global} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Tags {
        tags {
          id
          slug
        }
      }
    `
  })

  const { tags } = data
  const paths = tags.map( tag => ({
    params: {slug: [tag.slug]}
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
      query Tag($slug: String!) {
        tag (where: { slug: $slug }) {
          id
          tagTitle
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

  const tag = data.tag

  return {
    props: {
      tag,
      posts: tag.posts,
      global: data.globals[0]
    }
  }
}