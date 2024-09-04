import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import Registro from '../pages/Registro';
import Main from '../pages/Main';
import CompCreateService from '../service/CreateService';
import CompShowServices from '../service/ShowServices';
import CompEditServices from '../service/EditServices';
import CompCreateAgenda from '../agenda/CreateAgenda';
import CompShowAgendas from '../agenda/ShowAgendas';
import CompEditAgendas from '../agenda/EditAgendas';

function Rutas() {
  return (
    <BrowserRouter>

      <Routes>

        <Route exact path="/" element={<Login />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/registro" element={<Registro />} />
        <Route exact path="/main" element={<Main />} />
        <Route exact path="/dashboard-service" element={<CompShowServices />} />
        <Route exact path="/create-service" element={<CompCreateService />} />
        <Route exact path="/edit/services/:id" element={<CompEditServices />} />
        <Route exact path="/dashboard-agenda" element={<CompShowAgendas />} />
        <Route exact path="/create-agenda" element={<CompCreateAgenda />} />
        <Route exact path="/edit/agendas/:id" element={<CompEditAgendas />} />
        {/* <Route exact path="/registro" element={<CompShowBlogs />} /> */}
      </Routes>

    </BrowserRouter>
  );
}

export default Rutas;
