import { Link } from 'react-router-dom'

function ButtonGlyph({ name, color }) {
  const stroke = color || 'currentColor'
  switch (name) {
    case 'open':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 7h10v10" stroke={stroke} />
          <path d="M7 17 17 7" stroke={stroke} />
        </svg>
      )
    case 'lock':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="10" width="14" height="10" rx="2" stroke={stroke} />
          <path d="M8 10V8a4 4 0 1 1 8 0v2" stroke={stroke} />
        </svg>
      )
    case 'unlock':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="10" width="14" height="10" rx="2" stroke={stroke} />
          <path d="M9 10V8a4 4 0 0 1 7.5-2" stroke={stroke} />
        </svg>
      )
    case 'trash':
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h16" stroke={stroke} />
          <path d="M9 7V5h6v2" stroke={stroke} />
          <path d="M8 7l1 12h6l1-12" stroke={stroke} />
          <path d="M10 11v5" stroke={stroke} />
          <path d="M14 11v5" stroke={stroke} />
        </svg>
      )
  }
}

function BoardCard({ board, onToggleVisibility, onDelete, isUpdating }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-slate-900">{board.name}</h3>
            <p className="text-sm text-slate-500">{board.linkCount} links</p>
          </div>
          <span className="inline-flex shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
            {board.isPublic ? 'Public' : 'Private'}
          </span>
        </div>
        <p className="text-sm leading-6 text-slate-600">{board.description}</p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="relative group">
          <Link
            to={`/board/${board.id}`}
            aria-label="Open board"
            className="inline-flex items-center justify-center rounded-md border border-slate-900 bg-slate-900 p-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            <ButtonGlyph name="open" color="#fff" />
          </Link>
          <span className="pointer-events-none absolute -bottom-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white shadow-sm group-hover:block">
            Open
          </span>
        </div>

        <div className="relative group">
          <button
            type="button"
            aria-label={board.isPublic ? 'Make private' : 'Make public'}
            className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => onToggleVisibility(board)}
            disabled={isUpdating}
          >
            <ButtonGlyph name={board.isPublic ? 'lock' : 'unlock'} />
          </button>
          <span className="pointer-events-none absolute -bottom-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white shadow-sm group-hover:block">
            {board.isPublic ? 'Make Private' : 'Make Public'}
          </span>
        </div>

        <div className="relative group">
          <button
            type="button"
            aria-label="Delete board"
            className="inline-flex items-center justify-center rounded-md border border-red-200 bg-red-50 p-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => onDelete(board)}
            disabled={isUpdating}
          >
            <ButtonGlyph name="trash" />
          </button>
          <span className="pointer-events-none absolute -bottom-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white shadow-sm group-hover:block">
            Delete
          </span>
        </div>
      </div>
    </article>
  )
}

export default BoardCard
