import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createAction, createReducer, on, props } from '@ngrx/store';
import { FlashCard } from '../app.models';

export interface FlashCardsState extends EntityState<FlashCard> { }

export const adapter = createEntityAdapter<FlashCard>();

export const initialState: FlashCardsState = adapter.getInitialState();

/**
 * @description Adds one flash card to the state
 */
export const addOneFlashCard = createAction(
  '[Flash Cards] Add One',
  props<{ flashCard: FlashCard }>(),
);

/**
 * @description Add one flashcard to the database, then
 * update the state with the new flash card
 */
export const addOneFlashCardAPI = createAction(
  '[Flash Cards] Add One (API)',
  props<{ flashCard: FlashCard }>(),
);
/**
 * @description This action is called when the API call
 * to add a flash card is successful
 */
export const addOneFlashCardAPISuccess = createAction(
  '[Flash Cards] Add One (API) Success',
  props<{ flashCard: FlashCard }>(),
);
/**
 * @description This action is called when the API call
 * fails to add a flash card
 */
export const addOneFlashCardAPIFailure = createAction(
  '[Flash Cards] Add One (API) Failure',
  props<{ flashCard: FlashCard, error: any }>(),
);

// TODO: Add an update action (with API versions)
/**
 * @description update specified flash card to the state
 */
export const updateFlashCard = createAction(
  '[Flash Cards] Update',
  props<{ id: string }>(),
);

/**
 * @description updates specified flashcard to the database, then
 * update the state with the new flash card
 */
export const updateFlashCardAPI = createAction(
  '[Flash Cards] Update (API)',
  props<{ id: string }>(),
);
/**
 * @description This action is called when the API call
 * to update a flash card is successful
 */
export const updateFlashCardAPISuccess = createAction(
  '[Flash Cards] Update (API) Success',
  props<{ id: string }>(),
);
/**
 * @description This action is called when the API call
 * fails to update a flash card
 */
export const updateFlashCardAPIFailure = createAction(
  '[Flash Cards] Update (API) Failure',
  props<{ id: string, error: any }>(),
);

// TODO: Add a delete action (with API versions)
/**
 * @description deletes specified flash card from the state
 */
export const deleteFlashCard = createAction(
  '[Flash Cards] Delete',
  props<{ id: string }>(),
);

/**
 * @description delete specified flashcard from the database, then
 * update the state without the new flash card
 */
export const deleteFlashCardAPI = createAction(
  '[Flash Cards] Delete (API)',
  props<{ id: string }>(),
);
/**
 * @description This action is called when the API call
 * to delete a flash card is successful
 */
export const deleteFlashCardAPISuccess = createAction(
  '[Flash Cards] Delete (API) Success',
  props<{ id: string }>(),
);
/**
 * @description This action is called when the API call
 * fails to delete a flash card
 */
export const deleteFlashCardAPIFailure = createAction(
  '[Flash Cards] Delete (API) Failure',
  props<{ id: string }>(),
);


export const reducer = createReducer(
  initialState,

  // Add one flash card
  on(addOneFlashCard, (state, { flashCard }) =>
    adapter.addOne(flashCard, state),
  ),

  // Add a flash card to our store after successful creation at the backend
  on(addOneFlashCardAPISuccess, (state, { flashCard }) =>
    adapter.addOne(flashCard, state),
  ),
);
