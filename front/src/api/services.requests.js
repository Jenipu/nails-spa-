import axiosInstance from './axios-instance'

const ENDPOINT = "/services"

export const getServices = async () => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT}`)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const getServicesToCreateAppointment = async () => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT}/for-appointment`)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const getService = async (serviceId) => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT}/${serviceId}`)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const updateService = async (serviceId, newData) => {
  try {
    const response = await axiosInstance.patch(`${ENDPOINT}/${serviceId}`, newData)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const createServiceRating = async (serviceId, ratingData) => {
  try {
    const response = await axiosInstance.post(`${ENDPOINT}/${serviceId}/ratings`, ratingData)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}