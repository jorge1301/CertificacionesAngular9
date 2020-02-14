import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../services/service.index';
import { Galeria } from '../../models/galeria.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styles: []
})
export class GaleriaComponent implements OnInit {
  galeria: Galeria[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(private galeriaService: GaleriaService) { }

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.cargando = true;
    this.galeriaService.cargarGalerias(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.galeria = resp.galeria;
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
    this.galeriaService.buscarGalerias(termino)
      .subscribe((galerias: Galeria[]) => {
        this.galeria = galerias;
        this.cargando = false;
      });
  }

  eliminarInformacion(agencia) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Usted va a eliminar la galeria',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.galeriaService.eliminarGalerias(agencia._id)
          .subscribe((resp: any) => {
            Swal.fire('Galeria eliminada', 'La galeria a sido eliminada correctamente', 'success');
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
