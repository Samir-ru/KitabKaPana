import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [kitabs, setKitabs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchKitabs();
  }, []);

  async function fetchKitabs() {
    try {
      const response = await fetch('http://localhost:5000/api/admin/kitabs', {
        credentials: 'include'
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setKitabs(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <aside className="w-64 bg-zinc-900/80 backdrop-blur-lg border-r border-zinc-800 h-screen fixed top-0 left-0 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-zinc-100 mb-4">Forums</h2>
        
        {error && (
          <div className="text-sm text-red-400 mb-4">
            {error}
          </div>
        )}

        <nav className="space-y-2">
          {kitabs.map(kitab => (
            <Link
              key={kitab._id}
              to={`/kitab/${kitab.slug}`}
              className="block px-3 py-2 rounded-lg text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              {kitab.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;