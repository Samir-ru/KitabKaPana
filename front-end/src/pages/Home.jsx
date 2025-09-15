import React, { useState } from 'react'

import PanaSection from '../components/PanaSection'

function Home() {
  const initialForums = [
    { id: 'k1', name: 'Kitab — Gen Z Agenda ' },
    { id: 'k2', name: 'Kitab — Planning' },
    { id: 'k3', name: 'Kitab — Events' },
    { id: 'k4', name: 'Kitab — Resources' },
    { id: 'k5', name: 'Kitab — Feedback' },
  ]

  const [forums] = useState(initialForums)






  const rightBullets = Array.from({ length: 20 }, (_, i) => `Bullet point ${i + 1}: Lorem ipsum dolor sit amet, consectetur.`)

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-7xl flex gap-6">
        {/* LEFT SIDEBAR */}
        <aside className="w-64 bg-zinc-900/80 backdrop-blur-lg rounded-xl shadow-lg shadow-zinc-900/30 p-4 border border-zinc-800">
          <header className="mb-4">
            <h2 className="text-lg font-semibold text-zinc-100">Kitabs</h2>
            <p className="text-xs text-zinc-400 mt-1">Forums & posting</p>
          </header>

          <nav className="space-y-3">
            {forums.map(f => (
              <div key={f.id} className="flex items-center justify-between rounded border border-zinc-700 p-3 hover:bg-zinc-800 transition-colors">
                <button className="text-sm text-zinc-300 text-left hover:text-zinc-100">
                  {f.name}
                </button>
              </div>
            ))}
          </nav>
        </aside>

            <PanaSection/>

        {/* RIGHT SIDEBAR */}
        <aside className="w-1/3 bg-zinc-900/80 backdrop-blur-lg rounded-xl shadow-lg shadow-zinc-900/30 p-6 border border-zinc-800">
          <header className="mb-6">
            <h2 className="text-lg font-semibold text-zinc-100">Kitab Overview</h2>
            <p className="text-sm text-zinc-400 mt-1">Unified agenda and key points</p>
          </header>

          <div className="mb-6 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
            <h3 className="font-medium text-zinc-200 mb-2">Today's Agenda</h3>
            <p className="text-sm text-zinc-400">Clear agenda points for large audience discussion and planning</p>
          </div>

          <div className="space-y-3">
            {rightBullets.map((bullet, idx) => (
              <div 
                key={idx} 
                className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50 hover:border-zinc-600 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-zinc-300 group-hover:bg-zinc-600 transition-colors">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {bullet}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <footer className="mt-6 pt-4 border-t border-zinc-800">
            <p className="text-xs text-zinc-500 text-center">
              Last updated: Today at 14:30
            </p>
          </footer>
        </aside>
      </div>
    </div>
  )
}

export default Home