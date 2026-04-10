import { Link } from 'react-router-dom'

function BoardCard({ board, onToggleVisibility, onDelete, isUpdating }) {
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
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          to={`/board/${board.id}`}
          className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Open Board
        </Link>
        <button
          type="button"
          className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => onToggleVisibility(board)}
          disabled={isUpdating}
        >
          {board.isPublic ? 'Make Private' : 'Make Public'}
        </button>
        <button
          type="button"
          className="inline-flex rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => onDelete(board)}
          disabled={isUpdating}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default BoardCard
