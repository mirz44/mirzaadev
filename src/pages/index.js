import { gql } from '@apollo/client'
import client from "@/apolloClient"
import Layout from "@/components/layout"
import Posts from "@/components/posts"
import SearchForm from "@/components/searchForm"

export default function Home( {posts, global} ) {
  return (
    <Layout title="Home" data={global}>
      <SearchForm />
      <h2 className="text-center text-3xl mb-16 max-w-3xl ml-auto mr-auto">
        {global.siteDescription}
      </h2>
      <div className="flex max-w-2xl flex-col justify-center ml-auto mr-auto">
        <Posts posts={posts} global={global} />
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
