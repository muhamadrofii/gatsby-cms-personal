import React, { useState, useEffect, useRef, useCallback } from 'react'

export const PdfViewer = ({ src, title = 'PDF Preview' }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const pdfDocRef = useRef(null)
  const renderTaskRef = useRef(null)

  const renderPage = useCallback((pageNum, pdfDoc) => {
    if (!pdfDoc || !canvasRef.current || !containerRef.current) return

    pdfDoc.getPage(pageNum).then((page) => {
      const containerWidth = containerRef.current.clientWidth || 600
      const unscaledViewport = page.getViewport({ scale: 1.0 })
      // Fit to container width with a padding offset
      const targetWidth = Math.min(containerWidth - 16, 750)
      const scale = targetWidth / unscaledViewport.width
      const viewport = page.getViewport({ scale: scale > 0 ? scale : 1.0 })

      const canvas = canvasRef.current
      if (!canvas) return

      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width

      // Cancel previous render task if running
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
      }

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }

      const renderTask = page.render(renderContext)
      renderTaskRef.current = renderTask

      renderTask.promise
        .then(() => {
          setIsLoading(false)
        })
        .catch((err) => {
          if (err?.name !== 'RenderingCancelledException') {
            console.error('Error rendering page:', err)
          }
        })
    }).catch((err) => {
      console.error('Error getting page:', err)
      setError('Gagal memuat halaman PDF.')
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    const loadPdfJs = () => {
      return new Promise((resolve, reject) => {
        if (window.pdfjsLib) {
          resolve(window.pdfjsLib)
          return
        }

        const scriptId = 'pdfjs-script'
        let script = document.getElementById(scriptId)

        if (!script) {
          script = document.createElement('script')
          script.id = scriptId
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
          script.async = true
          document.body.appendChild(script)
        }

        script.onload = () => {
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
              'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
            resolve(window.pdfjsLib)
          } else {
            reject(new Error('PDF.js failed to initialize'))
          }
        }

        script.onerror = () => reject(new Error('Failed to load PDF.js script'))
      })
    }

    loadPdfJs()
      .then((pdfjsLib) => {
        if (!isMounted) return
        const loadingTask = pdfjsLib.getDocument(src)
        return loadingTask.promise
      })
      .then((pdf) => {
        if (!isMounted || !pdf) return
        pdfDocRef.current = pdf
        setNumPages(pdf.numPages)
        setPageNumber(1)
        renderPage(1, pdf)
      })
      .catch((err) => {
        if (!isMounted) return
        console.error('Error loading PDF:', err)
        setError('Gagal memuat preview PDF.')
        setIsLoading(false)
      })

    return () => {
      isMounted = false
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
      }
    }
  }, [src, renderPage])

  // Handle page changes
  const changePage = (offset) => {
    const newPage = pageNumber + offset
    if (newPage >= 1 && newPage <= (numPages || 1)) {
      setPageNumber(newPage)
      renderPage(newPage, pdfDocRef.current)
    }
  }

  // Handle window resize for responsiveness
  useEffect(() => {
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (pdfDocRef.current) {
          renderPage(pageNumber, pdfDocRef.current)
        }
      }, 200)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [pageNumber, renderPage])

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
      {/* PDF Controls Header */}
      {numPages > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.4rem 0.75rem',
            background: 'var(--color-card, #ffffff)',
            borderBottom: '1px solid var(--color-border, #e2e8f0)',
            fontSize: '0.85rem',
          }}
        >
          <span style={{ fontWeight: 500, color: 'var(--color-text-secondary, #64748b)' }}>
            {title} ({pageNumber} / {numPages})
          </span>
          <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
            <button
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              style={{
                padding: '0.2rem 0.5rem',
                fontSize: '0.8rem',
                cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer',
                opacity: pageNumber <= 1 ? 0.5 : 1,
                borderRadius: '4px',
                border: '1px solid var(--color-border, #cbd5e1)',
                background: 'var(--color-bg, #fff)',
              }}
            >
              ◀ Prev
            </button>
            <button
              onClick={() => changePage(1)}
              disabled={pageNumber >= numPages}
              style={{
                padding: '0.2rem 0.5rem',
                fontSize: '0.8rem',
                cursor: pageNumber >= numPages ? 'not-allowed' : 'pointer',
                opacity: pageNumber >= numPages ? 0.5 : 1,
                borderRadius: '4px',
                border: '1px solid var(--color-border, #cbd5e1)',
                background: 'var(--color-bg, #fff)',
              }}
            >
              Next ▶
            </button>
          </div>
        </div>
      )}

      {/* Main Canvas / Viewer Area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '260px',
          padding: '0.5rem',
          position: 'relative',
        }}
      >
        {isLoading && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary, #64748b)' }}>
            <span>⏳ Memuat pratinjau PDF...</span>
          </div>
        )}

        {error && (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: '#ef4444' }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>{error}</p>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'underline', fontSize: '0.9rem' }}
            >
              Buka PDF secara langsung ↗
            </a>
          </div>
        )}

        <canvas
          ref={canvasRef}
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: isLoading || error ? 'none' : 'block',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: '4px',
          }}
        />
      </div>
    </div>
  )
}
