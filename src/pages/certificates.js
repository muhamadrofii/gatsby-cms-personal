import React, { useState, useMemo } from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import { PdfViewer } from '../components/PdfViewer'
import config from '../utils/config'
import floppy from '../assets/nav-floppy.png'

const CertificateCard = ({ cert }) => {
  const [showPdf, setShowPdf] = useState(false)

  return (
    <div className="card certificate-card">
      <div>
        <div className="certificate-header">
          <div>
            <h3 className="certificate-title">{cert.title}</h3>
            {cert.issuer && (
              <span className="certificate-issuer">
                🏛️ {cert.issuer}
              </span>
            )}
          </div>
          {cert.issue_date && (
            <span className="certificate-date-badge">
              📅 {cert.issue_date}
            </span>
          )}
        </div>

        {cert.credential_id && (
          <div className="certificate-credential">
            Credential ID: <code>{cert.credential_id}</code>
          </div>
        )}

        {cert.html && cert.html.trim().length > 0 && (
          <div
            className="certificate-description"
            dangerouslySetInnerHTML={{ __html: cert.html }}
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

        {cert.certificate_pdf && showPdf && (
          <div style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            <PdfViewer
              src={cert.certificate_pdf}
              title={`Sertifikat PDF - ${cert.title}`}
            />
          </div>
        )}
      </div>

      <div className="certificate-actions">
        {cert.certificate_pdf && (
          <button
            type="button"
            className="button secondary small"
            onClick={() => setShowPdf(!showPdf)}
          >
            {showPdf ? '▲ Tutup Preview PDF' : '📄 Preview PDF'}
          </button>
        )}
        {cert.credential_url && (
          <a
            className="button secondary small"
            href={cert.credential_url}
            target="_blank"
            rel="noreferrer"
          >
            Verify ↗
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
            Download PDF ⬇
          </a>
        )}
      </div>
    </div>
  )
}

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

        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <CertificateCard cert={cert} key={index} />
          ))}
        </div>
      </PageLayout>
    </>
  )
}

Certificates.Layout = Layout
