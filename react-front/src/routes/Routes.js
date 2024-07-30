import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import Registro from '../pages/Registro';
import CompShowBlogs from '../blog/ShowBlogs';
import CompCreateBlog from '../blog/CreateBlog';
import CompEditBlogs from '../blog/EditBlog';

function Rutas() {
  return (
    <BrowserRouter>

      <Routes>

        <Route exact path="/" element={<Login />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/registro" element={<Registro />} />
        <Route exact path="/crear" element={<CompCreateBlog />} />
        <Route exact path="/blogs" element={<CompShowBlogs />} />
        <Route exact path="/edit/:id" element={<CompEditBlogs />} />
        {/* <Route exact path="/registro" element={<CompShowBlogs />} /> */}
      </Routes>

    </BrowserRouter>
  );
}

export default Rutas;
