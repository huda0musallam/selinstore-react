import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { useCatalog } from '../../context/catalogContext'
import type { CategoryFilter } from '../../types/product'

interface CategoryLinkProps {
  category: CategoryFilter
  className?: string
  children: ReactNode
}

/** Selects a category and takes the shopper to the product list, from any page. */
export function CategoryLink({ category, className, children }: CategoryLinkProps) {
  const { setCategory } = useCatalog()

  return (
    <Link className={className} to="/#catalog" onClick={() => setCategory(category)}>
      {children}
    </Link>
  )
}
