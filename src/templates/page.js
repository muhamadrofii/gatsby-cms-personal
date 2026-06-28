import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Hero } from '../components/Hero'
import { SEO } from '../components/SEO'
import { PageLayout } from '../components/PageLayout'
import config from '../utils/config'

export default function PageTemplate({ data }) {
  const post = data.markdownRemark
  const { title, description, thumbnail, linktree_link, email_link, github_link, instagram_link } = post.frontmatter

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />

      <PageLayout>
        <Hero title={title} thumbnail={thumbnail} />
        <div
          className="page-article"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {(linktree_link || email_link || github_link || instagram_link) && (
          <div className="contact-section" id="contact" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
            <h3 id="contact-heading" style={{ marginBottom: '0.5rem', position: 'relative' }} className="anchor-heading">
              <a href="#contact" aria-label="contact permalink" className="anchor before" style={{ position: 'absolute', top: '0', left: '0', transform: 'translateX(-100%)', paddingRight: '4px' }}>
                <svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16">
                  <path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S14.98 12 14 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25C6.22 6.36 5 7.25 5 8.5 5 9.81 6.55 11 8 11h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                </svg>
              </a>
              Contact
            </h3>
            <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-light)' }}>
              Feel free to reach out to me through my social media accounts.
            </p>
            <div className="flex-wrap gap" style={{ display: 'flex' }}>
              {linktree_link && (
                <a
                  href={linktree_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button secondary flex-align-center gap"
                  style={{ textDecoration: 'none', fontSize: '0.95rem', padding: '0.5rem 1rem' }}
                >
                  <span style={{ fontSize: '1.1rem' }}>🌳</span> Linktree
                </a>
              )}
              {email_link && (
                <a
                  href={email_link.startsWith('mailto:') ? email_link : `mailto:${email_link}`}
                  className="button secondary flex-align-center gap"
                  style={{ textDecoration: 'none', fontSize: '0.95rem', padding: '0.5rem 1rem' }}
                >
                  <span style={{ fontSize: '1.1rem' }}>✉️</span> Email
                </a>
              )}
              {github_link && (
                <a
                  href={github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button secondary flex-align-center gap"
                  style={{ textDecoration: 'none', fontSize: '0.95rem', padding: '0.5rem 1rem' }}
                >
                  <span style={{ fontSize: '1.1rem' }}>💻</span> GitHub
                </a>
              )}
              {instagram_link && (
                <a
                  href={instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button secondary flex-align-center gap"
                  style={{ textDecoration: 'none', fontSize: '0.95rem', padding: '0.5rem 1rem' }}
                >
                  <span style={{ fontSize: '1.1rem' }}>📸</span> Instagram
                </a>
              )}
            </div>
          </div>
        )}
      </PageLayout>
    </>
  )
}

PageTemplate.Layout = Layout

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
        linktree_link
        email_link
        github_link
        instagram_link
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 40, height: 40, layout: FIXED)
          }
        }
      }
    }
  }
`
