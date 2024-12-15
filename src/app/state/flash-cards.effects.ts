import { FlashCardService } from './flashcard.service';

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { addOneFlashCardAPIAction, addOneFlashCardAPIFailureAction, addOneFlashCardAPISuccessAction, deleteFlashCardAPIAction, deleteFlashCardAPIFailureAction, deleteFlashCardAPISuccessAction, loadFlashcardsAPIAction, loadFlashcardsAPIFailureAction, loadFlashcardsAPISuccessAction, updateFlashCardAPIAction, updateFlashCardAPIFailureAction, updateFlashCardAPISuccessAction } from './flash-cards.reducer';

@Injectable()
export class FlashCardsEffects {

  private actions$: Actions = inject(Actions);
  private flashCardService: FlashCardService = inject(FlashCardService);

  loadFlashcards$ = createEffect(() =>this.actions$.pipe(
      ofType(loadFlashcardsAPIAction),
      switchMap(() =>
        from(this.flashCardService.getAllFlashcards()).pipe(
          map(flashCards => loadFlashcardsAPISuccessAction({ flashCards: flashCards ?? [] })),
          catchError(error => of(loadFlashcardsAPIFailureAction({ error })))
        )
      )
    )
  );
  addFlashcard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOneFlashCardAPIAction),
      switchMap(action =>
        from(this.flashCardService.createFlashcard(action.flashCard)).pipe(
          map(flashCard => addOneFlashCardAPISuccessAction({ flashCard })),
          catchError( error => of(addOneFlashCardAPIFailureAction({ 
            flashCard: action.flashCard, 
            error })))
        )
      )
    )
  );
  
  updateFlashcard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFlashCardAPIAction),
      switchMap(action =>
        from(this.flashCardService.updateFlashCard(action.flashCard)).pipe(
          map(flashCard => updateFlashCardAPISuccessAction({ flashCard })),
          catchError(error => of(updateFlashCardAPIFailureAction({ 
            flashCard: action.flashCard,
            error })))
        )
      )
    )
  );

  deleteFlashcard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFlashCardAPIAction),
      switchMap(action =>
        from(this.flashCardService.deleteFlashCard(action.id)).pipe(
          map(() => deleteFlashCardAPISuccessAction({ id: action.id })),
          catchError(error => of(deleteFlashCardAPIFailureAction({
            id: action.id,
            error })))
        )
      )
    )
  );
}

  // Similarly, you should fetch the flash cards from the backend when the application starts via
  // an effect which triggers on application load.
