import { useRouter } from "next/router"
import client from "@/apolloClient"
import {gql} from "@apollo/client"
import Layout from "@/components/layout"
import PostItem from "@/components/postItem"

export default function Search({posts, global}) {
  const router = useRouter()
  const { query } = router.query
  let count = 0

  /*
  TODO:
  1. Have the search form on the page
  2. Form to have the search term
  3. Clear search query
  4. Order search results by post, category and tags
  */

  return (
    <Layout data={global}>
      <h1 className="text-center text-3xl mb-16 max-w-3xl ml-auto mr-auto">Search results for keyword: {query}</h1>
      <>
        <div className="have-posts">
          {posts.map((post, i) => {
            const keyword = query ? query.toLowerCase() : query
            const title = post.blogTitle.toLowerCase()

            if (title.includes(keyword)) {
              count = count + 1
            } else {
              count = 0
            }

            if (count > 0) {
              return (
                <PostItem i={i} post={post} global={global} />
              )
            }
          })}
        </div>
        <div className="no-posts">
          <p className="text-center text-2xl md:text-5xl text-red mb-16 max-w-3xl ml-auto mr-auto">No posts found</p>
        </div>
      </>
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
