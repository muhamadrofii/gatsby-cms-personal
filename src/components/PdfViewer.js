import React from 'react'

export const PdfViewer = ({ src, title = 'Dokumen PDF' }) => {
  if (!src) return null

  // Use Google Docs Viewer when on a public domain, or direct PDF embed on local/desktop
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${src}` : src
  const isPublicDomain =
    typeof window !== 'undefined' &&
    window.location.protocol.startsWith('http') &&
    !window.location.hostname.includes('localhost') &&
    !window.location.hostname.includes('127.0.0.1')

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
      <iframe
        src={embedUrl}
        title={title}
        width="100%"
        height="320px"
        style={{ border: 'none', display: 'block', width: '100%' }}
      />
    </div>
  )
}
