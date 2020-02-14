import { Component, OnInit } from '@angular/core';
import { CursoInternacional } from '../../models/cursoInternacional.model';
import { CursoInternacionalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { editorConfig } from '../../config/editor';

@Component({
  selector: 'app-internacional-formulario',
  templateUrl: './internacional-formulario.component.html',
  styles: []
})
export class InternacionalFormularioComponent implements OnInit {
  internacional: CursoInternacional = new CursoInternacional();
  imagenSubir: File;
  imagenTemporal: string | ArrayBuffer;
  configuraciones = editorConfig;

  id: string;

  constructor(
    private internacionalService: CursoInternacionalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id !== 'nuevo') {
        this.buscarInformacion(this.id);
      }
    });
   }

  ngOnInit() {
  }

  seleccionarImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemporal = reader.result;
  }

  crearCursoInternacional(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    const programacion = this.internacional.programacion;
    this.internacional = formulario.value;
    this.internacional._id = this.id;
    this.internacional.programacion = programacion;
    const formData = new FormData();
    if (this.imagenSubir) {
      formData.append('imagen', this.imagenSubir, this.imagenSubir.name);
    }
    this.internacionalService.crearCursosInternacionales(formData, this.internacional)
      .subscribe(() => {
        this.router.navigate(['administracion/internacional']);
      }
      );
  }

  buscarInformacion(id) {
    this.internacionalService.buscarCursoInternacionalId(id)
      .subscribe((internacional) => {
        this.internacional = internacional;
      });
  }

}
