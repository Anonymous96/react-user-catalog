import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useUsers } from './useUsers'
import * as userService from '../services/userService'
import type { UsersResponse } from '../../../types/user'

const mockUser = (overrides = {}) => ({
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '123',
  age: 30,
  gender: 'male' as const,
  image: '',
  company: { name: 'Acme', department: 'Eng' },
  address: { city: 'NY', country: 'US' },
  ...overrides,
})

const mockResponse = (overrides: Partial<UsersResponse> = {}): UsersResponse => ({
  users: [mockUser()],
  total: 1,
  skip: 0,
  limit: 12,
  ...overrides,
})

const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
)

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('useUsers', () => {
  it('starts in loading state', () => {
    vi.spyOn(userService, 'fetchUsers').mockResolvedValue(mockResponse())
    const { result } = renderHook(() => useUsers(), { wrapper })
    expect(result.current.loading).toBe(true)
  })

  it('returns users after fetch resolves', async () => {
    vi.spyOn(userService, 'fetchUsers').mockResolvedValue(mockResponse())
    const { result } = renderHook(() => useUsers(), { wrapper })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.users).toHaveLength(1)
    expect(result.current.users[0].firstName).toBe('John')
  })

  it('sets error when fetch fails', async () => {
    vi.spyOn(userService, 'fetchUsers').mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => useUsers(), { wrapper })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe('Failed to load users. Please try again.')
    expect(result.current.users).toHaveLength(0)
  })

  it('reads page from URL (defaults to 1)', async () => {
    vi.spyOn(userService, 'fetchUsers').mockResolvedValue(mockResponse())
    const { result } = renderHook(() => useUsers(), { wrapper })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.page).toBe(1)
  })

  it('reads query from URL (defaults to empty)', async () => {
    vi.spyOn(userService, 'fetchUsers').mockResolvedValue(mockResponse())
    const { result } = renderHook(() => useUsers(), { wrapper })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.query).toBe('')
  })

  it('calculates totalPages correctly', async () => {
    vi.spyOn(userService, 'fetchUsers').mockResolvedValue(mockResponse({ total: 25 }))
    const { result } = renderHook(() => useUsers(), { wrapper })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.totalPages).toBe(3)
  })
})
