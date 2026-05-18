import Link from 'next/link'

export function CTASection() {
  return (
    <section style={{
      backgroundColor: '#D4AF37',
      padding: '80px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
      }}>

        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '12px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'var(--bg)',
          opacity: 0.7,
          marginBottom: '16px',
        }}>
          Let's Work Together
        </p>

        <h2 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: '800',
          color: 'var(--bg)',
          marginBottom: '16px',
          lineHeight: '1.2',
        }}>
          Ready to Book Your Session?
        </h2>

        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '16px',
          color: 'var(--bg)',
          opacity: 0.7,
          marginBottom: '40px',
          lineHeight: '1.7',
        }}>
          Contact us today for a free consultation. We'll help you choose the perfect package for your special moment.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Link href="/appointments" style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px',
            fontWeight: '700',
            color: '#D4AF37',
            backgroundColor: 'var(--bg)',
            padding: '16px 40px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}>
            Book a Session
          </Link>

          <Link href="/contact" style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px',
            fontWeight: '700',
            color: 'var(--bg)',
            backgroundColor: 'transparent',
            border: '2px solid var(--bg)',
            padding: '16px 40px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}>
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  )
}