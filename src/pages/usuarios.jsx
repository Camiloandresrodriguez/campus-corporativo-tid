import React, { useEffect, useState } from "react";
import { getUsuarios } from "../services/usuarioService";
import "../App.css";

const Usuarios = () => {

  // ESTADOS
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [editando, setEditando] = useState(null);

  // FUNCIONES
  const cargarUsuarios = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  const agregarUsuario = () => {
    if (editando) {
      const usuariosActualizados = usuarios.map((u) =>
        u.id === editando ? { ...u, nombre, email } : u
      );
      setUsuarios(usuariosActualizados);
      setEditando(null);
    } else {
      const nuevoUsuario = {
        id: Date.now(),
        nombre,
        email
      };
      setUsuarios([...usuarios, nuevoUsuario]);
    }

    setNombre("");
    setEmail("");
  };

  const eliminarUsuario = (id) => {
    const nuevosUsuarios = usuarios.filter((u) => u.id !== id);
    setUsuarios(nuevosUsuarios);
  };

  const editarUsuario = (usuario) => {
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setEditando(usuario.id);
  };

  // EFFECT
  useEffect(() => {
    cargarUsuarios();
  }, []);

  // RETURN
  return (
    <div>
      <h2>CRUD de Usuarios</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="agregar" onClick={agregarUsuario}>
         {editando ? "Guardar" : "Agregar"}

      </button>
      

      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="item-usuario">
            <span>
             {usuario.nombre} - {usuario.email}
            </span>

            <div className="acciones">
              <button className="btn-editar" onClick={() => editarUsuario(usuario)}>
              ✏️
              </button>

               <button className="btn-eliminar" onClick={() => eliminarUsuario(usuario.id)}>
               ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
