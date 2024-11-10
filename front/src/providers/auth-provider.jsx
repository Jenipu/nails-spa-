import { useEffect, useState } from 'react'
import { AuthContext } from '../contexts/auth-context'
import { checkSession, loginRequest, logoutRequest, signupRequest } from '../api/auth.requests'
import Cookies from 'js-cookie'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const tokenInCookie = getTokenInCookie()
    if (tokenInCookie) {
      getAuthenticatedUser()
    }
  }, [])

  const getTokenInCookie = () => {
    return Cookies.get('token') != false
  }

  const getAuthenticatedUser = async () => {
    try {
      const userLoggedIn = await checkSession()
      setUser(userLoggedIn)
      setIsAuthenticated(true)

    } catch (error) {
      console.error(error.message)
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const signUp = async (user) => {
    try {
      const userLoggedIn = await signupRequest(user)
      setUser(userLoggedIn)
      setIsAuthenticated(true)

    } catch (error) {
      console.error(error)
      setError(error)
    }
  }

  const logIn = async (credentials) => {
    try {
      const user = await loginRequest(credentials)
      setUser(user)
      setIsAuthenticated(true)

    } catch (error) {
      console.error(error)
      setError(error.message)
    }
  }

  const logOut = async () => {
    try {
      await logoutRequest()
      setUser(null)
      setIsAuthenticated(false)

    } catch (error) {
      console.error(error)
      setError(error.message)
    }
  }

  return (
    <AuthContext.Provider value={ {
      user,
      isAuthenticated,
      error,
      signUp,
      logIn,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}