import React from "react"
import { graphql } from "gatsby"
import PageLayout from "../components/page-layout"
import List from "../components/list"
import "./index.less"

export default ({ data, pageContext, location }) => {
  const dataSource = data.allMarkdownRemark.edges;
  const { current, pageSize, total } = pageContext;
  return (
    <PageLayout location={location}>
      <List dataSource={dataSource} pagination={{ current, pageSize, total }} />
    </PageLayout>
  )
}

export const pageQuery = graphql`
  query($offset: Int!, $pageSize: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $pageSize
      skip: $offset
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            slug
            date: date(formatString: "YYYY-MM-DD")
          }
          internal {
            description
          }
        }
      }
    }
  }
`
