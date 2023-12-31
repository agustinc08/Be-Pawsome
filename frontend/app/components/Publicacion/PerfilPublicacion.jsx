import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import Slider from "react-slick";

function PerfilPublicacion({ publicacion }) {
  const { data: session } = useSession();
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(null);
  const [mensajeError, setMensajeError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

  async function agregarACasita() {
    try {
      const datos = {
        idAdoptante: session?.user?.userLogueado._id,
        publicacion: publicacion,
      };
      const respuesta = await axios.post(
        `${apiUrl}/publicacion/solicitar`,
        datos
      );
      setCargando(true);
      // Verificar si la solicitud fue exitosa antes de mostrar el mensaje
      if (respuesta.status === 200) {
        // Actualizar el estado para mostrar el mensaje de éxito
        setMensajeExito("¡Tu perro fue agregado a CASITA correctamente!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }

      return respuesta;
    } catch (error) {
      // Capturar el error específico relacionado con "El animal ya está en Casita"
      if (
        error.response &&
        error.response.data.error === "El animal ya está en Casita."
      ) {
        // Mostrar un mensaje al usuario indicando que el animal ya está en Casita
        setMensajeExito("¡Este perro ya está en CASITA!");
      } else {
        // Mostrar otros errores en la consola para depuración
        console.error(error);
        // Establecer el mensaje de error para mostrar al usuario
        setMensajeError(
          "Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde."
        );
        setCargando(false);
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-6 my-5 w-full h-full border-2 border-purple-200">
      {/* Columna de la imagen */}
      <div className="relative w-full md:w-1/2 flex flex-col">
        {publicacion && publicacion.animal && publicacion.animal.fotos ? (
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white opacity-50 z-10 w-10 h-10"
              onClick={() =>
                setCurrentImageIndex((old) => Math.max(old - 1, 0))
              }
            >
              &#8592;
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white opacity-50 z-10 w-10 h-10"
              onClick={() =>
                setCurrentImageIndex((old) =>
                  Math.min(old + 1, publicacion.animal.fotos.length - 1)
                )
              }
            >
              &#8594;
            </button>
            <img
              className="rounded-lg w-full h-auto object-cover mb-4"
              src={publicacion.animal.fotos[currentImageIndex]}
              alt={`Foto ${currentImageIndex + 1}`}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Columna de detalles */}
      <div className="bg-white rounded-lg p-4 w-full md:w-1/2">
        <h3 className="text-3xl font-bold mb-4">{publicacion.titulo}</h3>
        
        <p className="font-bold mb-2 text-lg">
          Nombre: {publicacion.animal.nombre}
        </p>
        <p className="mb-2 text-m">Edad: {publicacion.animal.edad} años</p>
        <p className="mb-2">Peso: {publicacion.animal.pesoEnKg} kg</p>
        {/* Agrega más detalles según la estructura de tus datos */}
        <p className="mb-2">Descripción: {publicacion.animal.descripcion} </p>
        <p className="mb-2">Ubicación: {publicacion.animal.ubicacion}</p>
        <p className="mb-2">
          Historia Clínica: {publicacion.animal.historiaClinica}
        </p>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold w-full items-center justify-center   py-2 px-4 rounded mx-auto mt-auto mb-10"
          onClick={agregarACasita}
          disabled={cargando} // Deshabilita el botón si está cargando
        >
          {cargando ? "En casita!..." : "Quiero adoptarlo"}
        </button>
        <p className="font-bold text-lg">
          Usuario Oferente: {publicacion.usuario.nombre}
        </p>
      </div>
      {mensajeExito && <div className="mensaje-exito bg-green-300 text-black m-auto ">{mensajeExito}</div>}
      {mensajeExito === null && (
        <div className="mensaje-error bg-red-200 text-white m-auto">{mensajeError}</div>
      )}
    </div>
  );
}
export default PerfilPublicacion;
