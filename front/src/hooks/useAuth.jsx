import { useContext } from 'react'
import { AuthContext } from '../contexts/auth-context'

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("AuthContext must be used within an AuthProvider")
  }

  return context
}