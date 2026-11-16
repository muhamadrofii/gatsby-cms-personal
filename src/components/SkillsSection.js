import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'
import { Heading } from './Heading'
import projectsIcon from '../assets/nav-projects.png'

const SKILL_CATEGORIES = [
  {
    key: 'devops_cloud',
    title_id: 'Cloud, DevOps & Infrastruktur',
    title_en: 'Cloud, DevOps & Infrastructure',
    icon: '☁️',
    summary_id:
      'Otomasi CI/CD, arsitektur multi-environment, web server performa tinggi, dan rilis zero-data-loss.',
    summary_en:
      'Automated CI/CD, multi-environment architecture, high-performance web servers, and zero-data-loss releases.',
    skills: [
      { name: 'GitHub Actions', desc: '7-Stage CI/CD Pipeline', tag: 'CI/CD' },
      { name: 'Docker & Compose', desc: 'Containerization & Environments', tag: 'DevOps' },
      { name: 'LiteSpeed Enterprise', desc: 'High-Speed Web Server (.htaccess)', tag: 'Server' },
      { name: 'Nginx', desc: 'Reverse Proxy & Gateway', tag: 'Server' },
      { name: 'Linux Shell / Bash', desc: 'Deployment Scripting & Automation', tag: 'OS' },
      { name: 'SSH Port 65002', desc: 'Encrypted Remote Automation', tag: 'Security' },
      { name: 'Rsync Deployment', desc: 'Selective Code Transfer & Zero Data Loss', tag: 'DevOps' },
      { name: 'AWS Cloud', desc: 'Cloud & Gen AI Practitioner', tag: 'Cloud' },
      { name: 'OPcache & Caching', desc: 'Bytecode Cache & SQL Indexing', tag: 'Speed' },
    ],
  },
  {
    key: 'backend',
    title_id: 'Backend Engineering & APIs',
    title_en: 'Backend Engineering & APIs',
    icon: '⚙️',
    summary_id:
      'Pengembangan web service skala enterprise, arsitektur MVC, integrasi payment gateway, dan manajemen transaksi.',
    summary_en:
      'Enterprise-grade web services, MVC architecture, payment gateway integration, and transaction management.',
    skills: [
      { name: 'PHP 8.2 & Laravel 12', desc: 'Eloquent ORM & Livewire Volt', tag: 'Framework' },
      { name: 'Python & Django', desc: 'Django Allauth, Custom Decorators', tag: 'Framework' },
      { name: 'Java & Spring Boot', desc: 'OOP, IoC & Microservices', tag: 'Framework' },
      { name: 'Node.js & Express', desc: 'Asynchronous RESTful APIs', tag: 'Runtime' },
      { name: 'RESTful API Design', desc: 'Standard JSON schemas & CRUD', tag: 'API' },
      { name: 'OpenAPI 3.0 / Swagger', desc: 'Interactive API Documentation', tag: 'Docs' },
      { name: 'Payment Gateways', desc: 'Midtrans Snap & Xendit V2', tag: 'FinTech' },
      { name: 'Webhook Handlers', desc: 'Signature Key Verification', tag: 'Security' },
    ],
  },
  {
    key: 'database',
    title_id: 'Database & Media Storage',
    title_en: 'Database & Media Storage',
    icon: '🗄️',
    summary_id:
      'Pemodelan relasional data, optimasi indeks kueri, snapshot otomatis terkompresi, dan CDN media terdistribusi.',
    summary_en:
      'Relational data modeling, query indexing optimization, automated compressed snapshots, and decentralized media CDN.',
    skills: [
      { name: 'MySQL', desc: 'UUIDs, Relations & ACID Transactions', tag: 'RDBMS' },
      { name: 'PostgreSQL', desc: 'Relational Schemas & Foreign Keys', tag: 'RDBMS' },
      { name: 'SQLite', desc: 'In-Memory Test Runner for CI', tag: 'Testing' },
      { name: 'Query Optimization', desc: 'B-tree Indexing & Low-Latency (<45ms)', tag: 'Tuning' },
      { name: 'Automated Snapshot', desc: 'Pre-Deploy mysqldump .sql.gz', tag: 'Backup' },
      { name: 'Media CDN', desc: 'ImageKit & Cloudinary Decentralized Assets', tag: 'Storage' },
    ],
  },
  {
    key: 'testing_security',
    title_id: 'Testing, Keamanan & QA',
    title_en: 'Testing, Security & QA',
    icon: '🛡️',
    summary_id:
      'Pengujian otomatis unit/feature/E2E, otentikasi terpusat multi-tier, proteksi bot, dan isolasi akses.',
    summary_en:
      'Automated unit/feature/E2E testing, multi-tier centralized authentication, anti-bot protection, and access isolation.',
    skills: [
      { name: 'PHPUnit', desc: '79 Automated Test Suites (468 Assertions)', tag: 'Testing' },
      { name: 'Playwright', desc: 'End-to-End (E2E) Browser Automation', tag: 'QA' },
      { name: 'Role-Based Access (RBAC)', desc: '3-Tier Multi-Level Permission', tag: 'Auth' },
      { name: 'Google OAuth2', desc: 'Centralized SSO Authentication', tag: 'Auth' },
      { name: 'Anti-Bot Protection', desc: 'Google reCAPTCHA v2 & Rate Limiting', tag: 'Security' },
      { name: 'HTTP Basic Auth', desc: 'OpenSSL Dynamic Shield for Staging', tag: 'Security' },
    ],
  },
  {
    key: 'frontend_workflow',
    title_id: 'Frontend & Workflow Tools',
    title_en: 'Frontend & Workflow Tools',
    icon: '💻',
    summary_id:
      'Pengembangan antarmuka responsif, bundler modern, kontrol versi kolaboratif, dan metodologi kerja agile.',
    summary_en:
      'Responsive interface development, modern asset bundlers, collaborative version control, and agile workflows.',
    skills: [
      { name: 'JavaScript (ES6+)', desc: 'Modern Async/Await & Fetch', tag: 'Language' },
      { name: 'React & Gatsby', desc: 'Component Architecture & SSR', tag: 'UI' },
      { name: 'Vite Bundler', desc: 'Asset Minification & Tree-shaking', tag: 'Tool' },
      { name: 'Git & GitHub', desc: 'Git Flow & Code Reviews', tag: 'VCS' },
      { name: 'Postman', desc: 'API Testing & Mocking', tag: 'Tool' },
      { name: 'Agile / Scrum', desc: 'Sprint Planning & Team Leadership', tag: 'Process' },
    ],
  },
]

