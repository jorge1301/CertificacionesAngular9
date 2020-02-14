import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { DomSeguroPipe } from './dom-seguro.pipe';


@NgModule({
  declarations: [
    ImagenPipe,
    DomSeguroPipe
  ],
  imports: [
  ],
  exports: [
    ImagenPipe,
    DomSeguroPipe
  ]
})
export class PipesModule { }
