import { Component, OnInit } from '@angular/core';
import { CertificadosService } from '../../services/certificados/certificados.service';
import { NgForm } from '@angular/forms';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  cedula: string;

  constructor(private certificadoService: CertificadosService) {
  }

  ngOnInit() {
  }

  descargarCertificado(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this.certificadoService.descargarCertificado(f.value.cedula).
    subscribe( (resp: any) => {
      //saveAs(resp, `${this.cedula}.pdf`);
      const url = URL.createObjectURL(resp);
      window.open(url);
    });
  }
}
