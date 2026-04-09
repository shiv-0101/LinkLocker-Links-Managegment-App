import { formatDate, formatDomain } from '../../utils/formatters'

function LinkCard({ link, canEdit }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold leading-7 text-slate-900">{link.title}</h3>
        <a
          className="block truncate text-sm text-blue-700 hover:text-blue-800"
          href={link.url}
          target="_blank"
          rel="noreferrer"
          title={link.url}
        >
          {link.url}
        </a>
        <div className="space-y-1 text-sm text-slate-500">
          <p>{formatDomain(link.url)}</p>
          <p>Saved on {formatDate(link.createdAt)}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-1.5">
        <a
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:bg-slate-50"
          href={link.url}
          target="_blank"
          rel="noreferrer"
          title="Open link"
          aria-label="Open link"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </a>

        {canEdit ? (
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:bg-slate-50"
            title="Edit link"
            aria-label="Edit link"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
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
