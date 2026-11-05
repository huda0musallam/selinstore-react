import type { ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Icon } from '../ui/Icon';

interface HeaderSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function HeaderSearch({ value, onChange }: HeaderSearchProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
    // Results live on the home page; the header stays mounted, so focus is kept.
    if (pathname !== '/') navigate('/#catalog');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate('/#catalog');
  }

  return (
    <form className="header-search" role="search" onSubmit={handleSubmit}>
      <Icon name="search" className="header-search__icon" />
      <label className="visually-hidden" htmlFor="search-input">
        Search products
      </label>
      <input
        className="header-search__input"
        type="search"
        id="search-input"
        name="search"
        placeholder="Search for baby essentials"
        autoComplete="off"
        value={value}
        onChange={handleChange}
      />
      <span className="header-search__button" aria-hidden="true">
        <Icon name="search" />
      </span>
    </form>
  );
}
