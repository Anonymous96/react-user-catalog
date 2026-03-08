import { useRef } from 'react'
import { Search, X } from 'lucide-react'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search users"
        className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white"
      />
      {value && (
        <button
          onClick={() => { onChange(''); inputRef.current?.focus() }}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
        >
          <X size={15} />
        </button>
      )}
    </div>
  )
}
