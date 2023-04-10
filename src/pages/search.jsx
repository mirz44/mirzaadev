import { useRouter } from "next/router";
import client from "@/apolloClient";
import Image from "next/image";
import FormatDate from "@/components/formatDate";
import Link from "next/link";
import {gql} from "@apollo/client";
import Layout from "@/components/layout";
import { useState } from "react";
import SearchForm from "@/components/searchForm";

export default function Search({posts, global}) {
  const router = useRouter()
  const { query } = router.query

  const filterSearch = ({
    page,
    searchQuery,
    category,
    tag,
  }) => {
    const { query } = router

    if (page) query.page = page
    if (searchQuery) query.searchQuery = searchQuery
    if (category) query.category = category
    if (tag) query.tag = tag

    router.push({
      pathname: router.pathname,
      query: query
    })
  }

  // const pageHandler = (e) => {
  //   filterSearch({ page })
  // }
  // const categoryHandler = (e) => {
  //   filterSearch({ category: e.target.value })
  // }
  //
  // const tagHandler = (e) => {
  //   filterSearch({ tag: e.target.value })
  // }

  return (
    <Layout data={global}>
      <h1>Search results for keyword: {query}</h1>
      <br /><br />
      <div>
        {/*<div>*/}
        {/*  <div className="my-3">*/}
        {/*    <h3>Categories</h3>*/}
        {/*    <select*/}
        {/*      className="w-full"*/}
        {/*      value={category}*/}
        {/*      onChange={categoryHandler}*/}
        {/*    >*/}
        {/*      <option value="all">All</option>*/}
        {/*      {categories && categories.map(( category ) => (*/}
        {/*        <option key={category} value={category}>{category}</option>*/}
        {/*      ))}*/}
        {/*    </select>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="have-posts">
          {posts.map((post, i) => {
            const keyword = query
            const title = post.blogTitle.toLowerCase()
            let count = 0

            if (title.includes(keyword)) {
              count = count + 1
            } else {
              count = 0
            }

            if (count > 0) {
              return (
                <div key={i}>
                  <div key={post.blogTitle}>
                    {post.blogTitle.toLowerCase().includes(query) && (
                      <div>
                        <div className='post-img'>
                          <Image src={post?.bannerImage ? post?.bannerImage.url : global?.placeholderImage.url} alt={post.blogTitle} title={post.blogTitle} width={500} height={500} />
                        </div>
                        <h3>{post.blogTitle}</h3>
                        <div className='meta'>
                          {post.postedDate && (
                            <p>Posted date: {FormatDate(post.postedDate)}</p>
                          )}
                          {post.readTime && (
                            <p>Reading time: {post.readTime} {post.readTime === '1' ? 'minute' : 'minutes'}</p>
                          )}
                          {post.tags.length > 0 && (
                            <div>Tags: {post.tags.map((tag, i, row) => (
                              <div key={i}>
                                <Link href={`/tag/${tag.slug}`} title={`Link to ${tag.tagTitle} tag listing`}>{tag.tagTitle}</Link>
                                {i + 1 === row.length ? '' : `, `}
                              </div>
                            ))}</div>
                          )}
                          Category: <Link href={`/category/${post.category.slug}`} title={`Link to ${post.category.categoryTitle} category listing`}>{post.category.categoryTitle}</Link>
                        </div>
                        <p>{post.excerpt}</p>
                        <Link href={`/post/${post.slug}`} title='Read more'>Read more</Link><br /><br />
                      </div>
                    )}
                  </div>
                </div>
              )
            }
          })}
        </div>
        <div className="no-posts">
          <p>No posts found for keyword: {query}</p>
        </div>

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
