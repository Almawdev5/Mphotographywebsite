'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Camera, Calendar, Users, Mail, BarChart, LogOut, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart },
  { href: '/admin/photos', label: 'Photos', icon: Camera },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/blog', label: 'Blog', icon: Mail },
]

interface Appointment {
  id: string
  client_name: string
  service_type: string
  preferred_date: string
  status: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalPhotos: 0,
    subscribers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const supabase = createClient()

    const [appointmentsRes, photosRes, subscribersRes] = await Promise.all([
      supabase.from('appointments').select('*').order('created_at', { ascending: false }).limit(10),
      supabase.from('photos').select('id'),
      supabase.from('newsletter_subscribers').select('id'),
    ])

    const allAppointments = appointmentsRes.data || []
    const pending = allAppointments.filter(a => a.status === 'pending').length

    setAppointments(allAppointments)
    setStats({
      totalBookings: allAppointments.length,
      pendingBookings: pending,
      totalPhotos: photosRes.data?.length || 0,
      subscribers: subscribersRes.data?.length || 0,
    })
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient()
    await supabase.from('appointments').update({ status }).eq('id', id)
    loadData()
  }

  const handleLogout = async () => {
    await fetch('/api/admin-logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const statsData = [
    { label: 'Total Bookings', value: stats.totalBookings, icon: Calendar, color: '#D4AF37' },
    { label: 'Pending Bookings', value: stats.pendingBookings, icon: CheckCircle, color: '#3ecfb2' },
    { label: 'Total Photos', value: stats.totalPhotos, icon: Camera, color: '#e06fa8' },
    { label: 'Newsletter Subscribers', value: stats.subscribers, icon: Users, color: '#7c6af7' },
  ]

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', color: '#F5F5F5', opacity: 0.7, cursor: 'pointer' }}>
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
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: '800', color: '#F5F5F5', marginBottom: '8px' }}>Dashboard</h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>Welcome back! Here is a live overview of Photo Mengie.</p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {statsData.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} style={{ backgroundColor: '#1a1a1a', border: '1px solid #2B2B2B', borderRadius: '8px', padding: '24px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: `${stat.color}20`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon size={20} color={stat.color} />
                </div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: '800', color: stat.color, marginBottom: '4px' }}>
                  {loading ? '...' : stat.value}
                </p>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.5 }}>{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* Recent Bookings */}
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2B2B2B', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: '700', color: '#F5F5F5', marginBottom: '24px' }}>
            Recent Bookings {loading && <span style={{ fontSize: '14px', color: '#D4AF37', opacity: 0.6 }}>Loading...</span>}
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2B2B2B' }}>
                  {['Client', 'Service', 'Date', 'Status', 'Actions'].map((h) => (
                    <th key={h} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', textAlign: 'left', padding: '12px 16px', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5, padding: '24px 16px', textAlign: 'center' }}>
                      No bookings yet
                    </td>
                  </tr>
                )}
                {appointments.map((booking) => (
                  <tr key={booking.id} style={{ borderBottom: '1px solid #111111' }}>
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', padding: '16px' }}>{booking.client_name}</td>
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.7, padding: '16px' }}>{booking.service_type}</td>
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.7, padding: '16px' }}>{booking.preferred_date}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px',
                        backgroundColor: booking.status === 'confirmed' ? 'rgba(62,207,178,0.1)' : booking.status === 'rejected' ? 'rgba(224,111,168,0.1)' : 'rgba(212,175,55,0.1)',
                        color: booking.status === 'confirmed' ? '#3ecfb2' : booking.status === 'rejected' ? '#e06fa8' : '#D4AF37',
                        border: `1px solid ${booking.status === 'confirmed' ? '#3ecfb2' : booking.status === 'rejected' ? '#e06fa8' : '#D4AF37'}`,
                      }}>
                        {booking.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => updateStatus(booking.id, 'confirmed')}
                          style={{ backgroundColor: 'rgba(62,207,178,0.1)', border: '1px solid #3ecfb2', borderRadius: '4px', padding: '6px 12px', color: '#3ecfb2', fontFamily: 'Poppins, sans-serif', fontSize: '12px', cursor: 'pointer' }}>
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, 'rejected')}
                          style={{ backgroundColor: 'rgba(224,111,168,0.1)', border: '1px solid #e06fa8', borderRadius: '4px', padding: '6px 12px', color: '#e06fa8', fontFamily: 'Poppins, sans-serif', fontSize: '12px', cursor: 'pointer' }}>
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