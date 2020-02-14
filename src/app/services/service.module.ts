import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
   SettingsService,
   SidebarService,
   SharedService,
   UsuarioService,
   LoginGuardGuard,
   PortafolioService,
   PortafolioCursosService,
   CursoAvanzadoService,
   CursoInternacionalService,
   AgenciaService,
   GaleriaService,
   CertificadosService,
   VerificaTokenGuard,
   AlumnosService,
   QuizService
    } from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    PortafolioService,
    PortafolioCursosService,
    CursoAvanzadoService,
    CursoInternacionalService,
    AgenciaService,
    GaleriaService,
    CertificadosService,
    VerificaTokenGuard,
    AlumnosService,
    QuizService
  ]
})
export class ServiceModule { }
