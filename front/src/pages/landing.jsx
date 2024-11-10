import { useEffect, useState } from 'react'
import { ServicesList } from '../components/services/services-list'
import { getServices } from '../api/services.requests'

export default function LandingPage() {
  const [services, setServices] = useState([])

  useEffect(() => {
    getServicesList()
  }, [])

  const getServicesList = async () => {
    try {
      const services = await getServices()
      setServices(services)

    } catch (error) {
      console.error(error)
      setServices([])
    }
  }

  return (
    <section className='w-full'>
      <h1 className='font-bold text-3xl text-center mb-8 text-gray-800'>Nuestros servicios</h1>

      <ServicesList data={services} />
    </section>
  )
}