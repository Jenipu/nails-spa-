import axiosInstance from './axios-instance'

const ENDPOINT = "/appointments"

export const getAppointments = async () => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT}`)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const getAppointment = async (appointmentId) => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT}/${appointmentId}`)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const createAppointment = async (data) => {
  try {
    const response = await axiosInstance.post(`${ENDPOINT}`, data)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const updateAppointment = async (appointmentId, newData) => {
  try {
    const response = await axiosInstance.patch(`${ENDPOINT}/${appointmentId}`, newData)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}