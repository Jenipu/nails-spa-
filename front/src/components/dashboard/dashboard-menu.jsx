import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROLES } from '../../libs/constants'

export function DashboardMenu() {
  const { user } = useAuth()

  return (
    <aside className='w-full flex flex-col'>
      <nav className='w-full flex flex-col gap-1 [&>*]:w-full [&>*]:text-left [&>*]:p-2 [&>*]:bg-primary [&>*]:rounded-md [&>*:hover]:opacity-80'>
        { user.rol === ROLES.ADMIN && (
          <>
            <Link to="/dashboard/users">
              Users
            </Link>

            <Link to="/dashboard/services">
              Services
            </Link>

            <Link to="/dashboard/appointments">
              Appointments
            </Link>
          </>
        )}

        <Link to="/dashboard/my-appointments">
          My Appointments
        </Link>
      </nav>
    </aside>
  )
}