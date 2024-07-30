import axios from "axios";
import { useState } from "react";
import React, { useNavigate } from "react-router-dom";
import Menu from '../pages/Menu';


const URI = 'http://localhost:8000/blogs'

const CompCreateBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    // procedimiento guardar
    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI, { title: title, content: content })
        navigate('/blogs')
    }
    return (
        <div>
            <Menu />
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <h1>Vista CREAR</h1>
                    <form onSubmit={store}>
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
                                Content
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

export default CompCreateBlog