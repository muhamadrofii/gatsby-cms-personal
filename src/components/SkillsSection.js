import React from 'react'
import { useTranslation } from 'react-i18next'
import { Heading } from './Heading'
import projectsIcon from '../assets/nav-projects.png'

const SKILL_CATEGORIES = [
  {
    key: 'devops_cloud',
    title_id: 'Cloud & DevOps',
    title_en: 'Cloud & DevOps',
    icon: '☁️',
    skills: [
      'GitHub Actions (8 Workflows)',
      'Docker & Compose',
      'LiteSpeed Enterprise',
      'Nginx',
      'Linux Shell / Bash',
      'SSH & Rsync (Port 65002)',
      'Self-Healing Ops',
      'AWS Cloud',
      'OPcache',
    ],
  },
  {
    key: 'backend',
    title_id: 'Backend Engineering',
    title_en: 'Backend Engineering',
    icon: '⚙️',
    skills: [
      'PHP 8.2 & Laravel 12',
      'Python & Django',
      'Java & Spring Boot',
      'RESTful APIs',
      'OpenAPI 3.0 / Swagger',
      'Payment Gateways (Midtrans & Xendit)',
      'Webhook Security',
    ],
  },
  {
    key: 'database',
    title_id: 'Database & Performance',
    title_en: 'Database & Performance',
    icon: '🗄️',
    skills: [
      'MySQL (ACID)',
      'PostgreSQL',
      'SQLite (In-Memory CI)',
      'Query Optimization (-81.8% N+1)',
      'B-Tree Indexing (1.2ms)',
      'Pre-Deploy Snapshots (.sql.gz)',
      'CDN Media (ImageKit)',
    ],
  },
  {
    key: 'testing_security',
    title_id: 'QA Automation & Keamanan',
    title_en: 'QA Automation & Security',
    icon: '🛡️',
    skills: [
      'Playwright POM (12 Scenarios)',
      'PHPUnit (79 Suites / 468 Assertions)',
      'K6 Load Testing (100 VUs / 142ms)',
      'Role-Based Access (RBAC)',
      'Google OAuth2 & SSO',
      'reCAPTCHA v2 & Rate Limiting',
      'CVE Dependency Audits',
    ],
  },
  {
    key: 'frontend_workflow',
    title_id: 'Frontend & Workflow',
    title_en: 'Frontend & Workflow',
    icon: '💻',
    skills: [
      'React & Gatsby',
      'JavaScript (ES6+)',
      'Vite Bundler',
      'Git Flow & GitHub',
      'Postman',
      'Agile / Scrum',
    ],
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
            ? 'Core technologies, automated testing, cloud infrastructure, and frameworks proven across production projects.'
            : 'Ringkasan teknologi, kerangka kerja, pengujian otomatis, dan alat otomasi infrastruktur yang terbukti di proyek nyata.',
        })}
        icon={projectsIcon}
      />

      <div className="skills-grid-compact">
        {SKILL_CATEGORIES.map((cat) => (
          <div className="card skill-compact-card" key={cat.key}>
            <div className="skill-compact-header">
              <span className="skill-compact-icon">{cat.icon}</span>
              <h3 className="skill-compact-title">
                {isEn ? cat.title_en : cat.title_id}
              </h3>
            </div>

            <div className="skill-compact-pills">
              {cat.skills.map((skill, sIdx) => (
                <span className="skill-compact-badge" key={sIdx}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
