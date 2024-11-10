import 'dotenv/config'

export const NODE_ENV = process.env.NODE_ENV || "development"
export const API_PORT = process.env.API_PORT || 3000

export const DB_HOST = process.env.DB_HOST
export const DB_PORT = process.env.DB_PORT
export const DB_DIALECT = process.env.DB_DIALECT
export const DB_NAME = process.env.DB_NAME
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASSWORD = process.env.DB_PASSWORD

export const ORIGIN = process.env.ORIGIN

export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES = process.env.JWT_EXPIRES || "1d"