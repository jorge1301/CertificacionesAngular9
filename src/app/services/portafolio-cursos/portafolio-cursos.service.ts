import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { PortafolioCurso } from '../../models/portafolioCurso.model';
import { UsuarioService } from '../usuario/usuario.service';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PortafolioCursosService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.usuarioService.cargarStorage();
  }

  cargarPortafoliosCursos(desde: number = 0, limite: number = 5) {
    const url = URL_SERVICIOS + '/portafolio-curso/';
    let params = new HttpParams();
    params = params.append('desde', desde.toString());
    params = params.append('limite', limite.toString());
    return this.http.get(url);
  }

  buscarPortafoliosCursos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/portafolioCursos/' + termino;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => resp.portafolioCursos));
  }

  eliminarPortafoliosCursos(id: string) {
    let url = URL_SERVICIOS + '/portafolio-curso/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url);
  }

  crearPortafoliosCursos(archivo: FormData, portafolioCurso: PortafolioCurso) {
    let url = URL_SERVICIOS + '/portafolio-curso';
    const data = {
      curso: portafolioCurso.curso,
      informacion: portafolioCurso.informacion,
    };
    archivo.append('data', JSON.stringify(data));

    if (portafolioCurso._id !== 'nuevo') {
      url += '/' + portafolioCurso._id + '?token=' + this.usuarioService.token;
      return this.http.put(url, archivo).pipe(
        map((resp: any) => {
          Swal.fire('Curso del portafolio actualizado', ' ', 'success');
        }),
        catchError(err => {
          Swal.fire('Error al actualizar', err.error.mensaje, 'error');
          return throwError(err);
        })
      );
    } else {
      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, archivo).pipe(
        map((resp: any) => {
          Swal.fire('Curso del portafolio creado', ' ', 'success');
          return resp.portafolioDB;
        }),
        catchError(err => {
          Swal.fire('Error guardar', err.error.mensaje, 'error');
          return throwError(err);
        })
      );
    }
  }

  buscarPortafolioId(id: string) {
    const url = URL_SERVICIOS + '/portafolio-curso/' + id + '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.portafolioCursoDB;
      })
    );
  }
}
