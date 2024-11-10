import { logError } from '../libs/functions.js'
import AppointmentModel from '../my-models/appointment.model.js'
import { AppointmentsService } from '../services/index.js'

export const getAppointments = async (req, res) => {
  try {
    const { default: userModel } = await import('../my-models/user.model.js')
    const { default: workerServiceModel } = await import('../my-models/worker_services.model.js')
    const { default: serviceModel } = await import('../my-models/service.model.js')

    const findOptions = {
      include: [
        {
          model: userModel,
          as: 'client',
          attributes: {
            exclude: ['password']
          }
        },
        {
          model: workerServiceModel,
          as: 'services',
          include: {
            model: serviceModel,
            as: 'service'
          }
        }
      ]
    }

    const appointments = await AppointmentsService.getAppointmentsList(findOptions)
    res.json({status: "success", data: appointments})

  } catch (error) {
    logError(JSON.stringify(error))
    return res.status(500).json({ status: "error", error: {code: '48e2b025-2b03-47f1-9898-1ee1b54e5a29', message: 'Internal server error!.' } })
  }
}

export const getAppointment = async (req, res) => {
  const { id } = req.params

  const { default: userModel } = await import('../my-models/user.model.js')
  const { default: workerServiceModel } = await import('../my-models/worker_services.model.js')
  const { default: serviceModel } = await import('../my-models/service.model.js')

  const findOptions = {
    include: [
      {
        model: userModel,
        as: 'client',
        attributes: {
          exclude: ['password']
        }
      },
      {
        model: workerServiceModel,
        as: 'services',
        include: [
          {
            model: userModel,
            as: 'worker'
          },
          {
            model: serviceModel,
            as: 'service'
          }
        ]
      }
    ]
  }
  const appointmentFound = await AppointmentsService.getAppointmentByPk(id, findOptions)

  if (!appointmentFound) {
    return res.status(404).json({message: 'Appointment not found!'})
  }

  res.json({data: appointmentFound})
}

export const createAppointment = async (req, res) => {
  try {
    const { body } = req

    const createdAppointment = await AppointmentsService.createAppointment(body)

    res.json({ status: "success", data: createdAppointment })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      error: {
        code: "cdfc923d-3b6d-46d3-a8e7-f4790e36cf31",
        message: 'Internal server error!.'
      }
    })
  }
}

export const updateAppointment = async (req, res) => {
  try {
    const { body, params } = req
    const { id } = params

    const appointmentFound = await AppointmentModel.findByPk(id)

    if (!appointmentFound) {
      return res.status(404).json({
        message: 'No appointment found!.'
      })
    }

    const updatedAppointment = await appointmentFound.update(body)

    res.json({data: updatedAppointment})

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error!.'
    })
  }
}

export const deleteAppointment = async (req, res) => {
  res.json({data: 'deleteAppointment'})
}

export const removeAppointment = async (req, res) => {
  try {
    const { id } = req.params

    const appointmentFound = await AppointmentModel.findByPk(id)

    if (!appointmentFound) {
      return res.status(404).json({
        message: 'No appointment found!.'
      })
    }

    await appointmentFound.destroy()

    res.json({message: 'Appointment removed!.'})
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error!.'
    })
  }
}