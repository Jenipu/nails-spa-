import { ROLES } from '../constants/index.js'
import { UserService } from '../services/index.js'

export const authorized = (authorizedRoles = [ROLES.ADMIN]) => async (req, res, next) => {
  try {
    const authUserId = req.authUser
    if (!authUserId) return res.status(401).json({ status: "error", error: { code: 'c0c1ec1a-4849-4964-b8e5-e53bd3dcea29', message: "Unauthorized!." }})

    const foundUser = await UserService.getUserByPk(authUserId)

    if (!foundUser) return res.status(401).json({ status: "error", error: { code: '87646faa-9a98-49b3-a726-a0496bb3b744', message: "Unauthorized!." }})

    const foundUserJson = foundUser.toJSON()

    if (!authorizedRoles.includes(foundUserJson.rol)) return res.status(401).json({ status: "error", error: { code: '286be63d-5a91-4d0d-bd43-ff4ac9f194a8', message: "Unauthorized!." }})

    next()

  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", error: { code: 'dd0039d9-1618-45b7-99d0-9cfcf86fa9cc', message: "Internal server error!." }})
  }
}