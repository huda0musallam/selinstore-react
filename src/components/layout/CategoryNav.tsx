import { categories } from '../../data/categories';
import type { CategoryFilter } from '../../types/catalog';
import { CategoryLink } from '../ui/CategoryLink';

interface CategoryNavProps {
  /** On the home page the bar overlaps the top edge of the hero. */
  placement: 'over-hero' | 'standalone';
  onSelectCategory: (category: CategoryFilter) => void;
}

export function CategoryNav({ placement, onSelectCategory }: CategoryNavProps) {
  return (
    <nav
      className={`category-nav${placement === 'over-hero' ? ' category-nav--overlay' : ''}`}
      aria-label="Shop categories"
    >
      <CategoryLink category="all" onSelect={onSelectCategory}>
        ♧ Shop All
      </CategoryLink>
      {categories.map((category) => (
        <CategoryLink key={category.id} category={category.id} onSelect={onSelectCategory}>
          {category.icon} {category.navLabel}
        </CategoryLink>
      ))}
    </nav>
  );
}
