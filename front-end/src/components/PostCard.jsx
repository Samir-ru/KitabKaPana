import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function PostCard({ isOpen, onClose, onSubmit, forumName }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit(text.trim())
    setText('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-lg bg-zinc-900 rounded-xl shadow-xl border border-zinc-800 animate-fadeIn">
        <header className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-100">Create New Pana</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="text-zinc-400 hover:text-zinc-200" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Posting in: <span className="text-zinc-300">{forumName}</span>
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-800/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-100 text-sm font-medium rounded-lg border border-zinc-700 transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}