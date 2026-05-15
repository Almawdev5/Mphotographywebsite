import Link from 'next/link'

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="#D4AF37" stroke="none"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#111111"/>
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37">
      <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.75a2.25 2.25 0 0 0 .126 4.238l3.918 1.176 1.77 5.54a.75.75 0 0 0 1.333.195l2.5-3.33 4.056 3.165a2.25 2.25 0 0 0 3.526-1.376l2.75-14.25a2.25 2.25 0 0 0-2.457-2.323z"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  )
}

export function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0a0a0a',
      borderTop: '1px solid #D4AF37',
      padding: '64px 24px 32px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>

        {/* Top Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          marginBottom: '48px',
        }}>

          {/* Brand Column */}
          <div>
            <h3 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '22px',
              fontWeight: '700',
              color: '#D4AF37',
              marginBottom: '16px',
            }}>
              Photo Mengie
            </h3>
            <p style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              color: '#F5F5F5',
              opacity: 0.6,
              lineHeight: '1.8',
              marginBottom: '24px',
            }}>
              Capturing meaningful moments with professional quality and artistic storytelling.
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FacebookIcon />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <YoutubeIcon />
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer">
                <TelegramIcon />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer">
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px',
              fontWeight: '700',
              color: '#F5F5F5',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Home', 'Gallery', 'Services', 'About', 'Blog', 'Contact'].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`}
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    color: '#F5F5F5',
                    opacity: 0.6,
                    textDecoration: 'none',
                  }}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px',
              fontWeight: '700',
              color: '#F5F5F5',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Wedding Photography',
                'Portrait Photography',
                'Graduation Photography',
                'Videography',
                'Drone Photography',
                'Tech Support',
              ].map((service) => (
                <Link
                  key={service}
                  href="/services"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    color: '#F5F5F5',
                    opacity: 0.6,
                    textDecoration: 'none',
                  }}
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px',
              fontWeight: '700',
              color: '#F5F5F5',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                color: '#F5F5F5',
                opacity: 0.6,
              }}>
                📍 Addis Ababa, Ethiopia
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                color: '#F5F5F5',
                opacity: 0.6,
              }}>
                📞 +251 XXX XXX XXX
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                color: '#F5F5F5',
                opacity: 0.6,
              }}>
                ✉️ info@photomengie.com
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #2B2B2B',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '13px',
            color: '#F5F5F5',
            opacity: 0.4,
          }}>
            © 2025 Photo Mengie. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '13px',
            color: '#D4AF37',
            opacity: 0.6,
          }}>
            Capturing Moments. Crafting Stories.
          </p>
        </div>

      </div>
    </footer>
  )
}