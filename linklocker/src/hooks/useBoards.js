import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase, hasSupabaseConfig } from '../lib/supabase'

const fallbackBoards = [
  { id: 'b1', name: 'UI Inspiration', description: 'Design and UX links', isPublic: true, linkCount: 18 },
  { id: 'b2', name: 'Learning', description: 'Courses and docs', isPublic: false, linkCount: 42 },
  { id: 'b3', name: 'Startup Research', description: 'Market and GTM references', isPublic: false, linkCount: 9 },
]

function mapBoard(row, linkCounts = {}) {
  const linkCount = row.link_count ?? linkCounts[row.id] ?? 0

  return {
    id: row.id,
    name: row.name,
    description: row.description || '',
    isPublic: Boolean(row.is_public),
    linkCount,
    userId: row.user_id,
    createdAt: row.created_at,
  }
}

async function fetchLinkCounts(boardIds = []) {
  if (!supabase || boardIds.length === 0) {
    return {}
  }

  const { data, error } = await supabase.from('links').select('board_id').in('board_id', boardIds)

  if (error) {
    throw error
  }

  return (data || []).reduce((counts, row) => {
    counts[row.board_id] = (counts[row.board_id] || 0) + 1
    return counts
  }, {})
}

export function useBoards(userId) {
  const [boards, setBoards] = useState(hasSupabaseConfig ? [] : fallbackBoards)
  const [isLoading, setIsLoading] = useState(hasSupabaseConfig)
  const [error, setError] = useState(null)

  const loadBoards = useCallback(async () => {
    if (!supabase) {
      setBoards(fallbackBoards)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    let query = supabase.from('boards').select('*')

    if (userId) {
      query = query.or(`is_public.eq.true,user_id.eq.${userId}`)
    } else {
      query = query.eq('is_public', true)
    }

    const { data, error: queryError } = await query.order('created_at', { ascending: false })

    if (queryError) {
      setError(queryError.message)
      setBoards([])
      setIsLoading(false)
      return
    }

    const mappedBoards = (data || []).map((row) => mapBoard(row))
    const linkCounts = await fetchLinkCounts(mappedBoards.map((board) => board.id))
    setBoards(mappedBoards.map((board) => ({ ...board, linkCount: linkCounts[board.id] ?? board.linkCount })))
    setIsLoading(false)
  }, [userId])

  useEffect(() => {
    loadBoards().catch((loadError) => {
      setError(loadError.message)
      setBoards([])
      setIsLoading(false)
    })
  }, [loadBoards])

  const publicBoards = useMemo(() => boards.filter((board) => board.isPublic), [boards])
  const ownedBoards = useMemo(
    () => (userId ? boards.filter((board) => board.userId === userId) : []),
    [boards, userId],
  )

  async function createBoard(payload) {
    if (!supabase) {
      const nextBoard = {
        id: `b${Date.now()}`,
        linkCount: 0,
        ...payload,
      }
      setBoards((prev) => [nextBoard, ...prev])
      return nextBoard
    }

    const { data, error: insertError } = await supabase
      .from('boards')
      .insert({
        name: payload.name,
        description: payload.description || '',
        is_public: Boolean(payload.isPublic),
        user_id: payload.userId,
      })
      .select('*')
      .single()

    if (insertError) {
      throw insertError
    }

    const createdBoard = mapBoard(data)
    setBoards((prev) => [createdBoard, ...prev.filter((board) => board.id !== createdBoard.id)])
    return createdBoard
  }

  async function refresh() {
    await loadBoards()
  }

  return {
    boards,
    publicBoards,
    ownedBoards,
    createBoard,
    refresh,
    isLoading,
    error,
  }
}
