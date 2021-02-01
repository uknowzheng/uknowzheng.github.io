import React from 'react';
import { graphql } from 'gatsby';
import PageLayout from '../components/page-layout';
import './index.less';

export default ({data,location}) => {
  console.log(data)
  const { site } = data; 
  const { siteMetadata } = site || {};
  const { author, description, title, social } = siteMetadata || {};

  return <PageLayout location={location} >
    <h1>{author}</h1>
    <h2>{description}</h2>
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
