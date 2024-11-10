import { useForm, Controller } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { updateAppointment } from '../../api/appointments.requests'
import {DatePicker} from "@nextui-org/date-picker"
import {parseAbsoluteToLocal} from "@internationalized/date";

export default function AppointmentsEditPage() {
  const appointment = useLoaderData()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors }
  } = useForm({
    defaultValues: {
      date: parseAbsoluteToLocal(appointment.date),
      worker: appointment.services.worker.id,
      service: appointment.services.service.id
    }
  })

  const handleCancelClick = async () => {
    navigate('/dashboard/appointments')
  }

  const onSubmitForm = async (values) => {
    try {
      const formattedData = {
        date: values.date.toAbsoluteString(),
        worker_service_id: appointment.worker_service_id,
        client: appointment.client_id
      }

      await updateAppointment(appointment.id, formattedData)
      navigate('/dashboard/appointments')

    } catch (error) {
      console.error(error)
    }
  }

  if (!appointment) return <h5 className='font-medium text-2xl text-center text-gray-800'>No appointment found</h5>

  return (
    <form
      className='min-w-96 flex flex-col gap-8 bg-white p-5 rounded-md border shadow-md'
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <header className='w-full flex flex-col justify-center items-center'>
        <h4 className='w-full text-center text-3xl font-bold text-secondary'>Editar cita</h4>
        <p className='w-full text-center text-xl font-medium text-gray-400'>ID: { appointment.id }</p>
      </header>

      <main className='flex flex-col gap-4'>
        <div className='w-full flex flex-col gap-2'>
          <label
            className='w-full font-medium text-gray-800 text-sm'
            htmlFor="date"
            >
            Fecha de la cita
          </label>

          <div className="w-full flex flex-row gap-4">
            <Controller
              name="date"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  aria-label="Fecha de la cita"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </div>

          {formErrors.date && <p className='text-red-500 text-sm'>Error with date</p>}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label
            className='w-full font-medium text-gray-800 text-sm'
            htmlFor="worker"
            >
            Trabajador
          </label>

          <select
            className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
            {...register('worker', { required: 'Selecciona un trabajador'})}
          >
            <option value={ appointment.services.worker.id }>{ `${appointment.services.worker.name} - ${appointment.services.worker.id}` }</option>
          </select>

          { formErrors.worker && <p className='text-red-500 text-sm'>{formErrors.worker.message }</p>}

          {formErrors.worker && <p className='text-red-500 text-sm'>Error with worker</p>}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label
            className='w-full font-medium text-gray-800 text-sm'
            htmlFor="service"
            >
            Servicios
          </label>

          <select
            className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
            {...register('service', { required: 'Selecciona un servicio'})}
          >
            <option value={ appointment.services.service.id }>{ `${appointment.services.service.name} - ${appointment.services.service.id}` }</option>
          </select>

          { formErrors.service && <p className='text-red-500 text-sm'>{formErrors.service.message }</p>}
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