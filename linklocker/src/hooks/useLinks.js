import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiPost } from '../config/api'
import { supabase, hasSupabaseConfig } from '../lib/supabase'

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

export function useLinks(boardId) {
  const [links, setLinks] = useState(hasSupabaseConfig ? [] : seedLinks)
  const [isLoading, setIsLoading] = useState(hasSupabaseConfig && Boolean(boardId))
  const [error, setError] = useState(null)

  const loadLinks = useCallback(async () => {
    if (!supabase) {
      setLinks(boardId ? seedLinks.filter((link) => link.boardId === boardId) : seedLinks)
      setIsLoading(false)
      return
    }

    if (!boardId) {
      setLinks([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    const { data, error: queryError } = await supabase
      .from('links')
      .select('*')
      .eq('board_id', boardId)
      .order('created_at', { ascending: false })

    if (queryError) {
      setError(queryError.message)
      setLinks([])
      setIsLoading(false)
      return
    }

    setLinks((data || []).map(mapLink))
    setIsLoading(false)
  }, [boardId])

  useEffect(() => {
    loadLinks().catch((loadError) => {
      setError(loadError.message)
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
      throw insertError
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
