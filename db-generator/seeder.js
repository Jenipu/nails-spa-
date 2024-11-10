import { NODE_ENV } from '../src/app-config.js'
import { logError, logSuccess } from '../src/libs/functions.js'
import { AppointmentModel, ServiceModel, WorkerServicesModel } from '../src/my-models/index.js'
import userService from '../src/services/user.service.js'

const seedDemoUser = async () => {
  try {
    const demoUser = {
      name: 'test',
      email: 'test@mail.com',
      password: 'test123@',
      rol: 'ADMIN'
    }

    const userCreated = await userService.createUser(demoUser)
    return userCreated

  } catch (error) {
    console.log(error)
    // throw new Error(error)
  }
}

const seedDemoService = async () => {
  try {
    const demoService = {
      name: "MANICURE",
      description: "La manicura, maniquiur, manicure, o manicur, es un método de cuidado, pintura y embellecimiento para las uñas y manos que suele realizarse en casa o en un salón de belleza.",
      imageUrl: "https://i.pinimg.com/564x/64/c9/6c/64c96ce9c3ca7ac2104c753cada67019.jpg",
    }

    const demoServiceCreated = await ServiceModel.create(demoService)
    return demoServiceCreated

  } catch (error) {
    throw new Error(error)
  }
}

const seedDemoWorkerService = async (workderId, serviceId) => {
  try {
    const workerServiceDemoCreated = await WorkerServicesModel.create({
      worker_id: workderId,
      service_id: serviceId
    })

    return workerServiceDemoCreated

  } catch (error) {
    throw new Error(error)
  }
}

const seedDemoAppointment = async (clientId, workerServiceId) => {
  try {
    const appointmetDemoCreated = await AppointmentModel.create({
      date: "2024-11-07T15:00:13.189Z",
      worker_service_id: workerServiceId,
      client_id: clientId
    })

    return appointmetDemoCreated

  } catch (error) {
    throw new Error(error)
  }
}

async function seedDemoData() {
  try {

    const demoUserCreated = await seedDemoUser()
    if (demoUserCreated) {
      logSuccess('Demo user created!.')
    }

    const demoServiceCreated = await seedDemoService()
    if (demoServiceCreated) {
      logSuccess('Demo service created!.')
    }

    const demoWorkerServiceCreated = await seedDemoWorkerService(demoUserCreated.id, demoServiceCreated.id)
    if (demoWorkerServiceCreated) {
      logSuccess('Demo worker-service created!.')
    }

    const demoAppointmentCreated = await seedDemoAppointment(demoUserCreated.id, demoWorkerServiceCreated.id)
    if (demoAppointmentCreated) {
      logSuccess('Demo appointment created!.')
    }

    logSuccess('Seed demo data has finished!.')

  } catch (error) {
    console.error(error)
    throw new Error({ cause: 'Seed demo data', message: error.original.sqlMessage })
  }
}

try {
  seedDemoData()
} catch (error) {
  console.log("ERROR SEEDING DATA")
  console.log(error)
}