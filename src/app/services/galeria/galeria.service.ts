import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Galeria } from '../../models/galeria.model';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.usuarioService.cargarStorage();
  }

  cargarGalerias(desde: number = 0, limite: number = 5) {
    const url = URL_SERVICIOS + '/galeria/';
    let params = new HttpParams();
    params = params.append('desde', desde.toString());
    params = params.append('limite', limite.toString());
    return this.http.get(url, {params});
  }

  buscarGalerias(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/galeria/' + termino;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => resp.galeria));

  }

  eliminarGalerias(id: string) {
    let url = URL_SERVICIOS + '/galeria/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url);
  }

  crearGalerias(archivo: FormData, galeria: Galeria) {
    let url = URL_SERVICIOS + '/galeria';
    const data = {
      informacion: galeria.informacion
    };
    archivo.append('data', JSON.stringify(data));

    if (galeria._id !== 'nuevo') {
      url += '/' + galeria._id + '?token=' + this.usuarioService.token;
      return this.http.put(url, archivo).pipe(
        map((resp: any) => {
          Swal.fire('Galeria actualizada', ' ', 'success');
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
          Swal.fire('Galeria creada', ' ', 'success');
          return resp.galeriaDB;
        }),
        catchError(err => {
          Swal.fire('Error guardar', err.error.mensaje, 'error');
          return throwError(err);
        })
      );
    }
  }

  buscarGaleriasId(id: string) {
    const url = URL_SERVICIOS + '/galeria/' + id + '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.galeria;
      })
    );
  }
}
