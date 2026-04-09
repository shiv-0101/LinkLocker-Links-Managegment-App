import { useAuth } from '../hooks/useAuth'

function Profile() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Profile</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Manage your account and board visibility settings.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Name</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{user.name}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Email</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{user.email}</p>
        </div>
      </section>
    </div>
  )
}

export default Profile
