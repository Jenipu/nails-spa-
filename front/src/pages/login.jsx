import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { ROLES } from '../libs/constants'

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm()
  const { user, logIn, isAuthenticated, error } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      if (user.rol === ROLES.ADMIN) return navigate('/dashboard/users')

      navigate('/dashboard/appointments')
    }
  }, [isAuthenticated])

  const onSubmitForm = async (values) => {
    await logIn(values)
  }

  return (
    <form
      className='min-w-96 flex flex-col gap-8 bg-white p-5 rounded-md border shadow-md'
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <header className='w-full flex flex-col justify-center items-center'>
        <h4 className='w-full text-center text-3xl font-bold text-secondary'>Inicio de sesión</h4>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </header>

      <main className='flex flex-col gap-4'>
        <div className='w-full flex flex-col gap-2'>
          <label
            className='w-full font-medium text-gray-800 text-sm'
            htmlFor="email"
          >
            Email address
          </label>

          <input
            className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
            type="email"
            placeholder='E-mail'
            {...register('email', { required: true })}
          />

          {formErrors.email && <p className='text-red-500 text-sm'>Error with email</p>}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label
            className='w-full font-medium text-gray-800 text-sm'
            htmlFor="password"
          >
            Password
          </label>

          <input
            className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
            type="password"
            placeholder='Password'
            {...register('password', { required: true })}
          />

          {formErrors.password && <p className='text-red-500 text-sm'>Error with password</p>}
        </div>
      </main>

      <footer className='w-full flex flex-col'>
        <p className='w-full text-sm text-gray-700 mb-6'>
          No tienes una cuenta?
          <Link className='text-sm text-blue-600' to='/signup'> Crear cuenta.</Link>
        </p>

        <button className='w-full px-4 py-2 rounded-lg bg-secondary text-center text-white font-medium hover:opacity-80'>Iniciar sessión</button>
      </footer>
    </form>
  )
}