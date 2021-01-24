import {EventFormModel} from "../../models/event-form.model";
import {OnInit} from "@angular/core";
import {DynamicDialogRef} from "primeng";

export abstract class EventFormBaseComponents {

  event: EventFormModel;
  submitted: boolean;

  constructor(
    public ref: DynamicDialogRef,
  ) {

  }

  ngOnInit(): void {
    this.loadEventData();
  }

  submit() {
    this.ref.close(this.event);
  }

  protected abstract loadEventData();

}
