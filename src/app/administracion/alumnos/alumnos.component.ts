import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../services/service.index';
import { Alumno } from '../../models/alumno.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styles: []
})
export class AlumnosComponent implements OnInit {
  listaAlumnos: Alumno[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(private alumnoService: AlumnosService) { }

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.cargando = true;
    this.alumnoService.cargarAlumnos(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.listaAlumnos = resp.alumno;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarInformacion();
  }

  buscarInformacion(termino: string) {
    if (termino.length <= 0) {
      this.cargarInformacion();
      return;
    }
    this.cargando = true;
    this.alumnoService.buscarAlumnos(termino)
      .subscribe((alumnos: Alumno[]) => {
        this.listaAlumnos = alumnos;
        this.cargando = false;
      });
  }

  eliminarInformacion(alumno) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Usted va a eliminar este alumno',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.alumnoService.eliminarAlumnos(alumno._id)
          .subscribe((resp: any) => {
            Swal.fire('Alumno eliminado', 'El alumno a sido eliminado correctamente', 'success');
            this.totalRegistros--;
            if (this.desde === this.totalRegistros) {
              this.desde -= 5;
            }
            this.cargarInformacion();
          });
      }
    });
  }

}
