const path = require('path')

// Helpers
function slugify(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPage = path.resolve('./src/templates/post.js')
  const pagePage = path.resolve('./src/templates/page.js')
  const tagPage = path.resolve('./src/templates/topic.js')
  const categoryPage = path.resolve('./src/templates/category.js')

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
          edges {
            node {
              id
              frontmatter {
                title
                tags
                categories
                template
              }
              fields {
                slug
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

  const all = result.data.allMarkdownRemark.edges
  const posts = all.filter((post) => post.node.frontmatter.template === 'post')
  const pages = all.filter((post) => post.node.frontmatter.template === 'page')
  const tagSet = new Set()
  const categorySet = new Set()

  // =====================================================================================
  // Posts
  // =====================================================================================

  posts.forEach((post, i) => {
    const previous = i === posts.length - 1 ? null : posts[i + 1].node
    const next = i === 0 ? null : posts[i - 1].node

    if (post.node.frontmatter.tags) {
      post.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag)
      })
    }

    if (post.node.frontmatter.categories) {
      const cats = Array.isArray(post.node.frontmatter.categories)
        ? post.node.frontmatter.categories
        : [post.node.frontmatter.categories]
      cats.forEach((category) => {
        categorySet.add(category)
      })
    }

    createPage({
      path: post.node.fields.slug,
      component: blogPage,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // =====================================================================================
  // Pages
  // =====================================================================================

  pages.forEach((page) => {
    createPage({
      path: page.node.fields.slug,
      component: pagePage,
      context: {
        slug: page.node.fields.slug,
        thumbnail: page.node.frontmatter.thumbnail,
      },
    })
  })

  // =====================================================================================
  // Tags
  // =====================================================================================

  const tagList = Array.from(tagSet)
  tagList.forEach((tag) => {
    createPage({
      path: `/topics/${slugify(tag)}/`,
      component: tagPage,
      context: {
        tag,
      },
    })
  })

  // =====================================================================================
  // Categories
  // =====================================================================================

  const categoryList = Array.from(categorySet)
  categoryList.forEach((category) => {
    createPage({
      path: `/categories/${slugify(category)}/`,
      component: categoryPage,
      context: {
        category,
      },
    })
  })
}

const createNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // =====================================================================================
  // Slugs
  // =====================================================================================

  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    let prefix = ''
    if (node.frontmatter.template === 'post') {
      const isPersonal = node.frontmatter.categories === 'Personal' ||
        (Array.isArray(node.frontmatter.categories) && node.frontmatter.categories.includes('Personal'))
      prefix = isPersonal ? '/notes' : '/blog'
    }

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
      slug = `${prefix}/${node.frontmatter.slug}/`
    } else {
      slug = `${prefix}/${parsedFilePath.dir}/`
    }

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })
  }
}

const express = require('express')

const onCreateDevServer = ({ app }) => {
  app.use(express.static('public'))
}

// Fix: pdfjs-dist optionally requires 'canvas' for Node.js environments.
// During Gatsby SSR/HTML generation, webpack tries to resolve it and fails.
// We alias it to false so webpack skips it — canvas is only needed in the browser.
const onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          canvas: false,
        },
      },
    })
  }
}

const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
    type MarkdownRemarkFrontmatter {
      date: Date @dateformat
      title: String
      name: String
      template: String
      slug: String
      tagline: String
      url: String
      writeup: String
      highlight: Boolean
      company: String
      role: String
      date_range: String
      order: Int
      company_logo: String
      attachment_pdf: String
      issuer: String
      issue_date: String
      credential_id: String
      credential_url: String
      certificate_pdf: String
      certificate_image: String
      notes_title: String
      notes_description: String
      projects_title: String
      projects_description: String
      certificates_title: String
      certificates_description: String
      about_me_link: String
      newsletter_link: String
      extra_description: String
      image: String
      tags: [String]
    }
  `
  createTypes(typeDefs)
}

exports.createPages = createPages
exports.onCreateNode = createNode
exports.createSchemaCustomization = createSchemaCustomization
exports.onCreateDevServer = onCreateDevServer
exports.onCreateWebpackConfig = onCreateWebpackConfig

