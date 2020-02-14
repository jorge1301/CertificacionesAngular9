import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: string | ArrayBuffer;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardarUsuario(usuario: Usuario) {
    const formData = new FormData();
    if (this.imagenSubir) {
    formData.append('imagen', this.imagenSubir, this.imagenSubir.name);
    }
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    this.usuarioService.actualizarUsuario(formData, this.usuario)
    .subscribe(data => {
      this.usuario = data;
    });
  }

  seleccionarImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemporal  = reader.result;
  }

}
