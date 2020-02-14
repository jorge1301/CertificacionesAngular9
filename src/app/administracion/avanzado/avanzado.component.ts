import { Component, OnInit } from '@angular/core';
import { CursoAvanzadoService } from '../../services/service.index';
import { CursoAvanzado } from '../../models/cursoAvanzado.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-avanzado',
  templateUrl: './avanzado.component.html',
  styles: []
})
export class AvanzadoComponent implements OnInit {
  cursoAvanzado: CursoAvanzado[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor( private avanzadoService: CursoAvanzadoService) { }

  ngOnInit() {
    this.cargarCursos();
  }

  cargarCursos() {
    this.cargando = true;
    this.avanzadoService.cargarCursoAvanzado(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.cursoAvanzado = resp.avanzado;
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
    this.avanzadoService.buscarCursoAvanzado(termino)
      .subscribe((avanzado: CursoAvanzado[]) => {
        this.cursoAvanzado = avanzado;
        this.cargando = false;
      });
  }

  eliminarCurso(avanzado) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Usted va a eliminar el curso avanzado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.avanzadoService.eliminarCursoAvanzado(avanzado._id)
          .subscribe((resp: any) => {
            Swal.fire('Curso eliminado', 'El curso avanzado a sido eliminado correctamente', 'success');
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
