'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLanguage } from '@/context/LanguageContext'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/services', label: t('nav.services') },
    { href: '/about', label: t('nav.about') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/contact', label: t('nav.contact') },
  ]

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 50,
      backgroundColor: scrolled ? 'var(--bg)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'background-color 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '22px',
          fontWeight: '700',
          color: '#D4AF37',
          textDecoration: 'none',
        }}>
          Photo Mengie
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '32px', display: 'flex' }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              color: 'var(--text)',
              textDecoration: 'none',
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ThemeToggle />
          <LanguageSwitcher />
          {/* Mobile Hamburger */}
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D4AF37', display: 'flex', alignItems: 'center' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          backgroundColor: 'var(--bg)',
          width: '100%',
          padding: '24px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                color: 'var(--text)',
                textDecoration: 'none',
                padding: '8px 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>
      )}
    </nav>
  )
}