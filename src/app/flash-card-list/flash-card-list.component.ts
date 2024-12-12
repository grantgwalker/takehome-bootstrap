import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { FlashCardComponent } from '../flash-card/flash-card.component';
import { addOneFlashCard } from '../state/flash-cards.reducer';
import { selectAllFlashCards } from '../state/flash-cards.selectors';

@Component({
  selector: 'app-flash-card-list',
  standalone: true,
  imports: [AsyncPipe, FlashCardComponent],
  templateUrl: './flash-card-list.component.html',
  styleUrl: './flash-card-list.component.css'
})
export class FlashCardListComponent implements OnInit {
  store = inject(Store);
  allFlashCards = this.store.select(selectAllFlashCards);

  ngOnInit(): void {
    // Inject example cards
    // Since this isn't hooked up to a backend, we generate UUIDs here
    this.store.dispatch(addOneFlashCard({
      flashCard: {
        id: uuidv4(),
        question: 'What is the capital of France?',
        answer: 'Paris',
      }
    }));
    this.store.dispatch(addOneFlashCard({
      flashCard: {
        id: uuidv4(),
        question: 'What is the capital of Spain?',
        answer: 'Madrid',
      }
    }));
  }

  updateFlashCard(flashCardID: string): void {
    // Update a flash card
    // For example, we could update the question of the first flash card
  //   this.card = selectFlashCardById(flashCardID);
  //   this.store.dispatch(updateFlashCard({
  //     flashCard: {
  //       id: card.edit().id,
  //       question: 'What is the capital of Spain?',
  //       answer: 'Madrid',
  //     }
  // }))
  }
}
