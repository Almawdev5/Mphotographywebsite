'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Camera, Calendar, Mail, BarChart, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Appointment } from '@/types/database'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart },
  { href: '/admin/photos', label: 'Photos', icon: Camera },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/blog', label: 'Blog', icon: Mail },
]

export default function AdminAppointmentsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => { loadAppointments() }, [])

  const loadAppointments = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })
    setAppointments(data || [])
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient()
    await supabase.from('appointments').update({ status }).eq('id', id)
    loadAppointments()
  }

  const handleLogout = async () => {
    await fetch('/api/admin-logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const filtered = filter === 'all'
    ? appointments
    : appointments.filter(a => a.status === filter)

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', color: '#F5F5F5', opacity: link.href === '/admin/appointments' ? 1 : 0.7, cursor: 'pointer', backgroundColor: link.href === '/admin/appointments' ? 'rgba(212,175,55,0.1)' : 'transparent' }}>
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
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: '800', color: '#F5F5F5', marginBottom: '8px' }}>Appointments</h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>Manage all booking requests.</p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {['all', 'pending', 'confirmed', 'rejected'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: '500', padding: '8px 20px', borderRadius: '4px', border: '1px solid', cursor: 'pointer', backgroundColor: filter === f ? '#D4AF37' : 'transparent', color: filter === f ? '#111111' : '#F5F5F5', borderColor: filter === f ? '#D4AF37' : '#444444', textTransform: 'capitalize' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Appointments Table */}
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2B2B2B', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2B2B2B', backgroundColor: '#111111' }}>
                  {['Client', 'Email', 'Phone', 'Service', 'Date', 'Time', 'Location', 'Status', 'Actions'].map((h) => (
                    <th key={h} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#D4AF37', textAlign: 'left', padding: '14px 16px', letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={9} style={{ padding: '40px', textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>
                      Loading appointments...
                    </td>
                  </tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ padding: '40px', textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>
                      No {filter === 'all' ? '' : filter} appointments found.
                    </td>
                  </tr>
                )}
                {filtered.map((apt) => (
                  <tr key={apt.id} style={{ borderBottom: '1px solid #111111' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#222222'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', padding: '14px 16px', whiteSpace: 'nowrap' }}>{apt.client_name}</td>
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.7, padding: '14px 16px', whiteSpace: 'nowrap' }}>{apt.email}</td>
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.7, padding: '14px 16px', whiteSpace: 'nowrap' }}>{apt.phone}</td>
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.7, padding: '14px 16px', whiteSpace: 'nowrap' }}>{apt.service_type}</td>
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.7, padding: '14px 16px', whiteSpace: 'nowrap' }}>{apt.preferred_date}</td>
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.7, padding: '14px 16px', whiteSpace: 'nowrap' }}>{apt.preferred_time}</td>
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.7, padding: '14px 16px', whiteSpace: 'nowrap' }}>{apt.location || '-'}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', whiteSpace: 'nowrap',
                        backgroundColor: apt.status === 'confirmed' ? 'rgba(62,207,178,0.1)' : apt.status === 'rejected' ? 'rgba(224,111,168,0.1)' : 'rgba(212,175,55,0.1)',
                        color: apt.status === 'confirmed' ? '#3ecfb2' : apt.status === 'rejected' ? '#e06fa8' : '#D4AF37',
                        border: `1px solid ${apt.status === 'confirmed' ? '#3ecfb2' : apt.status === 'rejected' ? '#e06fa8' : '#D4AF37'}`,
                      }}>
                        {apt.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => updateStatus(apt.id, 'confirmed')}
                          style={{ backgroundColor: 'rgba(62,207,178,0.1)', border: '1px solid #3ecfb2', borderRadius: '4px', padding: '5px 10px', color: '#3ecfb2', fontFamily: 'Poppins, sans-serif', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                          Confirm
                        </button>
                        <button onClick={() => updateStatus(apt.id, 'rejected')}
                          style={{ backgroundColor: 'rgba(224,111,168,0.1)', border: '1px solid #e06fa8', borderRadius: '4px', padding: '5px 10px', color: '#e06fa8', fontFamily: 'Poppins, sans-serif', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}