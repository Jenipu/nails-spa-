import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import logo from '../img/logo.png'

const cookies = new Cookies();

class Menu extends Component {
    cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('apellido_paterno', { path: "/" });
        cookies.remove('apellido_materno', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('username', { path: "/" });
        window.location.href = '/';
    }

    componentDidMount() {
        if (cookies.get('username')) {
            window.location.href = "./"
        }
    }
    render() {
        // console.log(cookies.get('id'))
        // console.log('apellido_paterno: ' + cookies.get('apellido_paterno'));
        // console.log('apellido_materno: ' + cookies.get('apellido_materno'));
        // console.log('nombre: ' + cookies.get('nombre'));
        // console.log('username: ' + cookies.get('username'));

        return (
            <div id='menu'>
                <a href="http://localhost:3000/main" className="btn btn-info"><i className="fa-solid fa-rotate-left"></i>Volver</a>
                <img src={logo} alt="logo" />

                <button className='btn-cerrar-sesion' onClick={() => this.cerrarSesion()}>
                    <i className="fas fa-sign-out"></i>
                </button>
            </div>
        )
    }
}



export default Menu