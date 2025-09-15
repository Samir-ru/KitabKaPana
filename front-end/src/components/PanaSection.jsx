import React, {useState} from 'react'
import PostCard from '../components/PostCard'  // Add this import
import PanaCard from '../components/PanaCard'

export default function PanaSection() {
        const [isPostCardOpen, setIsPostCardOpen] = useState(false)
  const [selectedForum, setSelectedForum] = useState('Kitab — General')

    const [panas, setPanas] = useState([
    { id: 1, user: 'Aisha', text: 'Proposal: allocate 30 mins for breakout groups to collect priorities.', votes: 12, forum: 'Kitab — Planning', time: '2h' },
    { id: 2, user: 'Rohan', text: 'Please focus on accessibility — provide transcripts for sessions.', votes: 8, forum: 'Kitab — Resources', time: '4h' },
    { id: 3, user: 'Meera', text: 'I suggest a consensus on top 5 agenda items before voting.', votes: 5, forum: 'Kitab — General', time: '1d' },
    { id: 4, user: 'Sanjay', text: 'Volunteer signups should be made available online 48 hours before.', votes: 3, forum: 'Kitab — Events', time: '3d' },
  ])
      function handleVote(id, delta) {
    setPanas((prev) => prev.map(p => p.id === id ? { ...p, votes: p.votes + delta } : p))
  }


  // Modify createPana function to handle the new PostCard submission
  function createPana(text) {
    const nextId = panas.length ? Math.max(...panas.map(p => p.id)) + 1 : 1
    const newPana = {
      id: nextId,
      user: 'You',
      text,
      votes: 0,
      forum: selectedForum,
      time: 'now',
    }
    setPanas(prev => [newPana, ...prev])
  }

  // Modify the button click handler to open the PostCard
  const handlePostClick = (forumName) => {
    setSelectedForum(forumName)
    setIsPostCardOpen(true)
  }
  

  return (
    <div>
        <main className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-100 mb-1">Panas</h1>
              <p className="text-sm text-zinc-400">Recent posts from all Kitabs</p>
            </div>
            {/* Update the Post button in the middle section */}
            <button
              onClick={() => handlePostClick('Kitab — General')}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              Post
            </button>
          </div>

          <section className="space-y-4">
            {panas.map(p => (
              <PanaCard key={p.id} pana={p} onVote={handleVote} />
            ))}
          </section>
        </main>
              <PostCard 
        isOpen={isPostCardOpen}
        onClose={() => setIsPostCardOpen(false)}
        onSubmit={createPana}
        forumName={selectedForum}
      />
    </div>
  )
}
