import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { ROLES } from '../../libs/constants'
import { updateUser } from '../../api/users.requests'

export default function UsersEditPage() {
  const user = useLoaderData()
  const navigate = useNavigate()
  const { register,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      rol: user.rol
    }
  })

  const handleCancelClick = async () => {
    navigate('/dashboard/users')
  }

  const onSubmitForm = async (values) => {
    try {
      await updateUser(user.id, values)
      navigate('/dashboard/users')

    } catch (error) {
      console.error(error)
    }
  }

  if (!user) return <h5 className='font-medium text-2xl text-center text-gray-800'>No user found</h5>

  return (
    <form
      className='min-w-96 flex flex-col gap-8 bg-white p-5 rounded-md border shadow-md'
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <header className='w-full flex flex-col justify-center items-center'>
        <h4 className='w-full text-center text-3xl font-bold text-secondary'>Editar usuario</h4>
        <p className='w-full text-center text-xl font-medium text-gray-400'>ID: { user.id }</p>
      </header>

      <main className='flex flex-col gap-4'>
        <div className='w-full flex flex-col gap-2'>
          <label
            className='w-full font-medium text-gray-800 text-sm'
            htmlFor="name"
            >
            Nombre completo
          </label>

          <input
            className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
            type="text"
            placeholder='Nombre completo'
            {...register('name', { required: true})}
          />

          {formErrors.name && <p className='text-red-500 text-sm'>Error with name</p>}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label
            className='w-full font-medium text-gray-800 text-sm'
            htmlFor="email"
            >
            Correo electrónico
          </label>

          <input
            className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
            type="email"
            placeholder='E-mail'
            {...register('email', { required: true})}
          />

          {formErrors.email && <p className='text-red-500 text-sm'>Error with email</p>}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label
            className='w-full font-medium text-gray-800 text-sm'
            htmlFor="password"
            >
            Rol del usuario
          </label>

          <select
            className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
            {...register('rol', { required: 'Selecciona un rol'})}
          >
            <option value=""></option>
            { Object.keys(ROLES).map((role, index) => {
              return <option key={index} value={ role }>{ role }</option>
            })}
          </select>

          { formErrors.rol && <p className='text-red-500 text-sm'>{formErrors.rol.message }</p>}
        </div>
      </main>

      <footer className='w-full flex gap-6'>
        <button
          className='w-full px-4 py-2 rounded-lg bg-error text-center text-white font-medium hover:opacity-80'
          type='button'
          onClick={handleCancelClick}
        >
          Cancelar
        </button>

        <button
          className='w-full px-4 py-2 rounded-lg bg-secondary text-center text-white font-medium hover:opacity-80 disabled:opacity-50'
          type='submit'
        >
          Guardar cambios
        </button>
      </footer>
    </form>
  )
}