import type { ReactNode } from 'react';
import { SectionHeading } from '../ui/SectionHeading';

interface CatalogSectionProps {
  isLoading: boolean;
  /** The filter and sort controls. */
  controls: ReactNode;
  /** The loading, error, empty, no-match or product list view. */
  children: ReactNode;
}

export function CatalogSection({ isLoading, controls, children }: CatalogSectionProps) {
  return (
    <section
      id="catalog"
      className="catalog"
      aria-labelledby="catalog-heading"
      aria-busy={isLoading}
    >
      <div className="container catalog__inner">
        <SectionHeading
          id="catalog-heading"
          title="New arrivals"
          lead="Fresh styles and essentials, just landed."
        />
        {controls}
        {children}
      </div>
    </section>
  );
}
