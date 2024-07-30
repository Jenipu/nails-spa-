import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Menu from '../pages/Menu';



const URI = 'http://localhost:8000/blogs/';

const CompEditBlogs = () => {
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
        navigate('/blogs')
    }
    useEffect(() => {
        getBlogById()
    })

    const getBlogById = async () => {
        const res = await axios.get(URI + id)
        setTitle(res.data.title)
        setContent(res.data.content)
    }

    return (
        <div>
            <Menu />
            <div className='containerPrincipal'>
                <div className='containerSecundario'>
                    <h1>Vista EDITAR</h1>
                    <form onSubmit={update}>
                        <div className="mb-3">
                            <label className='form-label'>
                                Title
                            </label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                className="form-control"
                            />

                        </div>
                        <div className="mb-3">
                            <label className='form-label'>
                                Contents
                            </label>
                            <input
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                type="text"
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

export default CompEditBlogs