import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Certificado } from '../../models/certificado.model';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificadosService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
   this.usuarioService.cargarStorage();
  }

  cargarCertificados(desde: number = 0) {
    const url = URL_SERVICIOS + '/certificado/certificados/';
    let params = new HttpParams();
    params = params.append('desde', desde.toString());
    params = params.append('token', this.usuarioService.token);
    return this.http.get(url, {params});
  }

  buscarCertificados(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/certificados/' + termino;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => resp.certificados));
  }

  eliminarCertificados(id: string) {
    let url = URL_SERVICIOS + '/certificado/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url);
  }

  crearCertificados(archivo: FormData, certificado: Certificado) {
    let url = URL_SERVICIOS + '/certificado';
    const data = {
      cedula: certificado.cedula,
      nombre: certificado.nombre
    };
    archivo.append('data', JSON.stringify(data));

    if (certificado._id !== 'nuevo') {
      url += '/' + certificado._id + '?token=' + this.usuarioService.token;
      return this.http.put(url, archivo).pipe(
        map((resp: any) => {
          Swal.fire('Certificado actualizado', ' ', 'success');
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
          Swal.fire('Certificado creado', ' ', 'success');
          return resp.certificadoDB;
        }),
        catchError(err => {
          Swal.fire('Error guardar', err.error.mensaje, 'error');
          return throwError(err);
        })
      );
    }
  }

  buscarCertificadosId(id: string) {
    const url = URL_SERVICIOS + '/certificado/' + id + '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.certificado;
      })
    );
  }

  descargarCertificado(cedula: string) {
    const url = URL_SERVICIOS + '/certificado/documento/';
    let params = new HttpParams();
    params = params.append('cedula', cedula.toString());
    return this.http.get(url, { params, responseType: 'blob' });
  }
}
