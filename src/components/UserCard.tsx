import { Mail, Phone, Building2, MapPin } from 'lucide-react'
import type { User } from '../types/user'

interface Props {
  user: User
}

export default function UserCard({ user }: Props) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          loading="lazy"
          className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shrink-0"
        />
        <div className="min-w-0">
          <h2 className="font-semibold text-gray-900 truncate">
            {user.firstName} {user.lastName}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold capitalize bg-violet-100 text-violet-700 rounded-full px-2 py-0.5">
              {user.gender}
            </span>
            <span className="text-xs text-gray-400">{user.age} y.o.</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <ul className="flex flex-col gap-2">
        <DetailRow icon={<Mail size={14} />} text={user.email} />
        <DetailRow icon={<Phone size={14} />} text={user.phone} />
        <DetailRow icon={<Building2 size={14} />} text={`${user.company.name} — ${user.company.department}`} />
        <DetailRow icon={<MapPin size={14} />} text={`${user.address.city}, ${user.address.country}`} />
      </ul>
    </article>
  )
}

function DetailRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-gray-500">
      <span className="mt-0.5 shrink-0 text-indigo-500">{icon}</span>
      <span className="break-all">{text}</span>
    </li>
  )
}
