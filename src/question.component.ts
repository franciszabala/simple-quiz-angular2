import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Question } from './question.model';
import { Answer } from './question.model';


@Component({
  selector: 'questions',
  template: `<p>This is were the a sample questions are displayed</p>

    <div *ngFor="let question of questions">
      {{question.text}}
      <!--<p> within </p> doesn't work. why?-->
      <ul>
        <li *ngFor="let option of question.options">
          <label>
          <input type="radio" name="{{question.id}}" value="{{option.id}}"  (click)="chooseAnswer($event.target.name, $event.target.value)">
          {{option.text}}
        </label>
        </li>
      </ul>
      <div *ngIf="displayResult === true">
        <p *ngIf="answerStatus(question.id) === true">✔ Correct</p>
        <p *ngIf="answerStatus(question.id) === false">✘ Incorrect</p>
      </div>
    </div>
    <div *ngIf="displayResult === true">
      <p>{{correctAnswerCount}} / {{totalQuestionCount}}</p>
    </div>

  `
})

export class QuestionComponent {
  @Input() questions: Question[];
  @Input() results = new Map<string,any>();
  @Input() displayResult = false;
  @Output() answer = new EventEmitter<Answer>();

  /*

  //Is it a bad idea to store the chosen answers here?
  @Output() answers = new Map<string, string>();

  chooseAnswer(questionId, answerId) {
    this.answers.set(questionId, answerId);
    console.log(this.answers.size);
  }

  */
  chooseAnswer(questionId, answerId) {
    let choosenAnswer : Answer =
    {
      "questionId": questionId,
      "answerId": answerId,
    }
    this.answer.emit(choosenAnswer);
  }

  answerStatus(questionId:string) : boolean {
      /*without ngElse, this is called twice*/
      return this.results.get("details").get(questionId).isCorrect;
  }

  get correctAnswerCount() : number {
      /*without ngElse, this is called twice*/
      return this.results.get("correctAnswersCount");
  }

  get totalQuestionCount() : number {
      /*without ngElse, this is called twice*/
      return this.results.get("totalQuestionsCount");
  }
}
