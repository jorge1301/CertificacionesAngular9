import { Component, OnInit } from '@angular/core';
import { editorConfig } from '../../config/editor';
import { PortafolioCurso } from '../../models/portafolioCurso.model';
import { PortafolioCursosService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-portafolio-cursos-formulario',
  templateUrl: './portafolio-cursos-formulario.component.html',
  styles: []
})
export class PortafolioCursosFormularioComponent implements OnInit {
  portafolioCurso: PortafolioCurso = new PortafolioCurso();
  imagenSubir: File;
  imagenTemporal: string | ArrayBuffer;
  configuraciones = editorConfig;
  id: string;

constructor(
    private portafolioCursoService: PortafolioCursosService,
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

crearPortafolioCurso(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    this.portafolioCurso = formulario.value;
    this.portafolioCurso._id = this.id;
    const formData = new FormData();
    if (this.imagenSubir) {
      formData.append('imagen', this.imagenSubir, this.imagenSubir.name);
    }
    this.portafolioCursoService.crearPortafoliosCursos(formData, this.portafolioCurso)
      .subscribe(() => {
        this.router.navigate(['administracion/portafolio-cursos']);
      }
      );
  }
buscarInformacion(id) {
    this.portafolioCursoService.buscarPortafolioId(id)
      .subscribe((portafolio) => {
        this.portafolioCurso = portafolio;
      });
  }

}
