function EditLinkModal({ open, onClose, link }) {
  if (!open || !link) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/20 p-3 sm:items-center sm:p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-medium text-slate-900">Edit Link</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">Keep the title clear and the URL intact.</p>
        <div className="mt-4 space-y-3">
          <input className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400" defaultValue={link.title} />
          <input className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400" defaultValue={link.url} />
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <button type="button" className="inline-flex rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100">
            Delete
          </button>
          <div className="flex gap-2">
            <button type="button" className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditLinkModal
