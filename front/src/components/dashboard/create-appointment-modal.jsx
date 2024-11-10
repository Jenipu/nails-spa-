import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react'
import { DatePicker } from '@nextui-org/date-picker'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { now, getLocalTimeZone } from '@internationalized/date'
import { createAppointment } from '../../api/appointments.requests'
import { getServicesToCreateAppointment } from '../../api/services.requests'
import { useEffect, useState } from 'react'

export function CreateAppointmentModal({ isOpen, revalidate, onOpenChange }) {
  const [servicesOptions, setServicesOptions] = useState()
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors }
  } = useForm({
    defaultValues: {
      date: now(getLocalTimeZone())
    }
  })

  useEffect(() => {
    getServices()
  }, [])

  const getServices = async () => {
    try {
      const services = await getServicesToCreateAppointment()
      setServicesOptions(services)

    } catch (error) {
      console.error(error)
    }
  }

  const onSubmitForm = async (values) => {
    try {

      const formattedData = {
        date: values.date.toAbsoluteString(),
        worker_service_id: values.service,
        client_id: user.id
      }

      console.log(JSON.stringify(formattedData, 0, 2))

      await createAppointment(formattedData)
      revalidate()
    } catch (error) {
      console.error(error)
    }
  }

  return (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Crear cita</ModalHeader>

              <ModalBody>
                <form
                  className='min-w-96 flex flex-col gap-8 bg-white p-5 rounded-md'
                  onSubmit={handleSubmit(onSubmitForm)}
                >
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
                                defaultValue={now(getLocalTimeZone())}
                              />
                            )}
                          />
                        </div>

                      {/* {formErrors.date && <p className='text-red-500 text-sm'>Error with date</p>} */}
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
                        {...register('service', { required: 'Selecciona un trabajador'})}
                      >
                        {
                          servicesOptions.map((service) => {
                            const serviceName = service.service.name
                            return <option key={service.id} value={ service.id }>{ `${serviceName}` }</option>
                          })
                        }
                      </select>

                      {formErrors.worker && <p className='text-red-500 text-sm'>Error with worker</p>}
                    </div>
                  </main>

                  <footer className='w-full flex gap-6'>
                    <button
                      className='w-full px-4 py-2 rounded-lg bg-error text-center text-white font-medium hover:opacity-80'
                      type='button'
                      onClick={onClose}
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}