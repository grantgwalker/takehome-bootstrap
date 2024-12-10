import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllFlashCards } from '../state/flash-cards.selectors';
import { AsyncPipe } from '@angular/common';
import { addOneFlashCard } from '../state/flash-cards.reducer';
import { FlashCardComponent } from '../flash-card/flash-card.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-flash-card-list',
  standalone: true,
  imports: [AsyncPipe, FlashCardComponent],
  templateUrl: './flash-card-list.component.html',
  styleUrl: './flash-card-list.component.scss'
})
export class FlashCardListComponent implements OnInit {
  store = inject(Store);
  flashCards$ = this.store.select(selectAllFlashCards);

  ngOnInit(): void {
    // Inject example cards
    // Since this isn't hooked up to a backend, we generate UUIDs here
    // TODO: Implement 
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
}
