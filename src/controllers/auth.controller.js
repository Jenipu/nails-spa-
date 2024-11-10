import jwt from 'jsonwebtoken'
import { UserService } from '../services/index.js'
import { logError } from '../libs/functions.js'
import { checkPassword, generateToken } from '../libs/security.js'
import { ROLES } from '../constants/index.js'

export const login = async (req, res) => {
  try {
    const { email, password: inputPassword } = req.body

    const userFound = await UserService.getUserByProps({ email })

    if (!userFound) {
      return res.status(404).json({ status: "error", error: { code: 'c42e2aef-d3d9-49d9-911c-bd84da13b07f', message: 'Bad credentials' } })
    }

    const isPasswordChecked = checkPassword(inputPassword, userFound.password)

    if (!isPasswordChecked) {
      return res.status(404).json({ status: "error", error: { code: '124c1d48-950c-49e6-973c-e184a77ca301', message: 'Bad credentials' } })
    }

    const token = await generateToken({ id: userFound.id })

    const userFoundJson = userFound.toJSON()
    const { password, ...userLoggedin } = userFoundJson

    res.cookie(
      'token',
      token,
      {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      }
    ).json({ status: "success", data: userLoggedin });

  } catch (error) {
    logError(error)
    return res.status(500).json({ status: "error", error: { code: 'afacc052-c0e9-4cef-9bbf-9c60ae521fcd', message: 'Internal server error!.' } })
  }
}

export const signUp = async (req, res) => {
  try {
    const { body } = req

    const userFound = await UserService.getUserByProps({ email: body.email })

    if (userFound) {
      return res.status(400).json({
        status: "error",
        error: {
          code: '8fe6aae3-5a7a-4306-a2d9-fc2df37858cb',
          message: 'This user exist!.'
        }
      })
    }

    const createdUser = await UserService.createUser({ ...body, rol: ROLES.CLIENT })
    const token = await generateToken({ id: createdUser.id })

    const createdUserJson = createdUser.toJSON()
    const { password, ...createdUserToRetrive } = createdUserJson

    res.cookie(
      'token',
      token,
      {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      }
    ).json({ status: "success", data: createdUserToRetrive });

  } catch (error) {
    logError(error)
    return res.status(500).json({ status: "error", error: { code: '66e949b5-6fe2-4c0a-badd-319e7eab51dc', message: 'Internal server error!.' } })
  }
}

export const logOut = async (req, res) => {
  try {
    res.cookie('token', "", { expires: new Date(0) })
    res.json({ status: "success", data: "Logout successfully!." })

  } catch (error) {
    console.log(error)
    logError(error)
    return res.status(500).json({ status: "error", error: { code: 'ce7451ec-97e2-4e37-a281-1a9d97c3a266', message: "Internal server error!." } })
  }
}

export const checkSession = async (req, res) => {
  try {
    const { authUser } = req
    const userFound = await UserService.getUserByPk(authUser)

    if (!userFound) {
      return res.status(404).json({ status: "error", error: { code: 'b6162377-a8f8-481e-9779-6d1a578454ba', message: 'Bad credentials' } })
    }

    const userFoundJson = userFound.toJSON()
    const { password, ...userLoggedin } = userFoundJson

    res.json({ status: "success", data: userLoggedin });

  } catch (error) {
    logError(error)
    return res.status(500).json({ status: "error", error: { code: 'd2e5d777-1f6a-414e-8871-3dfae437102d', message: "Internal server error!." } })
  }
}