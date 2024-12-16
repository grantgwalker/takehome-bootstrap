import { Component, inject, Injectable, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FlashCard } from '../app.models';
import { FlashCardComponent } from "../flash-card/flash-card.component";
import { loadFlashcardsAPIAction } from '../state/flash-cards.reducer';
import { selectAllFlashCards } from '../state/flash-cards.selectors';


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
  showAnswer = false;
  allFlashCards$: Observable<FlashCard[]> = this.store.select(selectAllFlashCards);
  // The state of the test must remain static,
  // this is why the flashcards are put into arrays instead of being directly accessed from the store.
  incorrectFlashCards: FlashCard[] = [];
  allFlashCards: FlashCard[] = [];
  flashCardsToTestOn: FlashCard[] = [];
  currentCardIndex = 0;
  currentAnswer = '';


  // On initialization, get all flash cards from the database and pull from store.
  // and add them to the list of cards to test on.
  ngOnInit() {
    this.updateAllFlashCardsArray();
    this.flashCardsToTestOn = this.allFlashCards;
  }

  // Update the array of all flash cards from the database and pull from store.
  updateAllFlashCardsArray() {
    this.store.dispatch(loadFlashcardsAPIAction());
    
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
    this.showResults = true;
  }

  // Calculate the percentage of correct answers for the test.
  getPercentage() {
      return Math.round((this.numberCorrect / (this.numberCorrect + this.numberIncorrect)) * 100) ?? 0;
    }

  // If retrying on all cards, reset the test and test on all cards.
  retryAll() {
    this.updateAllFlashCardsArray();
    this.flashCardsToTestOn = this.allFlashCards;
    this.resetTest();
  }

  // If retrying on incorrect cards only, reset the test and test on incorrect cards.
  retryIncorrectOnly() {
    this.flashCardsToTestOn = this.incorrectFlashCards;
    this.resetTest();
  }

  // Reset the test to be taken again.
  resetTest() {
    this.showResults = false;
    this.numberCorrect = 0;
    this.numberIncorrect = 0;
    this.currentCardIndex = 0;
    // Must clear the incorrect cards to properly restart the test.
    this.incorrectFlashCards = [];
  }

  show() {
    this.showAnswer = !this.showAnswer;
  }

  // Method to mark the card as correct
  // Updating a card is specific to the card component, therefore it is implemented here.
  markCorrect() {
    this.numberCorrect++;
    this.nextCard();
    if(this.isTestComplete()){
      this.showResults = true;
    }
  }

  // Method to mark the card as incorrect
  // Updating a card is specific to the card component, therefore it is implemented here.
  markIncorrect() {
    this.numberIncorrect++;
    this.incorrectFlashCards.push(this.flashCardsToTestOn[this.currentCardIndex]);
    this.nextCard();
    if(this.isTestComplete()){
      this.showResults = true;
    }
  }

  // moves the index so that the next card is displayed in the html
  nextCard() {
    this.currentCardIndex++;
  }

  // determine whether there is any more cards left.
  isTestComplete() {
    return this.currentCardIndex >= this.flashCardsToTestOn.length;
  }

}
