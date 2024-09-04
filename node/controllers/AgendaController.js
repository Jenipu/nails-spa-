

//  importamos el modelo
import AgendaModel from "../models/AgendaModel.js"

//  metodos para el CRUD

// Mostrar todos los registros 
export const getAllAgendas = async (req, res) => {
    try {
        const agendas = await AgendaModel.findAll();
        res.json(agendas)

    } catch (error) {
        res.json({ message: error.message })
    }
}
export const getAgenda = async (req, res) => {
    try {
        const agenda = await AgendaModel.findAll({
            where: {
                id: req.params.id
            }
        })

        res.json(agenda[0]);


    } catch (error) {
        res.json({ message: error.message })
    }
}
//  crear un registro
export const createAgenda = async (req, res) => {
    try {
        await AgendaModel.create(req.body)
        res.json({
            "message": "Agenda creado exitosamente! "
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//  actualizar un registro
export const updateAgenda = async (req, res) => {
    try {
        await AgendaModel.update(req.body, {
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

export const deleteAgenda = async (req, res) => {
    try {
        await AgendaModel.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}


