const path = require(`path`)

const createPath = node => {
  const location = node.location
  const name = node.name.replace(/[^a-zA-Z0-9-_]/g, "")
  const id = node.id.substr(0, 3)
  const slug = `${location}/${name}-${id}`
  return slug
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `Book`) {
    const { createNodeField } = actions
    const slug = createPath(node)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allBook {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allBook.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/product-details.tsx`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /canvas/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
};