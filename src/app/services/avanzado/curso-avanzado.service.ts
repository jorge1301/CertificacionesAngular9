import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { CursoAvanzado } from '../../models/cursoAvanzado.model';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoAvanzadoService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.usuarioService.cargarStorage();
   }

  cargarCursoAvanzado(desde: number = 0, limite: number = 5) {
    const url = URL_SERVICIOS + '/avanzado/';
    let params = new HttpParams();
    params = params.append('desde', desde.toString());
    params = params.append('limite', limite.toString());
    return this.http.get(url, {params});
  }

  buscarCursoAvanzado(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/avanzados/' + termino;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => resp.avanzados));
  }

  eliminarCursoAvanzado(id: string) {
    let url = URL_SERVICIOS + '/avanzado/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url);
  }

  eliminarProgramacionAvanzada(id: string , idProgramacion: string) {
    const url = URL_SERVICIOS + '/avanzado/eliminar/programacion';
    let params = new HttpParams();
    params = params.append('id', id.toString());
    params = params.append('idProgramacion', idProgramacion.toString());
    return this.http.delete(url, { params });
  }

  crearCursosAvanzados(archivo: FormData, avanzado: CursoAvanzado) {
    let url = URL_SERVICIOS + '/avanzado';
    const data = {
      titulo: avanzado.titulo,
      imagen: avanzado.imagen,
      direccion: avanzado.direccion,
      fecha: avanzado.fecha,
      descripcion: avanzado.descripcion,
      requisitos: avanzado.requisitos,
      proposito: avanzado.proposito,
      metodologia: avanzado.metodologia,
      valor: avanzado.valor,
      incluye: avanzado.incluye,
      programacion: avanzado.programacion
    };
    archivo.append('data', JSON.stringify(data));

    if (avanzado._id !== 'nuevo') {
      url += '/' + avanzado._id + '?token=' + this.usuarioService.token;
      return this.http.put(url, archivo).pipe(
        map((resp: any) => {
          Swal.fire('Curso avanzado actualizado', ' ', 'success');
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
          Swal.fire('Curso avanzado creado', ' ', 'success');
          return resp.avanzadoDB;
        }),
        catchError(err => {
          Swal.fire('Error guardar', err.error.mensaje, 'error');
          return throwError(err);
        })
      );
    }
  }

  buscarCursoAvanzadoId(id: string) {
    const url = URL_SERVICIOS + '/avanzado/' + id + '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.avanzado;
      })
    );
  }
}
