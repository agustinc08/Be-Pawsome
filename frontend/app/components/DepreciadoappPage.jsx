//esta es la el archivo Primitivo PAGE

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from './components/PostCard'

export default function Home() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET a tu endpoint de backend
    axios.get("http://localhost:5000/publicacion/publicaciones")
      .then(response => {
        // Actualizar el estado con los datos recibidos
        setPublicaciones(response.data);
      })
      .catch(error => {
        console.error("Error al obtener las publicaciones:", error);
      });
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <main>
      <PostCard/>
    </main>
  )
}