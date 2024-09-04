import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../pages/Menu';


const UriAgenda = 'http://localhost:8000/agendas/';

const CompShowAgendas = () => {
    const [agendas, setAgenda] = useState([])
    useEffect(() => {
        getAllAgendas()
    }, [])

    // Procedimiento para mostrar todos los blogs
    const getAllAgendas = async () => {
        const res = await axios.get(UriAgenda)
        setAgenda(res.data)
    }
    const deleteAgenda = async (id) => {
        getAllAgendas()
        axios.delete(`${UriAgenda}${id}`)
        getAllAgendas()
    }

    return (
        <div >
            <Menu />
            <div className='containerPrincipal'>
                <div className='containerSecundario'>
                    <Link to="/create-agenda" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i> Agregar Agenda</Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Servicio</th>
                                <th>Manicurista</th>
                                <th>Hora</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='table-primary'>
                            {
                                agendas.map((agenda) => (

                                    <tr key={agenda.id}>
                                        <td>{agenda.servicio}</td>
                                        <td>{agenda.manicurista}</td>
                                        <td>{agenda.fecha_hora}</td>
                                        <td>
                                            <Link to={`/edit/agendas/${agenda.id}`} className='btn btn-info'><i className="fas fa-pen"></i></Link>
                                            <button onClick={() => deleteAgenda(agenda.id)} className='btn btn-danger'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )


                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CompShowAgendas