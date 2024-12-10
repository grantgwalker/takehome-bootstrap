import { Component, input } from '@angular/core';
import { FlashCard } from '../app.models';

@Component({
  selector: 'app-flash-card',
  standalone: true,
  imports: [],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.scss'
})
export class FlashCardComponent {
  flashCard = input.required<FlashCard>();
  expanded = false;
  showAnswer = false;

  toggle() {
    this.expanded = !this.expanded;
  }

  show() {
    this.showAnswer = !this.showAnswer;
  }

  delete() {
    // TODO: Implement delete functionality
  }
  
  edit() {
    // TODO: Implement edit functionality
  }
}
