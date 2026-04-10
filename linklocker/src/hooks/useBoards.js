import { useCallback, useEffect, useMemo, useState } from 'react'
import { hasSupabaseConfig, isDemoMode } from '../lib/supabase'
import { useSupabaseClient } from './useSupabaseClient'

const fallbackBoards = [
  {
    id: 'b1',
    userId: 'demo-user',
    name: 'Internships',
    description: 'Internship roles, hiring pages, and career starters',
    isPublic: true,
    linkCount: 10,
  },
  {
    id: 'b2',
    userId: 'demo-user',
    name: 'Courses',
    description: 'Useful courses for design, coding, and business',
    isPublic: true,
    linkCount: 10,
  },
  {
    id: 'b3',
    userId: 'demo-user',
    name: 'Top AI Tools',
    description: 'Popular AI tools for writing, coding, and research',
    isPublic: true,
    linkCount: 10,
  },
  {
    id: 'b4',
    userId: 'demo-user',
    name: 'Design Resources',
    description: 'UI ideas, design systems, and inspiration',
    isPublic: true,
    linkCount: 10,
  },
  {
    id: 'b5',
    userId: 'demo-user',
    name: 'Startup Research',
    description: 'Product, market, and growth references',
    isPublic: true,
    linkCount: 10,
  },
  {
    id: 'b6',
    userId: 'demo-user',
    name: 'Productivity',
    description: 'Workflows, habits, and tools to stay organized',
    isPublic: true,
    linkCount: 10,
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

async function fetchLinkCounts(supabase, boardIds = []) {
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
  const supabase = useSupabaseClient()
  const [boards, setBoards] = useState(isDemoMode || !hasSupabaseConfig ? fallbackBoards : [])
  const [isLoading, setIsLoading] = useState(isDemoMode ? false : hasSupabaseConfig)
  const [error, setError] = useState(null)

  const loadBoards = useCallback(async () => {
    if (isDemoMode || !supabase) {
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
      setError(formatAuthErrorMessage(queryError))
      setBoards([])
      setIsLoading(false)
      return
    }

    const mappedBoards = (data || []).map((row) => mapBoard(row))
    const linkCounts = await fetchLinkCounts(supabase, mappedBoards.map((board) => board.id))
    setBoards(mappedBoards.map((board) => ({ ...board, linkCount: linkCounts[board.id] ?? board.linkCount })))
    setIsLoading(false)
  }, [supabase, userId])

  useEffect(() => {
    loadBoards().catch((loadError) => {
      setError(formatAuthErrorMessage(loadError))
      setBoards([])
      setIsLoading(false)
    })
  }, [loadBoards])

  const publicBoards = useMemo(() => boards.filter((board) => board.isPublic), [boards])
  const ownedBoards = useMemo(() => {
    if (isDemoMode) {
      return boards
    }

    return userId ? boards.filter((board) => board.userId === userId) : []
  }, [boards, userId])

  async function createBoard(payload) {
    if (isDemoMode || !supabase) {
      const nextBoard = {
        id: `b${Date.now()}`,
        userId: payload.userId || 'demo-user',
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
      if (insertError.code === '42501') {
        throw new Error('RLS blocked board creation. Configure Clerk JWT template "supabase" and sign in again.')
      }
      throw new Error(formatAuthErrorMessage(insertError))
    }

    const createdBoard = mapBoard(data)
    setBoards((prev) => [createdBoard, ...prev.filter((board) => board.id !== createdBoard.id)])
    return createdBoard
  }

  async function updateBoard(boardId, updates) {
    if (isDemoMode || !supabase) {
      setBoards((prev) =>
        prev.map((board) => (board.id === boardId ? { ...board, ...updates } : board)),
      )
      return
    }

    const dbUpdates = {}
    if (Object.prototype.hasOwnProperty.call(updates, 'name')) {
      dbUpdates.name = updates.name
    }
    if (Object.prototype.hasOwnProperty.call(updates, 'description')) {
      dbUpdates.description = updates.description
    }
    if (Object.prototype.hasOwnProperty.call(updates, 'isPublic')) {
      dbUpdates.is_public = Boolean(updates.isPublic)
    }

    const { data, error: updateError } = await supabase
      .from('boards')
      .update(dbUpdates)
      .eq('id', boardId)
      .select('*')
      .single()

    if (updateError) {
      if (updateError.code === '42501') {
        throw new Error('RLS blocked board update. Configure Clerk JWT template "supabase" and sign in again.')
      }
      throw new Error(formatAuthErrorMessage(updateError))
    }

    const updatedBoard = mapBoard(data)
    setBoards((prev) => prev.map((board) => (board.id === boardId ? { ...board, ...updatedBoard } : board)))
  }

  async function deleteBoard(boardId) {
    if (isDemoMode || !supabase) {
      setBoards((prev) => prev.filter((board) => board.id !== boardId))
      return
    }

    const { error: deleteError } = await supabase.from('boards').delete().eq('id', boardId)

    if (deleteError) {
      if (deleteError.code === '42501') {
        throw new Error('RLS blocked board deletion. Configure Clerk JWT template "supabase" and sign in again.')
      }
      throw new Error(formatAuthErrorMessage(deleteError))
    }

    setBoards((prev) => prev.filter((board) => board.id !== boardId))
  }

  async function refresh() {
    await loadBoards()
  }

  return {
    boards,
    publicBoards,
    ownedBoards,
    createBoard,
    updateBoard,
    deleteBoard,
    refresh,
    isLoading,
    error,
  }
}
