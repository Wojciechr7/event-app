import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {EventPartialState} from "../../+state/event.reducer";
import {getAllEvent, getTableFields} from "../../+state/event.selectors";
import * as EventActions from '../../+state/event.actions';
import {Observable} from "rxjs";
import {EventDTO} from "../../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import {CreateEventDTO} from "../../../../../../../../libs/api-interfaces/src/lib/dto/create-event.dto";
import {tap} from "rxjs/operators";
import {TableFieldModel} from "../../../../../../../../libs/base/src/lib/models/table-field.model";
import {ConfirmationService, DialogService} from "primeng";
import {AddFormComponent} from "../add-form/add-form.component";
import {EventFormModel} from '../../models/event-form.model';
import * as moment from 'moment';
import {TableSettingsModel} from "../../../../../../../../libs/base/src/lib/models/table-settings.model";
import {EditFormComponent} from "../edit-form/edit-form.component";
import {log} from "util";

@Component({
  selector: 'event-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  events$: Observable<EventDTO[]>;
  tableFields$: Observable<TableFieldModel[]>;
  tableSettings: TableSettingsModel<EventDTO>;

  constructor(
    private store: Store<EventPartialState>,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.loadTableData();
  }

  openAddNewDialog() {
    const ref = this.dialogService.open(AddFormComponent, {
      header: 'Add new event',
      width: '70%'
    });

    ref.onClose.subscribe((dialogData: EventFormModel) => {
      const momentDate = moment(dialogData.date);

      const newEvent: CreateEventDTO = {
        ...dialogData,
        day: momentDate.get('D'),
        month: momentDate.get('month') + 1,
        created_at: new Date()
      }

      this.store.dispatch(EventActions.addEvent({event: newEvent}));
    });
  }

  private openEditEventDialog(editingEvent: EventDTO) {
    const ref = this.dialogService.open(EditFormComponent, {
      header: 'Edit event',
      width: '70%',
      data: {
        event: editingEvent
      }
    });

    ref.onClose.subscribe((dialogData: EventFormModel) => {
      const momentDate = moment(dialogData.date);

      const updateEvent: CreateEventDTO = {
        ...dialogData,
        day: momentDate.get('D'),
        month: momentDate.get('month') + 1,
      }

      this.store.dispatch(EventActions.editEvent({event: updateEvent, eventId: editingEvent._id}));
    });
  }

  private openConfirmDeleteEventDialog(event: EventDTO) {
    this.confirmationService.confirm({
      message: `Are you sure to delete event: ${event.name}?`,
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.store.dispatch(EventActions.deleteEvent({id: event._id}));
      }
    });
  }

  private loadTableData() {
    this.store.dispatch(EventActions.loadCalendar());

    this.events$ = this.store.pipe(select(getAllEvent), tap(v => {
      console.log(v)
    }));
    this.tableFields$ = this.store.pipe(select(getTableFields));

    this.tableSettings = {
      actions: [
        {
          icon: 'pi pi-pencil',
          color: "p-button-success",
          onClick: (v: EventDTO) => {
            this.openEditEventDialog(v);
          }
        },
        {
          icon: 'pi pi-trash',
          color: "p-button-warning",
          onClick: (v: EventDTO) => {
            this.openConfirmDeleteEventDialog(v);
          }
        },
      ]
    }
  }

}
