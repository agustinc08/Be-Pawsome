import PublicacionRepository from "../repositorios/repositorioPublicacion.js";
import { PublicacionRequestError} from "../errores.js";
import PublicRequest from "../validacionRequest/publicRequest.js"
import { ObjectId } from 'mongodb';
import ServicioUsuario from "../servicios/serviceUsuarios.js";


class ServicioPublicacion {
  constructor() {
    this.repository = new PublicacionRepository();
    this.servicioUsuario = new ServicioUsuario();
  }

  async crearPublicacion(publicacion) {
    try {
      PublicRequest.validacionPublicacion(publicacion);      

      const publicacionCreada = await this.repository.crearPublicacion(publicacion);

      return publicacionCreada
    } catch (error) {
      throw new PublicacionRequestError("Error al crear publicación: " + error.message);
    }
  }

  async obtenerPublicacionPorId(idPublicacion) {
    const id = new ObjectId(idPublicacion);
    try {
      const publicacion = await this.repository.obtenerPublicacionPorId(id);
      if (!publicacion) {
        throw new PublicacionRequestError(`Publicación con ID ${idPublicacion} no encontrada`);
      }
      return publicacion;
    } catch (error) {
      return error
    }
  }

  async actualizarPublicacion(idPublicacion, nuevosDatos) {
    const id = new ObjectId(idPublicacion);
    try {
      PublicRequest.validacionPublicacion(nuevosDatos);
      const publicacionActualizada = await this.repository.actualizarPublicacion(id, nuevosDatos);
      return publicacionActualizada;
    } catch (error) {
      throw new PublicacionRequestError("Error al actualizar publicación: " + error.message);
    }
  }

  async eliminarPublicacion(idPublicacion) {
    const id = new ObjectId(idPublicacion);
    try {
      const publicacionEliminada = await this.repository.eliminarPublicacion(id);
      if (!publicacionEliminada) {
        throw new PublicacionRequestError(`Publicación con ID ${idPublicacion} no encontrada`);
      }
      return publicacionEliminada;
    } catch (error) {
      throw new PublicacionRequestError("Error al eliminar publicación: " + error.message);
    }
  }


  async publicaciones() {
    try {
      const array = await this.repository.publicaciones(); 
      return array     
    } catch (error) {
      throw new PublicacionRequestError("No se encontraron publicaciones: " + error.message);
    }
  }

  async publicacionesUsuario(idUsuario) {
    try {
      const array = await this.repository.publicacionesUsuario(idUsuario);
      return array.length > 0 ? array : { "message": "Sin publicaciones disponibles" };
    } catch (error) {
      throw new PublicacionRequestError("No se encontraron publicaciones: " + error.message);
    }
  }

  async publicacionesPorString(string) {
    try {
      if (!string) {
        return res.status(400).json({ message: 'Falta el parámetro de consulta "search".' });
      }
      const result = await this.repository.publicacionesPorString(string);
      return result.length > 0 ? result : {"message": "Sin publicaciones disponibles"};  
    } catch (error) {
      throw new PublicacionRequestError("No se encontraron publicaciones: " + error.message);
    }
  }

  async publicacionesPorString(string) {
    try {
      if (!string) {
        return res.status(400).json({ message: 'Falta el parámetro de consulta "search".' });
      }
      const result = await this.repository.publicacionesPorString(string);
      return result.length > 0 ? result : {"message": "Sin publicaciones disponibles"};  
    } catch (error) {
      throw new PublicacionRequestError("No se encontraron publicaciones: " + error.message);
    }
  }
  
  async adoptar(idAdoptante, idOferente) {
    try {
      const [userAdoptante, userOferente] = await Promise.all([
        this.servicioUsuario.obtenerUsuario(idAdoptante),
        this.servicioUsuario.obtenerUsuario(idOferente)
      ]);

      const users = [userAdoptante, userOferente];
      return users;
    } catch (error) {
      throw new PublicacionRequestError("Error: " + error.message);
    }
  }
}

export default ServicioPublicacion;
