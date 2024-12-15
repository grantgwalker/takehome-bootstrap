import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, FlashCardsState } from './flash-cards.reducer';

export const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectFlashCardsState =
  createFeatureSelector<FlashCardsState>('flashCards');

/**
 * @description Selects all flash cards from the NGRX store
 */
//export const selectAllFlashCards = createSelector(selectFlashCardsState, selectAll);

export const selectFlashCardEntities = createSelector(selectFlashCardsState, selectEntities);
/**
 * @description Selects specified flash card from the NGRX store
 */
export const selectFlashCardById = (id: string) => createSelector(selectFlashCardEntities, (entities) => entities[id]);

export const selectAllFlashCards = createSelector(
  selectFlashCardsState,
  selectAll
);

export const selectFlashCardsLoading = createSelector(
  selectFlashCardsState,
  state => state.loading
);

export const selectFlashCardsError = createSelector(
  selectFlashCardsState,
  state => state.error
);