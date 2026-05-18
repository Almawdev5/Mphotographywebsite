'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import en from '@/messages/en.json'
import am from '@/messages/am.json'

type Messages = typeof en

interface LanguageContextType {
  language: string
  messages: Messages
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  messages: en,
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en')
  const [messages, setMessages] = useState<Messages>(en)

  useEffect(() => {
    const saved = localStorage.getItem('language') || 'en'
    setLanguage(saved)
    setMessages(saved === 'am' ? am : en)

    const handleChange = (e: CustomEvent) => {
      const newLang = e.detail
      setLanguage(newLang)
      setMessages(newLang === 'am' ? am : en)
    }

    window.addEventListener('languageChange', handleChange as EventListener)
    return () => window.removeEventListener('languageChange', handleChange as EventListener)
  }, [])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = messages
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, messages, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}