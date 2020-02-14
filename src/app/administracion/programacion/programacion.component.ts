import { Component, OnInit } from '@angular/core';
import { editorConfig } from '../../config/editor';
import { CursoInternacional } from '../../models/cursoInternacional.model';
import { CursoAvanzado } from '../../models/cursoAvanzado.model';
import { CursoInternacionalService, CursoAvanzadoService } from '../../services/service.index';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { EstiloCeldaAgridComponent } from '../estilo-celda-agrid/estilo-celda-agrid.component';
import { gridOptions } from '../../config/opcionesGrid';

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styles: []
})
export class ProgramacionComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public columnDefs;
  public frameworkComponents;
  gridOpciones = gridOptions;
  configuraciones = editorConfig;

  avanzado: CursoAvanzado = new CursoAvanzado();
  internacional: CursoInternacional = new CursoInternacional();
  listaAvanzado: CursoAvanzado[] = [];
  listaInternacional: CursoInternacional[] = [];
  programacion: [{}] = [{}];
  cursoAvanzado = '';
  cursoInternacional = '';
  dia: string;
  informacion: string;
  cursoElegido: string;
  rowData: string;
  constructor(
    private internacionalService: CursoInternacionalService,
    private avanzadoService: CursoAvanzadoService,
    private router: Router
    ) {
    this.columnDefs = [
      { headerName: 'Día', field: 'dia', rowDrag: true, cellRenderer: 'configuracionEstilo' },
      { headerName: 'Información', field: 'informacion', cellRenderer: 'configuracionEstilo' }
    ];
    this.frameworkComponents = {
      configuracionEstilo: EstiloCeldaAgridComponent
    };
  }

  ngOnInit() {
    this.cursoAvanzadoListado();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  limpiarDatos() {
    this.dia = '';
    this.informacion = '';
  }

  enviarModeloInternacional(idCurso: any) {
    if (idCurso === '') {
      return;
    }
    this.internacionalService.buscarCursoInternacionalId(idCurso)
    .subscribe((internacional) => {
      this.internacional = internacional;
      this.cursoElegido = 'Internacional';
      this.llenarTabla(this.internacional);
    });
  }

  enviarModeloAvanzado(idCurso: any) {
    if (idCurso === '') {
      return;
    }
    this.avanzadoService.buscarCursoAvanzadoId(idCurso)
    .subscribe((avanzado) => {
      this.avanzado = avanzado;
      this.cursoElegido = 'Avanzado';
      this.llenarTabla(this.avanzado);
    });
  }

  crearProgramacion() {
    if (this.gridApi.getDisplayedRowCount() < 1) {
      Swal.fire('Programación vacia', 'Se debe agregar la programación para guardar', 'error');
      return;
    }
    if (this.cursoElegido === 'Avanzado'){
      this.obtenerTabla(this.cursoElegido);
      const formData = new FormData();
      this.avanzadoService.crearCursosAvanzados(formData, this.avanzado)
      .subscribe(() => {
        this.router.navigate(['administracion/programacion']);
      });
    }
    if (this.cursoElegido === 'Internacional') {
      this.obtenerTabla(this.cursoElegido);
      const formData = new FormData();
      this.internacionalService.crearCursosInternacionales(formData, this.internacional)
        .subscribe(() => {
          this.router.navigate(['administracion/programacion']);
        });
    }
    this.limpiarDatos();
    this.gridApi.setRowData();
  }

  obtenerTabla(tipo: string) {
    if (this.gridApi.getDisplayedRowCount() < 1) {
      Swal.fire('Programación vacia', 'Se debe agregar la programación para guardar', 'error');
      return;
    }
    this.gridApi.forEachNode((node, index) => {
      let dato = 1;
      dato++;
      if (tipo === 'Internacional') {
        this.internacional.programacion.splice(index, dato - 1, node.data);
      } else if (tipo === 'Avanzado') {
        this.avanzado.programacion.splice(index, dato - 1, node.data);
      }
    });
  }


  cursoAvanzadoListado() {
    this.listaInternacional = null;
    this.avanzadoService.cargarCursoAvanzado(0, 50)
      .subscribe((resp: any) => {
        this.listaAvanzado = resp.avanzado;
      });
  }

  cursoInternacionalListado() {
    this.listaAvanzado = null;
    this.internacionalService.cargarCursoInternacional(0, 50)
      .subscribe((resp: any) => {
        this.listaInternacional = resp.internacional;
      });
  }

  nuevaFila(f: NgForm) {
    if (f.invalid) {
      Swal.fire('Error', 'Debe ingresar los datos requeridos', 'error');
      return;
    }
    const nuevoValor = [{
      dia: f.value.dia,
      informacion: f.value.informacion
    }];
    this.gridApi.updateRowData({ add: nuevoValor });
    this.limpiarDatos();
  }

  onRemoveSelected(tipo: string) {
    const filaSeleccionada = this.gridApi.getSelectedRows();
    const dato = this.gridApi.updateRowData({ remove: filaSeleccionada });
    if (tipo === 'Avanzado') {
      this.avanzadoService.eliminarProgramacionAvanzada(this.avanzado._id, filaSeleccionada[0]._id)
        .subscribe(() => {
          this.enviarModeloAvanzado(this.avanzado._id);
        });
    } else if (tipo === 'Internacional') {
      this.internacionalService.eliminarProgramacionInternacional(this.internacional._id, filaSeleccionada[0]._id)
        .subscribe(() => {
          this.enviarModeloInternacional(this.internacional._id);
        });
    }
  }

  llenarTabla(modelo: any) {
    if (!modelo.programacion) {
      this.gridApi.setRowData();
      return;
    }
    this.gridApi.setRowData(modelo.programacion);
  }
}
