import React, { useState, useEffect, useRef, useCallback } from 'react'

// Dynamically import pdfjs-dist only on client side (Gatsby SSR-safe)
let pdfjsLib = null

async function getPdfJs() {
  if (pdfjsLib) return pdfjsLib
  const mod = await import('pdfjs-dist')
  pdfjsLib = mod
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
  return pdfjsLib
}

// Load Lucide icons from CDN once
let lucideLoaded = false
function loadLucide() {
  if (typeof window === 'undefined' || lucideLoaded) return
  if (document.getElementById('lucide-cdn')) return
  const script = document.createElement('script')
  script.id = 'lucide-cdn'
  script.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js'
  script.onload = () => {
    lucideLoaded = true
    if (window.lucide) window.lucide.createIcons()
  }
  document.head.appendChild(script)
}

// SVG icon component using Lucide (inline SVG fallback if CDN not ready)
const Icon = ({ name, size = 14 }) => (
  <i
    data-lucide={name}
    style={{ width: size, height: size, display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  />
)

export const PdfViewer = ({ src, title = 'Dokumen PDF', height = '320px' }) => {
  if (!src) return null

  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const pdfDocRef = useRef(null)
  const renderTaskRef = useRef(null)

  const renderPage = useCallback((pdfDoc, pageNum) => {
    if (!pdfDoc || !canvasRef.current) return Promise.resolve()

    if (renderTaskRef.current) {
      renderTaskRef.current.cancel()
      renderTaskRef.current = null
    }

    return pdfDoc.getPage(pageNum).then((page) => {
      const containerWidth = containerRef.current?.clientWidth || 600
      const unscaledViewport = page.getViewport({ scale: 1.0 })
      const targetWidth = Math.min(containerWidth - 24, 800)
      const scale = targetWidth / unscaledViewport.width
      const viewport = page.getViewport({ scale: scale > 0 ? scale : 1.0 })

      const canvas = canvasRef.current
      if (!canvas) return
      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width
      canvas.style.width = '100%'
      canvas.style.height = 'auto'

      const renderTask = page.render({ canvasContext: context, viewport })
      renderTaskRef.current = renderTask
      return renderTask.promise.then(() => {
        renderTaskRef.current = null
        // Re-activate Lucide icons after render
        if (window.lucide) window.lucide.createIcons()
      })
    }).catch((err) => {
      if (err?.name !== 'RenderingCancelledException') {
        console.warn('PDF render error:', err)
      }
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    loadLucide()

    let isMounted = true
    setIsLoading(true)
    setError(null)
    setNumPages(0)
    setCurrentPage(1)

    getPdfJs()
      .then((lib) => {
        if (!isMounted) return
        return lib.getDocument(src).promise
      })
      .then((pdf) => {
        if (!isMounted || !pdf) return
        pdfDocRef.current = pdf
        setNumPages(pdf.numPages)
        setIsLoading(false)
      })
      .catch((err) => {
        if (!isMounted) return
        console.error('PDF loading error:', err)
        setError('Gagal memuat dokumen PDF.')
        setIsLoading(false)
      })

    return () => {
      isMounted = false
      if (renderTaskRef.current) renderTaskRef.current.cancel()
    }
  }, [src])

  useEffect(() => {
    if (numPages > 0 && pdfDocRef.current && !isLoading) {
      renderPage(pdfDocRef.current, currentPage).then(() => {
        if (window.lucide) window.lucide.createIcons()
      })
    }
  }, [currentPage, numPages, isLoading, renderPage])

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  })

  useEffect(() => {
    let timer
    const handleResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (pdfDocRef.current && !isLoading) {
          renderPage(pdfDocRef.current, currentPage)
        }
      }, 250)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [currentPage, isLoading, renderPage])

  const btnBase = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    padding: '0.35rem 0.7rem',
    borderRadius: '6px',
    fontSize: '0.78rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: '1.5px solid',
    lineHeight: 1,
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
  }

  const btnSecondary = {
    ...btnBase,
    background: 'var(--color-background-button-secondary, transparent)',
    borderColor: 'var(--color-border-button-secondary, #cbd5e1)',
    color: 'var(--color-text-button-secondary, #374151)',
  }

  const btnNavDisabled = {
    ...btnBase,
    background: 'transparent',
    borderColor: 'transparent',
    color: 'var(--color-text-secondary, #9ca3af)',
    cursor: 'not-allowed',
    opacity: 0.35,
    padding: '0.35rem 0.45rem',
  }

  const btnNav = {
    ...btnBase,
    background: 'transparent',
    borderColor: 'transparent',
    color: 'var(--color-text-secondary, #64748b)',
    padding: '0.35rem 0.45rem',
  }

  return (
    <div
      ref={containerRef}
      style={{
        border: '1px solid var(--color-border, #e2e8f0)',
        borderRadius: '10px',
        overflow: 'hidden',
        marginTop: '0.85rem',
      }}
    >
      {/* ── Toolbar ─────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          padding: '0.55rem 0.85rem',
          background: 'var(--color-card, #ffffff)',
          borderBottom: '1px solid var(--color-border, #e2e8f0)',
        }}
      >
        {/* Left: title + page count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0 }}>
          <Icon name="file-text" size={14} />
          <span
            style={{
              fontWeight: 600,
              fontSize: '0.82rem',
              color: 'var(--color-text, #1e293b)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '180px',
            }}
          >
            {title}
          </span>
          {numPages > 0 && (
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--color-text-secondary, #94a3b8)',
                background: 'var(--color-background-button-secondary, #f1f5f9)',
                border: '1px solid var(--color-border, #e2e8f0)',
                borderRadius: '99px',
                padding: '0.1rem 0.5rem',
                flexShrink: 0,
              }}
            >
              {currentPage} / {numPages}
            </span>
          )}
        </div>

        {/* Right: nav + action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
          {/* Prev */}
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage <= 1 || numPages <= 1}
            title="Halaman sebelumnya"
            style={currentPage <= 1 || numPages <= 1 ? btnNavDisabled : btnNav}
          >
            <Icon name="chevron-left" size={15} />
          </button>

          {/* Next */}
          <button
            onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
            disabled={currentPage >= numPages || numPages <= 1}
            title="Halaman berikutnya"
            style={currentPage >= numPages || numPages <= 1 ? btnNavDisabled : btnNav}
          >
            <Icon name="chevron-right" size={15} />
          </button>

          {/* Divider */}
          <div style={{ width: '1px', height: '20px', background: 'var(--color-border, #e2e8f0)', margin: '0 0.2rem' }} />

          {/* Lihat PDF */}
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            title="Buka di tab baru"
            style={btnSecondary}
          >
            <Icon name="external-link" size={13} />
            <span>Lihat</span>
          </a>

          {/* Download PDF */}
          <a
            href={src}
            download
            title="Download PDF"
            style={btnSecondary}
          >
            <Icon name="download" size={13} />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* ── Canvas area ─────────────────────────────────────── */}
      <div
        style={{
          background: '#0f172a',
          minHeight: height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          boxSizing: 'border-box',
        }}
      >
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                border: '3px solid rgba(148,163,184,0.2)',
                borderTop: '3px solid #94a3b8',
                borderRadius: '50%',
                margin: '0 auto 0.75rem',
                animation: 'pdfSpin 0.8s linear infinite',
              }}
            />
            <style>{`@keyframes pdfSpin { to { transform: rotate(360deg); } }`}</style>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Memuat dokumen...</span>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ color: '#f87171', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              Gagal memuat PDF
            </div>
            <a href={src} target="_blank" rel="noreferrer" style={{ ...btnSecondary, fontSize: '0.8rem' }}>
              <Icon name="external-link" size={13} />
              Buka Langsung
            </a>
          </div>
        )}

        <canvas
          ref={canvasRef}
          style={{
            display: isLoading || error ? 'none' : 'block',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '6px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            background: '#fff',
          }}
        />
      </div>
    </div>
  )
}
