import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiPost } from '../config/api'
import { hasSupabaseConfig, isDemoMode } from '../lib/supabase'
import { useSupabaseClient } from './useSupabaseClient'

const seedLinks = [
  { id: 'l1', boardId: 'b1', userId: 'demo-user', title: 'Google Careers Internships', url: 'https://careers.google.com/students/' },
  { id: 'l2', boardId: 'b1', userId: 'demo-user', title: 'Microsoft Explore Program', url: 'https://careers.microsoft.com/' },
  { id: 'l3', boardId: 'b1', userId: 'demo-user', title: 'Notion Careers', url: 'https://www.notion.so/careers' },
  { id: 'l4', boardId: 'b1', userId: 'demo-user', title: 'Airtable Careers', url: 'https://www.airtable.com/careers' },
  { id: 'l5', boardId: 'b1', userId: 'demo-user', title: 'Canva Jobs', url: 'https://www.canva.com/careers/' },
  { id: 'l6', boardId: 'b1', userId: 'demo-user', title: 'Stripe Careers', url: 'https://stripe.com/jobs' },
  { id: 'l7', boardId: 'b1', userId: 'demo-user', title: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/' },
  { id: 'l8', boardId: 'b1', userId: 'demo-user', title: 'AngelList Talent', url: 'https://wellfound.com/jobs' },
  { id: 'l9', boardId: 'b1', userId: 'demo-user', title: 'Internship programs list', url: 'https://example.com/internships-list' },
  { id: 'l10', boardId: 'b1', userId: 'demo-user', title: 'Student job boards', url: 'https://example.com/student-jobs' },

  { id: 'l11', boardId: 'b2', userId: 'demo-user', title: 'freeCodeCamp', url: 'https://www.freecodecamp.org/' },
  { id: 'l12', boardId: 'b2', userId: 'demo-user', title: 'Coursera', url: 'https://www.coursera.org/' },
  { id: 'l13', boardId: 'b2', userId: 'demo-user', title: 'edX', url: 'https://www.edx.org/' },
  { id: 'l14', boardId: 'b2', userId: 'demo-user', title: 'CS50', url: 'https://cs50.harvard.edu/x/' },
  { id: 'l15', boardId: 'b2', userId: 'demo-user', title: 'Frontend Masters', url: 'https://frontendmasters.com/' },
  { id: 'l16', boardId: 'b2', userId: 'demo-user', title: 'Khan Academy', url: 'https://www.khanacademy.org/' },
  { id: 'l17', boardId: 'b2', userId: 'demo-user', title: 'Udemy deals', url: 'https://www.udemy.com/' },
  { id: 'l18', boardId: 'b2', userId: 'demo-user', title: 'YouTube learning playlist', url: 'https://example.com/learning-playlist' },
  { id: 'l19', boardId: 'b2', userId: 'demo-user', title: 'Product design basics', url: 'https://example.com/product-design-course' },
  { id: 'l20', boardId: 'b2', userId: 'demo-user', title: 'Business basics course', url: 'https://example.com/business-course' },

  { id: 'l21', boardId: 'b3', userId: 'demo-user', title: 'ChatGPT', url: 'https://chatgpt.com/' },
  { id: 'l22', boardId: 'b3', userId: 'demo-user', title: 'Claude', url: 'https://claude.ai/' },
  { id: 'l23', boardId: 'b3', userId: 'demo-user', title: 'Perplexity', url: 'https://www.perplexity.ai/' },
  { id: 'l24', boardId: 'b3', userId: 'demo-user', title: 'Gamma', url: 'https://gamma.app/' },
  { id: 'l25', boardId: 'b3', userId: 'demo-user', title: 'Notion AI', url: 'https://www.notion.so/product/ai' },
  { id: 'l26', boardId: 'b3', userId: 'demo-user', title: 'Cursor', url: 'https://www.cursor.com/' },
  { id: 'l27', boardId: 'b3', userId: 'demo-user', title: 'Phind', url: 'https://www.phind.com/' },
  { id: 'l28', boardId: 'b3', userId: 'demo-user', title: 'Midjourney', url: 'https://www.midjourney.com/' },
  { id: 'l29', boardId: 'b3', userId: 'demo-user', title: 'Runway', url: 'https://runwayml.com/' },
  { id: 'l30', boardId: 'b3', userId: 'demo-user', title: 'AI tools roundup', url: 'https://example.com/ai-tools-roundup' },

  { id: 'l31', boardId: 'b4', userId: 'demo-user', title: 'Figma Community', url: 'https://www.figma.com/community' },
  { id: 'l32', boardId: 'b4', userId: 'demo-user', title: 'Mobbin', url: 'https://mobbin.com/' },
  { id: 'l33', boardId: 'b4', userId: 'demo-user', title: 'Dribbble', url: 'https://dribbble.com/' },
  { id: 'l34', boardId: 'b4', userId: 'demo-user', title: 'Awwwards', url: 'https://www.awwwards.com/' },
  { id: 'l35', boardId: 'b4', userId: 'demo-user', title: 'Landing page inspiration', url: 'https://example.com/landing-pages' },
  { id: 'l36', boardId: 'b4', userId: 'demo-user', title: 'UI motion ideas', url: 'https://example.com/ui-motion' },
  { id: 'l37', boardId: 'b4', userId: 'demo-user', title: 'Design system examples', url: 'https://example.com/design-systems' },
  { id: 'l38', boardId: 'b4', userId: 'demo-user', title: 'Color palette ideas', url: 'https://example.com/colors' },
  { id: 'l39', boardId: 'b4', userId: 'demo-user', title: 'Typography references', url: 'https://example.com/typography' },
  { id: 'l40', boardId: 'b4', userId: 'demo-user', title: 'Portfolio inspiration', url: 'https://example.com/portfolio-ui' },

  { id: 'l41', boardId: 'b5', userId: 'demo-user', title: 'Y Combinator', url: 'https://www.ycombinator.com/' },
  { id: 'l42', boardId: 'b5', userId: 'demo-user', title: 'Product Hunt', url: 'https://www.producthunt.com/' },
  { id: 'l43', boardId: 'b5', userId: 'demo-user', title: 'TechCrunch', url: 'https://techcrunch.com/' },
  { id: 'l44', boardId: 'b5', userId: 'demo-user', title: 'Indie Hackers', url: 'https://www.indiehackers.com/' },
  { id: 'l45', boardId: 'b5', userId: 'demo-user', title: 'Startup ideas list', url: 'https://example.com/startup-ideas' },
  { id: 'l46', boardId: 'b5', userId: 'demo-user', title: 'Competitor research', url: 'https://example.com/competitor-research' },
  { id: 'l47', boardId: 'b5', userId: 'demo-user', title: 'Market analysis tools', url: 'https://example.com/market-tools' },
  { id: 'l48', boardId: 'b5', userId: 'demo-user', title: 'GTM guides', url: 'https://example.com/gtm-guides' },
  { id: 'l49', boardId: 'b5', userId: 'demo-user', title: 'Founder stories', url: 'https://example.com/founder-stories' },
  { id: 'l50', boardId: 'b5', userId: 'demo-user', title: 'Pitch deck examples', url: 'https://example.com/pitch-decks' },

  { id: 'l51', boardId: 'b6', userId: 'demo-user', title: 'Todoist', url: 'https://todoist.com/' },
  { id: 'l52', boardId: 'b6', userId: 'demo-user', title: 'Notion', url: 'https://www.notion.so/' },
  { id: 'l53', boardId: 'b6', userId: 'demo-user', title: 'Raycast', url: 'https://www.raycast.com/' },
  { id: 'l54', boardId: 'b6', userId: 'demo-user', title: 'Google Calendar tips', url: 'https://example.com/calendar-tips' },
  { id: 'l55', boardId: 'b6', userId: 'demo-user', title: 'Focus methods', url: 'https://example.com/focus-methods' },
  { id: 'l56', boardId: 'b6', userId: 'demo-user', title: 'Task batching guide', url: 'https://example.com/task-batching' },
  { id: 'l57', boardId: 'b6', userId: 'demo-user', title: 'Habit tracker tools', url: 'https://example.com/habit-tools' },
  { id: 'l58', boardId: 'b6', userId: 'demo-user', title: 'Workspace setup ideas', url: 'https://example.com/workspace-setup' },
  { id: 'l59', boardId: 'b6', userId: 'demo-user', title: 'Daily planning routine', url: 'https://example.com/daily-planning' },
  { id: 'l60', boardId: 'b6', userId: 'demo-user', title: 'Productivity stack', url: 'https://example.com/productivity-stack' },
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
    sourceUrl: row.source_url ?? row.sourceUrl ?? null,
    metadata: row.metadata || null,
    sourceType: row.source_type || null,
    createdAt: row.created_at,
  }
}

export function useLinks(boardId, options = {}) {
  const { userId, limit } = options
  const supabase = useSupabaseClient()
  const [links, setLinks] = useState(isDemoMode || !hasSupabaseConfig ? seedLinks : [])
  const [isLoading, setIsLoading] = useState(isDemoMode ? false : hasSupabaseConfig && Boolean(boardId))
  const [error, setError] = useState(null)

  const loadLinks = useCallback(async () => {
    if (isDemoMode || !supabase) {
      if (boardId) {
        setLinks(seedLinks.filter((link) => link.boardId === boardId))
      } else if (limit) {
        setLinks(seedLinks.slice(0, limit))
      } else {
        setLinks(seedLinks)
      }
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
        sourceUrl: payload.sourceUrl || null,
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
