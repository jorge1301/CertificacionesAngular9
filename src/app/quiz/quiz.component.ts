import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz/quiz.service';
import { Router } from '@angular/router';
import { QuizGuardia } from '../models/quizGuardia.model';
import { AlumnosService } from '../services/service.index';
import { Alumno } from '../models/alumno.model';
declare function init_plugins();

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styles: []
})
export class QuizComponent implements OnInit {
  listaQuiz: QuizGuardia[] = [];
  opciones = [];
  progresoQuiz: number;
  aciertosEstudiante = 0;
  cambiarRespuestaNumero = 0;
  cambiarRespuesta = 0;
  correccion = false;
  alumno = new Alumno();
  constructor(private router: Router, private quizService: QuizService, private alumnoService: AlumnosService) { }

  ngOnInit() {
    init_plugins();
    this.alumno = JSON.parse(localStorage.getItem('alumno'));
    this.progresoQuiz = 0;
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.quizService.quizAleatorio()
    .subscribe((resp: any) => {
      this.listaQuiz = resp;
    });
  }

  salir() {
    localStorage.removeItem('alumno');
    this.router.navigate(['/registro']);
  }

  contestar(respuestaEstudiante: string, respuesta: any) {
    if (respuestaEstudiante === 'b') {
      this.cambiarRespuestaNumero = 1;
    }
    if (respuestaEstudiante === 'c') {
      this.cambiarRespuestaNumero = 2;
    }
    if (respuestaEstudiante === 'd') {
      this.cambiarRespuestaNumero = 3;
    }
    if (respuesta.respuesta === 'b') {
      this.cambiarRespuesta = 1;
    }
    if (respuesta.respuesta === 'c') {
      this.cambiarRespuesta = 2;
    }
    if (respuesta.respuesta === 'd') {
      this.cambiarRespuesta = 3;
    }
    if (this.cambiarRespuestaNumero === this.cambiarRespuesta) {
      this.aciertosEstudiante += 1;
    }
    this.opciones.push({pregunta: respuesta.pregunta, Opciones: [
       respuesta.opcion1,
       respuesta.opcion2,
       respuesta.opcion3,
       respuesta.opcion4
    ],
      respuesta: this.cambiarRespuesta,
      estudianteRespuesta: this.cambiarRespuestaNumero
  });
    this.progresoQuiz += 1;
  }

  verCorreccion() {
    this.correccion = true;
    if (!this.alumno) {
      return;
    }
    this.alumno.aciertos = this.aciertosEstudiante.toString();
    this.alumnoService.actualizarAciertos(this.alumno)
    .subscribe();
  }
}
