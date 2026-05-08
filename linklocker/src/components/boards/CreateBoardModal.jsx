function CreateBoardModal({ open, onClose, onCreate, isSaving }) {
  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()

    if (!name) {
      return
    }

    await onCreate({
      name,
      description: String(formData.get('description') || '').trim(),
      isPublic: formData.get('isPublic') === 'on',
    })
  }

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/20 p-3 sm:items-center sm:p-4" role="dialog" aria-modal="true">
      <form className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-5" onSubmit={handleSubmit}>
        <h3 className="text-lg font-medium text-slate-900">Create Board</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">Keep it short. You can always refine it later.</p>
        <div className="mt-4 space-y-3">
          <input
            name="name"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
            placeholder="Board name"
          />
          <textarea
            name="description"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
            placeholder="Description"
            rows="3"
          />
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <input
            name="isPublic"
            type="checkbox"
          />
          Make public
        </label>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50" onClick={onClose}>
            Close
          </button>
          <button type="submit" className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBoardModal
