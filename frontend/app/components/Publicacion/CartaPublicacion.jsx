"use client";

import React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

function PublicacionCard({ publicacion }) {
  const { data: session } = useSession();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const router = useRouter();

  function handlePrevImage() {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? publicacion.animal.fotos.length - 1 : prevIndex - 1
    );
  }

  function handleNextImage() {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === publicacion.animal.fotos.length - 1 ? 0 : prevIndex + 1
    );
  }

  const handleMostrarDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 my-5 w-full h-full border border-purple-200 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl">
        {" "}
        <h3 className="text-xl font-bold mb-4">{publicacion.titulo}</h3>
        <div className="slider-container relative ">
          {/* Flecha izquierda */}
          <span
            className="slider-arrow left absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handlePrevImage}
          >
            &#10094;
          </span>
          {/* Imagen actual */}
          <img
            className="rounded-lg w-full h-72 object-cover border-2 border-purple-300"
            src={
              publicacion && publicacion.animal && publicacion.animal.fotos
                ? publicacion.animal.fotos[currentImageIndex]
                : ""
            }
            alt={`Foto ${currentImageIndex + 1}`}
          />
          {/* Flecha derecha */}
          <span
            className="slider-arrow right absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer"
            onClick={handleNextImage}
          >
            &#10095;
          </span>
        </div>
        {/* Detalles del animal */}
        <div className="mb-4 bg-white rounded-lg shadow-lg p-4">
          <p className="font-bold mb-2 text-lg">
            Nombre: {publicacion.animal.nombre}
          </p>
          {mostrarDetalles ? (
            <>
              <p className="mb-2 text-m">
                Edad: {publicacion.animal.edad} años
              </p>
              <p className="mb-2">Peso: {publicacion.animal.pesoEnKg} kg</p>
              {/* Agrega más detalles según la estructura de tus datos */}
              <p className="mb-2">
                Descripcion: {publicacion.animal.descripcion}{" "}
              </p>
              <p className="mb-2">Ubicacion: {publicacion.animal.ubicacion}</p>
              <p className="mb-2">
                Historia Clinica: {publicacion.animal.historiaClinica}
              </p>
              <p className="font-bold text-lg">
                Usuario Oferente: {publicacion.usuario.nombre}
              </p>
              <button
                className="text-blue-500 hover:underline hover:text-violet-500"
                onClick={handleMostrarDetalles}
              >
                Ver menos
              </button>
            </>
          ) : (
            <>
              <p className="mb-2 text-m">
                Edad: {publicacion.animal.edad} años{" "}
                <button
                  className="text-blue-500 hover:underline hover:text-violet-500"
                  onClick={handleMostrarDetalles}
                >
                  Ver más
                </button>
              </p>
            </>
          )}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded mx-auto mt-auto"
            onClick={() =>
              router.push(`/publicacion/perfilPublicacion/${publicacion._id}`)
            }
          >
            Me interesa
          </button>
        </div>
      </div>
    </>
  );
}

export default PublicacionCard;
