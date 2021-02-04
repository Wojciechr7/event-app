import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { select, Store } from "@ngrx/store";
import { CalendarPartialState } from "../../+state/calendar.reducer";
import { getAllCalendar } from "../../+state/calendar.selectors";
import * as CalendarActions from '../../+state/calendar.actions';
import { Observable } from "rxjs";
import { EventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import { EventDetailsComponent } from "../event-details/event-details.component";
import { DialogService, DynamicDialogConfig } from "primeng";
import { DayDetailsComponent } from "../day-details/day-details.component";
import {tap} from "rxjs/operators";

@Component({
  selector: 'event-app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  events$: Observable<EventDTO[]>;
  options: CalendarOptions;

  constructor(
    private store: Store<CalendarPartialState>,
    private resolver: ComponentFactoryResolver,
    private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(CalendarActions.loadCalendar());
    this.events$ = this.store.pipe(select(getAllCalendar), tap(v => {
      console.log(v)
    }));

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      height: 'auto',
      dateClick: (v) => this.handleDateClick(v),
      eventClick: (v) => this.handleEventClick(v)
    }
  }

    private handleEventClick(arg) {
      this.store.dispatch(CalendarActions.selectEventId({eventId: arg.event._def.publicId}));

      const ref = this.dialogService.open(EventDetailsComponent, {
        header: 'Event details',
        width: '70%'
      });
    }

    private handleDateClick(v) {
      this.store.dispatch(CalendarActions.selectCalendarDay({dateString: v.date}));

      const config: DynamicDialogConfig = {

      }

      const ref = this.dialogService.open(DayDetailsComponent, {
        header: 'Day events',
        width: '70%',
        styleClass: 'base-dialog-style'
      });
    }

}
