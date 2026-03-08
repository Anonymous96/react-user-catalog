import { useState, useEffect, useRef } from 'react'
import type { User } from '../types/user'
import { fetchUsers, PAGE_SIZE } from '../services/userService'


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
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [query, setQueryState] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const setQuery = (q: string) => {
    setQueryState(q)
    setPage(1)
  }

  useEffect(() => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    fetchUsers(query, page, controller.signal)
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
  }, [page, query])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return { users, total, page, totalPages, loading, error, query, setQuery, setPage }
}
