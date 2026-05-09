import { SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { useBoards } from '../hooks/useBoards'
import { formatDate } from '../utils/formatters'

function Profile() {
  const { user, isLoaded } = useUser()
  const { boards } = useBoards(user?.id)

  if (!isLoaded) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-600">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Account</p>
        <h1 className="mt-2 text-2xl font-medium text-slate-900">Profile</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Keep this page small and practical. Use it later for account details and preferences.
        </p>

        <div className="mt-5 space-y-3 text-sm text-slate-600">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <span>Name</span>
            <span className="text-slate-900">{user?.fullName || user?.firstName || 'Not set'}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <span>Email</span>
            <span className="text-slate-900">{user?.primaryEmailAddress?.emailAddress || 'Not available'}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <span>Boards</span>
            <span className="text-slate-900">{boards.length}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Joined</span>
            <span className="text-slate-900">{user?.createdAt ? formatDate(user.createdAt) : 'Not available'}</span>
          </div>
        </div>

        <div className="mt-5">
          <SignOutButton>
            <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-600">You can add preferences, theme controls, and account settings here later.</p>
      </section>
    </div>
  )
}

export default Profile
