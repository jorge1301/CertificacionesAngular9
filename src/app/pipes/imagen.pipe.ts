import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuarios'): any {
    let url = URL_SERVICIOS + '/imagen';
    if (!imagen) {
      return url + '/usuarios/xxx';
    }
    switch (tipo) {
      case 'agencias':
        url += '/agencias/' + imagen;
        break;
      case 'avanzados':
        url += '/avanzados/' + imagen;
        break;
      case 'certificados':
        url += '/certificados/' + imagen;
        break;
      case 'galerias':
        url += '/galerias/' + imagen;
        break;
      case 'internacionales':
        url += '/internacionales/' + imagen;
        break;
      case 'portafolioCursos':
        url += '/portafolioCursos/' + imagen;
        break;
      case 'portafolios':
        url += '/portafolios/' + imagen;
        break;
      case 'usuarios':
        url += '/usuarios/' + imagen;
        break;
      default:
        url += '/usuarios/xxx';
    }
    return url;
  }

}
