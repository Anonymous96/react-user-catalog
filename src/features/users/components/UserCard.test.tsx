import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserCard from './UserCard'
import type { User } from '../../../types/user'

const user: User = {
  id: 1,
  firstName: 'Alice',
  lastName: 'Smith',
  email: 'alice@example.com',
  phone: '+1-555-0100',
  age: 28,
  gender: 'female',
  image: 'https://example.com/alice.jpg',
  company: { name: 'Globex', department: 'HR' },
  address: { city: 'Springfield', country: 'US' },
}

describe('UserCard', () => {
  it('renders full name', () => {
    render(<UserCard user={user} />)
    expect(screen.getByText('Alice Smith')).toBeInTheDocument()
  })

  it('renders email', () => {
    render(<UserCard user={user} />)
    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
  })

  it('renders phone', () => {
    render(<UserCard user={user} />)
    expect(screen.getByText('+1-555-0100')).toBeInTheDocument()
  })

  it('renders company and department', () => {
    render(<UserCard user={user} />)
    expect(screen.getByText('Globex — HR')).toBeInTheDocument()
  })

  it('renders city and country', () => {
    render(<UserCard user={user} />)
    expect(screen.getByText('Springfield, US')).toBeInTheDocument()
  })

  it('renders gender badge', () => {
    render(<UserCard user={user} />)
    expect(screen.getByText('female')).toBeInTheDocument()
  })

  it('renders age', () => {
    render(<UserCard user={user} />)
    expect(screen.getByText('28 y.o.')).toBeInTheDocument()
  })

  it('renders avatar with correct alt text', () => {
    render(<UserCard user={user} />)
    expect(screen.getByAltText('Alice Smith')).toBeInTheDocument()
  })
})
