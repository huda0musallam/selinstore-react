import type { ReactNode } from 'react';
import { Link } from 'react-router';
import type { CategoryFilter } from '../../types/catalog';

interface CategoryLinkProps {
  category: CategoryFilter;
  onSelect: (category: CategoryFilter) => void;
  className?: string;
  children: ReactNode;
}

/** Selects a category and takes the shopper to the product list, from any page. */
export function CategoryLink({ category, onSelect, className, children }: CategoryLinkProps) {
  return (
    <Link className={className} to="/#catalog" onClick={() => onSelect(category)}>
      {children}
    </Link>
  );
}
