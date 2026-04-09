import { useUser } from '@clerk/clerk-react'

export function useAuth() {
  const { isLoaded, isSignedIn, user } = useUser()

  return {
    isLoaded,
    isAuthenticated: isSignedIn,
    user: user
      ? {
          id: user.id,
          name: user.fullName || user.firstName || 'User',
          email: user.primaryEmailAddress?.emailAddress || 'Not available',
        }
      : null,
  }
}
