import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { User } from '../types/user'
import { fetchUsers } from '../services/userService'
import { PAGE_SIZE } from '../config/api'

interface UseUsersResult {
  users: User[]
  total: number
  page: number
  totalPages: number
  loading: boolean
  error: string | null
  query: string
  setQuery: (q: string) => void
  setPage: (p: number) => void
}

export function useUsers(): UseUsersResult {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const page = Number(searchParams.get('page') ?? '1')

  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const abortRef = useRef<AbortController | null>(null)

  const setQuery = useCallback(
    (q: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        if (q) next.set('q', q)
        else next.delete('q')
        next.set('page', '1')
        return next
      })
    },
    [setSearchParams],
  )

  const setPage = useCallback(
    (p: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        next.set('page', String(p))
        return next
      })
    },
    [setSearchParams],
  )

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 400)
    return () => clearTimeout(id)
  }, [query])

  useEffect(() => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    fetchUsers(debouncedQuery, page, controller.signal)
      .then((data) => {
        setUsers(data.users)
        setTotal(data.total)
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setError('Failed to load users. Please try again.')
        setLoading(false)
      })

    return () => controller.abort()
  }, [page, debouncedQuery])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return {
    users,
    total,
    page,
    totalPages,
    loading,
    error,
    query,
    setQuery,
    setPage,
  }
}
