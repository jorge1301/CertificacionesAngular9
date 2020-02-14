import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { CursoInternacional } from '../../models/cursoInternacional.model';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoInternacionalService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.usuarioService.cargarStorage();
   }

  cargarCursoInternacional(desde: number = 0, limite: number = 5) {
    const url = URL_SERVICIOS + '/internacional/';
    let params = new HttpParams();
    params = params.append('desde', desde.toString());
    params = params.append('limite', limite.toString());
    return this.http.get(url, { params });
  }

  buscarCursoInternacional(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/internacionales/' + termino;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => resp.internacionales));

  }

  eliminarCursoInternacional(id: string) {
    let url = URL_SERVICIOS + '/internacional/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url);

  }

  eliminarProgramacionInternacional(id: string, idProgramacion: string) {
    const url = URL_SERVICIOS + '/internacional/eliminar/programacion';
    let params = new HttpParams();
    params = params.append('id', id.toString());
    params = params.append('idProgramacion', idProgramacion.toString());
    return this.http.delete(url, { params });
  }

  crearCursosInternacionales(archivo: FormData, internacional: CursoInternacional) {
    let url = URL_SERVICIOS + '/internacional';
    const data = {
      titulo: internacional.titulo,
      imagen: internacional.imagen,
      direccion: internacional.direccion,
      fecha: internacional.fecha,
      descripcion: internacional.descripcion,
      requisitos: internacional.requisitos,
      proposito: internacional.proposito,
      metodologia: internacional.metodologia,
      valor: internacional.valor,
      incluye: internacional.incluye,
      programacion: internacional.programacion
    };
    archivo.append('data', JSON.stringify(data));

    if (internacional._id !== 'nuevo') {
      url += '/' + internacional._id + '?token=' + this.usuarioService.token;
      return this.http.put(url, archivo).pipe(
        map((resp: any) => {
          Swal.fire('Curso internacional actualizado', ' ', 'success');
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
          Swal.fire('Curso internacional creado', ' ', 'success');
          return resp.internacionalDB;
        }),
        catchError(err => {
          Swal.fire('Error guardar', err.error.mensaje, 'error');
          return throwError(err);
        })
      );
    }
  }

  buscarCursoInternacionalId(id: string) {
    const url = URL_SERVICIOS + '/internacional/' + id + '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.internacional;
      })
    );
  }
}
