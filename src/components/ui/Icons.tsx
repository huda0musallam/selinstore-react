import type { ReactNode } from 'react'

interface IconProps {
  className?: string
}

function Svg({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
      {children}
    </svg>
  )
}

export function SearchIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </Svg>
  )
}

export function UserIcon() {
  return (
    <Svg>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.6-3.5 3.1-5.5 7-5.5s6.4 2 7 5.5" />
    </Svg>
  )
}

export function HeartIcon() {
  return (
    <Svg>
      <path d="M20.8 8.8c0 5-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.8A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z" />
    </Svg>
  )
}

export function BagIcon() {
  return (
    <Svg>
      <path d="M5 8h14l-.8 11.2a2 2 0 0 1-2 1.8H7.8a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </Svg>
  )
}
