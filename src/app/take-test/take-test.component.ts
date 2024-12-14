import { Component, inject, Injectable, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FlashCard } from '../app.models';
import { FlashCardListComponent } from "../flash-card-list/flash-card-list.component";
import { FlashCardComponent } from "../flash-card/flash-card.component";
import { selectAllFlashCards } from '../state/flash-cards.selectors';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-take-test',
  standalone: true,
  imports: [RouterLink, FlashCardComponent, FlashCardListComponent],
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.scss'
})
export class TakeTestComponent {
  store = inject(Store);
  title = input('Flash-Focus');
  FlashCardListComponent = inject(FlashCardListComponent);
  allFlashCards= this.store.select(selectAllFlashCards);
  incorrectFlashCards: FlashCard[] = [];
  numberCorrect = 0;
  numberIncorrect = 0;
  retryIncorrect = false;

  seeResults() {
    // Subscribe to get the actual array of flash cards
    this.allFlashCards.subscribe(flashCards => {
      this.numberCorrect = 0;
      this.numberIncorrect = 0;
      
      flashCards.forEach(flashCard => {
        if (flashCard.result === true) {
          this.numberCorrect++;
        } else {
          this.numberIncorrect++;
          this.incorrectFlashCards.push(flashCard);
        }
      });
    });    
  }

  getPercentage() {
      return Math.round((this.numberCorrect / (this.numberCorrect + this.numberIncorrect)) * 100);
    }

  retryAll() {
    this.retryIncorrect = false;
    //this.resetResutls();
  }

  retryIncorrectOnly() {
    this.retryIncorrect = true;
    //this.resetResutls();
  }

  resetResutls() {
    this.numberCorrect = 0;
    this.numberIncorrect = 0;
    this.incorrectFlashCards = [];
  }
}
