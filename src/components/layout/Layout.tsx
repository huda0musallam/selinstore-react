import { Outlet, useLocation } from 'react-router';
import type { CategoryFilter } from '../../types/catalog';
import { Announcement } from './Announcement';
import { CategoryNav } from './CategoryNav';
import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollManager } from './ScrollManager';

interface LayoutProps {
  cartCount: number;
  favoriteCount: number;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  onSelectCategory: (category: CategoryFilter) => void;
}

export function Layout({
  cartCount,
  favoriteCount,
  searchTerm,
  onSearchChange,
  onSelectCategory,
}: LayoutProps) {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Announcement />
      <Header
        cartCount={cartCount}
        favoriteCount={favoriteCount}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />
      <CategoryNav
        placement={pathname === '/' ? 'over-hero' : 'standalone'}
        onSelectCategory={onSelectCategory}
      />
      <Outlet />
      <Footer onSelectCategory={onSelectCategory} />
    </>
  );
}
