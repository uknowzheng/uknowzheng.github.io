import React from 'react';
import { graphql } from 'gatsby';
import { Typography } from 'antd';
import PageLayout from '../components/page-layout';
import './index.less';

const { Title, Text } = Typography;

export default ({ data, location }) => {
  console.log(data)
  const { frontmatter, html } = data.markdownRemark;
  const { title, date } = frontmatter;
  return <PageLayout location={location} >
    <Typography >
      <Title>{date} {title}</Title>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Typography>
  </PageLayout>;
};



// class BlogPostTemplate extends React.Component {
//   render () {

// const siteMetadata = data.site.siteMetadata;
// const { previous, next } = pageContext;
//     return (
//       <Layout location={location} siteMetadata={siteMetadata}>
//         <article
//           style={{
//             height: '100%',
//           }}
//         >
//           <h1
//             style={{
//               marginBottom: 0,
//             }}
//           >
//             {post.frontmatter.title}
//           </h1>
//           <p
//             style={{
//               display: `block`,
//             }}
//           >
//             {post.frontmatter.date}html
//           </p>
//           <div dangerouslySetInnerHTML={{__html: post.html}} />
//           <hr
//             style={{
//             }}
//           />

//           <ul
//             style={{
//               display: `flex`,
//               flexWrap: `wrap`,
//               justifyContent: `space-between`,
//               listStyle: `none`,
//               padding: 0,
//             }}
//           >
//             <li>
//               {previous &&
//                 <Link to={`/post/${previous.frontmatter.date}${previous.fields.slug}`} rel="prev">
//                   ← {previous.frontmatter.title}
//                 </Link>}
//             </li>
//             <li>
//               {next &&
//                 <Link to={`/post/${next.frontmatter.date}${next.fields.slug}`} rel="next">
//                   {next.frontmatter.title} →
//                 </Link>}
//             </li>
//           </ul>
//         </article>
//       </Layout>
//     );
//   }
// }

// export default BlogPostTemplate;

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
