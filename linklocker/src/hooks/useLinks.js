import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiPost } from '../config/api'
import { hasSupabaseConfig } from '../lib/supabase'
import { useSupabaseClient } from './useSupabaseClient'

const seedLinks = [
  {
    id: 'l1',
    boardId: 'b1',
    userId: 'demo-user-1',
    title: 'Calm Product UI Patterns',
    url: 'https://example.com/calm-ui',
    createdAt: '2026-04-01',
  },
  {
    id: 'l2',
    boardId: 'b1',
    userId: 'demo-user-2',
    title: 'Responsive Grid Guide',
    url: 'https://example.com/responsive-grid',
    createdAt: '2026-04-03',
  },
  {
    id: 'l3',
    boardId: 'b2',
    userId: 'demo-user-1',
    title: 'React Router Fundamentals',
    url: 'https://example.com/router',
    createdAt: '2026-04-05',
  },
]

function formatAuthErrorMessage(error) {
  const message = error?.message || ''

  if (message.includes('No JWT template exists with name: supabase')) {
    return 'Clerk JWT template "supabase" is missing. Create it in Clerk, then sign out and sign in again.'
  }

  if (message.includes('JWT') && message.includes('claim')) {
    return 'Your Clerk token is missing claims required by Supabase RLS. Recheck Clerk JWT template "supabase".'
  }

  return message
}

function mapLink(row) {
  return {
    id: row.id,
    boardId: row.board_id ?? row.boardId,
    userId: row.user_id ?? row.userId,
    title: row.title,
    url: row.url,
    metadata: row.metadata || null,
    sourceType: row.source_type || null,
    createdAt: row.created_at,
  }
}

export function useLinks(boardId, options = {}) {
  const { userId, limit } = options
  const supabase = useSupabaseClient()
  const [links, setLinks] = useState(hasSupabaseConfig ? [] : seedLinks)
  const [isLoading, setIsLoading] = useState(hasSupabaseConfig && Boolean(boardId))
  const [error, setError] = useState(null)

  const loadLinks = useCallback(async () => {
    if (!supabase) {
      setLinks(boardId ? seedLinks.filter((link) => link.boardId === boardId) : seedLinks)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    let query = supabase.from('links').select('*').order('created_at', { ascending: false })

    if (boardId) {
      query = query.eq('board_id', boardId)
    } else if (userId) {
      query = query.eq('user_id', userId)
      if (limit) {
        query = query.limit(limit)
      }
    } else {
      setLinks([])
      setIsLoading(false)
      return
    }

    const { data, error: queryError } = await query

    if (queryError) {
      setError(formatAuthErrorMessage(queryError))
      setLinks([])
      setIsLoading(false)
      return
    }

    setLinks((data || []).map(mapLink))
    setIsLoading(false)
  }, [boardId, limit, supabase, userId])

  useEffect(() => {
    loadLinks().catch((loadError) => {
      setError(formatAuthErrorMessage(loadError))
      setLinks([])
      setIsLoading(false)
    })
  }, [loadLinks])

  const boardLinks = useMemo(() => links, [links])

  async function addLink(payload) {
    const title = payload.title || payload.url

    let metadata = payload.metadata || null
    if (!metadata) {
      try {
        metadata = await apiPost('/api/metadata', { url: payload.url })
      } catch {
        metadata = null
      }
    }

    if (!supabase) {
      const nextLink = {
        id: `l${Date.now()}`,
        createdAt: new Date().toISOString(),
        metadata,
        ...payload,
        title,
      }
      setLinks((prev) => [nextLink, ...prev])
      return nextLink
    }

    const { data, error: insertError } = await supabase
      .from('links')
      .insert({
        board_id: payload.boardId,
        user_id: payload.userId,
        title,
        url: payload.url,
      })
      .select('*')
      .single()

    if (insertError) {
      if (insertError.code === '42501') {
        throw new Error('RLS blocked link creation. Configure Clerk JWT template "supabase" and sign in again.')
      }
      throw new Error(formatAuthErrorMessage(insertError))
    }

    const nextLink = mapLink(data)
    setLinks((prev) => [nextLink, ...prev])
    return nextLink
  }

  return {
    links: boardLinks,
    addLink,
    refresh: loadLinks,
    isLoading,
    error,
  }
}
