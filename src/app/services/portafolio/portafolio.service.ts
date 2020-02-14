import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Portafolio } from 'src/app/models/portafolio.model';
import { map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.usuarioService.cargarStorage();

   }

  cargarPortafolios(desde: number = 0) {
    const url = URL_SERVICIOS + '/portafolio?desde=' + desde;
    return this.http.get(url);
  }

  buscarPortafolios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/portafolio/' + termino;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
    map((resp: any) => resp.portafolio));
  }

  eliminarPortafolios(id: string) {
    let url = URL_SERVICIOS + '/portafolio/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url);

  }

  crearPortafolios(archivo: FormData, portafolio: Portafolio) {
    let url = URL_SERVICIOS + '/portafolio';
    const data = {
      titulo: portafolio.titulo,
      mision: portafolio.mision,
      vision: portafolio.vision,
      centro: portafolio.centro,
      requisitos: portafolio.requisitos,
      incluye: portafolio.incluye,
    };
    archivo.append('data', JSON.stringify(data));

    if (portafolio._id !== 'nuevo') {
      url += '/' + portafolio._id + '?token=' + this.usuarioService.token;
      return this.http.put(url, archivo).pipe(
        map((resp: any) => {
          Swal.fire('Portafolio actualizado', ' ', 'success');
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
          Swal.fire('Portafolio creado', ' ', 'success');
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
    const url = URL_SERVICIOS + '/portafolio/' + id + '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.portafolio;
      })
    );
  }
}

