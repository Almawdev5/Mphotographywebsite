'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 50,
      backgroundColor: scrolled ? '#111111' : 'transparent',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              color: '#F5F5F5',
              textDecoration: 'none',
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ThemeToggle />
          <button style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '13px',
            color: '#D4AF37',
            border: '1px solid #D4AF37',
            padding: '4px 12px',
            borderRadius: '4px',
            background: 'transparent',
            cursor: 'pointer',
          }}>
            EN | አማ
          </button>
        </div>
      </div>
    </nav>
  )
}