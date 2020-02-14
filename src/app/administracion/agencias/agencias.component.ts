import { Component, OnInit } from '@angular/core';
import { AgenciaService } from '../../services/service.index';
import { Agencia } from '../../models/agencia.model';
import Swal from 'sweetalert2';
import { editorConfig } from '../../config/editor';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styles: []
})
export class AgenciasComponent implements OnInit {
  agencia: Agencia[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  configuraciones = editorConfig;

  constructor(private agenciaService: AgenciaService) {
  }

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.cargando = true;
    this.agenciaService.cargarAgencias(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.agencia = resp.agencia;
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
    this.agenciaService.buscarAgencias(termino)
      .subscribe((agencias: Agencia[]) => {
        this.agencia = agencias;
        this.cargando = false;
      });
  }

  eliminarInformacion(fila) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Usted va a eliminar una agencia',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.agenciaService.eliminarAgencias(fila._id)
          .subscribe((resp: any) => {
            Swal.fire('Agencia eliminada', 'La agencia a sido eliminada correctamente', 'success');
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
