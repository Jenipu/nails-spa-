import axiosInstance from './axios-instance'

const ENDPOINT = "/auth"

export const signupRequest = async (user) => {
  try {
    const response = await axiosInstance.post(`${ENDPOINT}/signup`, user)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const loginRequest = async (credentials) => {
  try {
    const response = await axiosInstance.post(`${ENDPOINT}/login`, credentials)

    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const logoutRequest = async (user) => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT}/logout`, user)
    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}

export const checkSession = async () => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT}/validate`)
    return response.data.data

  } catch (error) {
    throw new Error(error.response.data.error.message)
  }
}