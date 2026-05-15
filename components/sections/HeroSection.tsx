'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#111111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, #2B2B2B 0%, #111111 70%)',
        zIndex: 0,
      }} />

      {/* Gold line decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: '#D4AF37',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '800px',
      }}>

        {/* Tag line above */}
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '13px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#D4AF37',
          marginBottom: '24px',
        }}>
          Professional Photography & Videography
        </p>

        {/* Main heading */}
        <h1 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 'clamp(40px, 8vw, 80px)',
          fontWeight: '800',
          color: '#F5F5F5',
          lineHeight: '1.1',
          marginBottom: '16px',
        }}>
          Photo{' '}
          <span style={{ color: '#D4AF37' }}>Mengie</span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          color: '#F5F5F5',
          opacity: 0.8,
          marginBottom: '48px',
          lineHeight: '1.6',
        }}>
          Capturing Moments. Crafting Stories.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Link href="/gallery" style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px',
            fontWeight: '600',
            color: '#111111',
            backgroundColor: '#D4AF37',
            padding: '14px 36px',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}>
            View Gallery
          </Link>

          <Link href="/appointments" style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px',
            fontWeight: '600',
            color: '#D4AF37',
            backgroundColor: 'transparent',
            border: '2px solid #D4AF37',
            padding: '14px 36px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}>
            Book a Session
          </Link>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#D4AF37',
            opacity: 0.6,
          }}>
            Scroll
          </p>
          <div style={{
            width: '1px',
            height: '40px',
            backgroundColor: '#D4AF37',
            opacity: 0.4,
          }} />
        </div>

      </div>
    </section>
  )
}