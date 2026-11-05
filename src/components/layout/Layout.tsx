import { Outlet, useLocation } from 'react-router'
import { Announcement } from './Announcement'
import { CategoryNav } from './CategoryNav'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollManager } from './ScrollManager'

export function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Announcement />
      <Header />
      <CategoryNav overlapsHero={pathname === '/'} />
      <Outlet />
      <Footer />
    </>
  )
}
