import { UserX } from 'lucide-react'

interface Props {
  query?: string
}

export default function EmptyState({ query }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-gray-400">
      <UserX size={52} className="opacity-40" />
      <p className="text-sm">
        {query ? <>No users found for &ldquo;{query}&rdquo;</> : 'No users found'}
      </p>
    </div>
  )
}
