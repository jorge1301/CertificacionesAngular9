import { Component, OnInit } from '@angular/core';
import { Certificado } from '../../models/certificado.model';
import { CertificadosService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { editorConfig } from '../../config/editor';
@Component({
  selector: 'app-certificado-formulario',
  templateUrl: './certificado-formulario.component.html',
  styles: []
})
export class CertificadoFormularioComponent implements OnInit {
  certificado: Certificado = new Certificado();
  imagenSubir: File;
  imagenTemporal: string | ArrayBuffer;
  configuraciones = editorConfig;

  id: string;
  pages = 1;
  condicion = false;
  constructor(
    private certificadoService: CertificadosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id !== 'nuevo') {
        this.condicion = true;
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
    if (archivo.type.indexOf('application') < 0) {
      Swal.fire('Solo PDF', 'El archivo seleccionado no es un pdf', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagenTemporal = e.target.result;
      };
      reader.readAsArrayBuffer(archivo);
    }
  }

  crearCertificado(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    this.certificado = formulario.value;
    this.certificado._id = this.id;
    const formData = new FormData();
    if (this.imagenSubir) {
      formData.append('imagen', this.imagenSubir, this.imagenSubir.name);
    }
    this.certificadoService.crearCertificados(formData, this.certificado)
      .subscribe(() => {
        this.router.navigate(['administracion/certificados']);
      }
    );
  }

  buscarInformacion(id) {
    this.certificadoService.buscarCertificadosId(id)
      .subscribe((certificado) => {
        this.certificado = certificado;
      });
  }
}
