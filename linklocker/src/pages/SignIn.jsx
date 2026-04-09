import { SignIn as ClerkSignIn } from '@clerk/clerk-react'

function SignIn() {
  const clerkAppearance = {
    elements: {
      rootBox: 'mx-auto flex w-full justify-center',
      cardBox: 'w-full max-w-md',
      card: 'rounded-2xl border border-slate-200 shadow-sm',
    },
  }

  return (
    <div className="flex min-h-[calc(100vh-11rem)] items-center justify-center rounded-3xl bg-slate-50 px-4">
      <div className="w-full max-w-5xl">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Welcome back</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Sign in to LinkLocker</h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600">
            Sign in to save links, manage boards, and keep your workspace synced.
          </p>
        </div>
        <ClerkSignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
          appearance={clerkAppearance}
        />
      </div>
    </div>
  )
}

export default SignIn
