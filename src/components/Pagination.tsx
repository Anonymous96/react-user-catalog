interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  return (
    <nav className="flex justify-center items-center gap-3 mt-8" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="h-9 px-4 rounded-lg border text-sm transition-colors bg-white border-gray-200 text-gray-700 hover:border-indigo-400 hover:text-indigo-500 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
      >
        ‹ Prev
      </button>

      <span className="text-sm text-gray-500">
        Page <strong className="text-gray-800">{page}</strong> of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="h-9 px-4 rounded-lg border text-sm transition-colors bg-white border-gray-200 text-gray-700 hover:border-indigo-400 hover:text-indigo-500 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
      >
        Next ›
      </button>
    </nav>
  )
}
