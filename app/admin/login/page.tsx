'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/dashboard')
      } else {
        setError('Invalid email or password. Please try again.')
        setStatus('idle')
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setStatus('idle')
    }
  }

  return (
    <main style={{
      backgroundColor: '#111111',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '28px',
            fontWeight: '800',
            color: '#D4AF37',
            marginBottom: '8px',
          }}>
            Photo Mengie
          </h1>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '13px',
            color: '#F5F5F5',
            opacity: 0.5,
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}>
            Admin Panel
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #D4AF37',
          borderRadius: '12px',
          padding: '40px',
        }}>
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '22px',
            fontWeight: '700',
            color: '#F5F5F5',
            marginBottom: '32px',
            textAlign: 'center',
          }}>
            Sign In
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Email */}
            <div>
              <label style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                color: '#D4AF37',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px',
              }}>
                <Mail size={13} color="#D4AF37" /> Email Address
              </label>
              <input
                type="email"
                required
                placeholder="admin@photomengie.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  backgroundColor: '#2B2B2B',
                  border: '1px solid #444444',
                  borderRadius: '6px',
                  color: '#F5F5F5',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                color: '#D4AF37',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px',
              }}>
                <Lock size={13} color="#D4AF37" /> Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  backgroundColor: '#2B2B2B',
                  border: '1px solid #444444',
                  borderRadius: '6px',
                  color: '#F5F5F5',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{
                padding: '12px 16px',
                backgroundColor: 'rgba(224,111,168,0.1)',
                border: '1px solid #e06fa8',
                borderRadius: '6px',
                color: '#e06fa8',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '15px',
                fontWeight: '700',
                color: '#111111',
                backgroundColor: '#D4AF37',
                padding: '16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                marginTop: '8px',
              }}
            >
              {status === 'loading' ? 'Signing in...' : 'Sign In'}
            </button>

          </form>
        </div>

        <p style={{
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '12px',
          color: '#F5F5F5',
          opacity: 0.3,
          marginTop: '24px',
        }}>
          Photo Mengie Admin Panel — Restricted Access
        </p>

      </div>
    </main>
  )
}