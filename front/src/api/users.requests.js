import axiosInstance from './axios-instance'

const ENDPOINT = "/users"

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT}`)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const getUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT}/${userId}`)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const getUserAppointments = async (user) => {
  try {
    const { id } = user
    const response = await axiosInstance.get(`${ENDPOINT}/${id}/appointments`)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const updateUser = async (userId, newData) => {
  try {
    const response = await axiosInstance.patch(`${ENDPOINT}/${userId}`, newData)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}