const RECAP_EXPERIENCES = [
  {
    company: 'Kemdikti Saintek (SIMKODES)',
    period: '2025 - 2026',
    role: 'Cloud DevOps & Backend Engineer',
    highlight_id:
      'GitHub Actions 7-Stage CI/CD · 79 Tests PHPUnit (468 Assertions) · LiteSpeed Enterprise · Zero Data Loss (mysqldump .sql.gz) · Playwright E2E · HKI Hak Cipta No. 001015965',
    highlight_en:
      'GitHub Actions 7-Stage CI/CD · 79 Tests PHPUnit (468 Assertions) · LiteSpeed Enterprise · Zero Data Loss (mysqldump .sql.gz) · Playwright E2E · Official Copyright HKI No. 001015965',
  },
  {
    company: 'PPSDM MIGAS CEPU (KESDM RI)',
    period: 'Apr 2025 - May 2025',
    role: 'Backend Developer & Tech Docs Intern',
    highlight_id:
      'Laravel 12 · Livewire Volt · Xendit Payment Gateway V2 · OpenAPI 3.0 Specs · Asynchronous Webhooks · Playwright E2E · Surat Keterangan Selesai PKL',
    highlight_en:
      'Laravel 12 · Livewire Volt · Xendit Payment Gateway V2 · OpenAPI 3.0 Specs · Asynchronous Webhooks · Playwright E2E · Official Internship Certificate',
  },
  {
    company: 'MSIB Educourse.id (SmartBeez)',
    period: 'Aug 2024 - Dec 2024',
    role: 'Lead Backend Engineer (Batch 7)',
    highlight_id:
      'Python Django · Midtrans Snap API · Google OAuth2 · PostgreSQL · Agile/Scrum · Transkrip DHS 900 Jam (Skor Backend 98/100)',
    highlight_en:
      'Python Django · Midtrans Snap API · Google OAuth2 · PostgreSQL · Agile/Scrum · 900-Hour MSIB DHS Transcript (Backend Score 98/100)',
  },
  {
    company: 'Freelance Software Projects',
    period: 'Jan 2026 - Present',
    role: 'Fullstack Developer',
    highlight_id:
      'Fullstack Laravel & PHP · Relational MySQL Schemas · RESTful APIs · RBAC Security · Client Project Handover',
    highlight_en:
      'Fullstack Laravel & PHP · Relational MySQL Schemas · RESTful APIs · RBAC Security · Client Project Handover',
  },
]

