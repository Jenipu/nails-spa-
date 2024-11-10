import { useEffect, useState } from 'react'
import { getUsers } from '../../api/users.requests'
import { Link } from 'react-router-dom'

export default function UsersPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers()
    }
  }, [])

  const fetchUsers = async () => {
    try {
      const users = await getUsers()
      setUsers(users)

    } catch (error) {
      console.error(error)
      setUsers([])
    }
  }

  if (users.length === 0) return <h5 className='font-medium text-2xl text-center text-gray-800'>No users found</h5>

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
              email
            </th>
            <th scope="col" className="px-6 py-3">
              Rol
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          { users.map((user) => {
            return (
              <tr
                key={user.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.id}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.name}
                </th>
                <td className="px-6 py-4">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  {user.rol}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={ `/dashboard/users/${user.id}` }
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