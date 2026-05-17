import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesPreview />
      <CTASection />
    </main>
  )
}