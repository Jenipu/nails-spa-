import { hashPassword } from '../libs/security.js'
import UserModel from '../my-models/user.model.js'

const getUsersList = async (exclude = []) => {
  try {
    const usersList = await UserModel.findAll({
      attributes: { exclude }
    })

    return usersList

  } catch (error) {
    throw new Error('[USER SERVICE] getUsers Error ', error)
  }
}

const getUserByPk = async (userId, exclude = []) => {
  try {
    const userFound = await UserModel.findByPk(userId, {
      attributes: { exclude}
    })

    if (!userFound) return null

    return userFound

  } catch (error) {
    throw new Error('[USER SERVICE] getUserByProp Error ', error)
  }
}

const getUserByProps = async (userProps = {}, exclude = []) => {
  try {
    const userFound = await UserModel.findOne({ where: userProps, attributes: {exclude} })

    if (!userFound) return null

    return userFound

  } catch (error) {
    throw new Error('[USER SERVICE] getUserByProp Error ', JSON.stringify(error))
  }
}

const createUser = async (newUser) => {
  try {
    const userWithHashedPassword = {
      ...newUser,
      password: hashPassword(newUser.password)
    }

    const createdUser = await UserModel.create(userWithHashedPassword)

    return createdUser

  } catch (error) {
    throw new Error('[USER SERVICE] createUser Error ', error)
  }
}

const updateUser = async (userToUpdate, newUserData = {}) => {
  try {
    const updatedUser = await userToUpdate.update(newUserData)

    return updatedUser

  } catch (error) {
    throw new Error('[USER SERVICE] updateUser Error ', error)
  }
}

const logicalDeleteUser = async (userToDelete) => {
  try {
    const userLogicalDeleted = await userToDelete.update({status: false})

    return userLogicalDeleted

  } catch (error) {
    throw new Error('[USER SERVICE] logicalDeleteUser Error: ', error)
  }
}

const memoryDeleteUser = async (userToDelete) => {
  try {
    await userToDelete.destroy()

    return true

  } catch (error) {
    throw new Error('[USER SERVICE] memoryDeleteUser Error: ', error)
  }
}

export default {
  getUsersList,
  getUserByPk,
  getUserByProps,
  createUser,
  updateUser,
  logicalDeleteUser,
  memoryDeleteUser
}