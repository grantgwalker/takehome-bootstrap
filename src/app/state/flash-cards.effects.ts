import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { addOneFlashCardAPI, addOneFlashCardAPIFailure, addOneFlashCardAPISuccess } from './flash-cards.reducer';

@Injectable()
export class FlashCardsEffects {
  actions$ = inject(Actions);
  http = inject(HttpClient);

  // TODO: Implement an effect to save flash cards to a backend
  // NOTE: This is an example of how you might implement an effect to save flash cards to a backend.
  // You will need three actions: addOneFlashCardAPI, addOneFlashCardAPISuccess, and addOneFlashCardAPIFailure
  // each with their own appropriate parameters.
  // This effect will trigger when `addOneFlashCardAPI` is dispatched.
  addOneFlashCardAPI$ = createEffect(() => this.actions$.pipe(
    ofType(addOneFlashCardAPI),
    switchMap(({ flashCard }) => 
      from(this.http.post('/some-api/flash-cards/add', flashCard)).pipe(
        map(() => addOneFlashCardAPISuccess({ flashCard })),
        catchError(error => of(addOneFlashCardAPIFailure({ flashCard, error })))
      )
    )
  ));

  // Similarly, you should fetch the flash cards from the backend when the application starts via
  // an effect which triggers on application load.
}
