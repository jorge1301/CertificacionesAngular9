import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Administración',
      icono: 'mdi mdi-angular',
      submenu: [
        { titulo: 'Portafolio', url: '/administracion/portafolio' },
        { titulo: 'Cursos del Portafolio', url: '/administracion/portafolio-cursos' },
        { titulo: 'Cursos Avanzados', url: '/administracion/avanzado' },
        { titulo: 'Cursos Internacionales', url: '/administracion/internacional' },
        { titulo: 'Programación', url: '/administracion/programacion' },
        { titulo: 'Agencias', url: '/administracion/agencias' },
        { titulo: 'Galeria', url: '/administracion/galeria' },
        { titulo: 'Certificados', url: '/administracion/certificados' },
        { titulo: 'Alumnos', url: '/administracion/alumnos' },
        { titulo: 'Simulador de preguntas', url: '/administracion/quiz' }
      ]
    }
  ];

  constructor() { }
}
