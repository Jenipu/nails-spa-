import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { DashboardMenu } from '../components/dashboard/dashboard-menu'
import { Breadcrumbs } from '../components/dashboard/breadcrumbs'

export default function DashboardLayout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <section className='w-full grid grid-cols-[0.2fr,1fr] gap-5'>
      <DashboardMenu />

      <main className='flex-1'>
        <section className='w-full flex flex-col gap-5'>
          <Breadcrumbs/>

          <Outlet />
        </section>
      </main>
    </section>
  )
}