import { useUsers } from '../hooks/useUsers'
import SearchBar from '../components/SearchBar'
import UserCard from '../components/UserCard'
import Pagination from '../components/Pagination'
import UserGridSkeleton from '../components/UserGridSkeleton'
import EmptyState from '../components/EmptyState'

export default function UsersPage() {
  const { users, total, page, totalPages, loading, error, query, setQuery, setPage } = useUsers()

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center gap-6 flex-wrap">
          <h1 className="text-lg font-bold text-indigo-600 whitespace-nowrap">User Catalog</h1>
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </header>

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

        {!loading && !error && users.length === 0 && <EmptyState query={query} />}

        {(loading || users.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
            {loading ? (
              <UserGridSkeleton />
            ) : (
              users.map((user) => <UserCard key={user.id} user={user} />)
            )}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </main>
    </>
  )
}
