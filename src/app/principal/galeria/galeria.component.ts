import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../services/service.index';
import {Galeria} from '../../models/galeria.model';
import { GalleryItem, ImageItem, GalleryConfig  } from '@ngx-gallery/core';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { DomSeguroPipe } from '../../pipes/dom-seguro.pipe';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
  providers: [ImagenPipe, DomSeguroPipe]
})
export class GaleriaComponent implements OnInit {
  galeriaLista: Galeria[] = [];
  galeriaImagenes: GalleryItem[];
  galeriaImagenesListado = [];

  constructor(private galeriaService: GaleriaService, private pipeImagen: ImagenPipe, private pipeDomSeguro: DomSeguroPipe) {
   }

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.galeriaService.cargarGalerias(0, 0)
    .subscribe((resp: any) => {
      this.galeriaLista = resp.galeria;
      this.extraerImagen();
    });
  }

  extraerImagen() {
    this.galeriaLista.forEach(element => {
      this.galeriaImagenesListado.push(new ImageItem(
        {
          src: this.pipeImagen.transform(element.imagen, 'galerias'),
          thumb: this.pipeImagen.transform(element.imagen, 'galerias'),
          title: this.pipeDomSeguro.transform(element.informacion)
        }));
    });
    this.galeriaImagenes = this.galeriaImagenesListado;
  }

  verImagen(posicion) {
    const myImage = document.createElement('img');
    fetch(this.galeriaImagenes[posicion].data.src).then((response) => {
      return response.blob();
    }).then((myBlob) => {
      const objectURL = URL.createObjectURL(myBlob);
      myImage.src = objectURL;
      window.open(myImage.src);
    });
  }
}

