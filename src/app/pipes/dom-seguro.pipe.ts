import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSeguro'
})
export class DomSeguroPipe implements PipeTransform {
  constructor( private sanitizer: DomSanitizer) {}

  transform(valor: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(valor);
  }

}
