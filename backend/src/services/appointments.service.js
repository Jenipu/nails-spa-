import { AppointmentModel } from '../my-models/index.js'

const getAppointmentsList = async (findOptions = {}) => {
  try {
    const appointmentsList = await AppointmentModel.findAll(findOptions)

    return appointmentsList

  } catch (error) {
    throw new Error('[APPOINMENTS SERVICE] getAppointmentsList Error ', error)
  }
}

const createAppointment = async (newAppointment) => {
  try {
    const createdAppointment = await AppointmentModel.create(newAppointment)

    return createdAppointment

  } catch (error) {
    throw new Error('[APPOINMENTS SERVICE] createAppointment Error ', error)
  }
}

const getAppointmentByPk = async (appointmentId, options = {}) => {
  try {
    const appointmentsList = await AppointmentModel.findByPk(appointmentId, options)

    return appointmentsList

  } catch (error) {
    throw new Error('[APPOINMENTS SERVICE] getAppointmentByPk Error ', error)
  }
}

const getAppointmentsByConditions = async (conditions = {}) => {
  try {
    const associetionWithConditionsFound = AppointmentModel.findAll(conditions)

    if (!associetionWithConditionsFound) return null

    return associetionWithConditionsFound

  } catch (error) {
    throw new Error('[APPOINMENTS SERVICE] getAppointmentsByProps Error ', error)
  }
}

export default {
  getAppointmentsList,
  getAppointmentByPk,
  getAppointmentsByConditions,
  createAppointment,
}