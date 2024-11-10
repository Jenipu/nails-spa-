import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// const isCheckingSession = false
// const isAuthenticated = false
// const logOut = () => {console.log('LOG OUT')}

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logOut } = useAuth()

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState)
  }

  const handleClick = () => {
    logOut()
  }

  return (
    <div className='w-full max-h-20 flex justify-between items-center py-3 px-3 md:px-11 sticky top-0 bg-white border-gray-200'>
      <div className='w-36 h-full overflow-hidden'>
        <img className='w-full h-full object-cover' src='/img/logo.jpg' alt="Nails Spa logo" />
      </div>

      <div className={'bg-slate-100 md:bg-white gap-8 absolute top-full left-0 w-10/12 shadow-md md:relative md:top-0 md:left-auto md:flex md:h-full md:shadow-none md:justify-end md:items-center ' + (isOpen ? 'flex' : 'hidden')}>
        <nav className='flex gap-4 flex-col h-[100vh] p-3 md:flex-row md:h-full [&>*]w-full [&>*]:font-medium [&>*]:text-secondary [&>*]:rounded-lg [&>*]:px-2 [&>*]:py-1 [&>*:hover]:bg-secondary [&>*:hover]:text-center [&>*:hover]:text-white'>
          <Link to='/' onClick={toggleMenu}>Home</Link>

          {isAuthenticated && (
            <Link
              to='/dashboard/appointments'
            >
              Citas
            </Link>
          )}
        </nav>

        {!isAuthenticated &&
          (<Link
            className="rounded-lg bg-primary text-secondary border border-primary py-2 px-5 font-medium hover:bg-secondary hover:text-white"
            to='/login'
          >
            Iniciar sesión
          </Link>
          )}

        {isAuthenticated &&
          (<button
            className="rounded-lg bg-primary text-secondary border border-primary py-2 px-5 font-medium hover:bg-secondary hover:text-white"
            onClick={handleClick}
          >
            Cerrar sesión
          </button>
          )}

      </div>
    </div>
  )
}

export default Header