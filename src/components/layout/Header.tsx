import { Link, NavLink } from 'react-router'
import { useCart } from '../../context/cartContext'
import { useFavorites } from '../../context/favoritesContext'
import { BagIcon, HeartIcon, UserIcon } from '../ui/Icons'
import { HeaderSearch } from './HeaderSearch'

export function Header() {
  const { count: cartCount } = useCart()
  const { count: favoriteCount } = useFavorites()

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="site-header__brand" to="/" aria-label="Selin Kids Store home">
          <img src="/brand/selin-logo.png" alt="Selin Kids Store" width="1200" height="720" />
        </Link>
        <HeaderSearch />
        <nav className="site-nav--actions" aria-label="Store links">
          <ul className="site-nav__list">
            <li>
              <NavLink className="site-nav__link" to="/contact">
                <UserIcon />
                <small>Account</small>
              </NavLink>
            </li>
            <li>
              <Link className="site-nav__link" to="/#catalog">
                <HeartIcon />
                <small>Wishlist</small>
                {favoriteCount > 0 && <span className="wishlist-badge">{favoriteCount}</span>}
              </Link>
            </li>
            <li>
              <NavLink className="site-nav__link site-nav__link--cart" to="/cart">
                <BagIcon />
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
  )
}
