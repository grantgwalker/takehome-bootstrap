import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createAction, createReducer, on, props } from '@ngrx/store';
import { FlashCard } from '../app.models';

export interface FlashCardsState extends EntityState<FlashCard> { 
  loading: boolean;
  error: string | null;
}

export const adapter = createEntityAdapter<FlashCard>();

export const initialState: FlashCardsState = adapter.getInitialState({
  flashCards: [],
  loading: false,
  error: null
});

// ********************LOAD ALL FLASHCARD ACTIONS***************************
/**
 * @description Loads all flash cards to the state
 */
export const loadFlashcardsAction = createAction(
  '[Flashcards] Load Flashcards'
);
/**
 * @description Loads all flash cards to the database, then
 * update the state with the new flash card
 */
export const loadFlashcardsAPIAction = createAction(
  '[Flashcards] Load Flashcards'
);
/**
 * @description This action is called when the API call
 * to load all flash cards is successful
 */
export const loadFlashcardsAPISuccessAction = createAction(
  '[Flashcards] Load Flashcards Success', 
  props<{ flashCards: FlashCard[] }>()
);
/**
 * @description This action is called when the API call
 * fails to load all flash cards 
 */
export const loadFlashcardsAPIFailureAction = createAction(
  '[Flashcards] Load Flashcards Failure', 
  props<{ error: any }>()
);

// ********************ADD FLASHCARD ACTIONS********************************
/**
 * @description Adds one flash card to the state
 */
export const addOneFlashCardAction = createAction(
  '[Flash Cards] Add One',
  props<{ flashCard: FlashCard }>(),
);
/**
 * @description Add one flashcard to the database, then
 * update the state with the new flash card
 */
export const addOneFlashCardAPIAction = createAction(
  '[Flash Cards] Add One (API)',
  props<{ flashCard: FlashCard }>(),
);
/**
 * @description This action is called when the API call
 * to add a flash card is successful
 */
export const addOneFlashCardAPISuccessAction = createAction(
  '[Flash Cards] Add One (API) Success',
  props<{ flashCard: FlashCard }>(),
);
/**
 * @description This action is called when the API call
 * fails to add a flash card
 */
export const addOneFlashCardAPIFailureAction = createAction(
  '[Flash Cards] Add One (API) Failure',
  props<{ flashCard: FlashCard, error: any }>(),
);

// ********************UPDATE FLASHCARD ACTIONS********************************
/**
 * @description update specified flash card to the state
 */
export const updateFlashCardAction = createAction(
  '[Flash Cards] Update',
  props<{ flashCard: FlashCard }>(),
);
/**
 * @description updates specified flashcard to the database, then
 * update the state with the new flash card
 */
export const updateFlashCardAPIAction = createAction(
  '[Flash Cards] Update (API)',
  props<{ flashCard: FlashCard }>(),
);
/**
 * @description This action is called when the API call
 * to update a flash card is successful
 */
export const updateFlashCardAPISuccessAction = createAction(
  '[Flash Cards] Update (API) Success',
  props<{ flashCard: FlashCard }>(),
);
/**
 * @description This action is called when the API call
 * fails to update a flash card
 */
export const updateFlashCardAPIFailureAction = createAction(
  '[Flash Cards] Update (API) Failure',
  props<{ flashCard: FlashCard, error: any }>(),
);

// ********************DELETE FLASHCARD ACTIONS********************************
/**
 * @description deletes specified flash card from the state
 */
export const deleteFlashCardAction = createAction(
  '[Flash Cards] Delete',
  props<{ id: string }>(),
);
/**
 * @description delete specified flashcard from the database, then
 * update the state without the new flash card
 */
export const deleteFlashCardAPIAction = createAction(
  '[Flash Cards] Delete (API)',
  props<{ id: string }>(),
);
/**
 * @description This action is called when the API call
 * to delete a flash card is successful
 */
export const deleteFlashCardAPISuccessAction = createAction(
  '[Flash Cards] Delete (API) Success',
  props<{ id: string }>(),
);
/**
 * @description This action is called when the API call
 * fails to delete a flash card
 */
export const deleteFlashCardAPIFailureAction = createAction(
  '[Flash Cards] Delete (API) Failure',
  props<{ id: string, error: any }>(),
);


export const reducer = createReducer(
  initialState,

  // Add one flash card
  on(addOneFlashCardAction, (state, { flashCard }) =>
    adapter.addOne(flashCard, state),
  ),

  // Add a flash card to our store after successful creation at the backend
  on(addOneFlashCardAPISuccessAction, (state, { flashCard }) =>
    adapter.addOne(flashCard, state),
  ),

  // Remove specified flash card
  on(deleteFlashCardAction, (state, { id }) =>
    adapter.removeOne(id, state),
  ),

  on(updateFlashCardAction, (state, { flashCard }) =>
    adapter.updateOne({ id: flashCard.id, changes: flashCard }, state),
  ),

  // Load all flash card api actions
  on(loadFlashcardsAPIAction, (state) => ({
    ...state,
    loading: true
  })),
  on(loadFlashcardsAPISuccessAction, (state, { flashCards }) =>
    adapter.setAll(flashCards, {
      ...state,
      loading: false
    })
  ),
  on(loadFlashcardsAPIFailureAction, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update flash card api success action
  on(updateFlashCardAPISuccessAction, (state, { flashCard }) =>
    adapter.updateOne(
      { id: flashCard.id, changes: flashCard },
      state
    )
  ),

  // Delete flash card api success action
  on(deleteFlashCardAPISuccessAction, (state, { id }) =>
    adapter.removeOne(id, state)
  )

    
);
