import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, of, switchMap } from 'rxjs';

@Injectable()
export class FlashCardsEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private http: HttpClient
  ) {}

  // OPTIONAL TODO: Implement an effect to save flash cards to a backend
  // NOTE: This is an example of how you might implement an effect to save flash cards to a backend.
  // You will need three new actions: addOneFlashCardAPI, addOneFlashCardAPISuccess, and addOneFlashCardAPIFailure
  // each with their own appropriate parameters.
  // Similarly, you should fetch the flash cards from the backend when the application starts via
  // an effect which triggers on application load.
  //
  // addOneFlashCardAPI$ = createEffect(() => this.actions$.pipe(
  //   ofType(addOneFlashCardAPI),
  //   switchMap(({ flashCard }) => 
  //     from(this.http.post('/api/flash-cards', flashCard)).pipe(
  //       map(() => addOneFlashCardAPISuccess({ flashCard })),
  //       catchError(error => of(addOneFlashCardAPIFailure({ flashCard, error })))
  //     )
  //   )
  // )
}
