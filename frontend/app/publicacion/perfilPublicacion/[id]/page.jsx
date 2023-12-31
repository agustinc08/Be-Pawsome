// PerfilPublicacionPage.jsx
"use client";

import PerfilPublicacion from "../../../components/Publicacion/PerfilPublicacion";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PerfilPublicacionPage() {
    const { id } = useParams();
    const [publicacion, setPublicacion] = useState({});
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/publicacion/obtener/${id}`);
          setPublicacion(response.data);
        } catch (error) {
          console.error('Error fetching publicacion:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [id]);
  
    if (loading) {
      return <div>Cargando...</div>;
    }
  
    return <PerfilPublicacion publicacion={publicacion} />;
  }