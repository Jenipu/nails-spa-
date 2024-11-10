import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAppointments } from '../../api/appointments.requests'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { formatDate } from '../../libs/utils'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    if (appointments.length === 0) {
      getAllAppointments()
    }
  }, [])

  const getAllAppointments = async () => {
    try {
      const appointments = await getAppointments()
      setAppointments(appointments)
    } catch (error) {
      console.error(error)
      setAppointments([])
    }
  }

  if (appointments.length === 0) return <h5 className='font-medium text-2xl text-center text-gray-800'>No appointments found</h5>

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Servicio
            </th>
            <th scope="col" className="px-6 py-3">
              Cliente
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          { appointments.map((appointment) => {
            const dateFormatted = formatDate(parseAbsoluteToLocal(appointment.date).toDate())

            return (
              <tr
                key={appointment.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {appointment.id}
                </td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {dateFormatted}
                </td>
                <td className="px-6 py-4">
                  {appointment.services.service.name}
                </td>
                <td className="px-6 py-4">
                  {appointment.client.name}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={ `/dashboard/appointments/${appointment.id}` }
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