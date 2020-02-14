import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

// Componentes de administracion
import { PortafolioComponent } from './portafolio/portafolio.component';
import { AgenciasComponent } from './agencias/agencias.component';
import { AvanzadoComponent } from './avanzado/avanzado.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { InternacionalComponent } from './internacional/internacional.component';
import { ADMINISTRACION_ROUTES } from './administracion.routes';
import { CertificadosComponent } from './certificados/certificados.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PortafolioCursosComponent } from './portafolio-cursos/portafolio-cursos.component';
import { ProfileComponent } from './profile/profile.component';
import { AgenciaFormularioComponent } from './agencias/agencia-formulario.component';
import { AvanzadoFormularioComponent } from './avanzado/avanzado-formulario.component';
import { CertificadoFormularioComponent } from './certificados/certificado-formulario.component';
import { GaleriaFormularioComponent } from './galeria/galeria-formulario.component';
import { InternacionalFormularioComponent } from './internacional/internacional-formulario.component';
import { PortafolioFormularioComponent } from './portafolio/portafolio-formulario.component';
import { PortafolioCursosFormularioComponent } from './portafolio-cursos/portafolio-cursos-formulario.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { ProgramacionComponent } from './programacion/programacion.component';
import { EstiloCeldaAgridComponent } from './estilo-celda-agrid/estilo-celda-agrid.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnosFormularioComponent } from './alumnos/alumnos-formulario.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizFormularioComponent } from './quiz/quiz-formulario.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
    declarations: [
        PortafolioComponent,
        AgenciasComponent,
        AvanzadoComponent,
        GaleriaComponent,
        InternacionalComponent,
        CertificadosComponent,
        AccountSettingsComponent,
        ProfileComponent,
        PortafolioCursosComponent,
        AgenciaFormularioComponent,
        AvanzadoFormularioComponent,
        CertificadoFormularioComponent,
        GaleriaFormularioComponent,
        InternacionalFormularioComponent,
        PortafolioFormularioComponent,
        PortafolioCursosFormularioComponent,
        ProgramacionComponent,
        EstiloCeldaAgridComponent,
        AlumnosComponent,
        AlumnosFormularioComponent,
        QuizComponent,
        QuizFormularioComponent
    ],
    imports: [
        ADMINISTRACION_ROUTES,
        PipesModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        PdfViewerModule,
        AgGridModule.withComponents([EstiloCeldaAgridComponent]),
        AngularEditorModule
    ],
    exports: [
        PortafolioComponent,
        AgenciasComponent,
        AvanzadoComponent,
        GaleriaComponent,
        InternacionalComponent,
        CertificadosComponent,
        AccountSettingsComponent,
        PortafolioCursosComponent,
        ProgramacionComponent,
        EstiloCeldaAgridComponent
    ]
})

export class AdministracionModule { }
