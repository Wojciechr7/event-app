import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng";
import { select, Store } from "@ngrx/store";
import { CalendarPartialState } from "../../+state/calendar.reducer";
import { Observable } from "rxjs";
import { EventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import { getSelected, getSelectedMany } from "../../+state/calendar.selectors";

@Component({
  selector: 'event-app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss']
})
export class DayDetailsComponent implements OnInit {

  selectedEvents$: Observable<EventDTO[]>;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private store: Store<CalendarPartialState>
  ) { }

  ngOnInit(): void {
    this.selectedEvents$ = this.store.pipe(select(getSelectedMany));
  }

}
