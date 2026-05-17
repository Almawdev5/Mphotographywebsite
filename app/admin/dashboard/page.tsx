'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Camera, Calendar, Users, Mail, BarChart, LogOut, Upload, CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart },
  { href: '/admin/photos', label: 'Photos', icon: Camera },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/blog', label: 'Blog', icon: Mail },
]

const statsData = [
  { label: 'Total Bookings', value: '24', icon: Calendar, color: '#D4AF37' },
  { label: 'Pending Bookings', value: '5', icon: CheckCircle, color: '#3ecfb2' },
  { label: 'Total Photos', value: '14', icon: Camera, color: '#e06fa8' },
  { label: 'Newsletter Subscribers', value: '48', icon: Users, color: '#7c6af7' },
]

const recentBookings = [
  { name: 'Abebe Girma', service: 'Wedding Photography', date: 'May 20, 2025', status: 'pending' },
  { name: 'Tigist Haile', service: 'Graduation Photography', date: 'May 22, 2025', status: 'confirmed' },
  { name: 'Dawit Bekele', service: 'Portrait Photography', date: 'May 25, 2025', status: 'pending' },
  { name: 'Sara Tadesse', service: 'Event Coverage', date: 'May 28, 2025', status: 'confirmed' },
  { name: 'Yonas Alemu', service: 'Drone Photography', date: 'June 1, 2025', status: 'pending' },
]

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin-logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0a0a' }}>

      {/* Sidebar */}
      <div style={{
        width: '240px',
        backgroundColor: '#111111',
        borderRight: '1px solid #2B2B2B',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 0',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '0 24px 32px', borderBottom: '1px solid #2B2B2B' }}>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: '800', color: '#D4AF37', marginBottom: '4px' }}>
            Photo Mengie
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#F5F5F5', opacity: 0.4, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Admin Panel
          </p>
        </div>

        {/* Nav Links */}
        <div style={{ padding: '24px 0', flex: 1 }}>
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  color: '#F5F5F5',
                  opacity: 0.7,
                  cursor: 'pointer',
                }}>
                  <Icon size={18} color="#D4AF37" />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>{link.label}</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Logout */}
        <div style={{ padding: '24px', borderTop: '1px solid #2B2B2B' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#e06fa8',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              width: '100%',
            }}
          >
            <LogOut size={18} color="#e06fa8" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: '800', color: '#F5F5F5', marginBottom: '8px' }}>
            Dashboard
          </h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>
            Welcome back! Here is an overview of Photo Mengie.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {statsData.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} style={{ backgroundColor: '#1a1a1a', border: '1px solid #2B2B2B', borderRadius: '8px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: `${stat.color}20`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} color={stat.color} />
                  </div>
                </div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: '800', color: stat.color, marginBottom: '4px' }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.5 }}>
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>

        {/* Recent Bookings */}
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2B2B2B', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: '700', color: '#F5F5F5', marginBottom: '24px' }}>
            Recent Bookings
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2B2B2B' }}>
                  {['Client', 'Service', 'Date', 'Status', 'Actions'].map((h) => (
                    <th key={h} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', textAlign: 'left', padding: '12px 16px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.name} style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', padding: '16px' }}>
                      {booking.name}
                    </td>
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.7, padding: '16px' }}>
                      {booking.service}
                    </td>
                    <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.7, padding: '16px' }}>
                      {booking.date}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        backgroundColor: booking.status === 'confirmed' ? 'rgba(62,207,178,0.1)' : 'rgba(212,175,55,0.1)',
                        color: booking.status === 'confirmed' ? '#3ecfb2' : '#D4AF37',
                        border: `1px solid ${booking.status === 'confirmed' ? '#3ecfb2' : '#D4AF37'}`,
                      }}>
                        {booking.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ backgroundColor: 'rgba(62,207,178,0.1)', border: '1px solid #3ecfb2', borderRadius: '4px', padding: '6px 12px', color: '#3ecfb2', fontFamily: 'Poppins, sans-serif', fontSize: '12px', cursor: 'pointer' }}>
                          Confirm
                        </button>
                        <button style={{ backgroundColor: 'rgba(224,111,168,0.1)', border: '1px solid #e06fa8', borderRadius: '4px', padding: '6px 12px', color: '#e06fa8', fontFamily: 'Poppins, sans-serif', fontSize: '12px', cursor: 'pointer' }}>
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