import React from 'react';
import {Link, graphql} from 'gatsby';

// import Bio from '../components/bio';
import Layout from '../components/layout';
import List from '../components/list';
import SEO from '../components/seo';
// import {rhythm} from '../utils/typography';
import './index.less';


// import { Layout, Menu } from 'antd';
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
// } from '@ant-design/icons';

// const { Header, Sider, Content } = Layout;





class BlogIndex extends React.Component {

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  render () {
    const {data, pageContext} = this.props;
    const {totalPage, currentPage, pageScore} = pageContext;
    const siteMetadata = data.site.siteMetadata;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>

        <List list={posts}></List>
        {/* <SEO title="All posts" />
        <article
          style={{
            height: '100%',
          }}
        >
          {posts.map (({node}) => {
            const title = node.frontmatter.title || node.fields.slug;
            const dateStr = node.frontmatter.dateStr;
            return (
              <div key={node.fields.slug} >
                <h3
                >
                  <Link style={{boxShadow: `none`}} to={`/post/${dateStr}${node.fields.slug}`}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </div>
            );
          })}
            <div className="page">
              {currentPage - 1 > 0 &&
                <Link
                  to={currentPage - 1 === 1 ? '/' : '/page/' + currentPage - 1}
                  rel="prev"
                >
                  上一页
                </Link>}
              {(pageScore || []).map (v => {
                return (
                  <Link
                    style={{color: v === currentPage ? 'red' : null}}
                    to={v === 1 ? '/' : '/page/' + v}
                  >
                    {v}
                  </Link>
                );
              })}
              {currentPage + 1 <= totalPage &&
                <Link to={'/page/' + (currentPage + 1)} rel="next">
                  下一页
                </Link>}
            </div>
        </article> */}

      </Layout>
    );
    const { collapsed } = this.state;
    // return (
    //   <Layout >
      
    // </Layout>
    // );
  }
}

export default BlogIndex;

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
          title
          date(formatString: "YYYY-MM-DD")
          dateStr:date(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
}
`;
