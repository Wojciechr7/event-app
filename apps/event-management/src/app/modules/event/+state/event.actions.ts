import { createAction, props } from '@ngrx/store';
import { EventEntityModel } from "../../../../../../event-app/src/app/modules/calendar/models/event-entity.model";
import {CreateEventDTO} from "../../../../../../../libs/api-interfaces/src/lib/dto/create-event.dto";
import {Update} from "@ngrx/entity";

export const loadCalendar = createAction('[Event] Load Calendar');

export const loadCalendarSuccess = createAction(
  '[Event] Load Calendar Success',
  props<{ calendar: EventEntityModel[] }>()
);

export const loadCalendarFailure = createAction(
  '[Event] Load Calendar Failure',
  props<{ error: any }>()
);

export const addEvent = createAction(
  '[Event] Add Event',
  props<{ event: CreateEventDTO }>()
);

export const addEventSuccess = createAction(
  '[Event] Add Event Success',
  props<{ event: EventEntityModel }>()
);

export const addEventFailure = createAction(
  '[Event] Add Event Failure',
  props<{ error: any }>()
);

export const editEvent = createAction(
  '[Event] Edit Event',
  props<{ event: CreateEventDTO, eventId: string }>()
);

export const editEventSuccess = createAction(
  '[Event] Edit Event Success',
  props<{ event: Update<EventEntityModel> }>()
);

export const editEventFailure = createAction(
  '[Event] Edit Event Failure',
  props<{ error: any }>()
);

export const deleteEvent = createAction(
  '[Event] Delete Event',
  props<{ id: string }>()
);

export const deleteEventSuccess = createAction(
  '[Event] Delete Event Success',
  props<{ id: string }>()
);

export const deleteEventFailure = createAction(
  '[Event] Delete Event Failure',
  props<{ error: any }>()
);
