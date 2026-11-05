/** localStorage can throw (private mode, quota, blocked site data), so every access is guarded. */
export function readStorage(key: string): unknown {
  try {
    const saved = localStorage.getItem(key)
    return saved ? (JSON.parse(saved) as unknown) : null
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // The store keeps working for this visit; the change just isn't remembered.
  }
}
