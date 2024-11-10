import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function RootLayout() {
  return (
    <>
      <Header />

      <main className='max-w-7xl mx-auto flex justify-center pt-8 px-5'>
        <Outlet />
      </main>
    </>
  )
}