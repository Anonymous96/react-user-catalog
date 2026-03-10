import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchUsers } from './userService'
import type { UsersResponse } from '../../../types/user'

const mockUser = (overrides = {}) => ({
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '123',
  age: 30,
  gender: 'male' as const,
  image: 'https://example.com/img.jpg',
  company: { name: 'Acme', department: 'Engineering' },
  address: { city: 'NY', country: 'US' },
  ...overrides,
})

const mockResponse = (users = [mockUser()], total = 1): UsersResponse => ({
  users,
  total,
  skip: 0,
  limit: 12,
})

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('fetchUsers', () => {
  it('calls the list endpoint when query is empty', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse()),
      }),
    )

    await fetchUsers('', 1, new AbortController().signal)

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users?limit='),
      expect.any(Object),
    )
  })

  it('calls the search endpoint when query is provided', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse()),
      }),
    )

    await fetchUsers('john', 1, new AbortController().signal)

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/search?q=john'),
      expect.any(Object),
    )
  })

  it('applies correct skip for page 2', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse()),
      }),
    )

    await fetchUsers('', 2, new AbortController().signal)

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('skip=12'),
      expect.any(Object),
    )
  })

  it('filters by full name client-side', async () => {
    const users = [
      mockUser({ firstName: 'John', lastName: 'Doe' }),
      mockUser({ id: 2, firstName: 'Jane', lastName: 'Smith' }),
    ]
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse(users, 2)),
      }),
    )

    const result = await fetchUsers('john doe', 1, new AbortController().signal)

    expect(result.users).toHaveLength(1)
    expect(result.users[0].firstName).toBe('John')
    expect(result.total).toBe(1)
  })

  it('matches partial first name', async () => {
    const users = [
      mockUser({ firstName: 'John', lastName: 'Doe' }),
      mockUser({ id: 2, firstName: 'Jane', lastName: 'Smith' }),
    ]
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse(users, 2)),
      }),
    )

    const result = await fetchUsers('jan', 1, new AbortController().signal)

    expect(result.users).toHaveLength(1)
    expect(result.users[0].firstName).toBe('Jane')
  })

  it('throws on non-ok response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    )

    await expect(fetchUsers('', 1, new AbortController().signal)).rejects.toThrow('HTTP 500')
  })

  it('throws on unexpected response shape', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ users: 'not-an-array' }),
      }),
    )

    await expect(fetchUsers('', 1, new AbortController().signal)).rejects.toThrow(
      'Unexpected API response',
    )
  })
})
