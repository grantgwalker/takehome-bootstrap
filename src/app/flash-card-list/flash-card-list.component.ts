import { AsyncPipe } from '@angular/common';
import { Component, inject, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { FlashCard } from '../app.models';
import { FlashCardComponent } from '../flash-card/flash-card.component';
import { addOneFlashCardAPIAction, deleteFlashCardAPIAction, loadFlashcardsAPIAction, updateFlashCardAPIAction } from '../state/flash-cards.reducer';
import { selectAllFlashCards } from '../state/flash-cards.selectors';


@Injectable({ providedIn: 'root' })
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

  isEmpty: boolean = false;

  // Only populates the store with example flash cards if the store is empty
  ngOnInit() {
    this.store.dispatch(loadFlashcardsAPIAction());
    this.allFlashCards = this.store.select(selectAllFlashCards);
    this.allFlashCards.pipe(
      map(cards => console.log(cards.length))
    ).subscribe();
    this.allFlashCards.pipe(
      map(cards => cards.length === 0)
    ).subscribe(isEmpty => {
      this.isEmpty = isEmpty;
    });

  }

  addFlashCard(flashCard: FlashCard): void {
    // flash card must be wrapped with '{}' to be passed as an object instead of the flash card itself
    this.store.dispatch(addOneFlashCardAPIAction({ flashCard }));
  }

  deleteFlashCard(flashCardID: string): void {
    // Delete a flash card
    // For example, we could delete the first flash card
    this.store.dispatch(deleteFlashCardAPIAction({ id: flashCardID }));
  }

  updateFlashCard(flashCard: FlashCard): void {
    // Update a flash card
    this.store.dispatch(updateFlashCardAPIAction({ flashCard }));
  }
}
