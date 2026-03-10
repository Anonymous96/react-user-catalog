import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('renders with placeholder', () => {
    render(<SearchBar value='' onChange={vi.fn()} />)
    expect(screen.getByPlaceholderText('Search by name...')).toBeInTheDocument()
  })

  it('displays current value', () => {
    render(<SearchBar value='alice' onChange={vi.fn()} />)
    expect(screen.getByDisplayValue('alice')).toBeInTheDocument()
  })

  it('calls onChange when typing', async () => {
    const onChange = vi.fn()
    render(<SearchBar value='' onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'bob')
    expect(onChange).toHaveBeenCalled()
  })

  it('shows clear button when value is non-empty', () => {
    render(<SearchBar value='alice' onChange={vi.fn()} />)
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
  })

  it('hides clear button when value is empty', () => {
    render(<SearchBar value='' onChange={vi.fn()} />)
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
  })

  it('calls onChange with empty string when clear is clicked', async () => {
    const onChange = vi.fn()
    render(<SearchBar value='alice' onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('Clear search'))
    expect(onChange).toHaveBeenCalledWith('')
  })
})
