import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Navbar } from '@/components/ui/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Photo Mengie',
  description: 'Professional photography and videography services in Ethiopia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}