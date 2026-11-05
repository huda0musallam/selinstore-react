import { categories } from '../../data/categories'
import { CategoryLink } from '../ui/CategoryLink'

export function CategoryNav({ overlapsHero }: { overlapsHero: boolean }) {
  return (
    <nav
      className={`category-nav${overlapsHero ? ' category-nav--overlay' : ''}`}
      aria-label="Shop categories"
    >
      <CategoryLink category="all">♧ Shop All</CategoryLink>
      {categories.map((category) => (
        <CategoryLink key={category.id} category={category.id}>
          {category.icon} {category.navLabel}
        </CategoryLink>
      ))}
    </nav>
  )
}
