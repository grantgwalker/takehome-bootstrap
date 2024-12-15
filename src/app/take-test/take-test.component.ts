import { AsyncPipe } from '@angular/common';
import { Component, inject, Injectable, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FlashCard } from '../app.models';
import { FlashCardComponent } from "../flash-card/flash-card.component";
import { selectAllFlashCards } from '../state/flash-cards.selectors';


@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-take-test',
  standalone: true,
  imports: [RouterLink, FlashCardComponent, AsyncPipe],
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
  incorrectFlashCards: FlashCard[] = [];
  flashCardsToTestOn: FlashCard[] = [];
  allFlashCards: FlashCard[] = [];

  ngOnInit() {
    this.updateResults();
  }

  updateResults() {
    this.allFlashCards = [];
    // On initialization, get all the flash cards from the store
    // and add them to the list of cards to test on.
    let subscription = this.allFlashCards$.subscribe(flashCards => {
      flashCards.forEach(card => {
        this.allFlashCards.push(card);
      });
    });
    subscription.unsubscribe();
    this.flashCardsToTestOn = this.allFlashCards;
  }

  seeResults() {
    this.updateResults();
    this.numberCorrect = 0;
    this.numberIncorrect = 0;
    // TODO: need to get the latest update from the store before calculating the results.
    for (let card of this.flashCardsToTestOn){
      if (card.result === true) {
              this.numberCorrect++;
            } else {
              this.numberIncorrect++;
              this.incorrectFlashCards.push(card);
          }
    }
    this.showResults = true;
  }

  getPercentage() {
      return Math.round((this.numberCorrect / (this.numberCorrect + this.numberIncorrect)) * 100) ?? 0;
    }

  retryAll() {
    this.updateResults();
    this.showResults = false;
    this.flashCardsToTestOn = this.allFlashCards;
    this.incorrectFlashCards = [];

  }

  retryIncorrectOnly() {
    this.updateResults();
    this.showResults = false;
    this.flashCardsToTestOn = this.incorrectFlashCards;
  }



  // Cards update themselves, whether they are correct or incorrect. 
  // When taking a test, I want the list of cards to test on
  // At the end of the test, the user wants to see the results.
  // # correct / # total. 
  // The user then can select to take the test with all cards or only the incorrect ones.
  // If the user chooses all cards, the list of cards to test on is the same as the original list.
  // If the user chooses only the incorrect ones, the list of cards to test on is the list of incorrect cards.
  // The list of incorrect cards are determined by the original list filtered by the result property.
  // The result property is set by the card component when the user clicks on the answer button.
  // The cards are updated in the store, so the list of cards to test on is the list of cards in the store.
  // The list of cards to test on is an observable, so the list of cards to test on is updated when the store is updated.
  // So to keep the list of cards from updating automatically, I need to unsubscribe from the observable.
  // Or I can use the async pipe in the template to subscribe and unsubscribe automatically.
  // or I can create a separate array of incorrect cards and use that to display the results.
  // I can do that by subscribing to the observable and creating a new array of incorrect cards.
}
