import { useEffect, useState } from 'react'
import { getServices } from '../../api/services.requests'
import { Link } from 'react-router-dom'

export default function ServicesPage() {
  const [services, setServices] = useState([])

  useEffect(() => {
    if (services.length === 0) {
      fetchServices()
    }
  }, [])

  const fetchServices = async () => {
    try {
      const services = await getServices()
      setServices(services)

    } catch (error) {
      console.error(error)
      setServices([])
    }
  }

  if (services.length === 0) return <h5 className='font-medium text-2xl text-center text-gray-800'>No services found</h5>

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          { services.map((service) => {
            return (
              <tr
                key={service.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {service.id}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {service.name}
                </th>
                <td className="px-6 py-4">
                  {service.description}
                </td>
                <td className="px-6 py-4">
                  <img src={service.imageUrl} alt={`${service.name} image`} />
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={ `/dashboard/services/${service.id}` }
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}