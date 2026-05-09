import { useMemo, useState } from 'react'
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
  const [boardSearch, setBoardSearch] = useState('')

  async function handleQuickAdd({ title, url, sourceUrl, boardId }) {
    try {
      await addLink({
        title: title || url,
        url,
        sourceUrl: sourceUrl?.trim() || null,
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
  const filteredBoards = useMemo(() => {
    const search = boardSearch.trim().toLowerCase()
    if (!search) {
      return ownedBoards
    }

    return ownedBoards.filter((board) => {
      const name = board.name?.toLowerCase() || ''
      const description = board.description?.toLowerCase() || ''
      return name.includes(search) || description.includes(search)
    })
  }, [boardSearch, ownedBoards])

  return (
    <div className="space-y-8">
      <section className="space-y-2 border-b border-slate-200/70 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Dashboard</p>
        <h1 className="text-2xl font-medium text-slate-900">Your saved links</h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Keep quick add close, keep boards simple, and keep everything easy to scan.
        </p>
      </section>

      {boardsError ? (
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Database sync error: {boardsError}
        </section>
      ) : null}

      {boardsLoading ? (
        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">Loading your boards...</p>
        </section>
      ) : null}

      {actionMessage ? (
        <section className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
          {actionMessage}
        </section>
      ) : null}

      {!boardsLoading ? (
        hasBoards ? (
          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <QuickAddBar boards={ownedBoards} onSave={handleQuickAdd} onCreateBoard={() => setIsCreateModalOpen(true)} />
          </section>
        ) : (
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-medium text-slate-900">Create your first board</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Add one board to unlock fast saving and keep the app organized from the start.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleCreateStarterBoard}
              disabled={isCreatingBoard || boardsLoading}
            >
              {isCreatingBoard ? 'Creating board...' : 'Create my first board'}
            </button>
          </section>
        )
      ) : null}

      <section className="space-y-4 border-b border-slate-200/70 pb-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-medium text-slate-900">My Boards</h2>
            <p className="mt-1 text-sm text-slate-600">Readable, simple, and quick to scan.</p>
          </div>
          <button
            type="button"
            className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Board
          </button>
        </div>
        <input
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-400"
          placeholder="Search boards by name or description"
          value={boardSearch}
          onChange={(event) => setBoardSearch(event.target.value)}
        />
        <BoardGrid
          boards={filteredBoards}
          onToggleVisibility={handleToggleVisibility}
          onDelete={handleDeleteBoard}
          isUpdating={isUpdatingBoard}
        />
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-medium text-slate-900">Recent Links</h2>
          <p className="mt-1 text-sm text-slate-600">Your latest saved links across all boards.</p>
        </div>

        {recentLinks.length ? (
          <ul className="space-y-2">
            {recentLinks.map((link) => (
              <li key={link.id} className="border-b border-slate-200 px-1 py-3 last:border-b-0">
                <p className="truncate text-sm font-medium text-slate-900">{link.title}</p>
                <a className="truncate text-sm text-slate-500" href={link.url} target="_blank" rel="noreferrer">
                  {link.url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">No links saved yet.</p>
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
