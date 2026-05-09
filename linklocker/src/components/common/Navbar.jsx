import { Link, NavLink } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const desktopNavItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/discover', label: 'Discover' },
  { to: '/profile', label: 'Profile' },
]

const mobileNavItems = [
  { to: '/', label: 'Home', end: true, icon: 'home' },
  { to: '/dashboard', label: 'Dashboard', icon: 'grid' },
  { to: '/discover', label: 'Discover', icon: 'compass' },
  { to: '/profile', label: 'Profile', icon: 'user' },
]

function NavIcon({ name, active }) {
  const strokeClass = active ? 'stroke-slate-900' : 'stroke-slate-500'

  switch (name) {
    case 'home':
      return (
        <svg viewBox="0 0 24 24" className={`h-4 w-4 ${strokeClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5.5 10.5V20h13V10.5" />
        </svg>
      )
    case 'grid':
      return (
        <svg viewBox="0 0 24 24" className={`h-4 w-4 ${strokeClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 4h6v6H4z" />
          <path d="M14 4h6v6h-6z" />
          <path d="M4 14h6v6H4z" />
          <path d="M14 14h6v6h-6z" />
        </svg>
      )
    case 'compass':
      return (
        <svg viewBox="0 0 24 24" className={`h-4 w-4 ${strokeClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8.5" />
          <path d="m14.5 9.5-1.5 4-4 1.5 1.5-4z" />
        </svg>
      )
    case 'user':
    default:
      return (
        <svg viewBox="0 0 24 24" className={`h-4 w-4 ${strokeClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 20a8 8 0 1 0-16 0" />
          <circle cx="12" cy="8" r="3.25" />
        </svg>
      )
  }
}

function Navbar() {
  const desktopLinkClassName = ({ isActive }) =>
    [
      'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'border border-slate-900 text-slate-900'
        : 'text-slate-500 hover:text-slate-900',
    ].join(' ')

  const mobileLinkClassName = ({ isActive }) =>
    [
      'flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium transition-colors',
      isActive
        ? 'bg-slate-100 text-slate-900'
        : 'text-slate-500 hover:text-slate-900',
    ].join(' ')

  const authButtonBase = 'rounded-lg px-4 py-2 text-sm font-medium transition-colors'

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center px-4 pt-4 sm:px-6 lg:px-8">
          <div className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
            <Link to="/" className="text-sm font-medium uppercase tracking-[0.18em] text-slate-900">
              LinkLocker
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary Navigation">
              {desktopNavItems.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={desktopLinkClassName}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <SignedOut>
                <>
                  <Link
                    to="/sign-in"
                    className={`${authButtonBase} border border-slate-200 bg-white text-slate-700 hover:text-slate-900`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    className={`${authButtonBase} borderrounded-lg px-3 py-2 text-sm font-medium transition-colors border border-slate-900 text-slate-900`}
                  >
                    Sign Up
                  </Link>
                </>
              </SignedOut>
              <SignedIn>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-1">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-4 bottom-4 z-30 md:hidden" aria-label="Mobile Navigation">
        <div className="rounded-xl border border-slate-200 bg-white px-2 py-2">
          <div className="grid grid-cols-4 gap-1">
            {mobileNavItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={mobileLinkClassName}>
                {({ isActive }) => (
                  <>
                    <NavIcon name={item.icon} active={isActive} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
