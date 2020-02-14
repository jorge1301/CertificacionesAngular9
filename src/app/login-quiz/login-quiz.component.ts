import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnosService } from '../services/service.index';
import { Alumno } from '../models/alumno.model';
import Swal from 'sweetalert2';
declare function init_plugins();

@Component({
  selector: 'app-login-quiz',
  templateUrl: './login-quiz.component.html',
  styles: []
})
export class LoginQuizComponent implements OnInit {
  alumno = new Alumno();
  quiz = '';
  cedula = '';
  constructor(private router: Router, private alumnoService: AlumnosService) { }
  ngOnInit() {
    init_plugins();
  }
  login(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this.cedula = f.value.cedula;
    this.quiz = f.value.quiz;
    this.alumnoService.buscarAlumnoCedula(this.cedula)
      .subscribe((resp) => {
        this.alumno = resp;
        if (this.alumno.estado === false) {
          Swal.fire('Lo sentimos', 'Al momento no puede realizar la prueba', 'error');
          return;
        }
        if (this.alumno.quiz !== this.quiz) {
          Swal.fire('Lo sentimos', 'Usted no esta matriculado en este modulo', 'error');
          return;
        }
        localStorage.setItem('alumno', JSON.stringify(this.alumno));
        this.router.navigate(['/quiz']);
      }, (err) => {
        Swal.fire('Error', err.error.mensaje, 'error');
      });
  }
}
