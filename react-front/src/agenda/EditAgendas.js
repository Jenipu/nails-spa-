import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Menu from '../pages/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css'



const URI = 'http://localhost:8000/agendas/';

const CompEditAgendas = () => {
    const [servicio, setServicio] = useState('')
    const [manicurista, setManicurista] = useState('')
    const [fecha_hora, setFecha_hora] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI + id, {
            servicio: servicio,
            manicurista: manicurista,
            fecha_hora: fecha_hora
        })
        navigate('/dashboard-agenda')
    }
    const getAgendaById = async () => {
        const res = await axios.get(URI + id)
        setServicio(res.data.servicio)
        setManicurista(res.data.manicurista)
        setFecha_hora(res.data.fecha_hora)
    }

    useEffect(() => {
        getAgendaById()
    }, [])


    return (
        <div>
            <Menu />
            <div className='containerPrincipal'>
                <div className='containerSecundario'>
                    <h1>Estás editando la agenda con ID #{id}</h1>
                    <form onSubmit={update}>
                        <div className="mb-3">
                            <label className='form-label'>
                                Agenda
                            </label>
                            <input
                                value={servicio}
                                placeholder={servicio}
                                onChange={(e) => setServicio(e.target.value)}
                                type="text"
                                className="form-control"
                            />

                        </div>
                        <div className="mb-3">
                            <label className='form-label'>
                                Descripción
                            </label>
                            <input
                                value={manicurista}
                                placeholder={manicurista}
                                onChange={(e) => setManicurista(e.target.value)}
                                type="text"
                                className="form-control"
                            />

                        </div>
                        <div className="mb-3">
                            <label className='form-label'>
                                Fecha Hora
                            </label>
                            <input
                                value={fecha_hora}
                                placeholder={fecha_hora}
                                onChange={(e) => setFecha_hora(e.target.value)}
                                type="datetime-local"
                                className="form-control"
                            />

                        </div>
                        <button type="submit" className='btn btn-primary'>Finalizar edición</button>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default CompEditAgendas