import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  id: {
    translation: {
      nav: {
        blog: 'Blog',
        notes: 'Catatan',
        projects: 'Proyek',
        certificates: 'Sertifikat',
        experience: 'Pengalaman',
        organizations: 'Organisasi',
        about_me: 'Tentang Saya',
        contact: 'Kontak',
        search_posts: 'Cari artikel...',
        search_count: 'Cari {{count}} artikel...',
      },
      hero: {
        greeting: "Halo, Saya Rofi'i! 👋",
        description:
          'Saya adalah Software Engineer dengan spesialisasi dalam Fullstack Development dan DevOps, berfokus pada pembangunan aplikasi web yang skalabel, aman, dan berkinerja tinggi. Saya terbiasa memecahkan masalah kompleks melalui kode yang bersih, arsitektur modern, dan pipeline delivery terotomasi.\n\nPengalaman saya mencakup rekayasa fullstack menggunakan Laravel, Django, Spring Boot, React, serta basis data relasional (MySQL, PostgreSQL), dikombinasikan dengan kontainerisasi dan infrastruktur cloud menggunakan Docker, Docker Compose, Nginx, serta alur kerja CI/CD otomatis.\n\nFokus utama saya adalah menghadirkan sistem yang mudah dirawat—mulai dari integrasi payment gateway yang aman dan RESTful API hingga standardisasi lingkungan deployment yang dapat direplikasi. Terbuka untuk tantangan baru dan peluang rekayasa perangkat lunak yang berdampak.',
        extra_description: 'Seluruh konten di situs ini ditulis langsung oleh saya, bukan AI.',
        about_me: 'Tentang Saya',
        newsletter: 'Newsletter Email',
        view_cv: 'Lihat CV',
      },
      sidebar: {
        about_me: 'Tentang Saya',
        theme: 'Tema',
        sidebar_bio: "Saya Rofi'i, Software Engineer dengan minat pada Fullstack & DevOps di Indonesia. Ini adalah digital garden saya. 🌱",
      },
      sections: {
        blog_title: 'Blog',
        blog_desc: 'Panduan, referensi, dan tutorial rekayasa perangkat lunak.',
        notes_title: 'Catatan Saya',
        notes_desc: 'Koleksi catatan seputar programming dan teknologi.',
        deep_dives_title: 'Eksplorasi Mendalam',
        deep_dives_desc: 'Tutorial komprehensif tentang topik pengembangan perangkat lunak.',
        all_topics: 'Semua Topik',
        experience_title: 'Pengalaman Kerja',
        experience_desc: 'Riwayat profesional rekayasa sistem dan perangkat lunak saya.',
        organizations_title: 'Pengalaman Organisasi',
        organizations_desc: 'Kepemimpinan dan keterlibatan aktif dalam organisasi kemahasiswaan dan teknologi.',
        certificates_title: 'Sertifikasi & Lisensi',
        certificates_desc: 'Lisensi resmi, sertifikat pelatihan, dan kredensial profesional terverifikasi.',
        all_certificates: 'Semua Sertifikat',
        projects_title: 'Proyek Unggulan',
        projects_desc: 'Koleksi proyek open-source dan rekayasa sistem yang telah saya buat.',
        all_projects: 'Semua Proyek',
      },
      buttons: {
        preview_pdf: '📄 Preview PDF',
        close_pdf: '▲ Tutup Preview PDF',
        verify: 'Verifikasi ↗',
        original_file: 'File Asli (Catbox) ↗',
        download_pdf: 'Download PDF ⬇',
        view_proof: '📄 Lihat Dokumen Bukti (Catbox) ↗',
        article: 'Artikel',
        demo: 'Demo',
        source: 'Kode Sumber',
        copy: '📋 Salin',
        copied: '✅ Disalin!',
        close: '▲ Tutup CV',
        preview: '👁️ Lihat CV',
        download: '💾 Download File (.md)',
      },
      cv_generator: {
        title: 'Generator Format CV (Data Diri Markdown)',
        description: 'Gunakan fitur ini untuk mengekspor data profil, pengalaman, organisasi, sertifikasi, dan pendidikan secara otomatis ke format Markdown yang siap disinkronkan ke AI Job Search atau CV ATS.',
        filled_title: '📁 Data Diri Lengkap Terisi (Auto-Generated)',
        filled_desc: 'Otomatis memuat seluruh data pengalaman kerja, organisasi, sertifikasi, dan pendidikan terbaru Anda.',
        blank_title: '📄 Template Kosong (Blank Format)',
        blank_desc: 'Formulir kosong berisi struktur 7 poin utama data diri untuk diisi manual.',
        preview_filled: 'Preview Data Diri Lengkap Terisi:',
        preview_blank: 'Preview Template Data Diri Kosong:',
      },
      blog_page: {
        title: 'Blog',
        description: 'Panduan, referensi, dan tutorial seputar pemrograman, web development, dan arsitektur sistem.',
        all_topics: 'Semua Topik',
      },
      notes_page: {
        title: 'Catatan',
        description: 'Koleksi catatan pribadi seputar pemrograman, tips teknologi, dan dokumentasi sistem.',
      },
      projects_page: {
        title: 'Proyek',
        description: 'Koleksi proyek open-source dan rekayasa perangkat lunak yang telah saya bangun selama ini.',
      },
      certificates_page: {
        title: 'Sertifikasi',
        description: 'Lisensi, sertifikat keahlian resmi, dan kredensial profesional terverifikasi.',
      },
      topics_page: {
        title: 'Topik',
        description: 'Semua topik yang dibahas seputar pengembangan backend, frontend, cloud, dan arsitektur sistem.',
        post_singular: ' artikel',
        post_plural: ' artikel',
      },
      post: {
        comments: 'Komentar',
        new_badge: '✨ Baru',
      },
      common: {
        theme_toggle: 'Ganti tema',
        switch_lang: 'Switch to English',
        current_lang: 'ID',
      },
    },
  },
  en: {
    translation: {
      nav: {
        blog: 'Blog',
        notes: 'Notes',
        projects: 'Projects',
        certificates: 'Certificates',
        experience: 'Experience',
        organizations: 'Organizations',
        about_me: 'About Me',
        contact: 'Contact',
        search_posts: 'Search posts...',
        search_count: 'Search {{count}} posts...',
      },
      hero: {
        greeting: "Hi, I'm Rofi'i! 👋",
        description:
          "I am a Software Engineer specializing in Fullstack Development and DevOps, dedicated to building scalable, secure, and high-performance web applications. I enjoy solving complex problems through clean code, modern architectures, and automated delivery pipelines.\n\nMy experience spans fullstack engineering across Laravel, Django, Spring Boot, React, and relational databases (MySQL, PostgreSQL), combined with containerization and cloud infrastructure using Docker, Docker Compose, Nginx, and automated CI/CD workflows.\n\nI focus on shipping maintainable systems—from secure payment gateways and RESTful APIs to reproducible deployment environments. Open to new challenges and impactful engineering opportunities.",
        extra_description: 'Everything on this site is written by me, not AI.',
        about_me: 'About Me',
        newsletter: 'Email Newsletter',
        view_cv: 'View CV',
      },
      sidebar: {
        about_me: 'About Me',
        theme: 'Theme',
        sidebar_bio: "I'm Rofi'i, a Software Engineer, Fullstack & DevOps enthusiast based in Indonesia. This is my digital garden. 🌱",
      },
      sections: {
        blog_title: 'Blog',
        blog_desc: 'Guides, references, and tutorials on software engineering.',
        notes_title: 'My Notes',
        notes_desc: 'Personal notes and reflections on programming and technology.',
        deep_dives_title: 'Deep Dives',
        deep_dives_desc: 'Long-form tutorials on a variety of development topics.',
        all_topics: 'All Topics',
        experience_title: 'Experience',
        experience_desc: 'My professional work history in software engineering.',
        organizations_title: 'Organization Experience',
        organizations_desc: 'Leadership and active involvement in student and tech organizations.',
        certificates_title: 'Certifications',
        certificates_desc: 'Licenses, certificates, and verified professional credentials.',
        all_certificates: 'All Certificates',
        projects_title: 'Featured Projects',
        projects_desc: "Open-source projects and software systems I've worked on over the years.",
        all_projects: 'All Projects',
      },
      buttons: {
        preview_pdf: '📄 Preview PDF',
        close_pdf: '▲ Close PDF Preview',
        verify: 'Verify ↗',
        original_file: 'Original File (Catbox) ↗',
        download_pdf: 'Download PDF ⬇',
        view_proof: '📄 View Proof Document (Catbox) ↗',
        article: 'Article',
        demo: 'Demo',
        source: 'Source',
        copy: '📋 Copy',
        copied: '✅ Copied!',
        close: '▲ Close CV',
        preview: '👁️ View CV',
        download: '💾 Download (.md)',
      },
      cv_generator: {
        title: 'CV Format Generator (Profile Markdown)',
        description: 'Use this tool to automatically export your profile, experience, organizations, certificates, and education into structured Markdown ready for AI Job Search or ATS CV tailoring.',
        filled_title: '📁 Complete Profile Data (Auto-Generated)',
        filled_desc: 'Automatically loads all your latest work experience, organizations, certifications, and education.',
        blank_title: '📄 Blank Template (Blank Format)',
        blank_desc: 'Empty form structure containing the 7 core profile sections for manual editing.',
        preview_filled: 'Preview Complete Profile Data:',
        preview_blank: 'Preview Blank Template:',
      },
      blog_page: {
        title: 'Blog',
        description: 'Guides, references, and tutorials on programming, web development, and system architecture.',
        all_topics: 'All Topics',
      },
      notes_page: {
        title: 'Notes',
        description: 'Personal notes about programming, development tips, and technical learnings.',
      },
      projects_page: {
        title: 'Projects',
        description: "Open-source projects and software systems I've built over the years.",
      },
      certificates_page: {
        title: 'Certifications',
        description: 'Licenses, certificates, and verified professional credentials.',
      },
      topics_page: {
        title: 'Topics',
        description: "All the topics I've covered across backend, frontend, cloud, and system architecture.",
        post_singular: ' post',
        post_plural: ' posts',
      },
      post: {
        comments: 'Comments',
        new_badge: '✨ New',
      },
      common: {
        theme_toggle: 'Toggle theme',
        switch_lang: 'Ganti ke Bahasa Indonesia',
        current_lang: 'EN',
      },
    },
  },
}

let initialLanguage = 'id'
if (typeof window !== 'undefined') {
  const saved = window.localStorage.getItem('i18nextLng')
  if (saved) {
    initialLanguage = saved.startsWith('en') ? 'en' : 'id'
  }
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })
}

export default i18n
