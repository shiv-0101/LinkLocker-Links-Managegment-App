import { Link } from 'react-router-dom'

function BoardCard({ board }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">{board.name}</h3>
          <span className="inline-flex shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
            {board.isPublic ? 'Public' : 'Private'}
          </span>
        </div>
        <p className="text-sm leading-6 text-slate-600">{board.description}</p>
        <p className="text-sm font-medium text-slate-500">{board.linkCount} links</p>
      </div>
      <div className="mt-5 flex">
        <Link
          to={`/board/${board.id}`}
          className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Open Board
        </Link>
      </div>
    </article>
  )
}

export default BoardCard
