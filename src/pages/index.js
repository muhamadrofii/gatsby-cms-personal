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
import { PdfViewer } from '../components/PdfViewer'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import blog from '../assets/nav-blog.png'
import projectsIcon from '../assets/nav-projects.png'
import github from '../assets/nav-github.png'
import floppy from '../assets/floppylogo.png'

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

  const organizations = useMemo(
    () => data.organizations?.edges.map((edge) => ({
      html: edge.node.html,
      ...edge.node.frontmatter
    })) || [],
    [data.organizations]
  )

  const certificates = useMemo(
    () => data.certificates?.edges.map((edge) => ({
      html: edge.node.html,
      ...edge.node.frontmatter
    })) || [],
    [data.certificates]
  )

  const heroData = data.homeHero?.frontmatter || {}
  const {
    title = "Hey, I'm Tania!",
    description = "I'm a software engineer, open-source creator, and former professional chef. I've been making websites since 1998 and writing on this blog for over ten years!",
    extra_description = "Everything on this site is written by me, not AI.",
    image = "/profil.png",
    about_me_link = "/me",
    newsletter_link = "https://taniarascia.substack.com",
    notes_title = "Notes",
    notes_description = "Life, music, projects, and everything else.",
    projects_title = "Projects",
    projects_description = "Open-source projects I've worked on over the years.",
    organizations_title = "Organization Experience",
    organizations_description = "Leadership and active involvement in student and tech organizations.",
    certificates_title = "Certifications",
    certificates_description = "Licenses, certificates, and verified professional credentials."
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
            title={notes_title}
            description={notes_description}
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
                        <PdfViewer src={exp.attachment_pdf} title={`Dokumen PDF - ${exp.company}`} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-index" id="organizations">
          <Heading
            title={organizations_title}
            description={organizations_description}
          />
          <div className="experience-list">
            {organizations.map((org, index) => (
              <div className="card experience-card" key={index} style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  {org.organization_logo && (
                    <img 
                      src={org.organization_logo} 
                      alt={`${org.organization} Logo`} 
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
                        {org.role} @ <strong style={{ color: 'var(--color-primary)' }}>{org.organization}</strong>
                      </h3>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{org.date_range}</span>
                    </div>
                    {org.html && org.html.trim().length > 0 && (
                      <div className="experience-description" dangerouslySetInnerHTML={{ __html: org.html }} />
                    )}
                    {org.attachment_pdf && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <PdfViewer src={org.attachment_pdf} title={`Dokumen PDF - ${org.organization}`} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-index" id="certificates">
          <Heading
            title={certificates_title}
            slug="/certificates"
            buttonText="All Certificates"
            description={certificates_description}
            icon={floppy}
          />
          <div className="certificate-list">
            {certificates.map((cert, index) => (
              <div
                className="card certificate-card"
                key={index}
                style={{
                  marginBottom: '1.5rem',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-secondary)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                      {cert.title}
                    </h3>
                    {cert.issuer && (
                      <div
                        style={{
                          marginTop: '0.25rem',
                          fontSize: '0.9rem',
                          color: 'var(--color-primary)',
                          fontWeight: '600',
                        }}
                      >
                        {cert.issuer}
                      </div>
                    )}
                  </div>
                  {cert.issue_date && (
                    <span
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--color-text-light)',
                        backgroundColor: 'var(--color-bg)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {cert.issue_date}
                    </span>
                  )}
                </div>

                {cert.credential_id && (
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-text-light)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Credential ID: <code style={{ fontSize: '0.8rem' }}>{cert.credential_id}</code>
                  </div>
                )}

                {cert.html && cert.html.trim().length > 0 && (
                  <div
                    className="certificate-description"
                    dangerouslySetInnerHTML={{ __html: cert.html }}
                    style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}
                  />
                )}

                {cert.attachment_pdf && (
                  <div style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
                    <PdfViewer
                      src={cert.attachment_pdf}
                      title={`Dokumen PDF - ${cert.title}`}
                    />
                  </div>
                )}

                <div className="card-links" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                  {cert.credential_url && (
                    <a
                      className="button secondary small"
                      href={cert.credential_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Verify Credential ↗
                    </a>
                  )}
                  {cert.attachment_pdf && (
                    <a
                      className="button secondary small"
                      href={cert.attachment_pdf}
                      target="_blank"
                      rel="noreferrer"
                      download
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Heading
            title={projects_title}
            slug="/projects"
            buttonText="All Projects"
            description={projects_description}
            icon={github}
          />

          <div className="cards">
            {projects
              .filter((project) => project.highlight)
              .map((project) => {
                const isExternalWriteup = project.writeup && (project.writeup.startsWith('http://') || project.writeup.startsWith('https://'))
                const hasValidRepo = project.slug && !project.slug.includes(' ')
                const projectUrl = project.url || (hasValidRepo ? `https://github.com/muhamadrofii/${project.slug}` : (project.writeup || '#'))

                return (
                  <div className="card" key={`hightlight-${project.slug}`}>
                    <time>{project.date}</time>
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                    <p>{project.tagline}</p>
                    <div className="card-links">
                      {project.writeup && (
                        isExternalWriteup ? (
                          <a
                            className="button secondary small"
                            href={project.writeup}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Article
                          </a>
                        ) : (
                          <Link
                            className="button secondary small"
                            to={project.writeup.startsWith('/blog/') ? project.writeup : `/blog${project.writeup}`}
                          >
                            Article
                          </Link>
                        )
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
                      {hasValidRepo && (
                        <a
                          className="button secondary small"
                          href={`https://github.com/muhamadrofii/${project.slug}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Source
                        </a>
                      )}
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
    organizations: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "organization" } } }
      sort: { frontmatter: { order: ASC } }
    ) {
      edges {
        node {
          html
          frontmatter {
            organization
            role
            date_range
            order
            organization_logo
            attachment_pdf
          }
        }
      }
    }
    certificates: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "certificate" } } }
      sort: { frontmatter: { order: ASC } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            issuer
            issue_date
            credential_id
            credential_url
            attachment_pdf: certificate_pdf
            certificate_image
            order
          }
        }
      }
    }
    projects: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "project" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            name
            date(formatString: "MMMM YYYY")
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
        notes_title
        notes_description
        projects_title
        projects_description
        organizations_title
        organizations_description
        certificates_title
        certificates_description
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

