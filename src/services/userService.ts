import type { UsersResponse } from '../types/user'

const BASE_URL = 'https://dummyjson.com'
export const PAGE_SIZE = 12

export async function fetchUsers(
  query: string,
  page: number,
  signal: AbortSignal,
): Promise<UsersResponse> {
  const skip = (page - 1) * PAGE_SIZE
  const trimmed = query.trim()
  const url = trimmed
    ? `${BASE_URL}/users/search?q=${encodeURIComponent(trimmed)}&limit=${PAGE_SIZE}&skip=${skip}`
    : `${BASE_URL}/users?limit=${PAGE_SIZE}&skip=${skip}`

  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<UsersResponse>
}
