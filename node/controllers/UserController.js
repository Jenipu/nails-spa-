

//  importamos el modelo
import UserModel from "../models/UserModel.js"

//  metodos para el CRUD

// Mostrar todos los registros 
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users)

    } catch (error) {
        res.json({ message: error.message })
    }
}
