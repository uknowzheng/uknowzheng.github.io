import React from 'react';
import {Link, graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import {rhythm, scale} from '../utils/typography';

class BlogPostTemplate extends React.Component {
  render () {
    const {data, pageContext,location} = this.props;
    const post = data.markdownRemark;
    const siteMetadata = data.site.siteMetadata;
    const {previous, next} = pageContext;
    return (
      <Layout location={location} siteMetadata={siteMetadata}>
        <article
          style={{
            width: rhythm (28),
            height: '100%',
          }}
        >
          <h1
            style={{
              marginTop: rhythm (1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale (-1 / 5),
              display: `block`,
              marginBottom: rhythm (1),
            }}
          >
            {post.frontmatter.date}
          </p>
          <div dangerouslySetInnerHTML={{__html: post.html}} />
          <hr
            style={{
              marginBottom: rhythm (1),
            }}
          />

          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous &&
                <Link to={`/post/${previous.frontmatter.date}${previous.fields.slug}`} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>}
            </li>
            <li>
              {next &&
                <Link to={`/post/${next.frontmatter.date}${next.fields.slug}`} rel="next">
                  {next.frontmatter.title} →
                </Link>}
            </li>
          </ul>
        </article>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
