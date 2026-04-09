function CopyLinkModal({ open, board, onClose }) {
  if (!open || !board) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-slate-900">Save to My Board</h3>
          <p className="text-sm text-slate-600">Board: {board.name}</p>
        </div>
        <select className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" defaultValue="">
          <option value="" disabled>
            Select your board
          </option>
          <option value="learning">Learning</option>
          <option value="ui-inspiration">UI Inspiration</option>
          <option value="startup-research">Startup Research</option>
        </select>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            onClick={onClose}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CopyLinkModal
