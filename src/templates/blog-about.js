import React from 'react';
import { graphql } from 'gatsby';
import PageLayout from '../components/page-layout';
import './index.less';

export default ({ data, pageContext,location }) => {
  return <PageLayout location={location} >
    <h1>asdasd</h1>
  </PageLayout>;
};

export const pageQuery = graphql`
  query MetaData {
    site {
      siteMetadata {
        title
        description
        author
        social{
          github
        }
      }
    }
  }
`;
