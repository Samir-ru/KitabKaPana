import { useState, useEffect } from 'react';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [kitabs, setKitabs] = useState([]);
  const [newKitab, setNewKitab] = useState({ name: '', description: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch users and kitabs
  useEffect(() => {
    fetchUsers();
    fetchKitabs();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        credentials: 'include'
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  }

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

  async function handleRoleChange(userId, newRole) {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role: newRole })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      setMessage('User role updated successfully');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleCreateKitab(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/kitabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newKitab)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setKitabs([...kitabs, data]);
      setNewKitab({ name: '', description: '' });
      setMessage('Kitab created successfully');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {error && (
          <div className="bg-red-900/10 border border-red-900/50 text-red-400 px-4 py-2 rounded">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-900/10 border border-green-900/50 text-green-400 px-4 py-2 rounded">
            {message}
          </div>
        )}

        {/* User Management */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {users.map(user => (
                  <tr key={user._id} className="hover:bg-zinc-900/50">
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.phone}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Create Kitab */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Create New Kitab</h2>
          <form onSubmit={handleCreateKitab} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={newKitab.name}
                onChange={(e) => setNewKitab({ ...newKitab, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800/50 focus:outline-none focus:border-zinc-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={newKitab.description}
                onChange={(e) => setNewKitab({ ...newKitab, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800/50 focus:outline-none focus:border-zinc-600"
                rows="3"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors"
            >
              Create Kitab
            </button>
          </form>
        </section>

        {/* Kitab List */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Existing Kitabs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kitabs.map(kitab => (
              <div key={kitab._id} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                <h3 className="font-semibold">{kitab.name}</h3>
                <p className="text-zinc-400 text-sm mt-2">{kitab.description}</p>
                <p className="text-zinc-500 text-xs mt-2">Slug: {kitab.slug}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;