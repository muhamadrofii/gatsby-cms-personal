import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'

import { ColorDropdown } from './ColorDropdown'
import floppyLogo from '../assets/nav-floppy.png'
import blog from '../assets/nav-blog.png'
import projects from '../assets/nav-projects.png'
import github from '../assets/nav-github.png'
import { Moon } from '../assets/Moon'
import { Sun } from '../assets/Sun'

export const Sidebar = ({
  theme,
  handleUpdateTheme,
  currentColor,
  setCurrentColor,
}) => {
  const { t, i18n } = useTranslation()
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      homeHero: markdownRemark(frontmatter: { template: { eq: "home-hero" } }) {
        frontmatter {
          sidebar_about
        }
      }
    }
  `)

  const currentLang = (i18n.language || 'id').startsWith('en') ? 'en' : 'id'

  const sidebarText = currentLang === 'id' ? t('sidebar.sidebar_bio') : (data.homeHero?.frontmatter?.sidebar_about || "I'm Rofi'i, a Software Engineer, Fullstack & DevOps enthusiast based in Indonesia. This is my digital garden. 🌱")

  const handleToggleLanguage = () => {
    const nextLang = currentLang === 'id' ? 'en' : 'id'
    i18n.changeLanguage(nextLang)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('i18nextLng', nextLang)
    }
  }

  const renderSidebarContent = (text) => {
    if (!text.includes('Tania')) {
      return text
    }
    const parts = text.split('Tania')
    return (
      <>
        {parts[0]}
        <Link to="/me">Tania</Link>
        {parts[1]}
      </>
    )
  }

  const links = [
    { url: '/blog', key: 'blog', label: 'Blog', image: blog },
    { url: '/notes', key: 'notes', label: 'Notes', image: projects },
    { url: '/projects', key: 'projects', label: 'Projects', image: github },
    { url: '/certificates', key: 'certificates', label: 'Certificates', emoji: '📜' },
    { url: '/#experience', key: 'experience', label: 'Experience', emoji: '💼' },
    { url: '/#organizations', key: 'organizations', label: 'Organizations', emoji: '🏛️' },
    { url: '/me', key: 'about_me', label: 'About Me', emoji: '👤' },
    { url: '/me#contact', key: 'contact', label: 'Contact', emoji: '📬' },
  ]

  return (
    <aside className="sidebar">
      <section className="sidebar-section">
        <div className="sidebar-title-link">
          <Link to="/" className="flex-align-center gap">
            <span>
              <img
                src={floppyLogo}
                className="navbar-logo"
                alt="tania.dev"
                title="💾"
                height="16"
                width="16"
              />
            </span>
            <span className="site-name">M. Rofi'i</span>
          </Link>
          <div className="flex-align-center">
            <ColorDropdown
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
            />
            <div className="tooltip-container">
              <button
                className="navbar-button"
                onClick={() => {
                  const newTheme = theme === 'dark' ? 'light' : 'dark'

                  handleUpdateTheme(newTheme)
                }}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </button>
              <div className="tooltip">Theme</div>
            </div>
            <div className="tooltip-container">
              <button
                className="navbar-button"
                onClick={handleToggleLanguage}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '0 6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                  cursor: 'pointer',
                }}
                aria-label="Toggle language"
              >
                <span>🌐</span>
                <span>{currentLang === 'id' ? 'ID' : 'EN'}</span>
              </button>
              <div className="tooltip">{currentLang === 'id' ? 'Ganti ke EN' : 'Switch to ID'}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sidebar-section">
        <h2>{t('sidebar.about_me', { defaultValue: 'About Me' })}</h2>
        <div className="sidebar-content">
          <p>{renderSidebarContent(sidebarText)}</p>
        </div>
      </section>

      <section className="sidebar-section">
        <nav className="sidebar-nav-links">
          {links.map((link) => (
            <Link
              key={link.url}
              to={link.url}
              activeClassName={link.url === '/me' || link.url === '/me#contact' ? undefined : 'active'}
              getProps={link.url === '/me' ? ({ location }) => {
                const isMe = location.pathname.replace(/\/$/, '') === '/me';
                const isContact = location.hash === '#contact';
                return isMe && !isContact ? { className: 'active' } : null;
              } : link.url === '/me#contact' ? ({ location }) => {
                const isMe = location.pathname.replace(/\/$/, '') === '/me';
                const isContact = location.hash === '#contact';
                return isMe && isContact ? { className: 'active' } : null;
              } : undefined}
            >
              {link.image ? (
                <img src={link.image} alt={link.label} />
              ) : (
                <span style={{ fontSize: '16px', width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {link.emoji}
                </span>
              )}
              {t(`nav.${link.key}`, { defaultValue: link.label })}
            </Link>
          ))}
        </nav>
      </section>
    </aside>
  )
}
