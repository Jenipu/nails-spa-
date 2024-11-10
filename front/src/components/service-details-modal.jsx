import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import { useForm, Controller } from 'react-hook-form'
import { createServiceRating } from '../api/services.requests'


export function ServiceDetailsModal({service, isOpen, onClose, onOpenChange}) {
  const ratingStyles = {
    itemShapes: ThinRoundedStar,
    activeFillColor: '#f59e0b',
    inactiveFillColor: '#ffedd5'
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors }
  } = useForm({
    defaultValues: {
      rating: 5
    }
  })

  const onSubmitForm = async (values) => {
    try {
      await createServiceRating(service.id, values)
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{ service.name }</ModalHeader>

            <ModalBody>
              <div className='w-full'>
                <img className='w-full aspect-video object-contain' src={ service.imageUrl } />
              </div>

              <main className='w-full p-4 mb-2'>
                <div className='w-full flex justify-center mb-4'>
                  <Rating
                    style={{ display: 'flex', maxWidth: 120 }}
                    value={service.rating}
                    itemStyles={ratingStyles}
                    readOnly
                  />
                </div>

                <p className='w-full text-gray-500'>
                  {service.description}
                </p>
              </main>
            </ModalBody>

            <ModalFooter>
              <form
                className='w-full flex flex-col'
                onSubmit={handleSubmit(onSubmitForm)}
              >
                <main className='flex flex-col gap-4'>
                  <div className='w-full flex flex-col gap-2'>
                    <label
                      className='w-full font-medium text-gray-800 text-sm'
                      htmlFor="date"
                      >
                      Calificación
                    </label>

                      <div className="w-full flex flex-row gap-4">
                        <Controller
                          name="score"
                          control={control}
                          rules={{
                            validate: (rating) => rating > 0,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Rating
                              style={{ display: 'flex', maxWidth: 120 }}
                              itemStyles={ratingStyles}
                              isRequired
                              onBlur={onBlur}
                              onChange={onChange}
                              value={value}
                            />
                          )}
                        />
                      </div>

                    {formErrors.rating && <p className='text-red-500 text-sm'>Error with rating</p>}
                  </div>

                  <div className='w-full flex flex-col gap-2'>
                    <label
                      className='w-full font-medium text-gray-800 text-sm'
                      htmlFor="comment"
                      >
                      Comentario
                    </label>

                    <textarea
                      className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
                      rows="4"
                      placeholder='Descripción del servicio'
                      {...register('comment', { required: true})}
                    ></textarea>

                    {formErrors.comment && <p className='text-red-500 text-sm'>Error with worker</p>}
                  </div>
                </main>

                <footer className='w-full flex gap-6 mt-3'>
                  <button
                    className='w-full px-4 py-2 rounded-lg bg-secondary text-center text-white font-medium hover:opacity-80 disabled:opacity-50'
                    type='submit'
                  >
                    Calificar
                  </button>
                </footer>
              </form>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
