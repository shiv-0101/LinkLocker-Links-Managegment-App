import { SignOutButton, UserButton, useUser } from '@clerk/clerk-react'

function Profile() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-600">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Account</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Your Profile</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              View your account details, check your identity, and sign out when needed.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Full Name</p>
          <p className="mt-2 text-base font-semibold text-slate-900">
            {user?.fullName || user?.firstName || 'Not set'}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Email</p>
          <p className="mt-2 text-base font-semibold text-slate-900">
            {user?.primaryEmailAddress?.emailAddress || 'Not available'}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">User ID</p>
          <p className="mt-2 break-all text-sm font-semibold text-slate-900">{user?.id}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Account Action</p>
          <div className="mt-3">
            <SignOutButton>
              <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile
