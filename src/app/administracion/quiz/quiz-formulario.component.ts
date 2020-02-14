import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/service.index';
import { QuizGuardia } from '../../models/quizGuardia.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quiz-formulario',
  templateUrl: './quiz-formulario.component.html',
  styles: []
})
export class QuizFormularioComponent implements OnInit {
  quiz: QuizGuardia = new QuizGuardia();
  id: string;
  literal = '';
  constructor(
    private quizService: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id !== 'nuevo') {
        this.buscarInformacion(this.id);
      }
    });
  }

  ngOnInit() {
  }

  crearQuiz(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    this.quiz = formulario.value;
    this.quiz.respuesta = this.literal;
    this.quiz._id = this.id;
    this.quizService.crearQuiz(this.quiz)
      .subscribe(() => {
        this.router.navigate(['administracion/quiz']);
      }
      );
  }

  buscarInformacion(id) {
    this.quizService.buscarQuizId(id)
      .subscribe((quiz: any) => {
        this.quiz = quiz;
        this.literal = this.quiz.respuesta;
      });
  }

}
