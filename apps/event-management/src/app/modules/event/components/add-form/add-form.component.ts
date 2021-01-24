import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng';
import {EventFormBaseComponents} from "../base/event-form-base.components";

@Component({
  selector: 'event-app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent extends EventFormBaseComponents implements OnInit {

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
      name: '',
      condition: '',
      date: new Date()
    }
  }

}
