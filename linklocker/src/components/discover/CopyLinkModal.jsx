import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

function CopyLinkModal({
  open,
  board,
  sourceLinks,
  sourceLinksLoading,
  targetBoards,
  isAuthenticated,
  isSaving,
  onSave,
  onClose,
}) {
  const [selectedSourceLinkId, setSelectedSourceLinkId] = useState('')
  const [selectedTargetBoardId, setSelectedTargetBoardId] = useState('')

  const selectedSourceLink = useMemo(
    () => sourceLinks.find((link) => link.id === selectedSourceLinkId),
    [selectedSourceLinkId, sourceLinks],
  )

  function handleClose() {
    setSelectedSourceLinkId('')
    setSelectedTargetBoardId('')
    onClose()
  }

  async function handleSave() {
    if (!selectedSourceLink || !selectedTargetBoardId) {
      return
    }

    await onSave({
      sourceLink: selectedSourceLink,
      targetBoardId: selectedTargetBoardId,
    })

    setSelectedSourceLinkId('')
    setSelectedTargetBoardId('')
  }

  if (!open || !board) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/20 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-slate-900">Save to My Board</h3>
          <p className="text-sm text-slate-600">Board: {board.name}</p>
        </div>

        {!isAuthenticated ? (
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p>Sign in to copy links into your boards.</p>
            <Link to="/sign-in" className="mt-3 inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50" onClick={handleClose}>
              Go to Sign In
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <div className="space-y-1">
              <label className="text-sm text-slate-700">Choose a link from this board</label>
              <select
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
                value={selectedSourceLinkId}
                onChange={(event) => setSelectedSourceLinkId(event.target.value)}
                disabled={sourceLinksLoading || sourceLinks.length === 0}
              >
                <option value="" disabled>
                  {sourceLinksLoading ? 'Loading links...' : 'Select a link'}
                </option>
                {sourceLinks.map((link) => (
                  <option key={link.id} value={link.id}>
                    {link.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-700">Choose your destination board</label>
              <select
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
                value={selectedTargetBoardId}
                onChange={(event) => setSelectedTargetBoardId(event.target.value)}
                disabled={targetBoards.length === 0}
              >
                <option value="" disabled>
                  {targetBoards.length ? 'Select your board' : 'No personal boards found'}
                </option>
                {targetBoards.map((targetBoard) => (
                  <option key={targetBoard.id} value={targetBoard.id}>
                    {targetBoard.name}
                  </option>
                ))}
              </select>
            </div>

            {!sourceLinksLoading && sourceLinks.length === 0 ? (
              <p className="text-sm text-amber-700">This public board does not have links to copy yet.</p>
            ) : null}
            {targetBoards.length === 0 ? (
              <p className="text-sm text-slate-500">Create at least one board on Dashboard before copying links.</p>
            ) : null}
          </div>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            onClick={handleClose}
          >
            Cancel
          </button>
          {isAuthenticated ? (
            <button
              type="button"
              className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleSave}
              disabled={
                isSaving ||
                sourceLinksLoading ||
                !selectedSourceLinkId ||
                !selectedTargetBoardId ||
                sourceLinks.length === 0 ||
                targetBoards.length === 0
              }
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default CopyLinkModal
