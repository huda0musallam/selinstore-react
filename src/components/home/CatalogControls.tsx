import { useCatalog } from '../../context/catalogContext'
import { categories, isCategoryFilter, isSortOrder, sortOptions } from '../../data/categories'

export function CatalogControls() {
  const { category, sortOrder, setCategory, setSortOrder } = useCatalog()

  return (
    <div className="catalog-controls" role="search" aria-label="Filter products">
      <div className="field">
        <label className="field__label" htmlFor="category-select">
          Category
        </label>
        <select
          className="field__control"
          id="category-select"
          name="category"
          value={category}
          onChange={(event) => {
            if (isCategoryFilter(event.target.value)) setCategory(event.target.value)
          }}
        >
          <option value="all">All categories</option>
          {categories.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label className="field__label" htmlFor="sort-select">
          Sort by price
        </label>
        <select
          className="field__control"
          id="sort-select"
          name="sort"
          value={sortOrder}
          onChange={(event) => {
            if (isSortOrder(event.target.value)) setSortOrder(event.target.value)
          }}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
