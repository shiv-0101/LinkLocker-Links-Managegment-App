import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import LinkGrid from '../components/links/LinkGrid'
import { useAuth } from '../hooks/useAuth'
import { useBoards } from '../hooks/useBoards'
import { useLinks } from '../hooks/useLinks'

function BoardView() {
  const { id } = useParams()
  const { user } = useAuth()
  const { boards } = useBoards(user?.id)
  const { links } = useLinks(id)

  const board = useMemo(() => boards.find((item) => item.id === id), [boards, id])

  if (!board) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-medium text-slate-900">Board not found</h2>
        <p className="mt-2 text-sm text-slate-600">Try opening an existing board from Dashboard.</p>
      </section>
    )
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-medium text-slate-900">{board.name}</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">{board.description}</p>
          </div>
          <span className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
            {board.linkCount} links
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{board.isPublic ? 'Public' : 'Private'}</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">Board view</span>
        </div>
      </section>
      <section className="border-t border-slate-200/70 pt-6">
        <LinkGrid links={links} currentUserId={user?.id} />
      </section>
    </div>
  )
}

export default BoardView
