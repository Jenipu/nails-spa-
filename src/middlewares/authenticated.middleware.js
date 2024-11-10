import { isValidJWToken } from '../libs/security.js'
import jwt from 'jsonwebtoken'

export const authenticated = async (req, res, next) => {
  try {
    const { token: cookieToken } = req.cookies
    if (!cookieToken) return res.status(401).json({ status: "error", error: { code: 'd11423a4-fb60-419d-8dd1-f639b18a34ac', message: "Unauthorized!." }})

    // const { authorization } = req.headers
    // if (!authorization || !authorization.startsWith('Bearer')) {
    //   return res.status(401).json({ status: "error", error: { code: 'de323160-981f-4c08-8c8e-4f57032142e3', message: "Unauthorized!." }})
    // }

    // const bearerToken = authorization.split(' ')[1]
    // if (!bearerToken) return res.status(401).json({ status: "error", error: { code: 'c41987b9-a8e4-4470-b2eb-de9485474157', message: "Unauthorized!." }})

    // if (bearerToken !== cookieToken) return res.status(401).json({ status: "error", error: { code: '9e9c2763-5ae9-48e6-95b3-6846be375961', message: "Unauthorized!." }})

    const decodedToken = await isValidJWToken(cookieToken)

    if (!decodedToken) return res.status(401).json({ status: "error", error: { code: 'bd414064-0e9c-49ad-aa26-bf6287312998', message: "Unauthorized!." }})

    req.authUser = decodedToken.id

    next()

  } catch (error) {
    if (error && error instanceof jwt.TokenExpiredError) {
      return res.cookie('token', "", {expires: new Date(0)}).status(403).json({ status: "error", error: { code: 'bad39a47-a216-4fc1-89ef-8419e40be217', message: "Unauthorized, token expired!."}})
    }

    console.log(error)
    return res.status(500).json({ status: "error", error: { code: '5c932faf-1894-46de-877d-1b44dce20206', message: "Internal server error!." }})
  }
}