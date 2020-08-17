import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CalendarActions from './calendar.actions';
import { EventDTO } from "../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import * as moment from "moment";

export const CALENDAR_FEATURE_KEY = 'calendar';

export interface State extends EntityState<EventDTO> {
  selectedId?: string;
  selectedIds?: string[];
  loaded: boolean;
  error?: string | null;
  selectedDate?: moment.Moment;
}

export interface CalendarPartialState {
  readonly [CALENDAR_FEATURE_KEY]: State;
}

export const calendarAdapter: EntityAdapter<EventDTO> = createEntityAdapter<EventDTO>();

export const initialState: State = calendarAdapter.getInitialState({
  loaded: false,
});

const calendarReducer = createReducer(
  initialState,
  on(CalendarActions.loadCalendar, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CalendarActions.loadCalendarSuccess, (state, { calendar }) =>
    calendarAdapter.setAll(calendar, { ...state, loaded: true })
  ),
  on(CalendarActions.loadCalendarFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CalendarActions.selectEventId, (state, { eventId }) => ({
    ...state,
    selectedId: eventId
  })),
  on(CalendarActions.selectCalendarDaySuccess, (state, { selectedDate, selectedIds }) => ({
    ...state,
    selectedDate,
    selectedIds
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return calendarReducer(state, action);
}
