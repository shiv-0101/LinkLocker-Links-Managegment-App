import { SignUp as ClerkSignUp } from '@clerk/clerk-react'

function SignUp() {
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Get started</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Create your LinkLocker account</h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600">
            Create an account to organize your links into private and public boards.
          </p>
        </div>
        <ClerkSignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"
          appearance={clerkAppearance}
        />
      </div>
    </div>
  )
}

export default SignUp
