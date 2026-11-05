import type { ReactNode } from 'react';

export type IconName = 'search' | 'user' | 'heart' | 'bag';

const iconPaths: Record<IconName, ReactNode> = {
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.6-3.5 3.1-5.5 7-5.5s6.4 2 7 5.5" />
    </>
  ),
  heart: (
    <path d="M20.8 8.8c0 5-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.8A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z" />
  ),
  bag: (
    <>
      <path d="M5 8h14l-.8 11.2a2 2 0 0 1-2 1.8H7.8a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  className?: string;
}

/** Decorative line icon; the surrounding control carries the accessible name. */
export function Icon({ name, className }: IconProps) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
      {iconPaths[name]}
    </svg>
  );
}
