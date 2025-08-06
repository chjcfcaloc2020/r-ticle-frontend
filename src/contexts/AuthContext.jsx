import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const response = await api.get('/users/me')
          setUser(response.data)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        logout()
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password })
    localStorage.setItem('token', response.data.token)
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    setUser(response.data.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {/* {loading ? <div>Loading...</div> : children} */}
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
