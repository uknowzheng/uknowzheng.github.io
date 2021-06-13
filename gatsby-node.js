const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogIndex = path.resolve(`./src/templates/blog-index.js`)
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const blogPostDetail = path.resolve(`./src/templates/blog-post-detail.js`)
  const blogAbout = path.resolve(`./src/templates/blog-about.js`)
  const result = await graphql(
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
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.edges

  // 关于我
  createPage({
    path: `/`,
    component: blogIndex,
  })

  // 创建文章列表页面
  const pageSize = 7
  const totalPage = Math.ceil(posts.length / pageSize)
  Array.from({ length: totalPage }).forEach((_, i) => {
    const current = i + 1
    createPage({
      path: `/post/page/${current}`,
      component: blogPost,
      context: {
        current,
        total: posts.length,
        pageSize,
        offset: (current - 1) * pageSize,
      },
    })
  })

  // 给每一篇markdown文章创建页面
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const date = post.node.frontmatter.date

    createPage({
      path: `/post/${date}/${post.node.frontmatter.slug}`,
      component: blogPostDetail,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
  // 关于我
  createPage({
    path: `/about`,
    component: blogAbout,
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
