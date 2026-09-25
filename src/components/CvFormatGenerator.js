import React, { useState } from 'react'

const FILLED_CV_CONTENT = `### 1. Data Diri & Kontak
- Nama Lengkap: Muhamad Rofii
- Domisili / Lokasi: Bojonegoro, Jawa Timur, Indonesia
- Nomor HP / WhatsApp: -
- Email: rofii@example.com
- LinkedIn: https://linkedin.com/in/muhamadrofii
- GitHub / Portfolio: https://github.com/muhamadrofii
- Status Saat Ini: Fresh Graduate / Open to Work (Backend Developer & Software Engineer)

### 2. Bahasa
- Bahasa Indonesia: Penutur Asli / Native
- Bahasa Inggris: Tingkat Menengah / Pasif-Aktif
- Bahasa Lainnya: -

### 3. Pendidikan
- Jenjang & Jurusan: S1 Teknik Informatika (Fakultas Sains & Teknologi)
- Nama Institusi / Sekolah: Universitas Nahdlatul Ulama Sunan Giri (UNUGIRI)
- Periode Tahun: 2022 - 2026
- Nilai / IPK: -
- Judul Skripsi / Tugas Akhir / Fokus: Implementation of SMOTE and GridSearchCV for Imbalanced Sentiment Classification on the Cabinet Reshuffle Issue

### 4. Pengalaman Kerja / Magang / Organisasi
- Posisi / Jabatan: Fullstack Developer
  - Nama Perusahaan / Tempat: Freelance
  - Lokasi: Remote / Indonesia
  - Periode: Jan 2026 - Present
  - Tanggung Jawab & Pencapaian:
    * Merancang dan membangun aplikasi web responsif end-to-end terintegrasi backend dan database.
    * Mengembangkan arsitektur database relasional MySQL teroptimasi dan RESTful API aman.
    * Mengimplementasikan Role-Based Access Control (RBAC), pipeline autentikasi, serta validasi data.

- Posisi / Jabatan: Cloud DevOps & Backend Engineer
  - Nama Perusahaan / Tempat: Kemdikti Saintek "Pemberdayaan Desa Binaan" (SIMKODES)
  - Lokasi: Bojonegoro, Indonesia
  - Periode: 2026
  - Tanggung Jawab & Pencapaian:
    * Merancang arsitektur multi-container Docker Compose (PHP 8.2-FPM, Nginx Alpine, MySQL 8.0) untuk standarisasi environment.
    * Mengonfigurasi Nginx reverse proxy dengan OPcache bytecode caching sehingga latency respon server < 45ms.
    * Membangun otomasi script deployment CI/CD (hosting-setup.sh), memangkas siklus rilis manual hingga 75%.

- Posisi / Jabatan: Backend Developer & Technical Documentation Intern
  - Nama Perusahaan / Tempat: PPSDM MIGAS CEPU
  - Lokasi: Cepu, Jawa Tengah, Indonesia
  - Periode: Jan 2025 - Feb 2025
  - Tanggung Jawab & Pencapaian:
    * Merancang arsitektur backend sistem reservasi berbasis Laravel 12, Livewire Volt, dan database relasional UUID.
    * Mengintegrasikan Xendit Payment Gateway V2 (VA, QRIS, E-Wallet) dan webhook listener asynchronous secara real-time.
    * Menerapkan 3-tier RBAC, brute-force rate limiting, anti-bot reCAPTCHA v2, dokumentasi OpenAPI 3.0, serta automated E2E testing Playwright.

- Posisi / Jabatan: Backend Engineer
  - Nama Perusahaan / Tempat: MSIB (SmartBeez Platform)
  - Lokasi: Remote / Indonesia
  - Periode: Aug 2024 - Dec 2024
  - Tanggung Jawab & Pencapaian:
    * Memimpin tim 5 orang lintas fungsi (UI/UX, Frontend, Backend) dengan metodologi Agile/Scrum.
    * Mengintegrasikan Midtrans Snap API (QRIS & Virtual Account) dan webhook signature verification.
    * Membangun sistem autentikasi Google OAuth2, Django Allauth, route protection decorator, serta automated data seeding script.

- Posisi / Jabatan: Staff Urusan Internal
  - Nama Perusahaan / Tempat: Badan Eksekutif Mahasiswa (BEM) Fakultas Sains & Teknologi
  - Lokasi: Bojonegoro, Indonesia
  - Periode: 2024 - 2025
  - Tanggung Jawab & Pencapaian:
    * Memimpin pelaksanaan Latihan Keterampilan Manajemen Tingkat Dasar (LKMTD) gabungan FST dan FIK.
    * Mengoordinasikan komunikasi dan problem-solving operasional lintas panitia fakultas.

### 5. Keterampilan & Keahlian (Skills)
- Keahlian Utama (Hard Skills): Backend Development, RESTful API Design, Relational Database Architecture, Cloud & Containerization, System Security, Payment Gateway Integration
- Software / Tools: PHP, Laravel 12, Python, Django, Java, Spring Boot, MySQL, PostgreSQL, Docker, Docker Compose, Nginx, Git, Playwright, Linux, VS Code
- Keahlian Tambahan / Soft Skills: Leadership, Problem Solving, Technical Documentation, Agile/Scrum, Team Collaboration

### 6. Sertifikasi / Pelatihan (Opsional)
- Nama Sertifikat / Pelatihan: Backend Developer & Cloud Practitioner - Dicoding Indonesia (Jan 2025)

### 7. Target Lowongan & Batasan
- Posisi yang Ditargetkan: Backend Developer / Software Engineer / Fullstack Developer / Cloud DevOps Engineer
- Industri yang Dituju: Information Technology (IT), Software House, FinTech, Tech Startup, Enterprise
- Batasan / Deal-breakers: Terbuka untuk Remote, On-site, maupun Hybrid
`

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

