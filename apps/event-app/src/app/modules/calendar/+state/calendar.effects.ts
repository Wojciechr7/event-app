import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as CalendarActions from './calendar.actions';
import { CalendarService } from "../services/calendar.service";
import { map, withLatestFrom } from "rxjs/operators";
import { EventDTO } from "../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import * as moment from "moment";
import { Store } from "@ngrx/store";
import { CalendarPartialState } from "./calendar.reducer";
import { getAllCalendar } from "./calendar.selectors";

@Injectable()
export class CalendarEffects {

  loadCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarActions.loadCalendar),
      fetch({
        run: (action) => {
          const year = moment().get('year');

          return this.calendarService.getCalendar().pipe(
            map((calendar: EventDTO[]) => {
              return CalendarActions.loadCalendarSuccess({
                calendar: calendar.map((event: EventDTO) => {
                  return {
                    ...event,
                    id: event._id,
                    date: moment(`${ year }-${ event.month }-${ event.day }`, 'YYYY-M-D').format('YYYY-MM-DD'),
                    title: event.name
                  }
                })
              });
            })
          )
        },
        onError: (action, error) => {
          console.error('Error', error);
          return CalendarActions.loadCalendarFailure({ error });
        },
      })
    )
  );

  selectCalendarDay$ = createEffect(
    () => this.actions$.pipe(
      ofType(CalendarActions.selectCalendarDay),
      withLatestFrom(this.store.select(getAllCalendar)),
      map(([action, calendars]) => {
        const selectedDate = moment(action.dateString);
        const day = selectedDate.get('D');
        const month = selectedDate.get('M') + 1;

        const selectedIds = calendars
          .filter(calendar => calendar.day === day && calendar.month === month)
          .map(calendar => calendar._id);

        return CalendarActions.selectCalendarDaySuccess({selectedDate, selectedIds});
      })
    ),
  );

  constructor(
    private actions$: Actions,
    private calendarService: CalendarService,
    private store: Store<CalendarPartialState>
  ) {
  }
}
