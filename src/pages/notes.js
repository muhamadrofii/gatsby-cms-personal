import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import projects from '../assets/nav-projects.png'
import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import { Search } from '../components/Search'
import { SEO } from '../components/SEO'
import { PageLayout } from '../components/PageLayout'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function Notes({ data }) {
  const posts = data.posts.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  
  const notesSettings = data.homeHero?.frontmatter || {}
  const title = notesSettings.notes_title || 'Notes'
  const description =
    notesSettings.notes_description ||
    'Personal notes about life, music, projects, and everything else.'

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />

      <PageLayout>
        <Hero title={title} description={description} hasSearch icon={projects} />
        <Search data={simplifiedPosts} section="notes" />
      </PageLayout>
    </>
  )
}

Notes.Layout = Layout

export const notesQuery = graphql`
  query NotesQuery {
    homeHero: markdownRemark(frontmatter: { template: { eq: "home-hero" } }) {
      frontmatter {
        notes_title
        notes_description
      }
    }
    posts: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Personal" }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
