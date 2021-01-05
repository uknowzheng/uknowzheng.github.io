import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

class NotFoundPage extends React.Component {
  render () {
    const {data} = this.props;
    const {siteMetadata} = data.site;
    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <SEO title="404: Not Found" />
        <h1>找不到资源</h1>
        <p>页面上了外太空了呢......</p>
      </Layout>
    );
  }
}

export default NotFoundPage;

export const pageQuery = graphql`
  query {
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
  }
`;
