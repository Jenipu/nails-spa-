import { useDisclosure } from '@nextui-org/react'
import { ServiceDetailsModal } from '../service-details-modal'

export function ServicesListItem({service}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  return (
    <>
      <ServiceDetailsModal service={ service } isOpen={ isOpen } onClose={ onClose } onOpenChange={onOpenChange} />

      <article className='bg-white border border-gray-200 rounded-lg shadow overflow-hidden'>
        <img className='w-full aspect-square' src={ service.imageUrl } />

        <main className='w-full p-4 mb-2'>
          <h4 className='font-bold text-gray-700 mb-3'>{service.name}</h4>

          <p className='w-full text-gray-500 line-clamp-2'>
            {service.description}
          </p>
        </main>

        <footer className='w-full flex justify-between px-4 pb-4'>
          <button
            className='bg-white border border-primary py-2 px-5 rounded-lg font-medium text-secondary hover:opacity-80'
            onClick={onOpen}
          >
            Ver más
          </button>

          <button className='bg-secondary border py-3 px-6 rounded-lg font-medium text-white hover:opacity-80'>
            Agendar cita
          </button>
        </footer>
      </article>
    </>
  )
}