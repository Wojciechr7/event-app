import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as EventActions from './event.actions';
import * as moment from "moment";
import {map, withLatestFrom} from "rxjs/operators";
import { EventDTO } from "../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import { EventService } from "../services/event.service";
import {select} from "@ngrx/store";
import {getAllEvent} from "./event.selectors";
import {Update} from "@ngrx/entity";
import {CreateEventDTO} from "../../../../../../../libs/api-interfaces/src/lib/dto/create-event.dto";
import {EventEntityModel} from "../../../../../../event-app/src/app/modules/calendar/models/event-entity.model";

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

  addEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.addEvent),
      fetch({
        run: (action) => {
          const year = moment().get('year');

          return this.eventService.addEvent(action.event).pipe(
            map((newEvent: EventDTO) => {

              return EventActions.addEventSuccess({
                event: {
                  ...newEvent,
                  id: newEvent._id,
                  date: moment(`${ year }-${ newEvent.month }-${ newEvent.day }`, 'YYYY-M-D').format('YYYY-MM-DD'),
                  title: newEvent.name
                }
              })
            })
          )
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EventActions.addEventFailure({ error });
        },
      })
    )
  );

  editEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.editEvent),
      fetch({
        run: (action) => {
          const year = moment().get('year');

          return this.eventService.putEvent(action.event, action.eventId).pipe(
            map((updatedEvent: EventDTO) => {
              const update: Update<EventEntityModel> = {
                id: action.eventId,
                changes: {
                  ...updatedEvent,
                  id: updatedEvent._id,
                  date: moment(`${ year }-${ updatedEvent.month }-${ updatedEvent.day }`, 'YYYY-M-D').format('YYYY-MM-DD'),
                  title: updatedEvent.name
                }
              }

              return EventActions.editEventSuccess({event: update});
            })
          )
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EventActions.editEventFailure({ error });
        },
      })
    )
  );

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.deleteEvent),
      fetch({
        run: (action) => {
          return this.eventService.deleteEvent(action.id).pipe(
            map((deletedId: string) => {
              return EventActions.deleteEventSuccess({id: deletedId});
            })
          )
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EventActions.deleteEventFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private eventService: EventService
  ) {}
}
