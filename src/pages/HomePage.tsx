import { Benefits } from '../components/home/Benefits'
import { CatalogSection } from '../components/home/CatalogSection'
import { CategoryGrid } from '../components/home/CategoryGrid'
import { Hero } from '../components/home/Hero'
import { PromoSection } from '../components/home/PromoSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function HomePage() {
  useDocumentTitle('Selin Baby Store')

  return (
    <main id="main-content">
      <Hero />
      <Benefits />
      <CategoryGrid />
      <CatalogSection />
      <PromoSection />
    </main>
  )
}
