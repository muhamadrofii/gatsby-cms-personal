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
        about_me: 'Tentang Saya',
      },
      sidebar: {
        about_me: 'Tentang Saya',
        theme: 'Tema',
      },
      common: {
        theme_toggle: 'Ganti tema',
        switch_lang: 'Ganti ke English',
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
        about_me: 'About Me',
      },
      sidebar: {
        about_me: 'About Me',
        theme: 'Theme',
      },
      common: {
        theme_toggle: 'Toggle theme',
        switch_lang: 'Switch to Indonesian',
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

