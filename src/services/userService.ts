import type { UsersResponse } from '../types/user'
import { BASE_URL, PAGE_SIZE } from '../config/api'

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
  const data = (await res.json()) as UsersResponse
  if (!Array.isArray(data.users)) throw new Error('Unexpected API response')
  return data
}
