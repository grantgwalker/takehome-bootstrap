import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlashCard } from '../app.models';
import { FlashCardListComponent } from '../flash-card-list/flash-card-list.component';

@Component({
  selector: 'app-flash-card',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.css'
})
export class FlashCardComponent {
  FlashCardListComponent = inject(FlashCardListComponent);
  flashCard = input.required<FlashCard>();
  expanded = false;
  showAnswer = false;
  editMode = false;
  testMode = window.location.href.includes('take-test');
  resultColor = "";

  toggle() {
    this.expanded = !this.expanded;
  }

  show() {
    this.showAnswer = !this.showAnswer;
  }

  delete() {
    this.FlashCardListComponent.deleteFlashCard(this.flashCard().id);
  }
  
  editToggle() {
    // TODO: Implement edit functionality
    this.editMode = !this.editMode;
  }

  updateCard() {
    this.editToggle();

    // Get the input element using its ID
    const questionInput = document.getElementById("question") as HTMLInputElement;
    // Get the value from the input element
    const question = questionInput.value;
    // Store the value in a variable
    let questionString: string = question;

    // Get the input element using its ID
    const answerInput = document.getElementById("answer") as HTMLInputElement;
    // Get the value from the input element
    const answer = answerInput.value;
    // Store the value in a variable
    let answerString: string = answer;

    this.FlashCardListComponent.updateFlashCard({
      id: this.flashCard().id,
      question: questionString,
      answer: answerString
    });
  }

  markCorrect() {    
    this.resultColor = "bg-green-500/20";
    this.FlashCardListComponent.updateFlashCard({
      id: this.flashCard().id,
      question: this.flashCard().question,
      answer: this.flashCard().answer,
      result: true
    });
  }

  markIncorrect() {
    this.resultColor = "bg-red-500/20";
    this.FlashCardListComponent.updateFlashCard({
      id: this.flashCard().id,
      question: this.flashCard().question,
      answer: this.flashCard().answer,
      result: false
    });
  }


}
