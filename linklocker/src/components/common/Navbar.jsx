import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/discover', label: 'Discover' },
  { to: '/profile', label: 'Profile' },
]

function Navbar() {
  return (
    <header className="fixed left-1/2 top-4 z-30 w-[min(1280px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <NavLink to="/" className="text-base font-semibold tracking-tight text-slate-900">
          LinkLocker
        </NavLink>
        <nav className="flex flex-wrap gap-2" aria-label="Primary Navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                'rounded-full px-3 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
