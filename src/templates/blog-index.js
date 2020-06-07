import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import "./index.scss"

class BlogIndex extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { totalPage, currentPage, pageScore } = pageContext
    const siteTitle = data.site.siteMetadata.title
    const social = data.site.siteMetadata.social
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle} social={social}>
        <SEO title="All posts" />
        <div className="main">
          <aside
            style={{
              width: rhythm(8),
            }}
          >
            <Bio />
          </aside>

          <article
            style={{
              width: rhythm(28),
              height: "100%",
            }}
          >
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div key={node.fields.slug}>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <small>{node.frontmatter.date}</small>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </div>
              )
            })}
          </article>
        </div>
        <footer>
          <div className="page">
            {currentPage - 1 > 0 && (
              <Link
                to={currentPage - 1 === 1 ? "/" : "/page/" + currentPage - 1}
                rel="prev"
              >
                上一页
              </Link>
            )}
            {(pageScore || []).map(v => {
              return (
                <Link
                  style={{ color: v === currentPage ? "red" : null }}
                  to={v === 1 ? "/" : "/page/" + v}
                >
                  {v}
                </Link>
              )
            })}
            {currentPage + 1 <= totalPage && (
              <Link to={"/page/" + (currentPage + 1)} rel="next">
                下一页
              </Link>
            )}
          </div>
        </footer>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
        author
        social {
          github
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
