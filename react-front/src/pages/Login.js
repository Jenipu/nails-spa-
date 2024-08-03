import React, { Component } from 'react';

import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const APIUrl = "http://localhost:8000/users";
const cookies = new Cookies();

class Login extends Component {
    state = {
        form: {
            username: '',
            password: ''
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    }

    iniciarSesion = async () => {
        await axios.get(APIUrl, { params: { username: this.state.form.username, password: md5(this.state.form.password) } })
            .then(response => {
                return response.data
            })
            .then(response => {
                console.log(response.data);
                var respuesta = response[0];

                if (response.length > 0) {
                    cookies.set('id', respuesta.id, { path: "/" });
                    cookies.set('apellido_paterno', respuesta.apellido_paterno, { path: "/" });
                    cookies.set('apellido_materno', respuesta.apellido_materno, { path: "/" });
                    cookies.set('nombre', respuesta.nombre, { path: "/" });
                    alert(`Bienvenido' ${respuesta.nombre} ${respuesta.apellido_materno}`);
                    window.location.href = "./dashboard"

                }
                else {
                    alert('El usuario o contraseña no son correctos');

                }

            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        if (cookies.get('username')) {

            window.location.href = "./dashboard"
        }
    }

    render() {
        return (
            <div className='containerPrincipal'>
                <div className='containerSecundario'>
                    <div className="form-group">
                        <div className='mb-5'>
                            <i className="fa-solid fa-hand-sparkles m-0 p-0"></i>
                            <h3>NAILS - SPA</h3>
                        </div>
                        <label>Usuario: </label> <br />
                        <input type="text" className='form-control' name='username' onChange={this.handleChange} />
                        <br />
                        <label>Contraseña</label>
                        <br />
                        <input type="password" className='form-control' name='password' onChange={this.handleChange} />
                        <br />
                        
                        <button className='btn btn-primary' onClick={() => this.iniciarSesion()}>Iniciar Sesión</button>

            
                    </div>
                    <div>¿No tienes una cuenta? <button><a href="./registro">Regístrate</a></button></div>
                </div >
            </div >
        )
    }
}

export default Login;