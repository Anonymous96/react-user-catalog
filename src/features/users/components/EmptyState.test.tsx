import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EmptyState from './EmptyState'

describe('EmptyState', () => {
  it('renders generic message when no query', () => {
    render(<EmptyState />)
    expect(screen.getByText('No users found')).toBeInTheDocument()
  })

  it('renders query-specific message when query is provided', () => {
    render(<EmptyState query='alice' />)
    expect(screen.getByText(/No users found for/)).toBeInTheDocument()
    expect(screen.getByText(/alice/)).toBeInTheDocument()
  })
})
