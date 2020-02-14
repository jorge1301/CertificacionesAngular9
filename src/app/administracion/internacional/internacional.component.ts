import { Component, OnInit } from '@angular/core';
import { CursoInternacionalService } from '../../services/service.index';
import { CursoInternacional } from '../../models/cursoInternacional.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-internacional',
  templateUrl: './internacional.component.html',
  styles: []
})
export class InternacionalComponent implements OnInit {
  cursoInternacional: CursoInternacional[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(private internacionalService: CursoInternacionalService) { }

  ngOnInit() {
    this.cargarCursos();
  }

  cargarCursos() {
    this.cargando = true;
    this.internacionalService.cargarCursoInternacional(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.cursoInternacional = resp.internacional;
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
    this.cargarCursos();
  }

  buscarCurso(termino: string) {
    if (termino.length <= 0) {
      this.cargarCursos();
      return;
    }
    this.cargando = true;
    this.internacionalService.buscarCursoInternacional(termino)
      .subscribe((internacional: CursoInternacional[]) => {
        this.cursoInternacional = internacional;
        this.cargando = false;
      });
  }

  eliminarCurso(internacional) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Usted va a eliminar el curso internacional',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.internacionalService.eliminarCursoInternacional(internacional._id)
          .subscribe((resp: any) => {
            Swal.fire('Curso eliminado', 'El curso internacional a sido eliminado correctamente', 'success');
            this.totalRegistros--;
            if (this.desde === this.totalRegistros) {
              this.desde -= 5;
            }
            this.cargarCursos();
          });
      }
    });
  }
}
