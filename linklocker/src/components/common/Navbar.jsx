import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/discover', label: 'Discover' },
  { to: '/profile', label: 'Profile' },
]

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const linkClassName = ({ isActive }) =>
    [
      'rounded-full px-3 py-2 text-sm font-medium transition',
      isActive
        ? 'bg-slate-900 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    ].join(' ')

  const authButtonBase = 'rounded-lg px-4 py-2 text-sm font-semibold transition'

  return (
    <header className="fixed left-1/2 top-4 z-30 w-[min(1280px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <NavLink to="/" className="text-base font-semibold tracking-tight text-slate-900" onClick={() => setMobileMenuOpen(false)}>
          LinkLocker
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary Navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClassName}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <SignedOut>
            <>
              <NavLink to="/sign-in" className={`${authButtonBase} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}>
                Sign In
              </NavLink>
              <NavLink to="/sign-up" className={`${authButtonBase} bg-blue-600 text-white shadow-sm hover:bg-blue-700`}>
                Sign Up
              </NavLink>
            </>
          </SignedOut>
          <SignedIn>
            <div className="rounded-full border border-slate-200 bg-white p-1 shadow-sm">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-50 md:hidden"
          onClick={() => setMobileMenuOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div className={`${mobileMenuOpen ? 'mt-3 block' : 'hidden'} md:hidden`}>
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClassName}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <SignedOut>
            <div className="flex gap-2 pt-1">
              <NavLink
                to="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className={`${authButtonBase} flex-1 border border-slate-300 bg-white text-center text-slate-700 hover:bg-slate-50`}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/sign-up"
                onClick={() => setMobileMenuOpen(false)}
                className={`${authButtonBase} flex-1 bg-blue-600 text-center text-white shadow-sm hover:bg-blue-700`}
              >
                Sign Up
              </NavLink>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center justify-center pt-1">
              <div className="rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  )
}

export default Navbar
