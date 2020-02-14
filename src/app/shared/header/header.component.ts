import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  constructor(private usuarioService: UsuarioService) {
    this.nuevaInformacion();
  }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }
  nuevaInformacion() {
    this.usuarioService.informacionHeaderSidebar()
      .subscribe(informacion => {
        this.usuario = informacion;
      });
  }

  cerrarSesion() {
    this.usuarioService.logout();
  }
}
