import { useMemo } from 'react'
import { useAuth as useClerkAuth } from '@clerk/clerk-react'
import { createSupabaseClient } from '../lib/supabase'

export function useSupabaseClient() {
  const { getToken } = useClerkAuth()

  return useMemo(
    () =>
      createSupabaseClient({
        accessToken: async () => {
          try {
            const templateToken = await getToken({ template: 'supabase' })
            return templateToken || null
          } catch (error) {
            const message = error?.message || ''
            if (message.includes('No JWT template exists with name: supabase')) {
              return null
            }

            throw error
          }
        },
      }),
    [getToken],
  )
}
