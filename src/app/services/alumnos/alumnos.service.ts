import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Alumno } from '../../models/alumno.model';
import { map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.usuarioService.cargarStorage();
   }

  cargarAlumnos(desde: number = 0, limite: number = 5) {
    const url = URL_SERVICIOS + '/alumno/';
    let params = new HttpParams();
    params = params.append('desde', desde.toString());
    params = params.append('limite', limite.toString());
    return this.http.get(url, { params });
  }

  buscarAlumnos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/alumno/' + termino;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => resp.alumno));
  }

  buscarAlumnoCedula(cedula: string) {
    const url = URL_SERVICIOS + '/alumno/informacion/' + cedula;
    return this.http.get(url).pipe(
      map((resp: any) => resp.alumno));
  }

  eliminarAlumnos(id: string) {
    let url = URL_SERVICIOS + '/alumno/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url);
  }

  buscarAlumnoId(id: string) {
    const url = URL_SERVICIOS + '/alumno/' + id + '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.alumno;
      })
    );
  }

  actualizarAciertos(alumno: Alumno) {
    const url = URL_SERVICIOS + '/alumno/aciertos/' + alumno._id;
    return this.http.put(url, alumno).pipe(
      catchError(err => {
        Swal.fire('Error al actualizar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );

  }

  crearAlumnos(alumno: Alumno) {
    let url = URL_SERVICIOS + '/alumno';
    if (alumno._id !== 'nuevo') {
      url += '/' + alumno._id + '?token=' + this.usuarioService.token;
      return this.http.put(url, alumno).pipe(
        map((resp: any) => {
          Swal.fire('Alumno', 'información actualizada', 'success');
        }),
        catchError(err => {
          Swal.fire('Error al actualizar', err.error.mensaje, 'error');
          return throwError(err);
        })
      );
    } else {
      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, alumno).pipe(
        map((resp: any) => {
          Swal.fire('Alumno', 'información creada', 'success');
          return resp.alumnoDB;
        }),
        catchError(err => {
          Swal.fire('Error al guardar', err.error.mensaje, 'error');
          return throwError(err);
        })
      );
    }
  }
}
