import axios from 'axios';


export const login = async (datos) => {
  try {
    const response = await axios.post('http://localhost:5000/usuarios/login', datos);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Captura y lanza el error para que sea manejado por el componente
  }
}

export const recuperacionContrasenia = async (mail) => {
  try {
    return await axios.post('http://localhost:5000/usuarios/changePassword', mail);
  } catch (error) {
    throw error
  }
}

export const getPublicaciones = async () => {
  try {
    const res = await fetch ("http://localhost:5000/publicacion/publicaciones", {
       cache: 'no-store',         next: {            
        validate: 0 // uso 0 para no tener nada en el cache y hacer siempre un fetch       
       }      });     
    return res.json()
  } catch (error) {
    return new Error('Error al obtener las publicaciones.' + error); 
  }
}


export const obtenerUsuarioLogeado = async () => {
  try {
    // Verificar si sessionStorage está disponible
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const usuarioEnSesion = JSON.parse(sessionStorage.getItem('user'));
      
      if (usuarioEnSesion && usuarioEnSesion._id) {
        const idUsuario = usuarioEnSesion._id;
        const response = await axios.get(`http://localhost:5000/usuarios/${idUsuario}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });

        return { usuario: response.data, error: null };
      } else {
        return { usuario: null, error: 'No se pudo obtener el ID del usuario de la sesión.' };
      }
    } else {
      return { usuario: null, error: 'sessionStorage no está disponible.' };
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error al cargar los datos del usuario.'); // Captura y lanza el error para que sea manejado por el componente
  }
};

export const obtenerPublicacionesDelUsuario = async (usuarioId) => {
  try {
    const response = await fetch(`http://localhost:5000/publicacion/publicacionesUsuario/${usuarioId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}` // Incluye el token de autenticación en los headers
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { publicaciones: data };
    } else {
      throw new Error('Error al obtener las publicaciones del usuario');
    }
  } catch (error) {
    throw new Error('Error al obtener las publicaciones del usuario.'); // Captura y lanza el error para que sea manejado por el componente
  }
};

export const editarImagenUsuario = async (id,imagenPerfil) => {
  try {
    const usuarioEditado = await axios.put(`http://localhost:5000/usuarios/editarImagen/${id}`, imagenPerfil);
    return usuarioEditado
  } catch (error) {
    throw error
  }
}

export const editarUsuario = async (usuarioId, nuevosDatos) => {
  try {
    const usuarioEditado = await axios.put(`http://localhost:5000/usuarios/${usuarioId}`, nuevosDatos);

    // Actualizar la información del usuario en sessionStorage
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const usuarioEnSesion = JSON.parse(sessionStorage.getItem('user'));
      if (usuarioEnSesion) {
        // Actualizar solo los campos editados
        sessionStorage.setItem('user', JSON.stringify({ ...usuarioEnSesion,...usuarioEditado}));
      }
    }
    return usuarioEditado;
  } catch (error) {
    console.error(error);
    throw error; // Captura y lanza el error para que sea manejado por el componente
  }
};

export const solicitar = async (datos) =>{
  try {
    const response = await axios.post('http://localhost:5000/publicacion/solicitar', datos);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Captura y lanza el error para que sea manejado por el componente
  }
}

export const eliminarSolicitudDeUsuario = async (idUsuario, publicacionId) => {
  try {
    const res = await axios.delete(`http://localhost:5000/usuarios/eliminarSolicitud/${idUsuario}`, {
      data: { publicacionId }, // Pasar publicacionId en el cuerpo de la solicitud
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const eliminarPublicacion = async (publicacionId) => {
  try {
    const res = await axios.delete(`http://localhost:5000/publicacion/eliminar/${publicacionId}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const crearAnimal = async (datosAnimal) =>{
  try{
    const response = await axios.post('http://localhost:5000/animal/crear', datosAnimal,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}` // Inclirts el token de autenticación en los headers
      },
    });
    return response.data;
  }catch(error){
    console.error(error);
    throw error;
  }
}

export const crearPublicacion = async (datos) => {
  try{
    const response = await axios.post('http://localhost:5000/publicacion/crear', datos,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}` // Inclirts el token de autenticación en los headers
      },
    });
    return response.data;
  }catch(error){
    console.error(error);
    throw error;
  }
}