export const CvFormatGenerator = () => {
  const [copiedType, setCopiedType] = useState(null)
  const [activePreview, setActivePreview] = useState(null) // 'filled' | 'blank' | null

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>
              📝 Download Format Data Diri & CV (.md)
            </h3>
            <p style={{ margin: '0.4rem 0 0 0', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Pilih format terisi otomatis dengan data profil atau unduh template kosong.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
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
              <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.35rem' }}>
                ⚡ Format Terisi Otomatis (Auto-Filled)
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '0 0 1rem 0' }}>
                Berisi data diri lengkap Muhamad Rofii: kontak, riwayat pekerjaan, organisasi, skill, dan pendidikan.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="button small"
                onClick={() => downloadFile(FILLED_CV_CONTENT, 'data-diri-cv-muhamad-rofii.md')}
                style={{ cursor: 'pointer', fontWeight: 600 }}
              >
                💾 Download File (.md)
              </button>
              <button
                type="button"
                className="button secondary small"
                onClick={() => copyToClipboard(FILLED_CV_CONTENT, 'filled')}
                style={{ cursor: 'pointer' }}
              >
                {copiedType === 'filled' ? '✅ Disalin!' : '📋 Salin'}
              </button>
              <button
                type="button"
                className="button secondary small"
                onClick={() => setActivePreview(activePreview === 'filled' ? null : 'filled')}
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
              <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.35rem' }}>
                📄 Template Kosong (Blank Format)
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '0 0 1rem 0' }}>
                Formulir kosong berisi struktur 7 poin utama data diri untuk diisi manual.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="button secondary small"
                onClick={() => downloadFile(BLANK_TEMPLATE_CONTENT, 'template-data-diri-cv-kosong.md')}
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
                onClick={() => setActivePreview(activePreview === 'blank' ? null : 'blank')}
                style={{ cursor: 'pointer' }}
              >
                {activePreview === 'blank' ? '▲ Tutup' : '👁️ Preview'}
              </button>
            </div>
          </div>
        </div>

        {activePreview && (
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.9rem' }}>
                Preview: {activePreview === 'filled' ? 'Data Diri & CV Terisi Otomatis' : 'Template Kosong'}
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
              <code>{activePreview === 'filled' ? FILLED_CV_CONTENT : BLANK_TEMPLATE_CONTENT}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  )
}
