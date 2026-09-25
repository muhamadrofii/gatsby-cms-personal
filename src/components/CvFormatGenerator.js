import React, { useState } from 'react'

const CV_TEMPLATE_CONTENT = `### 1. Data Diri & Kontak
- Nama Lengkap: 
- Domisili / Lokasi: (contoh: Jakarta Selatan, Indonesia)
- Nomor HP / WhatsApp: 
- Email: 
- LinkedIn: (opsional)
- GitHub / Portfolio: (opsional)
- Status Saat Ini: (contoh: Fresh Graduate / Open to Work / Sedang Bekerja)

### 2. Bahasa
- Bahasa Indonesia: (contoh: Penutur Asli / Native)
- Bahasa Inggris: (contoh: Pasif / Percakapan / Fasih / Tingkat Menengah)
- Bahasa Lainnya: (jika ada)

### 3. Pendidikan
- Jenjang & Jurusan: (contoh: S1 Teknik Informatika / SMK Tata Boga / SMA IPA)
- Nama Institusi / Sekolah: 
- Periode Tahun: (contoh: 2020 - 2024)
- Nilai / IPK: (opsional)
- Judul Skripsi / Tugas Akhir / Fokus: (opsional)

### 4. Pengalaman Kerja / Magang / Organisasi
(Bisa dibuat lebih dari satu jika ada)
- Posisi / Jabatan: 
- Nama Perusahaan / Tempat: 
- Lokasi: 
- Periode: (contoh: Jan 2023 - Des 2023)
- Tanggung Jawab & Pencapaian:
  * Melakukan ...
  * Bertanggung jawab atas ...
  * Berhasil meningkatkan / menyelesaikan ...

### 5. Keterampilan & Keahlian (Skills)
- Keahlian Utama (Hard Skills): (contoh: Kasir POS, Barista, Inventory, Python, Excel, Desain Grafis)
- Software / Tools: (contoh: Moka POS, Microsoft Office, Canva, Git, VS Code)
- Keahlian Tambahan / Soft Skills: (contoh: Pelayanan Pelanggan, Komunikasi, Kerja Tim)

### 6. Sertifikasi / Pelatihan (Opsional)
- Nama Sertifikat / Pelatihan: (contoh: Pelatihan Barista BNSP - 2024)

### 7. Target Lowongan & Batasan
- Posisi yang Ditargetkan: (contoh: Crew Store / Barista / Staff Admin / Web Developer)
- Industri yang Dituju: (contoh: F&B, Retail, IT, Logistik)
- Batasan / Deal-breakers: (contoh: Bersedia shift / Tidak bisa kerja luar kota / Hanya area Jabodetabek)
`

export const CvFormatGenerator = () => {
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleDownloadFile = () => {
    try {
      const blob = new Blob([CV_TEMPLATE_CONTENT], {
        type: 'text/markdown;charset=utf-8;',
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'template-data-diri-cv.md')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Gagal membuat file:', err)
    }
  }

  const handleCopy = async () => {
    try {
      if (navigator && navigator.clipboard) {
        await navigator.clipboard.writeText(CV_TEMPLATE_CONTENT)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = CV_TEMPLATE_CONTENT
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error('Gagal menyalin format:', err)
    }
  }

  return (
    <section className="section-index" id="cv-format-template" style={{ marginTop: '3.5rem', marginBottom: '2rem' }}>
      <div
        className="card"
        style={{
          padding: '1.75rem',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          background: 'var(--color-background-card)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>
              📝 Buat Template Data Diri & CV (.md)
            </h3>
            <p style={{ margin: '0.4rem 0 0 0', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Download atau salin format lengkap data diri, pengalaman kerja, pendidikan, dan target lowongan.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="button small"
              onClick={handleDownloadFile}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontWeight: 600 }}
            >
              💾 Buat & Download File (.md)
            </button>
            <button
              type="button"
              className="button secondary small"
              onClick={handleCopy}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}
            >
              {copied ? '✅ Berhasil Disalin!' : '📋 Salin Format'}
            </button>
            <button
              type="button"
              className="button secondary small"
              onClick={() => setShowPreview(!showPreview)}
              style={{ cursor: 'pointer' }}
            >
              {showPreview ? '▲ Tutup Preview' : '👁️ Preview Format'}
            </button>
          </div>
        </div>

        {showPreview && (
          <div style={{ marginTop: '1.25rem' }}>
            <pre
              style={{
                margin: 0,
                padding: '1rem',
                borderRadius: '6px',
                backgroundColor: 'var(--color-background-code)',
                fontSize: '0.85rem',
                lineHeight: '1.5',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              <code>{CV_TEMPLATE_CONTENT}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  )
}
