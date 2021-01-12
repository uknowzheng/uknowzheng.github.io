const path = require (`path`);
const {createFilePath} = require (`gatsby-source-filesystem`);

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;

  const blogPost = path.resolve (`./src/templates/blog-post.js`);
  const blogIndex = path.resolve (`./src/templates/blog-index.js`);
  const blogAbout = path.resolve (`./src/templates/blog-about.js`);
  const result = await graphql (
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                slug
                date(formatString: "YYYY-MM-DD")
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }
  const posts = result.data.allMarkdownRemark.edges;
  //  create homepage pagination
  const postsPerPage = 10;
  const numPages = Math.ceil (posts.length / postsPerPage);
  const pageScore = Array.from ({length: numPages}).map ((k, v) => v + 1);
  Array.from ({length: numPages}).forEach ((_, i) => {
    createPage ({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: blogIndex,
      context: {
        currentPage: i + 1,
        totalPage: numPages,
        pageScore: [].concat (
          pageScore.slice (0, pageScore.indexOf (i + 1) + 1).slice (-6),
          pageScore.slice (pageScore.indexOf (i + 1) + 1).slice (0, 5)
        ),
        limit: postsPerPage,
        skip: i * postsPerPage,
      },
    });
  });

  // Create blog posts pages.
  posts.forEach ((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    const date = post.node.frontmatter.date;

    createPage ({
      path: `/post/${date}/${post.node.frontmatter.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  createPage ({
    path: `/about`,
    component: blogAbout,
  });
};

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath ({node, getNode});
    createNodeField ({
      name: `slug`,
      node,
      value,
    });
  }
};
