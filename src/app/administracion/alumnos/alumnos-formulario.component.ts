import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../services/service.index';
import { Alumno } from '../../models/alumno.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-alumnos-formulario',
  templateUrl: './alumnos-formulario.component.html',
  styles: []
})
export class AlumnosFormularioComponent implements OnInit {
  alumno: Alumno = new Alumno();
  id: string;
  condicion = false;
  quiz = '';
  estado = false;

  constructor(
    private alumnoService: AlumnosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id !== 'nuevo') {
        this.condicion = true;
        this.buscarInformacion(this.id);
      }
    });
  }

  ngOnInit() {
  }

  crearAlumno(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    this.alumno = formulario.value;
    this.alumno.estado = this.estado;
    this.alumno.quiz = this.quiz;
    this.alumno._id = this.id;
    this.alumnoService.crearAlumnos(this.alumno)
      .subscribe(() => {
        this.router.navigate(['administracion/alumnos']);
      }
      );
  }

  buscarInformacion(id) {
    this.alumnoService.buscarAlumnoId(id)
      .subscribe((alumno: any) => {
        this.alumno = alumno;
        this.quiz = alumno.quiz;
        this.estado = alumno.estado;
      });
  }

}
