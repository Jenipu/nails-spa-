

//  importamos el modelo
import ServicioModel from "../models/ServicioModel.js"

//  metodos para el CRUD

// Mostrar todos los registros 
export const getAllServicios = async (req, res) => {
    try {
        const servicios = await ServicioModel.findAll();
        res.json(servicios)

    } catch (error) {
        res.json({ message: error.message })
    }
}

//  Mostrar un registro
export const getServicio = async (req, res) => {
    try {
        const servicio = await ServicioModel.findAll({
            where: {
                id: req.params.id
            }
        })

        res.json(servicio[0]);


    } catch (error) {
        res.json({ message: error.message })
    }
}

//  crear un registro
export const createServicio = async (req, res) => {
    try {
        await ServicioModel.create(req.body)
        res.json({
            "message": "Registro creado exitosamente! "
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//  actualizar un registro
export const updateServicio = async (req, res) => {
    try {
        await ServicioModel.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({
            "message": "¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Eliminar un registro

export const deleteServicio = async (req, res) => {
    try {
        await ServicioModel.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

