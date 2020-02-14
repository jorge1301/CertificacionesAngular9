import { Component, OnInit } from '@angular/core';
import { CertificadosService } from '../../services/service.index';
import { Certificado } from '../../models/certificado.model';
import Swal from 'sweetalert2';
import { editorConfig } from '../../config/editor';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styles: []
})
export class CertificadosComponent implements OnInit {
  certificado: Certificado[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  configuraciones = editorConfig;

  constructor(private certificadoService: CertificadosService) { }

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.cargando = true;
    this.certificadoService.cargarCertificados(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.certificado = resp.certificado;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarInformacion();
  }

  buscarInformacion(termino: string) {
    if (termino.length <= 0) {
      this.cargarInformacion();
      return;
    }
    this.cargando = true;
    this.certificadoService.buscarCertificados(termino)
      .subscribe((certificados: Certificado[]) => {
        this.certificado = certificados;
        this.cargando = false;
      });
  }

  eliminarInformacion(certificado) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Usted va a eliminar el certificado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.certificadoService.eliminarCertificados(certificado._id)
          .subscribe((resp: any) => {
            Swal.fire('Certificado eliminado', 'El certificado a sido eliminado correctamente', 'success');
            this.totalRegistros--;
            if (this.desde === this.totalRegistros) {
              this.desde -= 5;
            }
            this.cargarInformacion();
          });
      }
    });
  }
}
