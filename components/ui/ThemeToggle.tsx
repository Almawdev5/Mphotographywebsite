'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="p-2 rounded-full hover:bg-gray-800 transition-colors"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-gold" />
      ) : (
        <Moon className="w-5 h-5 text-gray-400" />
      )}
    </button>
  )
}