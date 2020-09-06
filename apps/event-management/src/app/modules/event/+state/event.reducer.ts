import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as EventActions from './event.actions';
import { TableFieldModel } from "../../../../../../../libs/base/src/lib/models/table-field.model";
import { EventDTO } from "../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";

export const EVENT_FEATURE_KEY = 'event';

export interface State extends EntityState<EventDTO> {
  selectedId?: string | number; // which Event record has been selected
  loaded: boolean; // has the Event list been loaded
  error?: string | null; // last none error (if any)
  tableFields: TableFieldModel[];
}

export interface EventPartialState {
  readonly [EVENT_FEATURE_KEY]: State;
}

export const eventAdapter: EntityAdapter<EventDTO> = createEntityAdapter<
  EventDTO
>();

export const initialState: State = eventAdapter.getInitialState({
  loaded: false,
  tableFields: [
    {
      field: 'name',
      header: 'Name'
    },
    {
      field: 'date',
      header: 'Date'
    },
    {
      field: 'condition',
      header: 'Description'
    }
  ]
});

const eventReducer = createReducer(
  initialState,
  on(EventActions.loadCalendarSuccess, (state, { calendar }) =>
    eventAdapter.setAll(calendar, { ...state, loaded: true })
  ),
  on(EventActions.loadCalendarFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return eventReducer(state, action);
}
