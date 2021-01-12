import { useStaticQuery, graphql, Link } from "gatsby";
import Image from 'gatsby-image';
import React from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import './logo.less';

export default ({ toggleFunc, collapsed }) => {
  const siteData = useStaticQuery(graphql`
    query HeaderQuery {
      avatar: file(absolutePath: { regex: "/my-avatar.jpg/" }) {
        childImageSharp {
          fixed(width: 40, height: 40) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          title
          description
          profile
          author
          social {
            github
          }
        }
      }
    }
  `);

  const { avatar } = siteData;
  const { title, description, author, social } = siteData.site.siteMetadata;
  const Icon = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
  return (<div className='logo' >
    <Icon className='trigger' onClick={toggleFunc} />
    <Image
      fixed={avatar.childImageSharp.fixed}
      alt={author}
      imgStyle={{
        borderRadius: `50%`,
      }}
      style={{
        margin: '0 3px'
      }}
    />
    <span>{title}</span>
  </div>);
};