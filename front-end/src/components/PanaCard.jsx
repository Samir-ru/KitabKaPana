import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUpLong, faDownLong} from '@fortawesome/free-solid-svg-icons'

export default function PanaCard({ pana, onVote }) {
  return (
    <article className="bg-zinc-900/80 backdrop-blur-lg rounded-xl shadow-lg shadow-zinc-900/30 p-6 border border-zinc-800 mb-6 hover:border-zinc-700 transition-all">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <header className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-zinc-100 font-semibold border-2 border-zinc-700 shadow-inner">
                {pana.user.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-200">{pana.user}</div>
                <div className="text-xs text-zinc-400">{pana.forum}</div>
              </div>
            </div>
            <div className="text-xs text-zinc-500 font-medium">{pana.time}</div>
          </header>

          <div className="text-sm text-zinc-300 leading-relaxed">
            {pana.text}
          </div>
          
          <div className='flex gap-2 items-center mt-4'>
            <button 
              onClick={() => onVote(pana.id, +1)} 
              className='p-2 hover:bg-zinc-800 rounded-lg transition-colors duration-200'
            >
              <FontAwesomeIcon icon={faUpLong} className='text-zinc-400 hover:text-zinc-200'/>
            </button>
            <span className='text-zinc-400 font-medium'>{pana.votes}</span>
            <button 
              onClick={() => onVote(pana.id, -1)} 
              className='p-2 hover:bg-zinc-800 rounded-lg transition-colors duration-200'
            >
              <FontAwesomeIcon icon={faDownLong} className='text-zinc-400 hover:text-zinc-200'/>
            </button>            
          </div>
        </div>
      </div>
    </article>
  )
}