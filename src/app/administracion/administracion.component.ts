import { Component, OnInit } from '@angular/core';
declare function init_plugins();


@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styles: []
})
export class AdministracionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
