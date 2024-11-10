import { ServicesListItem } from './services-list-item'

export function ServicesList({data}) {

  return (
    <ul className='w-full grid grid-cols-1 gap-4 md:grid-cols-4'>
      {data.length > 0 && data.map((service) => (
        <ServicesListItem key={service.id} service={ service } />
      ))}
    </ul>
  )
}