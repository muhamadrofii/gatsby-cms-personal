import React, { useState, useEffect } from 'react'

export const PdfViewer = ({ src, title = 'Dokumen PDF' }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [fullUrl, setFullUrl] = useState('')
  const [isPublicUrl, setIsPublicUrl] = useState(false)

  useEffect(() => {
    // Detect mobile device
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent || '' : ''
    const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    setIsMobile(mobileCheck)

    // Build absolute URL for Google Docs viewer
    if (typeof window !== 'undefined' && src) {
      const origin = window.location.origin
      const absolute = src.startsWith('http') ? src : `${origin}${src}`
      setFullUrl(absolute)

      // Google Docs viewer only works on public HTTP/HTTPS URLs (not localhost)
      const isPublic = absolute.startsWith('https://') && !absolute.includes('localhost')
      setIsPublicUrl(isPublic)
    }
  }, [src])

  const googleDocsUrl = fullUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`
    : ''

  return (
    <div
      style={{
        border: '1px solid var(--color-border, #e2e8f0)',
        borderRadius: '8px',
        overflow: 'hidden',
        background: 'var(--color-bg-secondary, #f8fafc)',
        marginTop: '0.75rem',
      }}
    >
      {/* Header Info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0.75rem',
          background: 'var(--color-card, #ffffff)',
          borderBottom: '1px solid var(--color-border, #e2e8f0)',
          fontSize: '0.85rem',
        }}
      >
        <span style={{ fontWeight: 600, color: 'var(--color-text, #1e293b)' }}>
          📄 {title}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-primary, #2563eb)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Buka Tab Baru ↗
          </a>
        </div>
      </div>

      {/* Viewer Content */}
      <div style={{ position: 'relative', width: '100%', minHeight: '280px', background: '#f1f5f9' }}>
        {/* On production/public URL: Use Google Docs Viewer for mobile & desktop */}
        {isPublicUrl ? (
          <iframe
            src={googleDocsUrl}
            title={title}
            width="100%"
            height="320px"
            style={{ border: 'none', display: 'block' }}
          />
        ) : isMobile ? (
          /* Mobile on Localhost / Non-public URL fallback card */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem 1rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📑</div>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--color-text-secondary, #475569)' }}>
              Pratinjau PDF di Android/Mobile dapat dibuka langsung melalui viewer bawaan HP.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href={src}
                target="_blank"
                rel="noreferrer"
                className="button primary small"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                👁️ Lihat PDF
              </a>
              <a
                href={src}
                download
                className="button secondary small"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                📥 Unduh PDF
              </a>
            </div>
          </div>
        ) : (
          /* Desktop local fallback using native browser PDF engine (<object>) */
          <object
            data={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
            type="application/pdf"
            width="100%"
            height="320px"
            style={{ display: 'block', border: 'none' }}
          >
            <iframe
              src={`${src}#toolbar=0&view=Fit`}
              title={title}
              width="100%"
              height="320px"
              style={{ border: 'none' }}
            />
          </object>
        )}
      </div>
    </div>
  )
}
