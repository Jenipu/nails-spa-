import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { updateService } from '../../api/services.requests'

export default function ServicesEditPage() {
  const service = useLoaderData()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm({
    defaultValues: {
      name: service.name,
      description: service.description,
      imageUrl: service.imageUrl
    }
  })

  const handleCancelClick = async () => {
    navigate('/dashboard/services')
  }

  const onSubmitForm = async (values) => {
    try {
      const formattedNewData = {
        ...values,
        name: values.name.toUpperCase()
      }

      await updateService(service.id, formattedNewData)
      navigate('/dashboard/services')

    } catch (error) {
      console.error(error)
    }
  }

  if (!service) return <h5 className='font-medium text-2xl text-center text-gray-800'>No service found</h5>

  return (
    <form
      className='min-w-96 flex flex-col gap-8 bg-white p-5 rounded-md border shadow-md'
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <header className='w-full flex flex-col justify-center items-center'>
        <h4 className='w-full text-center text-3xl font-bold text-secondary'>Editar servicio</h4>
        <p className='w-full text-center text-xl font-medium text-gray-400'>ID: { service.id }</p>
      </header>

      <main className='flex flex-col gap-4'>
        <div className='w-full flex flex-col gap-2'>
          <label
            className='w-full font-medium text-gray-800 text-sm'
            htmlFor="email"
            >
            Nombre del servicio (Titulo)
          </label>

          <input
            className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 uppercase'
            type="text"
            placeholder='Nombre del servicio'
            {...register('name', { required: true})}
          />

          {formErrors.name && <p className='text-red-500 text-sm'>Error with service name</p>}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label
            className='w-full font-medium text-gray-800 text-sm'
            htmlFor="description"
            >
            Descripción
          </label>

          <textarea
            className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
            rows="4"
            placeholder='Descripción del servicio'
            {...register('description', { required: true})}
          ></textarea>

          {formErrors.email && <p className='text-red-500 text-sm'>Error with description</p>}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label
            className='w-full font-medium text-gray-800 text-sm'
            htmlFor="imageUrl"
            >
            URL de la imagen
          </label>

          <input
            className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 resize-none'
            type="text"
            placeholder='Ej: https://i.pinimg.com/564x/64/c9/6c/64c96ce9c3ca7ac2104c753cada67019.jpg'
            {...register('imageUrl', { required: true})}
          />

          {formErrors.email && <p className='text-red-500 text-sm'>Error with image URL</p>}
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