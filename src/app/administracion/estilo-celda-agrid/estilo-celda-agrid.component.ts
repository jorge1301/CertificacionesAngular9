import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-estilo-celda-agrid',
  templateUrl: './estilo-celda-agrid.component.html',
  styles: []
})
export class EstiloCeldaAgridComponent implements OnInit, ICellRendererAngularComp {
public cellValue: any;
  constructor() { }

  ngOnInit() {
  }

  agInit(params: any) {
    this.cellValue = params.value;
  }

  refresh(params: any): boolean {
    this.cellValue = params.value;
    return true;
  }

}
