import React, { useMemo, useState } from 'react'

export const generateDynamicCvContent = ({
  experiences = [],
  organizations = [],
  certificates = [],
  projects = [],
  aboutMe = {},
}) => {
  const nama = 'Muhamad Rofii'
  const domisili = 'Bojonegoro, Jawa Timur, Indonesia'
  const hp = '-'
  const email = aboutMe?.frontmatter?.email_link || 'rofii@example.com'
  const linkedin = 'https://linkedin.com/in/muhamadrofii'
  const github = aboutMe?.frontmatter?.github_link || 'https://github.com/muhamadrofii'
  const status = 'Fresh Graduate / Open to Work (Backend Developer & Software Engineer)'

  const bahasa = `### 2. Bahasa
- Bahasa Indonesia: Penutur Asli / Native
- Bahasa Inggris: Tingkat Menengah / Pasif-Aktif
- Bahasa Lainnya: -`

  const thesisProject = projects.find(
    (p) =>
      p.name &&
      (p.name.toLowerCase().includes('thesis') ||
        p.name.toLowerCase().includes('skripsi'))
  )
  const thesisTitle = thesisProject
    ? thesisProject.tagline || thesisProject.name
    : 'Implementation of SMOTE and GridSearchCV for Imbalanced Sentiment Classification on the Cabinet Reshuffle Issue'

  const pendidikan = `### 3. Pendidikan
- Jenjang & Jurusan: S1 Teknik Informatika (Fakultas Sains & Teknologi)
- Nama Institusi / Sekolah: Universitas Nahdlatul Ulama Sunan Giri (UNUGIRI)
- Periode Tahun: 2022 - 2026
- Nilai / IPK: -
- Judul Skripsi / Tugas Akhir / Fokus: ${thesisTitle}`

  const pengalamanList = []

  experiences.forEach((exp) => {
    const bullets = []
    if (exp.rawMarkdownBody) {
      const lines = exp.rawMarkdownBody.split('\n')
      lines.forEach((l) => {
        const trimmed = l.trim()
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          if (
            !trimmed.toLowerCase().startsWith('- **skills') &&
            !trimmed.toLowerCase().startsWith('* **skills')
          ) {
            bullets.push(`    * ${trimmed.replace(/^[-*]\s+/, '')}`)
          }
        }
      })
    }

    if (bullets.length === 0) {
      bullets.push(
        `    * Bertanggung jawab atas pengembangan dan perancangan teknis pada posisi ${exp.role || ''}.`
      )
    }

    pengalamanList.push(`- Posisi / Jabatan: ${exp.role || '-'}
  - Nama Perusahaan / Tempat: ${exp.company || '-'}
  - Lokasi: Remote / Indonesia
  - Periode: ${exp.date_range || '-'}
  - Tanggung Jawab & Pencapaian:
${bullets.join('\n')}`)
  })

  organizations.forEach((org) => {
    const bullets = []
    if (org.rawMarkdownBody) {
      const lines = org.rawMarkdownBody.split('\n')
      lines.forEach((l) => {
        const trimmed = l.trim()
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          bullets.push(`    * ${trimmed.replace(/^[-*]\s+/, '')}`)
        }
      })
    }
    if (bullets.length === 0) {
      bullets.push(
        `    * Mengoordinasikan program kerja dan aktivitas organisasi.`
      )
    }

    pengalamanList.push(`- Posisi / Jabatan: ${org.role || '-'}
  - Nama Perusahaan / Tempat: ${org.organization || '-'}
  - Lokasi: Bojonegoro, Indonesia
  - Periode: ${org.date_range || '-'}
  - Tanggung Jawab & Pencapaian:
${bullets.join('\n')}`)
  })

  const pengalamanSection = `### 4. Pengalaman Kerja / Magang / Organisasi
${pengalamanList.join('\n\n')}`

  const skills = `### 5. Keterampilan & Keahlian (Skills)
- Keahlian Utama (Hard Skills): Backend Development, RESTful API Design, Relational Database Architecture, Cloud & Containerization, System Security, Payment Gateway Integration
- Software / Tools: PHP, Laravel 12, Python, Django, Java, Spring Boot, MySQL, PostgreSQL, Docker, Docker Compose, Nginx, Git, Playwright, Linux, VS Code
- Keahlian Tambahan / Soft Skills: Leadership, Problem Solving, Technical Documentation, Agile/Scrum, Team Collaboration`

  const certList = []
  certificates.forEach((c) => {
    certList.push(
      `- Nama Sertifikat / Pelatihan: ${c.title || '-'} - ${c.issuer || ''} (${c.issue_date || '-'})`
    )
  })
  if (certList.length === 0) {
    certList.push(
      '- Nama Sertifikat / Pelatihan: Backend Developer & Cloud Practitioner - Dicoding Indonesia (Jan 2025)'
    )
  }

  const sertifikasiSection = `### 6. Sertifikasi / Pelatihan (Opsional)
${certList.join('\n')}`

  const targetSection = `### 7. Target Lowongan & Batasan
- Posisi yang Ditargetkan: Backend Developer / Software Engineer / Fullstack Developer / Cloud DevOps Engineer
- Industri yang Dituju: Information Technology (IT), Software House, FinTech, Tech Startup, Enterprise
- Batasan / Deal-breakers: Terbuka untuk Remote, On-site, maupun Hybrid`

  return `### 1. Data Diri & Kontak
- Nama Lengkap: ${nama}
- Domisili / Lokasi: ${domisili}
- Nomor HP / WhatsApp: ${hp}
- Email: ${email}
- LinkedIn: ${linkedin}
- GitHub / Portfolio: ${github}
- Status Saat Ini: ${status}

${bahasa}

${pendidikan}

${pengalamanSection}

${skills}

${sertifikasiSection}

${targetSection}
`
}

