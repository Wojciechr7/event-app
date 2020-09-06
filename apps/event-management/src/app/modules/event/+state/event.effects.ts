import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as EventActions from './event.actions';
import * as moment from "moment";
import { map } from "rxjs/operators";
import { EventDTO } from "../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import { EventService } from "../services/event.service";

@Injectable()
export class EventEffects {

  loadCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.loadCalendar),
      fetch({
        run: (action) => {
          const year = moment().get('year');

          return this.eventService.getCalendar().pipe(
            map((calendar: EventDTO[]) => {
              return EventActions.loadCalendarSuccess({
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
          return EventActions.loadCalendarFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private eventService: EventService
  ) {}
}
