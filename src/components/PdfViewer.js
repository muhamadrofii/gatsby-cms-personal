import React from 'react'

export const PdfViewer = ({ src, title = 'Dokumen PDF', height = '320px' }) => {
  if (!src) return null

  const isPrivateHost = (hostname) => {
    if (!hostname) return true
    return (
      hostname.includes('localhost') ||
      hostname.includes('127.0.0.1') ||
      hostname.endsWith('.local') ||
      /^192\.168\./.test(hostname) ||
      /^10\./.test(hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
      /^\d+\.\d+\.\d+\.\d+$/.test(hostname)
    )
  }

  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const isPublicDomain =
    typeof window !== 'undefined' &&
    window.location.protocol.startsWith('http') &&
    !isPrivateHost(hostname)

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${src}` : src

  // Use Google Docs Viewer ONLY on public live domains to avoid "Preview not available" on local IPs
  const embedUrl = isPublicDomain
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`
    : `${src}#toolbar=0&navpanes=0&view=Fit`

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
      {/* Harmonized Action Buttons Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          padding: '0.6rem 0.85rem',
          background: 'var(--color-card, #ffffff)',
          borderBottom: '1px solid var(--color-border, #e2e8f0)',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text, #1e293b)' }}>
          📄 {title}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="button secondary small"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
          >
            👁️ Lihat PDF ↗
          </a>
          <a
            href={src}
            download
            className="button secondary small"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
          >
            📄 Download PDF
          </a>
        </div>
      </div>

      {/* Embedded PDF Viewer Frame */}
      <div style={{ position: 'relative', width: '100%', height: height, background: '#f1f5f9' }}>
        <object
          data={`${src}#toolbar=0&navpanes=0&view=Fit`}
          type="application/pdf"
          width="100%"
          height="100%"
          style={{ display: 'block', width: '100%', height: '100%', border: 'none' }}
        >
          <iframe
            src={embedUrl}
            title={title}
            width="100%"
            height="100%"
            style={{ border: 'none', display: 'block', width: '100%', height: '100%' }}
          />
        </object>
      </div>
    </div>
  )
}
