// Override with VITE_API_BASE_URL (see .env.example), e.g. to try ShopBoard's test states.
const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'https://shopboard-api.vercel.app'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function fetchJson(path: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(BASE_URL + path, { signal })

  if (!response.ok) {
    throw new ApiError(response.status, `Request failed with status ${response.status}`)
  }

  return response.json()
}
