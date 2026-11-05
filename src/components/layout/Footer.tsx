import { categories } from '../../data/categories';
import { aboutLinks, helpLinks } from '../../data/content';
import type { CategoryFilter } from '../../types/catalog';
import { CategoryLink } from '../ui/CategoryLink';
import { FooterLinks } from './FooterLinks';

interface FooterProps {
  onSelectCategory: (category: CategoryFilter) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  return (
    <footer id="contact" className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src="/brand/selin-logo.png" alt="Selin Kids Store" width="1200" height="720" />
          <p>
            Gentle, thoughtfully made essentials for babies and little ones — chosen with care for
            growing families.
          </p>
        </div>
        <nav aria-label="Shop">
          <h2 className="site-footer__heading">Shop</h2>
          <ul className="site-footer__links">
            {categories.map((category) => (
              <li key={category.id}>
                <CategoryLink category={category.id} onSelect={onSelectCategory}>
                  {category.name}
                </CategoryLink>
              </li>
            ))}
          </ul>
        </nav>
        <FooterLinks title="Help" links={helpLinks} />
        <FooterLinks title="About Selin" links={aboutLinks} />
      </div>
      <p className="container site-footer__bottom">
        <span>© 2026 Selin Baby Store</span>
        <span>Demo store — no real orders or payments are processed.</span>
      </p>
    </footer>
  );
}
