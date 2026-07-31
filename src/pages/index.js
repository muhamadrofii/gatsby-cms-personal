import React, { useMemo, useState } from 'react'
import { Link, graphql } from 'gatsby'

import { GatsbyImage } from 'gatsby-plugin-image'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { Heading } from '../components/Heading'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import blog from '../assets/nav-blog.png'
import projectsIcon from '../assets/nav-projects.png'
import github from '../assets/nav-github.png'

export default function Index({ data }) {
  const latestNotes = data.latestNotes?.edges || []
  const latestArticles = data.latestArticles?.edges || []
  const highlights = data.highlights?.edges || []
  const notes = useMemo(() => getSimplifiedPosts(latestNotes), [latestNotes])

  const articles = useMemo(
    () => getSimplifiedPosts(latestArticles),
    [latestArticles]
  )
  const simplifiedHighlights = useMemo(
    () => getSimplifiedPosts(highlights, { thumbnails: true }),
    [highlights]
  )

  const projects = useMemo(
    () => data.projects?.edges.map((edge) => edge.node.frontmatter) || [],
    [data.projects]
  )

  const experiences = useMemo(
    () => data.experiences?.edges.map((edge) => ({
      html: edge.node.html,
      ...edge.node.frontmatter
    })) || [],
    [data.experiences]
  )

  const heroData = data.homeHero?.frontmatter || {}
  const {
    title = "Hey, I'm Tania!",
    description = "I'm a software engineer, open-source creator, and former professional chef. I've been making websites since 1998 and writing on this blog for over ten years!",
    extra_description = "Everything on this site is written by me, not AI.",
    image = "/profil.png",
    about_me_link = "/me",
    newsletter_link = "https://taniarascia.substack.com"
  } = heroData

  const renderLink = (url, text, className) => {
    if (!url) return null
    const isExternal = url.startsWith('http://') || url.startsWith('https://')
    if (isExternal) {
      return (
        <a href={url} className={className} rel="noreferrer" target="_blank">
          {text}
        </a>
      )
    }
    return (
      <Link className={className} to={url}>
        {text}
      </Link>
    )
  }

  return (
    <>
      <Helmet title={config.siteTitle} />
      <SEO />

      <PageLayout>
        <Hero type="index">
          <div className="hero-wrapper">
            <div>
              <h1>{title}</h1>
              <p className="hero-description">{description}</p>
              {extra_description && (
                <p className="hero-description">{extra_description}</p>
              )}
              <p className="large-links">
                {renderLink(about_me_link, "About Me", "large-link")}
                {renderLink(newsletter_link, "Email Newsletter", "large-link")}
              </p>
            </div>
            <div className="hero-image-container">
              <img src={image} className="hero-image" alt="Hero Image" />
            </div>
          </div>
        </Hero>

        <section className="section-index">
          <Heading
            title="Blog"
            description="Guides, references, and tutorials."
            icon={blog}
          />
          <Posts data={articles} />
        </section>

        <section className="section-index">
          <Heading
            title="Notes"
            description="Life, music, projects, and everything else."
            icon={projectsIcon}
          />
          <Posts data={notes} />
        </section>

        <section className="section-index">
          <Heading
            title="Deep Dives"
            slug="/topics"
            buttonText="All Topics"
            description="Long-form tutorials on a variety of development topics."
          />
          <div className="cards">
            {simplifiedHighlights.map((post) => {
              return (
                <Link
                  to={post.slug}
                  className="card card-highlight"
                  key={`popular-${post.slug}`}
                >
                  {post.thumbnail && (
                    <GatsbyImage image={post.thumbnail} alt="Thumbnail" />
                  )}
                  <div>{post.title}</div>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="section-index" id="experience">
          <Heading
            title="Experience"
            description="My professional work history."
          />
          <div className="experience-list">
            {experiences.map((exp, index) => (
              <div className="card experience-card" key={index} style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  {exp.company_logo && (
                    <img 
                      src={exp.company_logo} 
                      alt={`${exp.company} Logo`} 
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        objectFit: 'contain', 
                        borderRadius: '6px', 
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg-secondary)',
                        flexShrink: 0
                      }} 
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '0.5rem', gap: '0.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                        {exp.role} @ <strong style={{ color: 'var(--color-primary)' }}>{exp.company}</strong>
                      </h3>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{exp.date_range}</span>
                    </div>
                    <div className="experience-description" dangerouslySetInnerHTML={{ __html: exp.html }} />
                    {exp.attachment_pdf && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <div style={{ border: '1px solid var(--color-border)', borderRadius: '6px', overflow: 'hidden' }}>
                          <iframe 
                            src={`${exp.attachment_pdf}#toolbar=0&view=Fit`} 
                            width="100%" 
                            height="280px" 
                            style={{ border: 'none', display: 'block' }} 
                            title="PDF Preview" 
                          />
                        </div>
                        <div style={{ marginTop: '0.5rem' }}>
                          <a 
                            href={exp.attachment_pdf} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="button secondary small"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            📄 Download PDF
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Heading
            title="Projects"
            slug="/projects"
            buttonText="All Projects"
            description="Open-source projects I've worked on over the years."
            icon={github}
          />

          <div className="cards">
            {projects
              .filter((project) => project.highlight)
              .map((project) => {
                return (
                  <div className="card" key={`hightlight-${project.slug}`}>
                    <time>{project.date}</time>
                    <a
                      href={`https://github.com/taniarascia/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                    <p>{project.tagline}</p>
                    <div className="card-links">
                      {project.writeup && (
                        <Link
                          className="button secondary small"
                          to={project.writeup.startsWith('/blog/') ? project.writeup : `/blog${project.writeup}`}
                        >
                          Article
                        </Link>
                      )}
                      {project.url && (
                        <a
                          className="button secondary small"
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Demo
                        </a>
                      )}
                      <a
                        className="button secondary small"
                        href={`https://github.com/taniarascia/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source
                      </a>
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      </PageLayout>
    </>
  )
}

Index.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    experiences: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "experience" } } }
      sort: { frontmatter: { order: ASC } }
    ) {
      edges {
        node {
          html
          frontmatter {
            company
            role
            date_range
            order
            company_logo
            attachment_pdf
          }
        }
      }
    }
    projects: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "project" } } }
    ) {
      edges {
        node {
          frontmatter {
            name
            date
            slug
            tagline
            url
            writeup
            highlight
          }
        }
      }
    }
    homeHero: markdownRemark(frontmatter: { template: { eq: "home-hero" } }) {
      frontmatter {
        title
        description
        extra_description
        image
        about_me_link
        newsletter_link
      }
    }
    latestNotes: allMarkdownRemark(
      limit: 5
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
            tags
            categories
          }
        }
      }
    }
    latestArticles: allMarkdownRemark(
      limit: 5
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Technical" }
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
            tags
            categories
          }
        }
      }
    }
    highlights: allMarkdownRemark(
      limit: 12
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { categories: { eq: "Highlight" } } }
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
            tags
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 40, height: 40, layout: FIXED)
              }
            }
          }
        }
      }
    }
  }
`

