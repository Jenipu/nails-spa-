import { AuthProvider } from '../providers/auth-provider'
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }) {
  return (
    <AuthProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </AuthProvider>
  )
}