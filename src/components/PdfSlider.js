import React, { useState, useEffect, useRef } from 'react'

export const PdfSlider = ({ src, title = 'Presentasi PDF' }) => {
  const [numPages, setNumPages] = useState(1)
  const [currentSlide, setCurrentSlide] = useState(1)
  const [useFallback, setUseFallback] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const sliderRef = useRef(null)
  const pdfDocRef = useRef(null)
  const canvasRefs = useRef([])
  const renderedPagesRef = useRef(new Set())

  // Render page to canvas if PDF.js is available
  const renderSlide = (pdfDoc, pageNum) => {
    if (!pdfDoc || renderedPagesRef.current.has(pageNum)) return Promise.resolve()

    const canvas = canvasRefs.current[pageNum - 1]
    if (!canvas) return Promise.resolve()

    renderedPagesRef.current.add(pageNum)

    return pdfDoc
      .getPage(pageNum)
      .then((page) => {
        const containerWidth = sliderRef.current?.clientWidth || 600
        const unscaledViewport = page.getViewport({ scale: 1.0 })
        const targetWidth = Math.min(containerWidth - 32, 700)
        const scale = targetWidth / unscaledViewport.width
        const viewport = page.getViewport({ scale: scale > 0 ? scale : 1.0 })

        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        return page.render({ canvasContext: context, viewport }).promise
      })
      .catch((err) => {
        console.warn(`Could not render page ${pageNum} via PDF.js:`, err)
        renderedPagesRef.current.delete(pageNum)
      })
  }

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setUseFallback(false)
    renderedPagesRef.current.clear()

    // 1.5s TIMEOUT SAFETY NET: If CDN is slow or blocked, switch to native viewer immediately!
    const fallbackTimer = setTimeout(() => {
      if (isMounted && isLoading && !pdfDocRef.current) {
        console.warn('PDF.js CDN load timeout. Switching to native PDF previewer.')
        setUseFallback(true)
        setIsLoading(false)
      }
    }, 1500)

    const loadPdfJs = () => {
      return new Promise((resolve, reject) => {
        if (window.pdfjsLib) {
          resolve(window.pdfjsLib)
          return
        }

        const scriptId = 'pdfjs-script-slider'
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

        script.onerror = () => reject(new Error('CDN failed to load'))
      })
    }

    loadPdfJs()
      .then((pdfjsLib) => {
        if (!isMounted) return
        return pdfjsLib.getDocument(src).promise
      })
      .then((pdf) => {
        if (!isMounted || !pdf) return
        clearTimeout(fallbackTimer)
        pdfDocRef.current = pdf
        setNumPages(pdf.numPages)
        setIsLoading(false)
      })
      .catch((err) => {
        if (!isMounted) return
        clearTimeout(fallbackTimer)
        console.warn('PDF.js loading error, using native fallback:', err)
        setUseFallback(true)
        setIsLoading(false)
      })

    return () => {
      isMounted = false
      clearTimeout(fallbackTimer)
    }
  }, [src])

  // Render slides on demand
  useEffect(() => {
    if (numPages > 0 && pdfDocRef.current && !useFallback) {
      const timer = setTimeout(() => {
        renderSlide(pdfDocRef.current, currentSlide)
        if (currentSlide < numPages) {
          renderSlide(pdfDocRef.current, currentSlide + 1)
        }
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [numPages, currentSlide, useFallback])

  // Track active slide on scroll / swipe
  const handleScroll = () => {
    if (!sliderRef.current || numPages === 0) return
    const container = sliderRef.current
    const scrollPosition = container.scrollLeft
    const width = container.clientWidth
    const index = Math.round(scrollPosition / width) + 1
    const clampedIndex = Math.min(Math.max(index, 1), numPages)

    if (clampedIndex !== currentSlide) {
      setCurrentSlide(clampedIndex)
    }
  }

  // Navigate to slide
  const scrollToSlide = (slideIndex) => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const targetScroll = (slideIndex - 1) * container.clientWidth

    if (pdfDocRef.current && !useFallback) {
      renderSlide(pdfDocRef.current, slideIndex)
    }

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    })
    setCurrentSlide(slideIndex)
  }

  return (
    <div
      style={{
        border: '1px solid var(--color-border, #e2e8f0)',
        borderRadius: '10px',
        overflow: 'hidden',
        background: 'var(--color-card, #ffffff)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        marginTop: '0.75rem',
      }}
    >
      {/* PPT Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.6rem 0.85rem',
          background: 'var(--color-bg-secondary, #f8fafc)',
          borderBottom: '1px solid var(--color-border, #e2e8f0)',
          fontSize: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
          <span>📽️ {title}</span>
          {!isLoading && numPages > 0 && (
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '12px',
                background: 'var(--color-primary, #2563eb)',
                color: '#fff',
                marginLeft: '0.25rem',
              }}
            >
              Slide {currentSlide} / {numPages}
            </span>
          )}
        </div>

        {/* PPT Nav Controls */}
        {numPages > 1 && !isLoading && (
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            <button
              onClick={() => scrollToSlide(currentSlide - 1)}
              disabled={currentSlide <= 1}
              style={{
                padding: '0.25rem 0.6rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: currentSlide <= 1 ? 'not-allowed' : 'pointer',
                opacity: currentSlide <= 1 ? 0.4 : 1,
                borderRadius: '6px',
                border: '1px solid var(--color-border, #cbd5e1)',
                background: 'var(--color-bg, #ffffff)',
                color: 'var(--color-text, #1e293b)',
              }}
            >
              ◀ Prev
            </button>
            <button
              onClick={() => scrollToSlide(currentSlide + 1)}
              disabled={currentSlide >= numPages}
              style={{
                padding: '0.25rem 0.6rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: currentSlide >= numPages ? 'not-allowed' : 'pointer',
                opacity: currentSlide >= numPages ? 0.4 : 1,
                borderRadius: '6px',
                border: '1px solid var(--color-border, #cbd5e1)',
                background: 'var(--color-bg, #ffffff)',
                color: 'var(--color-text, #1e293b)',
              }}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--color-text-secondary, #64748b)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏳</div>
          <span>Memuat slide presentasi PDF...</span>
        </div>
      )}

      {/* Instant Native Viewer Fallback (If CDN is slow or blocked) */}
      {!isLoading && useFallback && (
        <div style={{ padding: '1rem', background: '#0f172a', textCenter: 'center' }}>
          <object
            data={`${src}#toolbar=0&navpanes=0&view=Fit`}
            type="application/pdf"
            width="100%"
            height="320px"
            style={{ display: 'block', borderRadius: '6px', border: 'none' }}
          >
            <div style={{ padding: '1.5rem', color: '#fff', textAlign: 'center' }}>
              <p style={{ margin: '0 0 1rem 0' }}>Pratinjau PDF dapat dilihat langsung:</p>
              <a
                href={src}
                target="_blank"
                rel="noreferrer"
                className="button primary small"
              >
                👁️ Buka Dokumen PDF ↗
              </a>
            </div>
          </object>
        </div>
      )}

      {/* PPT Canvas Slider Container */}
      {!isLoading && !useFallback && numPages > 0 && (
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            padding: '0.75rem 0',
            background: '#0f172a',
            minHeight: '280px',
          }}
        >
          {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum, idx) => (
            <div
              key={pageNum}
              style={{
                flex: '0 0 100%',
                scrollSnapAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '0 0.5rem',
                boxSizing: 'border-box',
                minHeight: '260px',
              }}
            >
              <canvas
                ref={(el) => (canvasRefs.current[idx] = el)}
                style={{
                  maxWidth: '95%',
                  height: 'auto',
                  borderRadius: '6px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                  background: '#ffffff',
                }}
              />
              <div
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  background: 'rgba(15, 23, 42, 0.8)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '10px',
                }}
              >
                Slide {pageNum} dari {numPages}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Instructions */}
      {!isLoading && (
        <div
          style={{
            padding: '0.4rem 0.75rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--color-text-light, #64748b)',
            borderTop: '1px solid var(--color-border, #e2e8f0)',
            background: 'var(--color-bg-secondary, #f8fafc)',
          }}
        >
          💡 <em>Geser (swipe) layar ke kanan / kiri di HP untuk memindah slide</em>
        </div>
      )}
    </div>
  )
}
