import React, { useState, useEffect, useMemo } from 'react'
import Helmet from 'react-helmet'
import { Link, useStaticQuery, graphql } from 'gatsby'

import { StarIcon } from '../assets/StarIcon'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import config from '../utils/config'
import github from '../assets/nav-github.png'

export default function Projects() {
  const [repos, setRepos] = useState([])
  
  const data = useStaticQuery(graphql`
    query ProjectsQuery {
      homeHero: markdownRemark(frontmatter: { template: { eq: "home-hero" } }) {
        frontmatter {
          projects_title
          projects_description
        }
      }
      projects: allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "project" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              name
              date
              slug
              tagline
              url
              writeup
              highlight
            }
          }
        }
      }
    }
  `)

  const projectSettings = data.homeHero?.frontmatter || {}
  const title = projectSettings.projects_title || 'Projects'
  const description =
    projectSettings.projects_description ||
    "Open-source projects I've made over the years, including this website, an emulator, and various games, apps, frameworks, and boilerplates."

  const projects = useMemo(
    () => data.projects?.edges.map((edge) => edge.node.frontmatter) || [],
    [data.projects]
  )

  useEffect(() => {
    async function getStars() {
      const repos = await fetch(
        'https://api.github.com/users/muhamadrofii/repos?per_page=100'
      )

      return repos.json()
    }

    getStars()
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data)
        } else {
          console.warn('GitHub API rate limited or returned non-array:', data)
          setRepos([])
        }
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO />

      <PageLayout>
        <Hero title={title} description={description} icon={github} />

        <div className="cards">
          {projects.map((project) => {
            const isExternalWriteup = project.writeup && (project.writeup.startsWith('http://') || project.writeup.startsWith('https://'))
            const hasValidRepo = project.slug && !project.slug.includes(' ')
            const projectUrl = project.url || (hasValidRepo ? `https://github.com/muhamadrofii/${project.slug}` : (project.writeup || '#'))

            return (
              <div className="card" key={project.slug}>
                <div className="stars">
                  {hasValidRepo && Array.isArray(repos) && repos.find((repo) => repo.name === project.slug) && (
                    <div className="star">
                      <a
                        href={`https://github.com/muhamadrofii/${project.slug}/stargazers`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {Number(
                          repos.find((repo) => repo.name === project.slug)
                            .stargazers_count
                        ).toLocaleString()}
                      </a>
                      <StarIcon />
                    </div>
                  )}
                </div>
                <time>{project.date}</time>
                <a
                  className="card-header"
                  href={projectUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.name}
                </a>
                <p>{project.tagline}</p>
                <div className="card-links">
                  {project.writeup && (
                    isExternalWriteup ? (
                      <a
                        className="button secondary small"
                        href={project.writeup}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Article
                      </a>
                    ) : (
                      <Link
                        className="button secondary small"
                        to={project.writeup.startsWith('/blog/') ? project.writeup : `/blog${project.writeup}`}
                      >
                        Article
                      </Link>
                    )
                  )}
                  {project.url && (
                    <a
                      className="button secondary small"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Demo
                    </a>
                  )}
                  {hasValidRepo && (
                    <a
                      className="button secondary small"
                      href={`https://github.com/muhamadrofii/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </PageLayout>
    </>
  )
}

Projects.Layout = Layout
