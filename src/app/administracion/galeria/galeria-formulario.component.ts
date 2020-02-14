import { Component, OnInit } from '@angular/core';
import { Galeria } from '../../models/galeria.model';
import { GaleriaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { editorConfig } from '../../config/editor';

@Component({
  selector: 'app-galeria-formulario',
  templateUrl: './galeria-formulario.component.html',
  styles: []
})
export class GaleriaFormularioComponent implements OnInit {
  galeria: Galeria = new Galeria();
  imagenSubir: File;
  imagenTemporal: string | ArrayBuffer;
  configuraciones = editorConfig;

  id: string;

  constructor(
    private galeriaService: GaleriaService,
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

  crearGaleria(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    this.galeria = formulario.value;
    this.galeria._id = this.id;
    const formData = new FormData();
    if (this.imagenSubir) {
      formData.append('imagen', this.imagenSubir, this.imagenSubir.name);
    }
    this.galeriaService.crearGalerias(formData, this.galeria)
      .subscribe(() => {
        this.router.navigate(['administracion/galeria']);
      }
      );
  }

  buscarInformacion(id) {
    this.galeriaService.buscarGaleriasId(id)
      .subscribe((galeria) => {
        this.galeria = galeria;
      });
  }

}
