import { Component, OnInit } from '@angular/core';
import { PortafolioCursosService } from '../../services/service.index';
import { PortafolioCurso } from '../../models/portafolioCurso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portafolio-cursos',
  templateUrl: './portafolio-cursos.component.html',
  styles: []
})
export class PortafolioCursosComponent implements OnInit {
  portafoliosCursos: PortafolioCurso[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(private portafolioCursoService: PortafolioCursosService) { }

  ngOnInit() {
    this.cargarPortafoliosCursos();
  }

  cargarPortafoliosCursos() {
    this.cargando = true;
    this.portafolioCursoService.cargarPortafoliosCursos(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.portafoliosCursos = resp.portafolioCursoDB;
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
    this.cargarPortafoliosCursos();
  }

  buscarPortafolioCursos(termino: string) {
    if (termino.length <= 0) {
      this.cargarPortafoliosCursos();
      return;
    }
    this.cargando = true;
    this.portafolioCursoService.buscarPortafoliosCursos(termino)
      .subscribe((portafolio: PortafolioCurso[]) => {
        this.portafoliosCursos = portafolio;
        this.cargando = false;
      });
  }

  eliminarPortafolioCursos(portafolio) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Usted va a eliminar el curso del portafolio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.portafolioCursoService.eliminarPortafoliosCursos(portafolio._id)
          .subscribe((resp: any) => {
            Swal.fire('Curso eliminado', 'El curso del portafolio a sido eliminado correctamente', 'success');
            this.totalRegistros--;
            if (this.desde === this.totalRegistros) {
              this.desde -= 5;
            }
            this.cargarPortafoliosCursos();
          });
      }
    });
  }
}
