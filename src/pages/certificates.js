import React, { useMemo } from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import { PdfViewer } from '../components/PdfViewer'
import config from '../utils/config'
import floppy from '../assets/floppylogo.png'

export default function Certificates() {
  const data = useStaticQuery(graphql`
    query CertificatesQuery {
      homeHero: markdownRemark(frontmatter: { template: { eq: "home-hero" } }) {
        frontmatter {
          certificates_title
          certificates_description
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
              certificate_pdf
              certificate_image
              order
            }
          }
        }
      }
    }
  `)

  const settings = data.homeHero?.frontmatter || {}
  const title = settings.certificates_title || 'Certifications'
  const description =
    settings.certificates_description ||
    'Licenses, certifications, and verified professional credentials.'

  const certificates = useMemo(
    () =>
      data.certificates?.edges.map((edge) => ({
        html: edge.node.html,
        ...edge.node.frontmatter,
      })) || [],
    [data.certificates]
  )

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO />

      <PageLayout>
        <Hero title={title} description={description} icon={floppy} />

        <div className="certificate-list">
          {certificates.map((cert, index) => (
            <div
              className="card certificate-card"
              key={index}
              style={{
                marginBottom: '1.75rem',
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
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>
                    {cert.title}
                  </h3>
                  {cert.issuer && (
                    <div
                      style={{
                        marginTop: '0.25rem',
                        fontSize: '0.95rem',
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
                  Credential ID:{' '}
                  <code style={{ fontSize: '0.8rem' }}>
                    {cert.credential_id}
                  </code>
                </div>
              )}

              {cert.html && cert.html.trim().length > 0 && (
                <div
                  className="certificate-description"
                  dangerouslySetInnerHTML={{ __html: cert.html }}
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    marginBottom: '1rem',
                  }}
                />
              )}

              {cert.certificate_image && (
                <div style={{ marginBottom: '1rem' }}>
                  <img
                    src={cert.certificate_image}
                    alt={`${cert.title} Certificate`}
                    style={{
                      maxWidth: '100%',
                      borderRadius: '6px',
                      border: '1px solid var(--color-border)',
                    }}
                  />
                </div>
              )}

              {cert.certificate_pdf && (
                <div style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
                  <PdfViewer
                    src={cert.certificate_pdf}
                    title={`Sertifikat PDF - ${cert.title}`}
                  />
                </div>
              )}

              <div
                className="card-links"
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  marginTop: '1rem',
                }}
              >
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
                {cert.certificate_pdf && (
                  <a
                    className="button secondary small"
                    href={cert.certificate_pdf}
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
      </PageLayout>
    </>
  )
}

Certificates.Layout = Layout
