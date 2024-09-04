import { Link } from 'react-router-dom'
import Menu from '../pages/Menu';


const Main = () => {

    return (
        <div >
            <Menu />
            <div className='containerPrincipal'>
                <div className='containerSecundario'>
                    <Link to="/dashboard-service" className='btn btn-primary mt-2 mb-2'><i className="fas fa-check"></i> Ir a Servicios</Link>

                </div>
                <div className="containerSecundario">
                    <Link to="/dashboard-agenda" className='btn btn-primary mt-2 mb-2'><i className="fas fa-clock"></i> Ir a Agendas</Link>
                </div>
            </div>
        </div>
    )
}

export default Main