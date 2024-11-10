import { logError } from '../libs/functions.js'
import { AppointmentsService, UserService } from '../services/index.js'

export const getUsers = async (req, res) => {
  try {
    const excludeUserAttributes = ['password']
    const users = await UserService.getUsersList(excludeUserAttributes)
    res.json({ status: "success", data: users })

  } catch (error) {
    logError(JSON.stringify(error))
    return res.status(500).json({ status: "error", error: { code: '84a6a84a-8e8d-4e58-a507-3c2d4934cffc', message: 'Internal server error!.' } })
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params

    const excludeUserAttributes = ['password']
    const userFound = await UserService.getUserByPk(id, excludeUserAttributes)

    if (!userFound) {
      return res.status(404).json({ status: "error", error: { code: '76dd5ae4-c9a2-4254-96da-7b1005375f89', message: 'User not found!' } })
    }

    res.json({ status: "success", data: userFound })

  } catch (error) {
    logError(error)
    return res.status(500).json({ status: "error", error: { code: 'e4659908-51fe-40e6-815b-cd617c899bcc', message: 'Internal server error!.' } })
  }
}

export const getUserAppointments = async (req, res) => {
  try {
    const { id } = req.params

    const { default: userModel } = await import('../my-models/user.model.js')
    const { default: workerServiceModel } = await import('../my-models/worker_services.model.js')
    const { default: serviceModel } = await import('../my-models/service.model.js')
    const conditions = {
      where: {
        client_id: id,
      },
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
    const userAppointmentsFound = await AppointmentsService.getAppointmentsByConditions(conditions)

    if (!userAppointmentsFound) {
      return res.status(404).json({ status: "error", error: { code: 'bb22f730-8e37-4824-b152-9f37454c9c85', message: 'User not found!' } })
    }

    res.json({ status: "success", data: userAppointmentsFound })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", error: { code: 'b8868bd8-f332-42d8-83f2-5653afa5cc84', message: 'Internal server error!.' } })
  }
}

export const createUser = async (req, res) => {
  try {
    const { body } = req

    const userPropsToFilter = { email: body.email }
    const userFound = await UserService.getUserByProps(userPropsToFilter)

    if (userFound) {
      return res.status(400).json({
        status: "error",
        error: {
          code: '580df3d5-a42a-4007-a6c3-2f4c0c2035cb',
          message: 'This user exist!.'
        }
      })
    }

    const createdUser = await UserService.createUser(body)
    const createdUserJson = createdUser.toJSON()
    const { password, rol, ...createdUserToRetrive } = createdUserJson

    res.json({ status: "success", data: createdUserToRetrive })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      error: {
        code: '94a45e9a-a397-427e-9823-240e4fce1b44',
        message: 'Internal server error!.'
      }
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { body, params } = req
    const { id } = params

    const userFound = await UserService.getUserByPk(id)

    if (!userFound) {
      return res.status(404).json({
        status: "error",
        error: {
          code: 'bbaa3bcf-cb47-4a9b-a3aa-8c90fd2e6458',
          message: 'No user found!.'
        }
      })
    }

    const updatedUser = await UserService.updateUser(userFound, body)
    const updatedUserJson = updatedUser.toJSON()
    const { password, ...updatedUserToRetrive } = updatedUserJson

    res.json({ status: "success", data: updatedUserToRetrive })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      error: {
        code: '38bd1dfc-0a0f-46dc-91b8-1856cb619e1f',
        message: 'Internal server error!.'
      }
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const isAccountDelete = req.deleteAccount

    const userFound = await UserService.getUserByPk(id)

    if (!userFound) {
      return res.status(404).json({
        status: "error",
        error: {
          code: '46bda260-1b83-41c9-852a-8d8d7b1e8749',
          message: 'No user found!.'
        }
      })
    }

    if (isAccountDelete) {
      await UserService.memoryDeleteUser(userFound)
    } else {
      await UserService.logicalDeleteUser(userFound)
    }

    res.status(204).json({ status: "success", error: { code: '4f152cfd-1f3c-4801-ad33-1b44e6538a2e', message: 'User deleted!.' } })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      error: {
        code: '24ca3565-41ea-4036-92dc-e9aee246ed07',
        message: 'Internal server error!.'
      }
    })
  }
}