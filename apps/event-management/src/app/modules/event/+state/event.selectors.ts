import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EVENT_FEATURE_KEY,
  State,
  EventPartialState,
  eventAdapter,
} from './event.reducer';

// Lookup the 'Event' feature state managed by NgRx
export const getEventState = createFeatureSelector<EventPartialState, State>(
  EVENT_FEATURE_KEY
);

const { selectAll, selectEntities } = eventAdapter.getSelectors();

export const getEventLoaded = createSelector(
  getEventState,
  (state: State) => state.loaded
);

export const getEventError = createSelector(
  getEventState,
  (state: State) => state.error
);

export const getAllEvent = createSelector(getEventState, (state: State) =>
  selectAll(state)
);

export const getEventEntities = createSelector(getEventState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getEventState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getEventEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getTableFields = createSelector(
  getEventState,
  (state: State) => state.tableFields
);
