import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { EventPartialState } from "../../+state/event.reducer";
import { getAllEvent, getTableFields } from "../../+state/event.selectors";
import * as EventActions from '../../+state/event.actions';
import { Observable } from "rxjs";
import { EventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import { tap } from "rxjs/operators";
import { TableFieldModel } from "../../../../../../../../libs/base/src/lib/models/table-field.model";
import { DialogService } from "primeng";
import { AddFormComponent } from "../add-form/add-form.component";

@Component({
  selector: 'event-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  events$: Observable<EventDTO[]>;
  tableFields$: Observable<TableFieldModel[]>;

  constructor(
    private store: Store<EventPartialState>,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadTableData();
  }

  openAddNewDialog() {
    const ref = this.dialogService.open(AddFormComponent, {
      header: 'Add new event',
      width: '70%'
    });
  }

  private loadTableData() {
    this.store.dispatch(EventActions.loadCalendar());

    this.events$ = this.store.pipe(select(getAllEvent), tap(v => {
      console.log(v)
    }));
    this.tableFields$ = this.store.pipe(select(getTableFields));
  }

}
