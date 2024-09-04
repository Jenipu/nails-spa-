import axios from "axios";
import { useState } from "react";
import React, { useNavigate } from "react-router-dom";
import Menu from '../pages/Menu';


const URI = 'http://localhost:8000/agendas/'

const CompCreateAgenda = () => {
    const [servicio, setServicio] = useState('')
    const [manicurista, setManicurista] = useState('')
    const [fecha_hora, setFechaHora] = useState('')
    const navigate = useNavigate()

    // procedimiento guardar
    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI, {
            id: "",
            servicio: servicio,
            manicurista: manicurista,
            fecha_hora: fecha_hora
        })
        navigate('/dashboard-agenda')
    }
    return (
        <div>
            <Menu />
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <h1>Crear Agenda </h1>
                    <form onSubmit={store}>
                        <div className="mb-3">
                            <label className='form-label'>
                                Servicio
                            </label>
                          
                            <input
                                value={servicio}
                                onChange={(e) => setServicio(e.target.value)}
                                type="text"
                                className="form-control"
                            />

                        </div>
                        <div className="mb-3">
                            <label className='form-label'>
                                Manicurista
                            </label>
                            <input
                                value={manicurista}
                                onChange={(e) => setManicurista(e.target.value)}
                                type="text"
                                className="form-control"
                            />

                        </div>
                        <div className="mb-3">
                            <label className='form-label'>
                                Fecha / Hora
                            </label>
                            <input
                                value={fecha_hora}
                                onChange={(e) => setFechaHora(e.target.value)}
                                type="datetime-local"
                                className="form-control"

                            />

                        </div>
                        <button className='btn btn-primary' type="submit">AGREGAR</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompCreateAgenda