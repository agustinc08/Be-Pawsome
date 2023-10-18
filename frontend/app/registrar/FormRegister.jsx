"use client"
import React, { useState } from 'react';

function Registrar() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    password: '',
    celular: '',
    localidad: '',
    provincia: '',
    nacionalidad: '',
    codigoPostal: ''
  });

  const [error,setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = null;
    try {
      const response = await fetch('http://localhost:5000/usuarios/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error); // Manejar el mensaje de error del servidor
        return;
      }

      const data = await response.json();
      console.log(data); // Manejar la respuesta del servidor según tus necesidades, por ejemplo, mostrar un mensaje de éxito al usuario.
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <label htmlFor="apellido">Apellido:</label>
        <input type="text" id="apellido" name="apellido" placeholder="Apellido" onChange={handleChange} required />
        <label htmlFor="mail">Email:</label>
        <input type="email" id="mail" name="mail" placeholder="Email" onChange={handleChange} required />
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <label htmlFor="celular">Celular:</label>
        <input type="text" id="celular" name="celular" placeholder="Celular" onChange={handleChange} required />
        <label htmlFor="localidad">Localidad:</label>
        <input type="text" id="localidad" name="localidad" placeholder="Localidad" onChange={handleChange} required />
        <label htmlFor="provincia">Provincia:</label>
        <input type="text" id="provincia" name="provincia" placeholder="Provincia" onChange={handleChange} required />
        <label htmlFor="nacionalidad">Nacionalidad:</label>
        <input type="text" id="nacionalidad" name="nacionalidad" placeholder="Nacionalidad" onChange={handleChange} required />
        <label htmlFor="codigoPostal">Código Postal:</label>
        <input type="text" id="codigoPostal" name="codigoPostal" placeholder="Código Postal" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      {error && <h5 className="text-danger">{error}</h5>}    
    </div>
  );
}

export default Registrar;
