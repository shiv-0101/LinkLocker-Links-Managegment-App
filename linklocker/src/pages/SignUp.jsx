import { SignUp as ClerkSignUp } from '@clerk/clerk-react'

function SignUp() {
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
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Get started</p>
          <h1 className="text-2xl font-medium text-slate-900">Create account</h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600">Create a simple workspace for saving links into private and public boards.</p>
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
