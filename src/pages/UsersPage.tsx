import { useUsers } from '../features/users/hooks/useUsers'
import UserCard from '../features/users/components/UserCard'
import UserGridSkeleton from '../features/users/components/UserGridSkeleton'
import EmptyState from '../features/users/components/EmptyState'
import Header from '../layout/Header'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'

export default function UsersPage() {
  const { users, total, page, totalPages, loading, error, query, setQuery, setPage } = useUsers()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header>
        <SearchBar value={query} onChange={setQuery} />
      </Header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {error ? (
          <div
            role="alert"
            className="bg-red-50 border border-red-100 text-red-700 rounded-xl px-4 py-3 text-sm mb-6"
          >
            {error}
          </div>
        ) : (
          <p className="text-sm text-gray-400 mb-5">
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
    </div>
  )
}
