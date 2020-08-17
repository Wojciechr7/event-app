import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { select, State, Store } from "@ngrx/store";
import { CalendarPartialState } from "../../+state/calendar.reducer";
import { getAllCalendar } from "../../+state/calendar.selectors";
import * as CalendarActions from '../../+state/calendar.actions';
import * as AppActions from '../../../../+state/app.actions';
import { Observable } from "rxjs";
import { EventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import { tap } from "rxjs/operators";
import { EventDetailsComponent } from "../event-details/event-details.component";
import { DialogService } from "primeng";
import { DayDetailsComponent } from "../day-details/day-details.component";

@Component({
  selector: 'event-app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  events$: Observable<EventDTO[]>;

  options: CalendarOptions;
  displayDetails: boolean = false;
  // @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  /*  calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth',
      height: 'auto',
      events: [
        { id: 'test', title: 'event 1', date: '2020-07-01', desc: 'something' },
        { id: 'test33', title: 'event 1', date: '2020-07-01', desc: 'something' },
        { id: 'tes44fdsgfdsh', title: 'event 1', date: '2020-07-01', desc: 'something' },
        { id: 'test2', title: 'event 2', date: '2020-07-02', desc: 'something' }
      ],
      eventClick: (v) => this.handleEventClick(v),
      dateClick: (v) => this.handleDateClick(v)
    };*/

  constructor(
    private store: Store<CalendarPartialState>,
    private resolver: ComponentFactoryResolver,
    private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(CalendarActions.loadCalendar());

    this.events$ = this.store.pipe(select(getAllCalendar));

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      /*      header: {
              left: 'prev,next',
              center: 'title',
              right: 'month,agendaWeek,agendaDay'
            },*/
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

      const ref = this.dialogService.open(DayDetailsComponent, {
        header: 'Day events',
        width: '70%'
      });
    }

}
