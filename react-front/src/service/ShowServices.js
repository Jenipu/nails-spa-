import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../pages/Menu';


const UriServicio = 'http://localhost:8000/servicios/';

const CompShowServices = () => {
    const [servicios, setServicio] = useState([])
    useEffect(() => {
        getServicios()
    }, [])

    // Procedimiento para mostrar todos los blogs
    const getServicios = async () => {
        const res = await axios.get(UriServicio)
        setServicio(res.data)
    }
    const deleteServicio = async (id) => {
        getServicios()
        axios.delete(`${UriServicio}${id}`)
        getServicios()
    }

    return (
        <div >
            <Menu />
            <div className='containerPrincipal'>
                <div className='containerSecundario'>
                    <Link to="/create-service" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i> Agregar Servicio</Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Servicio</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='table-primary'>
                            {
                                servicios.map((servicio) => (

                                    <tr key={servicio.id}>
                                        <td>{servicio.title}</td>
                                        <td>{servicio.content}</td>
                                        <td>
                                            <Link to={`/edit/services/${servicio.id}`} className='btn btn-info'><i className="fas fa-pen"></i></Link>
                                            <button onClick={() => deleteServicio(servicio.id)} className='btn btn-danger'><i className="fas fa-trash"></i></button>
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

export default CompShowServices