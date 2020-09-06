import { Component, OnInit } from '@angular/core';
import { EventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";

@Component({
  selector: 'event-app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  event: EventDTO;

  constructor() { }

  ngOnInit(): void {
  }

}
