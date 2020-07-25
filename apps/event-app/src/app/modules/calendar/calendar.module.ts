import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import dayGridPlugin from '@fullcalendar/daygrid';
//import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  //interactionPlugin
]);

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule
  ]
})
export class CalendarModule { }
