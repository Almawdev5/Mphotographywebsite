'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Camera, Calendar, Mail, BarChart, LogOut, Users, Download, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart },
  { href: '/admin/photos', label: 'Photos', icon: Camera },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/blog', label: 'Blog', icon: Mail },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Users },
]

interface Subscriber {
  id: string
  email: string
  created_at: string
}

export default function AdminNewsletterPage() {
  const router = useRouter()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadSubscribers() }, [])

  const loadSubscribers = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false })
    setSubscribers(data || [])
    setLoading(false)
  }

  const deleteSubscriber = async (id: string) => {
    if (!confirm('Remove this subscriber?')) return
    const supabase = createClient()
    await supabase.from('newsletter_subscribers').delete().eq('id', id)
    loadSubscribers()
  }

  const exportCSV = () => {
    const csv = ['Email,Date Subscribed']
    subscribers.forEach(s => {
      csv.push(`${s.email},${new Date(s.created_at).toLocaleDateString()}`)
    })
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'photo-mengie-subscribers.csv'
    a.click()
  }

  const handleLogout = async () => {
    await fetch('/api/admin-logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0a0a' }}>

      {/* Sidebar */}
      <div style={{ width: '240px', backgroundColor: '#111111', borderRight: '1px solid #2B2B2B', display: 'flex', flexDirection: 'column', padding: '32px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 24px 32px', borderBottom: '1px solid #2B2B2B' }}>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: '800', color: '#D4AF37', marginBottom: '4px' }}>Photo Mengie</h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#F5F5F5', opacity: 0.4, letterSpacing: '2px', textTransform: 'uppercase' }}>Admin Panel</p>
        </div>
        <div style={{ padding: '24px 0', flex: 1 }}>
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', color: '#F5F5F5', opacity: link.href === '/admin/newsletter' ? 1 : 0.7, cursor: 'pointer', backgroundColor: link.href === '/admin/newsletter' ? 'rgba(212,175,55,0.1)' : 'transparent' }}>
                  <Icon size={18} color="#D4AF37" />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>{link.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
        <div style={{ padding: '24px', borderTop: '1px solid #2B2B2B' }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#e06fa8', fontFamily: 'Poppins, sans-serif', fontSize: '14px', width: '100%' }}>
            <LogOut size={18} color="#e06fa8" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: '800', color: '#F5F5F5', marginBottom: '8px' }}>Newsletter Subscribers</h2>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>
              {subscribers.length} total subscribers
            </p>
          </div>
          <button onClick={exportCSV}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#111111', backgroundColor: '#D4AF37', padding: '12px 24px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
            <Download size={16} color="#111111" />
            Export CSV
          </button>
        </div>

        {/* Subscribers Table */}
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2B2B2B', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2B2B2B', backgroundColor: '#111111' }}>
                {['#', 'Email', 'Date Subscribed', 'Actions'].map((h) => (
                  <th key={h} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#D4AF37', textAlign: 'left', padding: '14px 16px', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>Loading subscribers...</td></tr>
              )}
              {!loading && subscribers.length === 0 && (
                <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>No subscribers yet.</td></tr>
              )}
              {subscribers.map((sub, index) => (
                <tr key={sub.id} style={{ borderBottom: '1px solid #111111' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#222222'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#D4AF37', padding: '14px 16px' }}>{index + 1}</td>
                  <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', padding: '14px 16px' }}>{sub.email}</td>
                  <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.6, padding: '14px 16px' }}>
                    {new Date(sub.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => deleteSubscriber(sub.id)}
                      style={{ backgroundColor: 'rgba(224,111,168,0.1)', border: '1px solid #e06fa8', borderRadius: '4px', padding: '5px 10px', color: '#e06fa8', fontFamily: 'Poppins, sans-serif', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Trash2 size={12} /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}