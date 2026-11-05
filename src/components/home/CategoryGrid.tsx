import { categories } from '../../data/categories';
import type { Product } from '../../products/products.types';
import type { CategoryFilter } from '../../types/catalog';
import { pluralize } from '../../utils/pluralize';
import { CategoryLink } from '../ui/CategoryLink';
import { SectionHeading } from '../ui/SectionHeading';

interface CategoryGridProps {
  /** null until the products have loaded, so no misleading "0 products" is shown. */
  products: Product[] | null;
  onSelectCategory: (category: CategoryFilter) => void;
}

export function CategoryGrid({ products, onSelectCategory }: CategoryGridProps) {
  return (
    <section className="categories-section" aria-labelledby="categories-heading">
      <div className="container">
        <SectionHeading
          id="categories-heading"
          title="Shop by category"
          lead="From the very first outfit to bedtime stories — find just what you need."
        />
        <div className="category-grid">
          {categories.map((category, position) => (
            <CategoryLink
              key={category.id}
              category={category.id}
              onSelect={onSelectCategory}
              className={`category-card${position === 0 ? ' category-card--large' : ''}`}
            >
              <img src={category.image} alt={category.imageAlt} />
              <span>
                <b>{category.icon}</b>
                <strong>{category.name}</strong>
                {products !== null && (
                  <small>
                    {pluralize(
                      products.filter((product) => product.categoryId === category.id).length,
                      'product',
                    )}
                  </small>
                )}
              </span>
            </CategoryLink>
          ))}
        </div>
      </div>
    </section>
  );
}
