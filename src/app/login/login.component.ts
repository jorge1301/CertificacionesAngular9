import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recordar = false;
  email: string;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recordar = true;
    }
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this.usuarioService.login(usuario, forma.value.recordar)
      .subscribe(resp => this.router.navigate(['administracion/portafolio']));
  }
}
