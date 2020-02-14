import { Component, OnInit } from '@angular/core';
import { Agencia } from '../../models/agencia.model';
import { AgenciaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { editorConfig } from '../../config/editor';


@Component({
  selector: 'app-agencia-formulario',
  templateUrl: './agencia-formulario.component.html',
  styleUrls: []
})
export class AgenciaFormularioComponent implements OnInit {
  agencia: Agencia = new Agencia();
  imagenSubir: File;
  imagenTemporal: string | ArrayBuffer;
  configuraciones = editorConfig;

  id: string;

  constructor(
    private agenciaService: AgenciaService,
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

  crearAgencia(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    this.agencia = formulario.value;
    this.agencia._id = this.id;
    const formData = new FormData();
    if (this.imagenSubir) {
      formData.append('imagen', this.imagenSubir, this.imagenSubir.name);
    }
    this.agenciaService.crearAgencias(formData, this.agencia)
      .subscribe(() => {
        this.router.navigate(['administracion/agencias']);
      }
    );
  }

  buscarInformacion(id) {
    this.agenciaService.buscarAgenciaId(id)
    .subscribe((agencia) => {
      this.agencia = agencia;
    });
  }

}
