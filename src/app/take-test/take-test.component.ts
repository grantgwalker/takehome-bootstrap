import { Component, inject, Injectable, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  showAnswer = false;
  allFlashCards$: Observable<FlashCard[]> = this.store.select(selectAllFlashCards);
  // The state of the test must remain static,
  // this is why the flashcards are put into arrays instead of being directly accessed from the store.
  incorrectFlashCards: FlashCard[] = [];
  allFlashCards: FlashCard[] = [];
  flashCardsToTestOn: FlashCard[] = [];
  currentCardIndex = 0;
  currentAnswer = '';


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
    this.showResults = true;
  }

  getPercentage() {
      return Math.round((this.numberCorrect / (this.numberCorrect + this.numberIncorrect)) * 100) ?? 0;
    }

  retryAll() {
    this.updateAllFlashCardsArray();
    this.flashCardsToTestOn = this.allFlashCards;
    this.resetTest();
  }

  retryIncorrectOnly() {
    this.flashCardsToTestOn = this.incorrectFlashCards;
    this.resetTest();
  }

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
    this.store.select(selectFlashCardById(this.flashCardsToTestOn[this.currentCardIndex].id)).subscribe(card => console.log(card?.answer));
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

  nextCard() {
    this.currentCardIndex++;
  }

  isTestComplete() {
    return this.currentCardIndex >= this.flashCardsToTestOn.length;
  }

}
