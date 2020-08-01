import { createAction, props } from '@ngrx/store';
import { EventDTO } from "../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import { EventEntityModel } from "../models/event-entity.model";

export const loadCalendar = createAction('[Calendar] Load Calendar');

export const loadCalendarSuccess = createAction(
  '[Calendar] Load Calendar Success',
  props<{ calendar: EventEntityModel[] }>()
);

export const loadCalendarFailure = createAction(
  '[Calendar] Load Calendar Failure',
  props<{ error: any }>()
);
