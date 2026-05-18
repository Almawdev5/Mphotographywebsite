'use client'

import { useState, useEffect } from 'react'

export function LanguageSwitcher() {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const saved = localStorage.getItem('language') || 'en'
    setLanguage(saved)
  }, [])

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'am' : 'en'
    setLanguage(newLang)
    localStorage.setItem('language', newLang)
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }))
  }

  return (
    <button
      onClick={toggleLanguage}
      style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '13px',
        color: '#D4AF37',
        border: '1px solid #D4AF37',
        padding: '4px 12px',
        borderRadius: '4px',
        background: 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#D4AF37'
        e.currentTarget.style.color = '#111111'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.color = '#D4AF37'
      }}
    >
      {language === 'en' ? 'EN | አማ' : 'አማ | EN'}
    </button>
  )
}