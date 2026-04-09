function EditBoardModal({ open, onClose, board }) {
  if (!open || !board) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <h3 className="text-xl font-semibold text-slate-900">Edit Board</h3>
        <div className="mt-4 space-y-3">
          <input className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" defaultValue={board.name} />
          <textarea className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" defaultValue={board.description} rows="3" />
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <button type="button" className="inline-flex rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700">
            Delete
          </button>
          <div className="flex gap-2">
            <button type="button" className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditBoardModal
