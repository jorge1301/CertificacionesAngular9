import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/service.index';
import { QuizGuardia } from '../../models/quizGuardia.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styles: []
})
export class QuizComponent implements OnInit {
  listaQuiz: QuizGuardia[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.cargando = true;
    this.quizService.cargarQuiz(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.listaQuiz = resp.quiz;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarInformacion();
  }

  buscarInformacion(termino: string) {
    if (termino.length <= 0) {
      this.cargarInformacion();
      return;
    }
    this.cargando = true;
    this.quizService.buscarQuiz(termino)
      .subscribe((quiz: QuizGuardia[]) => {
        this.listaQuiz = quiz;
        this.cargando = false;
      });
  }

  eliminarInformacion(quiz) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Usted va a eliminar esta pregunta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.quizService.eliminarQuiz(quiz._id)
          .subscribe((resp: any) => {
            Swal.fire('Quiz eliminado', 'La pregunta a sido eliminado correctamente', 'success');
            this.totalRegistros--;
            if (this.desde === this.totalRegistros) {
              this.desde -= 5;
            }
            this.cargarInformacion();
          });
      }
    });
  }
}
