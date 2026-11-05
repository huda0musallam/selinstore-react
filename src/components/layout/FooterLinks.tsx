import { Link } from 'react-router';

interface FooterLinksProps {
  title: string;
  links: string[];
}

/** A footer column whose links all lead to the contact page. */
export function FooterLinks({ title, links }: FooterLinksProps) {
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
  );
}
