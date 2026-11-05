const BASE_URL = 'https://shopboard-api.vercel.app';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
// The caller passes a type guard, so the response is checked at runtime instead of trusted.
export async function fetchJson<T>(
  path: string,
  isExpectedShape: (data: unknown) => data is T,
): Promise<T> {
  const res = await fetch(BASE_URL + path);

  if (!res.ok) {
    throw new ApiError(res.status, `Request failed with status ${res.status}`);
  }

  const data: unknown = await res.json();

  if (!isExpectedShape(data)) {
    throw new ApiError(res.status, 'Unexpected response from the API');
  }

  return data;
}
