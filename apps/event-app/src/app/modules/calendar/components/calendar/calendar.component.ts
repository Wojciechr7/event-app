import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'event-app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 'auto',
    events: [
      { id: 'test', title: 'event 1', date: '2020-07-01', desc: 'something' },
      { id: 'test33', title: 'event 1', date: '2020-07-01', desc: 'something' },
      { id: 'tes44fdsgfdsh', title: 'event 1', date: '2020-07-01', desc: 'something' },
      { id: 'test2', title: 'event 2', date: '2020-07-02', desc: 'something' }
    ],
    eventClick: (v) => this.handleEventClick(v)
  };

  constructor() { }

  ngOnInit(): void {
  }

  private handleEventClick(arg) {
    console.log(arg.event._def.publicId)
/*    const calendarApi = this.calendarComponent.getApi();
    console.log(calendarApi.getEventById('test'));*/

  }

}
