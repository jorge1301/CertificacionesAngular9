import { Component, OnInit } from '@angular/core';
import { CursoInternacionalService } from '../../services/service.index';
import { CursoInternacional } from '../../models/cursoInternacional.model';

@Component({
  selector: 'app-internacional',
  templateUrl: './internacional.component.html',
  styles: []
})
export class InternacionalComponent implements OnInit {
  internacionalLista: CursoInternacional[] = [];
  constructor(private internacionalService: CursoInternacionalService) { }

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.internacionalService.cargarCursoInternacional(0, 50)
    .subscribe((resp: any) => {
      this.internacionalLista = resp.internacional;
    });
  }

}
