import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import LinkGrid from '../components/links/LinkGrid'
import { useBoards } from '../hooks/useBoards'
import { useLinks } from '../hooks/useLinks'

function BoardView() {
  const { id } = useParams()
  const { boards } = useBoards()
  const { links } = useLinks(id)

  const board = useMemo(() => boards.find((item) => item.id === id), [boards, id])

  if (!board) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Board not found</h2>
        <p className="mt-2 text-sm text-slate-600">Try opening an existing board from Dashboard.</p>
      </section>
    )
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{board.name}</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">{board.description}</p>
          </div>
          <span className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            {board.isPublic ? 'Public' : 'Private'}
          </span>
        </div>
      </section>
      <LinkGrid links={links} />
    </div>
  )
}

export default BoardView
