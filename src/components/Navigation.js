import React, { useState } from 'react'
import { Link } from 'gatsby'
import { SocialIcon } from 'react-social-icons'
import { useLocation } from '@reach/router'

import floppy from '../assets/floppylogo.png'
import floppyLogo from '../assets/nav-floppy.png'
import blog from '../assets/nav-blog.png'
import projects from '../assets/nav-projects.png'
import github from '../assets/nav-github.png'
import { Moon } from '../assets/Moon'
import { Sun } from '../assets/Sun'
import { Menu } from '../assets/Menu'
import { Close } from '../assets/Close'
import { Searchbar } from './Searchbar'
import { ColorDropdown } from './ColorDropdown'

const links = [
  { url: '/blog', label: 'Blog', image: blog },
  { url: '/notes', label: 'Notes', image: projects },
  { url: '/projects', label: 'Projects', image: github },
  { url: '/me', label: 'About Me', image: floppy },
]

const socialLinks = [{ url: 'https://www.instagram.com/em.rofii/' }]

export const Navigation = ({
  handleUpdateTheme,
  theme,
  currentColor,
  setCurrentColor,
}) => {
  const location = useLocation()
  const currentPath = location.pathname
  const [navOpen, setNavOpen] = useState(false)
  const [query, setQuery] = useState('')

  const handleToggleMobileNav = () => {
    setNavOpen((prev) => !prev)
  }

  const handleCloseMobileNav = () => {
    setNavOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-title">
        <div className="navbar-title-content">
          <Link to="/" className="navbar-title-link">
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
        </div>
      </div>
      <div className="navbar-container">
        <section className="navbar-section navbar-section-search">
          {!currentPath.includes('blog') && !currentPath.includes('notes') && (
            <Searchbar
              isLocal={false}
              query={query}
              setQuery={setQuery}
              handleSearch={(event) => {
                setQuery(event.target.value)
              }}
            />
          )}
        </section>
        <section className="navbar-section">
          <button
            className={`navbar-button nav-menu-button ${
              navOpen ? 'active' : ''
            }`}
            onClick={handleToggleMobileNav}
          >
            {navOpen ? <Close /> : <Menu />}
          </button>
          <nav className={`navbar-menu nav-items ${navOpen ? 'active' : ''}`}>
            {links.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                activeClassName="active"
                onClick={handleCloseMobileNav}
              >
                <img src={link.image} alt={link.label} />
                {link.label}
              </Link>
            ))}
          </nav>
          <nav className="navbar-menu social">
            <button
              className="navbar-button"
              onClick={() => {
                const newTheme = theme === 'dark' ? 'light' : 'dark'

                handleUpdateTheme(newTheme)
              }}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
            <ColorDropdown
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
            />
            {socialLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-icon"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'currentColor', padding: '4px' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </a>
            ))}
          </nav>
        </section>
      </div>
    </header>
  )
}
