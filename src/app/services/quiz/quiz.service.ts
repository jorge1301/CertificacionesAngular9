import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { QuizGuardia } from '../../models/quizGuardia.model';
import { map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.usuarioService.cargarStorage();
   }

  cargarQuiz(desde: number = 0, limite: number = 5) {
    const url = URL_SERVICIOS + '/quizGuardia/';
    let params = new HttpParams();
    params = params.append('desde', desde.toString());
    params = params.append('limite', limite.toString());
    return this.http.get(url, { params });
  }

  buscarQuiz(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/quizGuardia/' + termino;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => resp.quizGuardia));

  }

  eliminarQuiz(id: string) {
    let url = URL_SERVICIOS + '/quizGuardia/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url);
  }

  buscarQuizId(id: string) {
    const url = URL_SERVICIOS + '/quizGuardia/' + id + '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.quiz;
      })
    );
  }

  quizAleatorio() {
    const url = URL_SERVICIOS + '/quizGuardia/aleatorio/';
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.quiz;
      })
    );
  }

  crearQuiz(quiz: QuizGuardia) {
    let url = URL_SERVICIOS + '/quizGuardia';
    if (quiz._id !== 'nuevo') {
      url += '/' + quiz._id + '?token=' + this.usuarioService.token;
      return this.http.put(url, quiz).pipe(
        map((resp: any) => {
          Swal.fire('Quiz', 'información actualizada', 'success');
        }),
        catchError(err => {
          Swal.fire('Error al actualizar', err.error.mensaje, 'error');
          return throwError(err);
        })
      );
    } else {
      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, quiz).pipe(
        map((resp: any) => {
          Swal.fire('Quiz', 'información creada', 'success');
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
