import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-black">
          R-TICLE
        </Link>

        <nav className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/create-article" className="hover:underline">
                New Article
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
              <span className="font-medium">{user.username}</span>
            </>
          ) : (
            <Link to="/login" className="hover:underline text-black">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
