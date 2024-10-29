import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from '../pages/Menu';

const URI = 'http://localhost:8000/agendas/';
const URI_USERS = 'http://localhost:8000/users/';
const URI_SERVICIOS = 'http://localhost:8000/servicios/';

const CompCreateAgenda = () => {
    const [servicio, setServicio] = useState('');
    const [manicurista, setManicurista] = useState('');
    const [fecha_hora, setFechaHora] = useState('');
    const [manicuristas, setManicuristas] = useState([]);
    const [servicios, setServicios] = useState([]);

    const navigate = useNavigate();

    // Obtener manicuristas y servicios desde la API
    useEffect(() => {
        const fetchManicuristas = async () => {
            const response = await axios.get(URI_USERS);
            setManicuristas(response.data);
        };
        const fetchServicios = async () => {
            const response = await axios.get(URI_SERVICIOS);
            setServicios(response.data);
        };

        fetchManicuristas();
        fetchServicios();
    }, []);

    // Función para convertir el formato de fecha a 'YYYY-MM-DD HH:MM:SS'
    const formatFechaHora = (fechaHora) => {
        return fechaHora.replace('T', ' ') + ':00';
    };

    // Procedimiento para guardar la agenda
    const store = async (e) => {
        e.preventDefault();

        // Convertir la fecha a 'YYYY-MM-DD HH:MM:SS'
        const fechaHoraFormateada = formatFechaHora(fecha_hora);

        await axios.post(URI, {
            id: '',
            servicio: servicio,
            manicurista: manicurista,
            fecha_hora: fechaHoraFormateada  // Usar la fecha formateada
        });

        navigate('/dashboard-agenda');
    };

    return (
        <div>
            <Menu />
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <h1>Crear Agenda</h1>
                    <form onSubmit={store}>
                        <div className="mb-3">
                            <label className='form-label'>Servicio</label>
                            <select
                                value={servicio}
                                onChange={(e) => setServicio(e.target.value)}
                                className="form-control"
                            >
                                <option value="">Seleccionar Servicio</option>
                                {servicios.map((serv) => (
                                    <option key={serv.id} value={serv.id}>
                                        {serv.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>Manicurista</label>
                            <select
                                value={manicurista}
                                onChange={(e) => setManicurista(e.target.value)}
                                className="form-control"
                            >
                                <option value="">Seleccionar Manicurista</option>
                                {manicuristas.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.nombre} {user.apellido_paterno} {user.apellido_materno}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>Fecha / Hora</label>
                            <input
                                value={fecha_hora}
                                onChange={(e) => setFechaHora(e.target.value)}
                                type="datetime-local"
                                className="form-control"
                            />
                        </div>

                        <button className='btn btn-primary' type="submit">AGREGAR</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompCreateAgenda;
