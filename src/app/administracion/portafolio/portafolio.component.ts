import { Component, OnInit } from '@angular/core';
import { Portafolio } from '../../models/portafolio.model';
import { PortafolioService } from '../../services/service.index';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styles: []
})
export class PortafolioComponent implements OnInit {
  portafolios: Portafolio[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(private portafolioService: PortafolioService) { }

  ngOnInit() {
    this.cargarPortafolio();
  }

  cargarPortafolio() {
    this.cargando = true;
    this.portafolioService.cargarPortafolios(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.portafolios = resp.portafolio;
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
    this.cargarPortafolio();
  }

  buscarPortafolio(termino: string) {
    if (termino.length <= 0) {
      this.cargarPortafolio();
      return;
    }
    this.cargando = true;
    this.portafolioService.buscarPortafolios(termino)
      .subscribe((portafolio: Portafolio[]) => {
        this.portafolios = portafolio;
        this.cargando = false;
      });
  }

  eliminarPortafolio(portafolio) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Usted va a eliminar el portafolio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.portafolioService.eliminarPortafolios(portafolio._id)
          .subscribe((resp: any) => {
            Swal.fire('Portafolio eliminado', 'El portafolio a sido eliminado correctamente', 'success');
            this.cargarPortafolio();
          });
      }
    });


  }

}
