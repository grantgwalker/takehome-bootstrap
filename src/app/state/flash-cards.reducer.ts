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

// TODO: Add a delete and update action

export const reducer = createReducer(
  initialState,

  // Add one flash card
  on(addOneFlashCard, (state, { flashCard }) =>
    adapter.addOne(flashCard, state),
  ),
);
