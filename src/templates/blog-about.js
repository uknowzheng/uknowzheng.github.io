import React from 'react';
import {Link, graphql} from 'gatsby';

import Layout from '../components/layout';
import Image from 'gatsby-image';
import {rhythm} from '../utils/typography';
import './index.scss';

class BlogAbout extends React.Component {
  render () {
    const {data} = this.props;
    const siteMetadata = data.site.siteMetadata;
    const {author, profile,social} = siteMetadata;

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <article
          style={{
            width: rhythm (28),
            height: '100%',
          }}
        >
          <div className="bio">
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p><h3><a href={social.github} target="_blank">{author}</a></h3></p>
            <p>{profile}</p>
          </div>
        </article>
      </Layout>
    );
  }
}

export default BlogAbout;

export const pageQuery = graphql`
  query {
      avatar: file(absolutePath: { regex: "/my-avatar.jpg/" }) {
        childImageSharp {
          fixed(width: 150, height: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          title
          subTitle
          description
          profile
          author
          social {
            github
          }
        }
      }
  }
`;
