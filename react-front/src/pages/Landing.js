import React, { Component } from 'react';
import logo from '../img/logo.png'
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Landing extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div id='menu'>
                    <a className="btn btn-info" href='/login'><i className="fa-solid fa-person"></i><div>Iniciar sesión</div></a>
                    <img src={logo} alt="logo" href="/" />

                </div>
                <div className='containerPrincipal'>

                    <div className='col-12 text-center'>
                        <h1>Servicios</h1>
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className='row justify-content-between'>
                                    <div className='col-3 servicio-item'>
                                        <div className="card row justify-content-center">
                                            <img className="card-img-top" src="https://i.pinimg.com/564x/64/c9/6c/64c96ce9c3ca7ac2104c753cada67019.jpg" alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">Manicure</h5>
                                                <p className="card-text">La manicura, maniquiur,​ manicure,​ o manicur,​ es un método de cuidado, pintura y embellecimiento para las uñas​ y manos que suele realizarse en casa o en un salón de belleza.</p>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-3 servicio-item'>
                                        <div className="card row justify-content-center">
                                            <img className="card-img-top" src="https://i.pinimg.com/236x/c0/34/f6/c034f699a649e40dca52d04f5a608675.jpg" alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">Pedicure</h5>
                                                <p className="card-text">Consiste en una serie de técnicas y tratamientos para el cuidado de las manos y pies, y corregir sus posibles problemas.</p>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-3 servicio-item'>
                                        <div className="card row justify-content-center">
                                            <img className="card-img-top" src="https://i.pinimg.com/236x/b8/d8/d4/b8d8d4592c47b3ca890d778a6c79e3fb.jpg" alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">Uñas Arte</h5>
                                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Landing;