import { SignIn as ClerkSignIn } from '@clerk/clerk-react'

function SignIn() {
  const clerkAppearance = {
    elements: {
      rootBox: 'mx-auto flex w-full justify-center',
      cardBox: 'w-full max-w-md',
      card: 'rounded-xl border border-slate-200 shadow-sm',
    },
  }

  return (
    <div className="flex min-h-[calc(100vh-11rem)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Welcome back</p>
          <h1 className="text-2xl font-medium text-slate-900">Sign in</h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600">Access your saved boards and keep everything in sync.</p>
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
