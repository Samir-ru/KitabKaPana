import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function validatePhone(p) {
    const digits = p.replace(/\D/g, '')
    return digits.length >= 7 && digits.length <= 15
  }

  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim()) {
      setError('Username is required')
      return
    }
    if (!validatePhone(phone)) {
      setError('Enter a valid phone number (7–15 digits)')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          phone,
          password
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      navigate('/home')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-lg rounded-xl shadow-lg shadow-zinc-900/30 p-8 border border-zinc-800 hover:border-zinc-700 transition-all">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-zinc-100">Create an account</h1>
          <p className="text-sm text-zinc-400 mt-1">Sign up to get started with KitabKaPana</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800/50 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800/50 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800/50 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition"
            />
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-900/10 border border-red-900/50 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium rounded-lg border border-zinc-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <footer className="mt-6 text-center text-sm text-zinc-400">
          <p>
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="font-medium text-zinc-300 hover:text-zinc-100 transition-colors">
              Sign in
            </button>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Signup