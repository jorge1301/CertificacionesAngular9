import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  enviarUsuario: EventEmitter<Usuario> = new EventEmitter();
  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        console.log('token renovado');
        return true;
      }),
      catchError(err => {
        this.router.navigate(['/login']);
        Swal.fire('No fue posible renovar el token', 'Vuelva a iniciar sesión', 'error');
        return throwError(err);
      })
    );
  }

  validarLogin() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false) {
    const url = URL_SERVICIOS + '/login';
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuarioDB);
        return true;
      }),
       catchError(err => {
        Swal.fire('Error en el login', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  actualizarUsuario(archivo: FormData, usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    const data = {
        nombre: usuario.nombre,
        email: usuario.email
      };
    archivo.append('data', JSON.stringify(data));
    url += '?token=' + this.token;
    return this.http.put(url, archivo).pipe(
      map((resp: any) => {
        const usuarioDB: Usuario = resp.usuarioGuardado;
        this.usuario.imagen = usuarioDB.imagen;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        Swal.fire('Usuario actualizado', usuario.nombre, 'success');
        this.enviarUsuario.emit(this.usuario);
        return this.usuario;
      })
    );
  }

  informacionHeaderSidebar() {
    return this.enviarUsuario;
  }
}
