// import React from 'react';
// import Image from 'gatsby-image';
// import {Link, graphql} from 'gatsby';
// // import Layout from '../components/layout';

// // import {rhythm} from '../utils/typography';
// // import './index.scss';

// import './index.less';


// import { Layout, Menu } from 'antd';
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
// } from '@ant-design/icons';

// const { Header, Sider, Content } = Layout;

// class BlogAbout extends React.Component {
//   render () {
//     const {data} = this.props;
//     const siteMetadata = data.site.siteMetadata;
//     const {author, profile,social} = siteMetadata;

//     return (
//       <Layout location={this.props.location} siteMetadata={siteMetadata}>
//         <article
//           style={{
//             height: '100%',
//           }}
//         >
//           <div className="bio">
//             <Image
//               fixed={data.avatar.childImageSharp.fixed}
//               alt={author}
//               style={{
//                 marginBottom: 0,
//                 minWidth: 50,
//                 borderRadius: `100%`,
//               }}
//               imgStyle={{
//                 borderRadius: `50%`,
//               }}
//             />
//             <p><h3><a href={social.github} target="_blank">{author}</a></h3></p>
//             <p>{profile}</p>
//           </div>
//         </article>
//       </Layout>
//     );
//   }
// }
// // import './index.scss';

// export default BlogAbout;

// export const pageQuery = graphql`
//   query {
//       avatar: file(absolutePath: { regex: "/my-avatar.jpg/" }) {
//         childImageSharp {
//           fixed(width: 150, height: 150) {
//             ...GatsbyImageSharpFixed
//           }
//         }
//       }
//       site {
//         siteMetadata {
//           title
//           description
//           profile
//           author
//           social {
//             github
//           }
//         }
//       }
//   }
// `;
