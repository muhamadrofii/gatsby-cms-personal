import React, { useRef } from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'

import searchIcon from '../assets/nav-search.png'

export const Searchbar = ({
  count,
  query,
  handleSearch,
  setQuery,
  isLocal = true,
  ...props
}) => {
  const { t } = useTranslation()
  const searchRef = useRef(null)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        if (!isLocal) {
          const updatedValue = query ? `/blog?search=${query}` : ''
          setQuery('')
          navigate(updatedValue)
        }
      }}
    >
      <div
        className={`search-container ${!isLocal ? 'with-button' : ''}`}
        {...props}
      >
        <input
          ref={searchRef}
          id="search"
          type="search"
          className={`searchbar ${isLocal ? 'with-icon' : ''}`}
          placeholder={
            isLocal
              ? t('nav.search_count', { count, defaultValue: `Search ${count} posts...` })
              : t('nav.search_posts', { defaultValue: 'Search posts...' })
          }
          value={query}
          autoComplete="off"
          onChange={handleSearch}
        />
        {isLocal && (
          <img
            className="search-icon"
            src={searchIcon}
            alt="Search"
            onClick={() => searchRef.current.focus()}
          />
        )}
        {!isLocal && (
          <button
            type="submit"
            className="transparent-button"
            disabled={!query}
          >
            Go
          </button>
        )}
      </div>
    </form>
  )
}
