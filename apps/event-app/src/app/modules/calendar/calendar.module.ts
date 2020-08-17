import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCalendar from './+state/calendar.reducer';
import { CalendarEffects } from './+state/calendar.effects';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { DialogModule } from 'primeng/dialog';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { DayDetailsComponent } from './components/day-details/day-details.component';
import { BaseModule } from "../../../../../../libs/base/src/lib/base.module";

/*FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);*/

@NgModule({
  declarations: [CalendarComponent, EventDetailsComponent, DayDetailsComponent],
  imports: [
    FullCalendarModule,
    CommonModule,
    BaseModule,
    CalendarRoutingModule,
    StoreModule.forFeature(
      fromCalendar.CALENDAR_FEATURE_KEY,
      fromCalendar.reducer
    ),
    EffectsModule.forFeature([CalendarEffects]),

  ],
})
export class CalendarModule {
}
