import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FlashCard } from '../app.models';
import { FlashCardListComponent } from '../flash-card-list/flash-card-list.component';
import { updateFlashCardAction } from '../state/flash-cards.reducer';
import { selectFlashCardById } from '../state/flash-cards.selectors';


@Component({
  selector: 'app-flash-card',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.css'
})
export class FlashCardComponent {
  FlashCardListComponent = inject(FlashCardListComponent);
  store = inject(Store);
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
    this.store.select(selectFlashCardById(this.flashCard().id)).subscribe(card => console.log(card?.answer));
  }

  // I think deleting of a card falls in the responsibility of the list component
  // This is why the delete method is calling the deleteFlashCard method from the list component
  delete() {
    this.FlashCardListComponent.deleteFlashCard(this.flashCard().id);
  }
  
  editToggle() {
    // TODO: Implement edit functionality
    this.editMode = !this.editMode;
  }

  // Updating a card is specific to the card component, therefore it is implemented here.
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

    this.store.dispatch(updateFlashCardAction({
      flashCard:{
        id: this.flashCard().id,
        question: questionString,
        answer: answerString
    }}));
  }

  // Method to mark the card as correct
  // Updating a card is specific to the card component, therefore it is implemented here.
  markCorrect() {    
    this.resultColor = "bg-gray-500/20";
    this.store.dispatch(updateFlashCardAction({
      flashCard: {
        id: this.flashCard().id,
        question: this.flashCard().question,
        answer: this.flashCard().answer,
        result: true
    }}));
  }
  // Method to mark the card as incorrect
  // Updating a card is specific to the card component, therefore it is implemented here.
  markIncorrect() {
    this.resultColor = "bg-gray-500/20";
    this.store.dispatch(updateFlashCardAction({
      flashCard: {
        id: this.flashCard().id,
        question: this.flashCard().question,
        answer: this.flashCard().answer,
        result: false
    }}));
  }


}
