import { Link } from 'react-router'
import { categories } from '../../data/categories'
import { aboutLinks, helpLinks } from '../../data/content'
import { CategoryLink } from '../ui/CategoryLink'

function ContactLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="site-footer__heading">{title}</h2>
      <ul className="site-footer__links">
        {links.map((link) => (
          <li key={link}>
            <Link to="/contact">{link}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
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
                <CategoryLink category={category.id}>{category.name}</CategoryLink>
              </li>
            ))}
          </ul>
        </nav>
        <ContactLinks title="Help" links={helpLinks} />
        <ContactLinks title="About Selin" links={aboutLinks} />
      </div>
      <p className="container site-footer__bottom">
        <span>© 2026 Selin Baby Store</span>
        <span>Demo store — no real orders or payments are processed.</span>
      </p>
    </footer>
  )
}
