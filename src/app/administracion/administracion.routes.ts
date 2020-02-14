import { Routes, RouterModule } from '@angular/router';
import { AgenciasComponent } from './agencias/agencias.component';
import { AvanzadoComponent } from './avanzado/avanzado.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { InternacionalComponent } from './internacional/internacional.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PortafolioCursosComponent } from './portafolio-cursos/portafolio-cursos.component';
import { AgenciaFormularioComponent } from './agencias/agencia-formulario.component';
import { AvanzadoFormularioComponent } from './avanzado/avanzado-formulario.component';
import { GaleriaFormularioComponent } from './galeria/galeria-formulario.component';
import { InternacionalFormularioComponent } from './internacional/internacional-formulario.component';
import { PortafolioFormularioComponent } from './portafolio/portafolio-formulario.component';
import { CertificadoFormularioComponent } from './certificados/certificado-formulario.component';
import { PortafolioCursosFormularioComponent } from './portafolio-cursos/portafolio-cursos-formulario.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnosFormularioComponent } from './alumnos/alumnos-formulario.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizFormularioComponent } from './quiz/quiz-formulario.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';


const routes: Routes = [
  {
    path: 'agencias',
    component: AgenciasComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Agencias' }
  },
  {
    path: 'agencia/:id',
    component: AgenciaFormularioComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Agencias' }
  },
  {
    path: 'avanzado',
    component: AvanzadoComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Cursos Avanzados' }
  },
  {
    path: 'avanzado/:id',
    component: AvanzadoFormularioComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Cursos Avanzados' }
  },
  {
    path: 'galeria',
    component: GaleriaComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Galeria' }
  },
  {
    path: 'galeria/:id',
    component: GaleriaFormularioComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Galeria' }
  },
  {
    path: 'internacional',
    component: InternacionalComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Cursos Internacionales' }
  },
  {
    path: 'internacional/:id',
    component: InternacionalFormularioComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Cursos Internacionales' }
  },
  {
    path: 'portafolio',
    component: PortafolioComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Portafolio' }
  },
  {
    path: 'portafolio/:id',
    component: PortafolioFormularioComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Portafolio' }
  },
  {
    path: 'certificados',
    component: CertificadosComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Certificados' }
  },
  {
    path: 'certificado/:id',
    component: CertificadoFormularioComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Certificados' }
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Ajustes del Tema' }
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Perfil de usuario' }
  },
  {
    path: 'portafolio-cursos',
    component: PortafolioCursosComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Cursos del Portafolio' }
  },
  {
    path: 'portafolio-cursos/:id',
    component: PortafolioCursosFormularioComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Cursos del Portafolio' }
  },
  {
    path: 'programacion',
    component: ProgramacionComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Programacion de cursos' }
  },
  {
    path: 'alumnos',
    component: AlumnosComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Alumnos' }
  },
  {
    path: 'alumnos/:id',
    component: AlumnosFormularioComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Alumnos' }
  },
  {
    path: 'quiz',
    component: QuizComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Simulador de preguntas' }
  },
  {
    path: 'quiz/:id',
    component: QuizFormularioComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Simulador de preguntas' }
  }
];

export const ADMINISTRACION_ROUTES = RouterModule.forChild(routes);
