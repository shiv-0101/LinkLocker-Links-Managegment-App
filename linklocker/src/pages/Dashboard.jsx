import { useState } from 'react'
import BoardGrid from '../components/boards/BoardGrid'
import CreateBoardModal from '../components/boards/CreateBoardModal'
import QuickAddBar from '../components/links/QuickAddBar'
import { useAuth } from '../hooks/useAuth'
import { useBoards } from '../hooks/useBoards'
import { useLinks } from '../hooks/useLinks'

function Dashboard() {
  const { user } = useAuth()
  const {
    ownedBoards,
    createBoard,
    updateBoard,
    deleteBoard,
    isLoading: boardsLoading,
    error: boardsError,
  } = useBoards(user?.id)
  const { addLink } = useLinks()
  const { links: recentLinks } = useLinks(undefined, { userId: user?.id, limit: 5 })
  const [isCreatingBoard, setIsCreatingBoard] = useState(false)
  const [isSavingBoard, setIsSavingBoard] = useState(false)
  const [isUpdatingBoard, setIsUpdatingBoard] = useState(false)
  const [actionMessage, setActionMessage] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  async function handleQuickAdd({ title, url, boardId }) {
    try {
      await addLink({
        title: title || url,
        url,
        boardId,
        userId: user?.id || 'unknown-user',
      })
      setActionMessage('Link saved to your board.')
    } catch (error) {
      setActionMessage(error.message || 'Could not save the link right now.')
    }
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

  async function handleCreateBoard(payload) {
    if (!user?.id) {
      return
    }

    setIsSavingBoard(true)
    setActionMessage('')
    try {
      await createBoard({ ...payload, userId: user.id })
      setActionMessage('Board created successfully.')
      setIsCreateModalOpen(false)
    } catch (error) {
      setActionMessage(error.message || 'Could not create board right now.')
    } finally {
      setIsSavingBoard(false)
    }
  }

  async function handleToggleVisibility(board) {
    setIsUpdatingBoard(true)
    setActionMessage('')
    try {
      await updateBoard(board.id, { isPublic: !board.isPublic })
      setActionMessage(`Board is now ${board.isPublic ? 'private' : 'public'}.`)
    } catch (error) {
      setActionMessage(error.message || 'Could not update board visibility right now.')
    } finally {
      setIsUpdatingBoard(false)
    }
  }

  async function handleDeleteBoard(board) {
    const confirmed = window.confirm(`Delete "${board.name}" and all its links?`)
    if (!confirmed) {
      return
    }

    setIsUpdatingBoard(true)
    setActionMessage('')
    try {
      await deleteBoard(board.id)
      setActionMessage('Board deleted successfully.')
    } catch (error) {
      setActionMessage(error.message || 'Could not delete board right now.')
    } finally {
      setIsUpdatingBoard(false)
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
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">My Boards</h2>
            <p className="mt-1 text-sm text-slate-600">Keep boards structured and easy to scan.</p>
          </div>
          <button
            type="button"
            className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Board
          </button>
        </div>
        <BoardGrid
          boards={ownedBoards}
          onToggleVisibility={handleToggleVisibility}
          onDelete={handleDeleteBoard}
          isUpdating={isUpdatingBoard}
        />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Recent Links</h2>
        <p className="mt-1 text-sm text-slate-600">Your latest saved links across all boards.</p>

        {recentLinks.length ? (
          <ul className="mt-4 space-y-2">
            {recentLinks.map((link) => (
              <li key={link.id} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="truncate text-sm font-semibold text-slate-900">{link.title}</p>
                <a className="truncate text-sm text-blue-700 hover:text-blue-800" href={link.url} target="_blank" rel="noreferrer">
                  {link.url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-slate-500">No links saved yet.</p>
        )}
      </section>

      <CreateBoardModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateBoard}
        isSaving={isSavingBoard}
      />
    </div>
  )
}

export default Dashboard
