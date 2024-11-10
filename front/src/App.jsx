import { Route, Link, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/root-layout'
import LandingPage from './pages/landing'
import LoginPage from './pages/login'
import SignUpPage from './pages/sign-up'
import DashboardLayout from './layouts/dashboard-layout'
import UsersPage from './pages/dashboard/users'
import UsersEditPage from './pages/dashboard/users-edit'
import ServicesPage from './pages/dashboard/services'
import ServicesEditPage from './pages/dashboard/services-edit'
import AppointmentsPage from './pages/dashboard/appointments'
import AppointmentsEditPage from './pages/dashboard/appointments-edit'
import MyAppointmentsPage from './pages/dashboard/my-appointments'
import MyAppointmentsEditPage from './pages/dashboard/my-appointments-edit'
import { getUser } from './api/users.requests'
import { getService } from './api/services.requests'
import { getAppointment } from './api/appointments.requests'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<LandingPage /> } />
      <Route path='/login' element={<LoginPage /> } />
      <Route path='/signup' element={<SignUpPage /> } />

      <Route
        path='/dashboard'
        element={ <DashboardLayout /> }
        handle={ {
          crumb: () => <Link to="/dashboard">/</Link>
        }}
      >
        <Route
          path='/dashboard/users'
          element={<UsersPage /> }
          handle={{
            crumb: () => <Link to="/dashboard/users">Users</Link>
          }}
        />

        <Route
          path='/dashboard/users/:id'
          element={<UsersEditPage /> }
          loader={ async ({ params }) => {
            const userId = params.id
            try {
              const user = await getUser(userId)
              return user

            } catch (error) {
              console.error(error)
              return { id: userId}
            }
          }}
          handle={{
            crumb: (data) => <Link to="/dashboard/users">Users / { data.id }</Link>
          }}
        />

        <Route
          path='/dashboard/services'
          element={<ServicesPage /> }
          handle={{
            crumb: () => <Link to="/dashboard/services">Services</Link>
          }}
        />

        <Route
          path='/dashboard/services/:id'
          element={<ServicesEditPage /> }
          loader={ async ({ params }) => {
            const serviceId = params.id
            try {
              const service = await getService(serviceId)
              return service

            } catch (error) {
              console.error(error)
              return { id: serviceId }
            }
          }}
          handle={{
            crumb: (data) => <Link to="/dashboard/services">Services / { data.id }</Link>
          }}
        />

        <Route
          path='/dashboard/appointments'
          element={ <AppointmentsPage /> }
          handle={{
            crumb: () => <Link to="/dashboard/appointments">Appointments</Link>
          }}
        />

        <Route
          path='/dashboard/appointments/:id'
          element={<AppointmentsEditPage /> }
          loader={ async ({ params }) => {
            const appointmentId = params.id
            try {
              const appointment = await getAppointment(appointmentId)
              return appointment

            } catch (error) {
              console.error(error)
              return { id: appointmentId}
            }
          }}
          handle={{
            crumb: (data) => {
              return <Link to="/dashboard/appointments">Appointments / { data.id }</Link>
            }
          }}
        />

        <Route
          path='/dashboard/my-appointments'
          element={ <MyAppointmentsPage /> }
          handle={{
            crumb: () => <Link to="/dashboard/my-appointments">Mis citas</Link>
          }}
        />

        <Route
          path='/dashboard/my-appointments/:id'
          element={<MyAppointmentsEditPage /> }
          loader={ async ({ params }) => {
            const appointmentId = params.id
            try {
              const appointment = await getAppointment(appointmentId)
              return appointment

            } catch (error) {
              console.error(error)
              return { id: appointmentId}
            }
          }}
          handle={{
            crumb: (data) => {
              return <Link to="/dashboard/my-appointments">Mis citas / { data.id }</Link>
            }
          }}
        />


      </Route>
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={ router } />
  )
}

export default App
