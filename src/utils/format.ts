const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount)
}

export function pluralize(count: number, noun: string): string {
  return `${count} ${count === 1 ? noun : `${noun}s`}`
}
