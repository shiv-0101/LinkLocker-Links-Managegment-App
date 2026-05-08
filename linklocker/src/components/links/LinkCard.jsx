import { formatDate, formatDomain } from '../../utils/formatters'

function LinkCard({ link, canEdit }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4">
      <div className="space-y-2.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-medium leading-6 text-slate-900">{link.title}</h3>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-500">{formatDomain(link.url)}</span>
        </div>
        <a
          className="block truncate text-xs text-slate-500"
          href={link.url}
          target="_blank"
          rel="noreferrer"
          title={link.url}
        >
          {link.url}
        </a>
        <p className="text-xs text-slate-500">Saved on {formatDate(link.createdAt)}</p>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1">
        <a
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50"
          href={link.url}
          target="_blank"
          rel="noreferrer"
          title="Open link"
          aria-label="Open link"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </a>

        {canEdit ? (
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50"
            title="Edit link"
            aria-label="Edit link"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </button>
        ) : null}
      </div>
    </article>
  )
}

export default LinkCard
