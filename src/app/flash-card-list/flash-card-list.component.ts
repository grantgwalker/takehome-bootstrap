import { AsyncPipe } from '@angular/common';
import { Component, inject, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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

  // On Init, load all flash cards from DynamoDB then select all from store
  ngOnInit() {
    this.store.dispatch(loadFlashcardsAPIAction());
    this.allFlashCards = this.store.select(selectAllFlashCards);

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