export const SkillsSection = () => {
  const { t, i18n } = useTranslation()
  const isEn = (i18n.language || 'id').startsWith('en')

  return (
    <section className="section-index" id="skills">
      <Heading
        title={t('sections.skills_title', {
          defaultValue: isEn ? 'Skills & Tools' : 'Keahlian & Alat (Skills & Tools)',
        })}
        description={t('sections.skills_desc', {
          defaultValue: isEn
            ? 'Comprehensive engineering stack synthesized from hands-on software development, cloud infrastructure, and DevOps experiences.'
            : 'Ringkasan teknologi, kerangka kerja, basis data, dan otomasi infrastruktur yang terbukti di seluruh pengalaman proyek nyata.',
        })}
        icon={projectsIcon}
      />

      {/* Experience Proven Highlights */}
      <div className="skills-recap-container">
        <div className="skills-recap-header">
          <span className="skills-recap-title">
            🎯 {isEn ? 'Proven in Production & Project Experience' : 'Terbukti di Produksi & Pengalaman Kerja'}
          </span>
          <span className="skills-recap-sub">
            {isEn ? '4 Core Engineering Roles' : '4 Riwayat Rekayasa Sistem'}
          </span>
        </div>
        <div className="skills-recap-grid">
          {RECAP_EXPERIENCES.map((exp, idx) => (
            <div className="skills-recap-card" key={idx}>
              <div className="skills-recap-card-top">
                <span className="skills-recap-company">{exp.company}</span>
                <span className="skills-recap-period">{exp.period}</span>
              </div>
              <div className="skills-recap-role">{exp.role}</div>
              <div className="skills-recap-text">
                {isEn ? exp.highlight_en : exp.highlight_id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Skill Categories */}
      <div className="skills-grid">
        {SKILL_CATEGORIES.map((cat) => (
          <div className="card skill-category-card" key={cat.key}>
            <div className="skill-category-header">
              <span className="skill-category-icon">{cat.icon}</span>
              <div>
                <h3 className="skill-category-title">
                  {isEn ? cat.title_en : cat.title_id}
                </h3>
                <p className="skill-category-desc">
                  {isEn ? cat.summary_en : cat.summary_id}
                </p>
              </div>
            </div>

            <div className="skill-items-container">
              {cat.skills.map((skill, sIdx) => (
                <div className="skill-item-pill" key={sIdx} title={skill.desc}>
                  <span className="skill-item-name">{skill.name}</span>
                  <span className="skill-item-tag">{skill.tag}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer navigation link */}
      <div className="skills-footer-action">
        <Link to="/blog" className="button secondary small">
          📚 {isEn ? 'Read Technical Articles on Blog ↗' : 'Baca Artikel Teknis di Blog ↗'}
        </Link>
        <a href="#experience" className="button secondary small">
          💼 {isEn ? 'View Detailed Experience ↓' : 'Lihat Detail Pengalaman Kerja ↓'}
        </a>
      </div>
    </section>
  )
}
