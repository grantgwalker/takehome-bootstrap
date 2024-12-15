import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { FlashCardListComponent } from '../flash-card-list/flash-card-list.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-add-flash-card',
  standalone: true,
  imports: [HeaderComponent, RouterLink, FlashCardListComponent],
  templateUrl: './add-flash-card.component.html',
  styleUrl: './add-flash-card.component.scss'
})
export class AddFlashCardComponent {
  FlashCardListComponent = inject(FlashCardListComponent);

  addCard() {
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

    this.FlashCardListComponent.addFlashCard({
      id: uuidv4(),
      question: questionString,
      answer: answerString,
    });
  }
}
