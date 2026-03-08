interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const pages = buildPageRange(page, totalPages)

  return (
    <nav className="flex justify-center items-center gap-1.5 mt-8 flex-wrap" aria-label="Pagination">
      <PageBtn onClick={() => onPageChange(page - 1)} disabled={page === 1} aria-label="Previous page">
        ‹
      </PageBtn>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e-${i}`} className="w-9 text-center text-gray-400 leading-9">&hellip;</span>
        ) : (
          <PageBtn
            key={p}
            onClick={() => onPageChange(p as number)}
            active={p === page}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </PageBtn>
        ),
      )}

      <PageBtn onClick={() => onPageChange(page + 1)} disabled={page === totalPages} aria-label="Next page">
        ›
      </PageBtn>
    </nav>
  )
}

function PageBtn({
  children,
  onClick,
  disabled,
  active,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'min-w-[36px] h-9 px-2 rounded-lg border text-sm transition-colors',
        active
          ? 'bg-indigo-500 border-indigo-500 text-white font-semibold'
          : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-400 hover:text-indigo-500',
        disabled ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}

function buildPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | '...')[] = [1]
  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')
  pages.push(total)

  return pages
}
