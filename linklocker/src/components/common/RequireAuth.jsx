import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'

function RequireAuth({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

export default RequireAuth
