import bycript from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES } from '../app-config.js'

export const hashPassword = (password) => {
  const salt = bycript.genSaltSync(12)
  return bycript.hashSync(password, salt)
}

export const checkPassword = (password, hashToCompare) => {
  return bycript.compareSync(password, hashToCompare)
}

export const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES },
      (error, token) => {
        if (error) reject(error)

        resolve(token)
      }
    )
  })
}

export const isValidJWToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      JWT_SECRET,
      (error, decodedJWT) => {
        // if (error && error instanceof jwt.TokenExpiredError) {
          // reject(error.message)
          // TODO: attemptRenewal token
          // return res.status(401).json({ status: "error", error: { code: 'bad39a47-a216-4fc1-89ef-8419e40be217', message: "Unauthorized, token expired!."}})
        // }
        if (error) reject(error)

        resolve(decodedJWT)
      }
    )
  })
}