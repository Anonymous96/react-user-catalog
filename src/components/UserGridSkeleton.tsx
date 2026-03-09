import { PAGE_SIZE } from '../config/api'

interface Props {
  count?: number
}

export default function UserGridSkeleton({ count = PAGE_SIZE }: Props) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-72 bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse shrink-0" />
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
              <div className="h-3 bg-gray-200 animate-pulse rounded w-1/3" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-gray-200 animate-pulse rounded shrink-0" />
                <div className="h-3 bg-gray-200 animate-pulse rounded flex-1" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
