import { createAction, props } from '@ngrx/store';
import { EventEntityModel } from "../../../../../../event-app/src/app/modules/calendar/models/event-entity.model";

export const loadCalendar = createAction('[Event] Load Calendar');

export const loadCalendarSuccess = createAction(
  '[Event] Load Calendar Success',
  props<{ calendar: EventEntityModel[] }>()
);

export const loadCalendarFailure = createAction(
  '[Event] Load Calendar Failure',
  props<{ error: any }>()
);
