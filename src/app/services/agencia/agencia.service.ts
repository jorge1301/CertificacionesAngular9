import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Agencia } from '../../models/agencia.model';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.usuarioService.cargarStorage();

  }

  cargarAgencias(desde: number = 0, limite: number = 5) {
    const url = URL_SERVICIOS + '/agencia/';
    let params = new HttpParams();
    params = params.append('desde', desde.toString());
    params = params.append('limite', limite.toString());
    return this.http.get(url, {params});
  }

  buscarAgencias(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/agencias/' + termino;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => resp.agencias));

  }

  eliminarAgencias(id: string) {
    let url = URL_SERVICIOS + '/agencia/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url);
  }

  crearAgencias(archivo: FormData, agencia: Agencia) {
    let url = URL_SERVICIOS + '/agencia';
    const data = {
      informacion: agencia.informacion
    };
    archivo.append('data', JSON.stringify(data));

    if (agencia._id !== 'nuevo') {
      url += '/' + agencia._id + '?token=' + this.usuarioService.token;
      return this.http.put(url, archivo).pipe(
        map((resp: any) => {
          Swal.fire('Agencia actualizada', ' ', 'success');
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
          Swal.fire('Agencia creada', ' ', 'success');
          return resp.agenciaDB;
        }),
        catchError(err => {
          Swal.fire('Error guardar', err.error.mensaje, 'error');
          return throwError(err);
        })
      );
    }
  }

  buscarAgenciaId(id: string) {
    const url = URL_SERVICIOS + '/agencia/' + id + '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe (
      map((resp: any) => {
        return resp.agencia;
      })
    );
  }
}
