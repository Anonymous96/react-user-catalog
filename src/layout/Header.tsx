import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Users, LayoutDashboard } from 'lucide-react'

interface Props {
  children?: ReactNode
}

const navItems = [
  { to: '/users', label: 'Users', icon: <Users size={15} /> },
  { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> },
]

export default function Header({ children }: Props) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Users size={16} className="text-white" />
          </div>
          <span className="text-base font-bold text-gray-900">Catalog</span>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {children && <div className="flex-1 max-w-xl ml-auto">{children}</div>}
      </div>
    </header>
  )
}
