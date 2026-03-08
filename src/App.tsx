import { UserX } from 'lucide-react'
import { useUsers } from './hooks/useUsers'
import SearchBar from './components/SearchBar'
import UserCard from './components/UserCard'
import Pagination from './components/Pagination'

export default function App() {
  const { users, total, page, totalPages, loading, error, query, setQuery, setPage } = useUsers()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center gap-6 flex-wrap">
          <h1 className="text-lg font-bold text-indigo-600 whitespace-nowrap">User Catalog</h1>
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6">
        {error && (
          <div role="alert" className="bg-red-50 text-red-800 rounded-xl px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}

        {!error && (
          <p className="text-sm text-gray-400 mb-4">
            {loading ? 'Loading...' : `${total} user${total !== 1 ? 's' : ''} found`}
          </p>
        )}

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 mb-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && users.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20 text-gray-400">
            <UserX size={52} className="opacity-40" />
            <p className="text-sm">No users found for &ldquo;{query}&rdquo;</p>
          </div>
        )}

        {/* Grid */}
        {!loading && users.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 mb-8">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </main>
    </div>
  )
}
