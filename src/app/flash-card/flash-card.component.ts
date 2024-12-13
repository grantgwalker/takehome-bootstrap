import { Component, inject, input } from '@angular/core';
import { FlashCard } from '../app.models';
import { FlashCardListComponent } from '../flash-card-list/flash-card-list.component';

@Component({
  selector: 'app-flash-card',
  standalone: true,
  imports: [],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.css'
})
export class FlashCardComponent {
  FlashCardListComponent = inject(FlashCardListComponent);
  flashCard = input.required<FlashCard>();
  expanded = false;
  showAnswer = false;
  editMode = false;

  toggle() {
    this.expanded = !this.expanded;
  }

  show() {
    this.showAnswer = !this.showAnswer;
  }

  delete() {
    this.FlashCardListComponent.deleteFlashCard(this.flashCard().id);
  }
  
  edit() {
    // TODO: Implement edit functionality
    this.editMode = !this.editMode;
  }
}
