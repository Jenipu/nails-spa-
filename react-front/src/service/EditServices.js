import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Menu from '../pages/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css'



const URI = 'http://localhost:8000/servicios/';

const CompEditServices = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI + id, {
            title: title,
            content: content
        })
        navigate('/dashboard-service')
    }
    const getServicio = async () => {
        const res = await axios.get(URI + id)
        setTitle(res.data.title)
        setContent(res.data.content)
    }

    useEffect(() => {
        getServicio()
    }, [])


    return (
        <div>
            <Menu />
            <div className='containerPrincipal'>
                <div className='containerSecundario'>
                    <h1>Estás editando el servicio con ID #{id}</h1>
                    <form onSubmit={update}>
                        <div className="mb-3">
                            <label className='form-label'>
                                Servicio
                            </label>
                            <input
                                value={title}
                                placeholder={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                className="form-control"
                            />

                        </div>
                        <div className="mb-3">
                            <label className='form-label'>
                                Descripción
                            </label>
                            <input
                                value={content}
                                placeholder={content}
                                onChange={(e) => setContent(e.target.value)}
                                type="text"
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

export default CompEditServices