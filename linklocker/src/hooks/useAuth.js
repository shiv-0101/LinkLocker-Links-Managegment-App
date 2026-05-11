import { useUser } from '@clerk/clerk-react'

/**
 * Hook for accessing current user authentication state
 * @returns {Object} Authentication object with user info
 */
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
