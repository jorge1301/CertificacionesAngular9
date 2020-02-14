import { Component, OnInit } from '@angular/core';
import { AgenciaService } from '../../services/service.index';
import { Agencia } from '../../models/agencia.model';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styles: []
})
export class AgenciasComponent implements OnInit {
agenciaLista: Agencia[] = [];

  constructor(private agenciaService: AgenciaService) { }

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.agenciaService.cargarAgencias(0, 0)
    .subscribe((resp: any) => {
      this.agenciaLista = resp.agencia;
    });
  }

}
