import { Link, NavLink } from 'react-router';
import { Icon } from '../ui/Icon';
import { HeaderSearch } from './HeaderSearch';

interface HeaderProps {
  cartCount: number;
  favoriteCount: number;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

export function Header({ cartCount, favoriteCount, searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="site-header__brand" to="/" aria-label="Selin Kids Store home">
          <img src="/brand/selin-logo.png" alt="Selin Kids Store" width="1200" height="720" />
        </Link>
        <HeaderSearch value={searchTerm} onChange={onSearchChange} />
        <nav className="site-nav--actions" aria-label="Store links">
          <ul className="site-nav__list">
            <li>
              <NavLink className="site-nav__link" to="/contact">
                <Icon name="user" />
                <small>Account</small>
              </NavLink>
            </li>
            <li>
              <Link className="site-nav__link" to="/#catalog">
                <Icon name="heart" />
                <small>Wishlist</small>
                {favoriteCount > 0 && <span className="wishlist-badge">{favoriteCount}</span>}
              </Link>
            </li>
            <li>
              <NavLink className="site-nav__link site-nav__link--cart" to="/cart">
                <Icon name="bag" />
                <small>Bag</small>
                <span className="cart-badge">
                  {cartCount}
                  <span className="visually-hidden"> items</span>
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
