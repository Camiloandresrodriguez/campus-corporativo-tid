import React, { useEffect, useState } from "react";
import { getUsuarios } from "../services/usuarioService";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  return (
    <div>
      <h2>CRUD de Usuarios</h2>

      <ul>
        {usuarios.map((usuario, index) => (
          <li key={index}>
            {usuario.nombre} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;