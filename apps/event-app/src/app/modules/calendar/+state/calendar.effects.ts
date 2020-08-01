import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromCalendar from './calendar.reducer';
import * as CalendarActions from './calendar.actions';
import { CalendarService } from "../services/calendar.service";
import { map } from "rxjs/operators";
import { EventDTO } from "../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import * as moment from "moment";

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

  constructor(
    private actions$: Actions,
    private calendarService: CalendarService
  ) {
  }
}
