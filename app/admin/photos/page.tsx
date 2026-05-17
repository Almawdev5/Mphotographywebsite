'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Camera, Calendar, Mail, BarChart, LogOut, Upload, Trash2, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Photo } from '@/types/database'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart },
  { href: '/admin/photos', label: 'Photos', icon: Camera },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/blog', label: 'Blog', icon: Mail },
]

const categories = ['Weddings', 'Portraits', 'Events', 'Graduation', 'Commercial', 'Videography', 'Drone Shots']

export default function AdminPhotosPage() {
  const router = useRouter()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({ title: '', category: '', description: '', is_featured: false })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => { loadPhotos() }, [])

  const loadPhotos = async () => {
    const supabase = createClient()
    const { data } = await supabase.from('photos').select('*').order('created_at', { ascending: false })
    setPhotos(data || [])
    setLoading(false)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) { setMessage('Please select a photo'); return }
    setUploading(true)
    setMessage('')

    try {
      const supabase = createClient()
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `gallery/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, selectedFile)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('photos').getPublicUrl(filePath)

      const { error: dbError } = await supabase.from('photos').insert({
        title: formData.title,
        category: formData.category,
        description: formData.description || null,
        image_url: urlData.publicUrl,
        storage_path: filePath,
        is_featured: formData.is_featured,
      })

      if (dbError) throw dbError

      setMessage('Photo uploaded successfully!')
      setFormData({ title: '', category: '', description: '', is_featured: false })
      setSelectedFile(null)
      loadPhotos()

    } catch (error) {
      console.error(error)
      setMessage('Upload failed. Please try again.')
    }

    setUploading(false)
  }

  const handleDelete = async (photo: Photo) => {
    if (!confirm(`Delete "${photo.title}"?`)) return
    const supabase = createClient()

    if (photo.storage_path) {
      await supabase.storage.from('photos').remove([photo.storage_path])
    }
    await supabase.from('photos').delete().eq('id', photo.id)
    loadPhotos()
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', color: '#F5F5F5', opacity: link.href === '/admin/photos' ? 1 : 0.7, cursor: 'pointer', backgroundColor: link.href === '/admin/photos' ? 'rgba(212,175,55,0.1)' : 'transparent' }}>
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
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: '800', color: '#F5F5F5', marginBottom: '8px' }}>Photo Management</h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>Upload, organize, and manage your gallery photos.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>

          {/* Upload Form */}
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2B2B2B', borderRadius: '8px', padding: '24px' }}>
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: '700', color: '#F5F5F5', marginBottom: '24px' }}>
              <Upload size={18} color="#D4AF37" style={{ marginRight: '8px' }} />
              Upload Photo
            </h3>

            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div>
                <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>Photo Title *</label>
                <input type="text" required placeholder="e.g. Wedding at Sheraton" value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#2B2B2B', border: '1px solid #444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '13px', outline: 'none' }} />
              </div>

              <div>
                <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>Category *</label>
                <select required value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#2B2B2B', border: '1px solid #444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '13px', outline: 'none', cursor: 'pointer' }}>
                  <option value="">Select category</option>
                  {categories.map(cat => <option key={cat} value={cat} style={{ backgroundColor: '#2B2B2B' }}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>Description</label>
                <textarea placeholder="Optional description..." rows={3} value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#2B2B2B', border: '1px solid #444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '13px', outline: 'none', resize: 'vertical' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="featured" checked={formData.is_featured}
                  onChange={e => setFormData({ ...formData, is_featured: e.target.checked })} />
                <label htmlFor="featured" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.8, cursor: 'pointer' }}>
                  Featured photo (shown on homepage)
                </label>
              </div>

              <div>
                <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>Select Photo *</label>
                <input type="file" accept="image/*" required
                  onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#2B2B2B', border: '1px solid #444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '13px', cursor: 'pointer' }} />
              </div>

              {message && (
                <div style={{ padding: '12px', backgroundColor: message.includes('success') ? 'rgba(62,207,178,0.1)' : 'rgba(224,111,168,0.1)', border: `1px solid ${message.includes('success') ? '#3ecfb2' : '#e06fa8'}`, borderRadius: '6px', color: message.includes('success') ? '#3ecfb2' : '#e06fa8', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
                  {message}
                </div>
              )}

              <button type="submit" disabled={uploading}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '700', color: '#111111', backgroundColor: '#D4AF37', padding: '14px', borderRadius: '6px', border: 'none', cursor: 'pointer', width: '100%' }}>
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </button>

            </form>
          </div>

          {/* Photos Grid */}
          <div>
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: '700', color: '#F5F5F5', marginBottom: '24px' }}>
              Gallery Photos ({photos.length})
            </h3>

            {loading && (
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>Loading photos...</p>
            )}

            {!loading && photos.length === 0 && (
              <div style={{ backgroundColor: '#1a1a1a', border: '1px dashed #444', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
                <Camera size={40} color="#444" style={{ margin: '0 auto 16px' }} />
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.4 }}>No photos yet. Upload your first photo!</p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {photos.map((photo) => (
                <div key={photo.id} style={{ backgroundColor: '#1a1a1a', border: '1px solid #2B2B2B', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: '160px', backgroundColor: '#2B2B2B' }}>
                    <img src={photo.image_url} alt={photo.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {photo.is_featured && (
                      <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: '#D4AF37', borderRadius: '4px', padding: '2px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={10} color="#111" fill="#111" />
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', fontWeight: '700', color: '#111' }}>Featured</span>
                      </div>
                    )}
                    <button onClick={() => handleDelete(photo)}
                      style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'rgba(224,111,168,0.9)', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Trash2 size={14} color="#fff" />
                    </button>
                  </div>
                  <div style={{ padding: '12px' }}>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: '700', color: '#F5F5F5', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{photo.title}</p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#D4AF37' }}>{photo.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}