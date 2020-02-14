import { Component, OnInit } from '@angular/core';
import { CursoAvanzadoService } from '../../services/service.index';
import { CursoAvanzado } from '../../models/cursoAvanzado.model';

@Component({
  selector: 'app-avanzado',
  templateUrl: './avanzado.component.html',
  styles: []
})
export class AvanzadoComponent implements OnInit {
  avanzadoLista: CursoAvanzado[] = [];
  constructor(private avanzadoService: CursoAvanzadoService) { }

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.avanzadoService.cargarCursoAvanzado(0, 50)
      .subscribe((resp: any) => {
        this.avanzadoLista = resp.avanzado;
      });
  }

}
