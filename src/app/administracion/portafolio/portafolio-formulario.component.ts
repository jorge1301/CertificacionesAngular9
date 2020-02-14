import { Component, OnInit } from '@angular/core';
import { editorConfig } from '../../config/editor';
import { Portafolio } from '../../models/portafolio.model';
import { PortafolioService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-portafolio-formulario',
  templateUrl: './portafolio-formulario.component.html',
  styles: []
})
export class PortafolioFormularioComponent implements OnInit {
  portafolio: Portafolio = new Portafolio();
  imagenSubir: File;
  imagenTemporal: string | ArrayBuffer;
  configuraciones = editorConfig;
  id: string;

  constructor(
    private portafolioService: PortafolioService,
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

  crearPortafolio(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    this.portafolio = formulario.value;
    this.portafolio._id = this.id;
    const formData = new FormData();
    if (this.imagenSubir) {
      formData.append('imagen', this.imagenSubir, this.imagenSubir.name);
    }
    this.portafolioService.crearPortafolios(formData, this.portafolio)
      .subscribe(() => {
        this.router.navigate(['administracion/portafolio']);
      }
      );
  }
  buscarInformacion(id) {
    this.portafolioService.buscarPortafolioId(id)
      .subscribe((portafolio) => {
        this.portafolio = portafolio;
      });
  }

}
