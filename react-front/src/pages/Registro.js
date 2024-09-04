import axios from 'axios';
import { useState } from "react";
import React, { useNavigate } from "react-router-dom";
import md5 from 'md5';

import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Cookies from 'universal-cookie';

const APIUrl = "http://localhost:8000/users/";
// const cookies = new Cookies();

const CompRegistro = () => {
    const [nombre, setNombre] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [apellido_paterno, setApellidoPaterno] = useState('')
    const [apellido_materno, setApellidoMaterno] = useState('')
    const navigate = useNavigate()

    // procedimiento guardar
    const store = async (e) => {
        e.preventDefault()
        await axios.post(APIUrl, {
            nombre: nombre,
            username: username,
            password: md5(password),
            apellido_paterno: apellido_paterno,
            apellido_materno: apellido_materno,

        })
        navigate('/')
    }
    return (
        <div>

            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <h1>Vista CREAR</h1>
                    <form onSubmit={store}>
                        <div className="mb-3">
                            <label className='form-label'>
                                Nombre
                            </label>
                            <input
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                type="text"
                                className="form-control"
                            />

                        </div>
                        <div className="mb-3">
                            <label className='form-label'>
                                Username
                            </label>
                            <input
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                className="form-control"
                            />

                        </div>
                        <div className="mb-3">
                            <label className='form-label'>
                                Password
                            </label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="form-control"
                            />

                        </div>
                        <div className="mb-3">
                            <label className='form-label'>
                                Apellido materno
                            </label>
                            <input
                                value={apellido_materno}
                                onChange={(e) => setApellidoMaterno(e.target.value)}
                                type="text"
                                className="form-control"
                            />

                        </div>
                        <div className="mb-3">
                            <label className='form-label'>
                                Apellido paterno
                            </label>
                            <input
                                value={apellido_paterno}
                                onChange={(e) => setApellidoPaterno(e.target.value)}
                                type="text"
                                className="form-control"
                            />

                        </div>
                        <button className='btn btn-primary' type="submit">¡REGISTRARME!</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompRegistro;