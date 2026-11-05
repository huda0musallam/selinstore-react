import { useCatalog } from '../../context/catalogContext'
import { categories } from '../../data/categories'
import { pluralize } from '../../utils/format'
import { CategoryLink } from '../ui/CategoryLink'
import { SectionHeading } from '../ui/SectionHeading'

export function CategoryGrid() {
  const { products } = useCatalog()

  return (
    <section className="categories-section" aria-labelledby="categories-heading">
      <div className="container">
        <SectionHeading
          id="categories-heading"
          title="Shop by category"
          lead="From the very first outfit to bedtime stories — find just what you need."
        />
        <div className="category-grid">
          {categories.map((category, index) => (
            <CategoryLink
              key={category.id}
              category={category.id}
              className={`category-card${index === 0 ? ' category-card--large' : ''}`}
            >
              <img src={category.image} alt={category.imageAlt} />
              <span>
                <b>{category.icon}</b>
                <strong>{category.name}</strong>
                <small>
                  {pluralize(
                    products.filter((product) => product.categoryId === category.id).length,
                    'product',
                  )}
                </small>
              </span>
            </CategoryLink>
          ))}
        </div>
      </div>
    </section>
  )
}
