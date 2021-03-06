import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng";
import { select, Store } from "@ngrx/store";
import { CalendarPartialState } from "../../+state/calendar.reducer";
import { getSelected } from "../../+state/calendar.selectors";
import { Observable } from "rxjs";
import { EventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";

@Component({
  selector: 'event-app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  selectedEvent$: Observable<EventDTO>;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private store: Store<CalendarPartialState>
  ) { }

  ngOnInit(): void {
    this.selectedEvent$ = this.store.pipe(select(getSelected));
  }

}
