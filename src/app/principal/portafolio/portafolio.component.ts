import { Component, OnInit, ViewChild } from '@angular/core';
import { PortafolioService, PortafolioCursosService } from '../../services/service.index';
import { Portafolio } from '../../models/portafolio.model';
import { PortafolioCurso } from '../../models/portafolioCurso.model';
declare function init_plugins();

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styles: []
})
export class PortafolioComponent implements OnInit {
  portafoliosLista: Portafolio[] = [];
  portafolioCursoLista: PortafolioCurso[] = [];

  constructor(private portafolioService: PortafolioService, private portafolioCursoService: PortafolioCursosService) {
   }

  ngOnInit() {
    init_plugins();
    this.cargarInformacion();
    this.listaPortafolioCursos();
  }

  cargarInformacion() {
    this.portafolioService.cargarPortafolios()
    .subscribe((resp: any) => {
      this.portafoliosLista = resp.portafolio;
    });
  }

  listaPortafolioCursos() {
    this.portafolioCursoService.cargarPortafoliosCursos(0, 50)
      .subscribe((resp: any) => {
        this.portafolioCursoLista = resp.portafolioCursoDB;
      });
  }

}
