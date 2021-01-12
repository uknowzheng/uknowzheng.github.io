import React from 'react';
import { graphql } from 'gatsby';
import PageLayout from '../components/page-layout';
import List from '../components/list';
import './index.less';

export default ({ data, pageContext,location }) => {
  const dataSource = data.allMarkdownRemark.edges;
  return <PageLayout location={location} >
    <List dataSource={dataSource} pagination={pageContext} />
  </PageLayout>;
};

export const pageQuery = graphql`
query($skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    limit: $limit
    skip: $skip
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
`;
