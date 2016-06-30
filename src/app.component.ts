import { Component } from '@angular/core';
import { QuestionService } from './question.service';
import { QuestionComponent } from './question.component';
import { Answer } from './question.model';


@Component({
  selector: 'simple-quiz',
  directives: [QuestionComponent],
  providers: [QuestionService],
  template: `<p>Hello Simple Quiz</p>
  <questions [questions] = "questions" (answer)="onAnswer($event)" [results] = "results" [displayResult] = "displayResult"></questions>
  <button (click)="check()">Check</button>
  `
})

export class AppComponent {
  questions;
  answers;
  results;
  displayResult;

  private choosenAnswers = new Map<string, string>();


  constructor(private questionService: QuestionService) {
    this.questions = this.questionService.getAllQuestions();
  }

  onAnswer(event: Answer) {
    this.choosenAnswers.set(event.questionId, event.answerId);
    //console.log(this.choosenAnswers.size);
  }

  get getAllQuestions() {
    /*why is this is hit 4x */
    return this.questions = this.questionService.getAllQuestions();
  }

  getAllAnswers() {

  }

  check() {
    this.results = this.questionService.checkAnswers(this.choosenAnswers);
    this.displayResult = true;
    console.log(this.results);
  }

}
