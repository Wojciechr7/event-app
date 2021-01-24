import { Component, OnInit } from '@angular/core';
import {EventFormBaseComponents} from "../base/event-form-base.components";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng";
import * as moment from "moment";

@Component({
  selector: 'event-app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent extends EventFormBaseComponents implements OnInit {

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    super(ref);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  protected loadEventData() {
    this.event = {
      name: this.config.data.event.name,
      condition: this.config.data.event.condition,
      date: new Date(`${this.config.data.event.month}/${this.config.data.event.day}/${moment().get('year')}`)
    }
  }

}
