import { Component, inject, Injectable, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { FlashCard } from '../app.models';
import { FlashCardComponent } from "../flash-card/flash-card.component";
import { selectAllFlashCards, selectFlashCardById } from '../state/flash-cards.selectors';


@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-take-test',
  standalone: true,
  imports: [RouterLink, FlashCardComponent],
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.scss'
})
export class TakeTestComponent {
  store = inject(Store);
  title = input('Flash-Focus');
  numberCorrect = 0;
  numberIncorrect = 0;
  showResults = false;
  allFlashCards$: Observable<FlashCard[]> = this.store.select(selectAllFlashCards);
  // The state of the test must remain static, 
  // this is why the flashcards are put into arrays instead of being directly accessed from the store.
  allFlashCards: FlashCard[] = [];
  incorrectFlashCards: FlashCard[] = [];
  flashCardsToTestOn: FlashCard[] = [];

  // On initialization, get all the flash cards from the store
  // and add them to the list of cards to test on.
  ngOnInit() {
    this.updateAllFlashCardsArray();
    this.flashCardsToTestOn = this.allFlashCards;
  }

  // Update the array of all flash cards from the store.
  updateAllFlashCardsArray() {
    this.allFlashCards = [];

    let subscription = this.allFlashCards$.subscribe(flashCards => {
      flashCards.forEach(card => {
        this.allFlashCards.push(card);
      });
    });
    subscription.unsubscribe();
  }

  // When the user clicks on the see results button, the results are calculated.
  seeResults() {
    this.incorrectFlashCards = [];
    this.numberCorrect = 0;
    this.numberIncorrect = 0;
    // for each card in flash cards to test on,
    // grab the card from the store and check the result.
    for (let flashCard of this.flashCardsToTestOn) {
      this.store.select(selectFlashCardById(flashCard.id)).pipe(
        // Filter out undefined values
        filter((card): card is FlashCard => card !== undefined)
      ).subscribe(card => {
        console.log(card.question);
        if (card.result === true) {
          this.numberCorrect++;
        } else {
          this.numberIncorrect++;
          // If the card is incorrect, add it to a separate array 
          // so the user can select to retry them only.
          this.incorrectFlashCards.push(card);
        }
      });
    }
    this.showResults = true;
  }

  getPercentage() {
      return Math.round((this.numberCorrect / (this.numberCorrect + this.numberIncorrect)) * 100) ?? 0;
    }

  retryAll() {
    this.updateAllFlashCardsArray();
    this.showResults = false;
    this.flashCardsToTestOn = this.allFlashCards;
    this.incorrectFlashCards = [];
  }

  retryIncorrectOnly() {
    this.showResults = false;
    this.flashCardsToTestOn = this.incorrectFlashCards;
    // Must clear the incorrect cards to properly restart the test.
    this.incorrectFlashCards = [];
  }
}