const BLANK_TEMPLATE_CONTENT = `### 1. Data Diri & Kontak
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

export const CvFormatGenerator = ({
  experiences = [],
  organizations = [],
  certificates = [],
  projects = [],
  aboutMe = {},
}) => {
  const [copiedType, setCopiedType] = useState(null)
  const [activePreview, setActivePreview] = useState(null)

  const filledContent = useMemo(() => {
    return generateDynamicCvContent({
      experiences,
      organizations,
      certificates,
      projects,
      aboutMe,
    })
  }, [experiences, organizations, certificates, projects, aboutMe])

  const downloadFile = (content, filename) => {
    try {
      const blob = new Blob([content], {
        type: 'text/markdown;charset=utf-8;',
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Gagal membuat file:', err)
    }
  }

  const copyToClipboard = async (content, type) => {
    try {
      if (navigator && navigator.clipboard) {
        await navigator.clipboard.writeText(content)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = content
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopiedType(type)
      setTimeout(() => setCopiedType(null), 2500)
    } catch (err) {
      console.error('Gagal menyalin format:', err)
    }
  }

  return (
    <section
      className="section-index"
      id="cv-format-template"
      style={{ marginTop: '3.5rem', marginBottom: '2rem' }}
    >
      <div
        className="card"
        style={{
          padding: '1.75rem',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          background: 'var(--color-background-card)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.25rem',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>
              📝 Download Format Data Diri & CV (.md)
            </h3>
            <p
              style={{
                margin: '0.4rem 0 0 0',
                color: 'var(--color-text-muted)',
                fontSize: '0.95rem',
              }}
            >
              Terisi otomatis dan tersinkronisasi langsung saat Anda menambah atau mengubah riwayat di website.
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* Card 1: Otomatis Terisi */}
          <div
            style={{
              padding: '1.25rem',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-background-code)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  marginBottom: '0.35rem',
                }}
              >
                ⚡ Format Terisi Otomatis ({experiences.length + organizations.length} Pengalaman)
              </div>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                  margin: '0 0 1rem 0',
                }}
              >
                Otomatis memuat seluruh data pengalaman kerja, organisasi, sertifikasi, dan pendidikan terbaru Anda.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="button small"
                onClick={() =>
                  downloadFile(filledContent, 'data-diri-cv-muhamad-rofii.md')
                }
                style={{ cursor: 'pointer', fontWeight: 600 }}
              >
                💾 Download File (.md)
              </button>
              <button
                type="button"
                className="button secondary small"
                onClick={() => copyToClipboard(filledContent, 'filled')}
                style={{ cursor: 'pointer' }}
              >
                {copiedType === 'filled' ? '✅ Disalin!' : '📋 Salin'}
              </button>
              <button
                type="button"
                className="button secondary small"
                onClick={() =>
                  setActivePreview(activePreview === 'filled' ? null : 'filled')
                }
                style={{ cursor: 'pointer' }}
              >
                {activePreview === 'filled' ? '▲ Tutup' : '👁️ Preview'}
              </button>
            </div>
          </div>

          {/* Card 2: Template Kosong */}
          <div
            style={{
              padding: '1.25rem',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-background-code)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  marginBottom: '0.35rem',
                }}
              >
                📄 Template Kosong (Blank Format)
              </div>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                  margin: '0 0 1rem 0',
                }}
              >
                Formulir kosong berisi struktur 7 poin utama data diri untuk diisi manual.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="button secondary small"
                onClick={() =>
                  downloadFile(
                    BLANK_TEMPLATE_CONTENT,
                    'template-data-diri-cv-kosong.md'
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                💾 Download (.md)
              </button>
              <button
                type="button"
                className="button secondary small"
                onClick={() => copyToClipboard(BLANK_TEMPLATE_CONTENT, 'blank')}
                style={{ cursor: 'pointer' }}
              >
                {copiedType === 'blank' ? '✅ Disalin!' : '📋 Salin'}
              </button>
              <button
                type="button"
                className="button secondary small"
                onClick={() =>
                  setActivePreview(activePreview === 'blank' ? null : 'blank')
                }
                style={{ cursor: 'pointer' }}
              >
                {activePreview === 'blank' ? '▲ Tutup' : '👁️ Preview'}
              </button>
            </div>
          </div>
        </div>

        {activePreview && (
          <div style={{ marginTop: '1.5rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <strong style={{ fontSize: '0.9rem' }}>
                Preview:{' '}
                {activePreview === 'filled'
                  ? 'Data Diri & CV Terisi Otomatis'
                  : 'Template Kosong'}
              </strong>
              <button
                type="button"
                className="button secondary small"
                onClick={() => setActivePreview(null)}
                style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
              >
                Tutup
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                padding: '1rem',
                borderRadius: '6px',
                backgroundColor: 'var(--color-background-input)',
                fontSize: '0.85rem',
                lineHeight: '1.5',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                maxHeight: '400px',
              }}
            >
              <code>
                {activePreview === 'filled'
                  ? filledContent
                  : BLANK_TEMPLATE_CONTENT}
              </code>
            </pre>
          </div>
        )}
      </div>
    </section>
  )
}
