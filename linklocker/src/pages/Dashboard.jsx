import { useState } from 'react'
import BoardGrid from '../components/boards/BoardGrid'
import QuickAddBar from '../components/links/QuickAddBar'
import { useAuth } from '../hooks/useAuth'
import { useBoards } from '../hooks/useBoards'
import { useLinks } from '../hooks/useLinks'

function Dashboard() {
  const { user } = useAuth()
  const { ownedBoards, createBoard, isLoading: boardsLoading, error: boardsError } = useBoards(user?.id)
  const { addLink } = useLinks()
  const [isCreatingBoard, setIsCreatingBoard] = useState(false)
  const [actionMessage, setActionMessage] = useState('')

  async function handleQuickAdd({ title, url, boardId }) {
    await addLink({
      title: title || url,
      url,
      boardId,
      userId: user?.id || 'unknown-user',
    })
    setActionMessage('Link saved to your board.')
  }

  async function handleCreateStarterBoard() {
    if (!user?.id) {
      return
    }

    setIsCreatingBoard(true)
    setActionMessage('')

    try {
      await createBoard({
        name: `${user.firstName || 'My'} First Board`,
        description: 'A starter board for links saved after signup.',
        isPublic: false,
        userId: user.id,
      })
      setActionMessage('Your first board is ready.')
    } catch (error) {
      setActionMessage(error.message || 'Could not create a board right now.')
    } finally {
      setIsCreatingBoard(false)
    }
  }

  const hasBoards = ownedBoards.length > 0

  return (
    <div className="space-y-8">
      {boardsError ? (
        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          Database sync error: {boardsError}
        </section>
      ) : null}

      {boardsLoading ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">Loading your boards...</p>
        </section>
      ) : null}

      {actionMessage ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
          {actionMessage}
        </section>
      ) : null}

      {!boardsLoading ? (
        hasBoards ? (
          <QuickAddBar boards={ownedBoards} onSave={handleQuickAdd} />
        ) : (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Welcome to LinkLocker</h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Create your first board so you can finish sign-up and start saving links in the right place.
              </p>
            </div>
            <button
              type="button"
              className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleCreateStarterBoard}
              disabled={isCreatingBoard || boardsLoading}
            >
              {isCreatingBoard ? 'Creating board...' : 'Create my first board'}
            </button>
          </section>
        )
      ) : null}

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">My Boards</h2>
          <p className="mt-1 text-sm text-slate-600">Keep boards structured and easy to scan.</p>
        </div>
        <BoardGrid boards={ownedBoards} />
      </section>
    </div>
  )
}

export default Dashboard
