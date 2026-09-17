import React, { useState, useEffect, useRef, useCallback } from 'react'

// Dynamically import pdfjs-dist only on client side (Gatsby SSR-safe)
let pdfjsLib = null

async function getPdfJs() {
  if (pdfjsLib) return pdfjsLib
  // Dynamic import so Gatsby SSR doesn't choke on browser-only APIs
  const mod = await import('pdfjs-dist')
  pdfjsLib = mod
  // Use CDN worker — bundled worker causes issues with Gatsby webpack
  // Use locally bundled worker — no CDN needed, no download dialog
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
  return pdfjsLib
}

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
      const targetWidth = Math.min(containerWidth - 24, 800) // subtract padding
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
      })
    }).catch((err) => {
      if (err?.name !== 'RenderingCancelledException') {
        console.warn('PDF render error:', err)
      }
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

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
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
      }
    }
  }, [src])

  // Render canvas whenever page changes
  useEffect(() => {
    if (numPages > 0 && pdfDocRef.current && !isLoading) {
      renderPage(pdfDocRef.current, currentPage)
    }
  }, [currentPage, numPages, isLoading, renderPage])

  // Re-render on window resize (responsive width)
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

  return (
    <div
      ref={containerRef}
      style={{
        border: '1px solid var(--color-border, #e2e8f0)',
        borderRadius: '8px',
        overflow: 'hidden',
        background: 'var(--color-bg-secondary, #f8fafc)',
        marginTop: '0.75rem',
      }}
    >
      {/* Toolbar */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text, #1e293b)' }}>
            📄 {title}
          </span>
          {numPages > 0 && (
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary, #64748b)' }}>
              ({currentPage}/{numPages})
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {numPages > 1 && (
            <>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="button secondary small"
                style={{ opacity: currentPage <= 1 ? 0.4 : 1, cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }}
              >
                ◀
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
                disabled={currentPage >= numPages}
                className="button secondary small"
                style={{ opacity: currentPage >= numPages ? 0.4 : 1, cursor: currentPage >= numPages ? 'not-allowed' : 'pointer' }}
              >
                ▶
              </button>
            </>
          )}
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

      {/* Canvas area */}
      <div
        style={{
          background: '#1e293b',
          minHeight: height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem',
          boxSizing: 'border-box',
        }}
      >
        {isLoading && (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏳</div>
            <span style={{ fontSize: '0.85rem' }}>Memuat dokumen...</span>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', color: '#f87171', padding: '1.5rem' }}>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>{error}</p>
            <a href={src} target="_blank" rel="noreferrer" className="button secondary small">
              👁️ Buka Langsung ↗
            </a>
          </div>
        )}

        <canvas
          ref={canvasRef}
          style={{
            display: isLoading || error ? 'none' : 'block',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '4px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            background: '#fff',
          }}
        />
      </div>
    </div>
  )
}
