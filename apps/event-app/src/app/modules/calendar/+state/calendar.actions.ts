import { createAction, props } from '@ngrx/store';
import { EventEntityModel } from "../models/event-entity.model";
import * as moment from "moment";

export const loadCalendar = createAction('[Calendar] Load Calendar');

export const loadCalendarSuccess = createAction(
  '[Calendar] Load Calendar Success',
  props<{ calendar: EventEntityModel[] }>()
);

export const loadCalendarFailure = createAction(
  '[Calendar] Load Calendar Failure',
  props<{ error: any }>()
);

export const selectEventId = createAction(
  '[Calendar] Select Event Id',
  props<{ eventId: string }>()
);

export const selectCalendarDay = createAction(
  '[Calendar] Select Calendar Day',
  props<{ dateString: string }>()
);

export const selectCalendarDaySuccess = createAction(
  '[Calendar] Select Calendar Day Success',
  props<{selectedDate: moment.Moment, selectedIds: string[]}>()
);
