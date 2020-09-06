import { Component, Input, OnInit } from '@angular/core';
import { EventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import * as moment from "moment";

@Component({
  selector: 'event-app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() event: EventDTO;

  get EventDate(): moment.Moment {
    const year = moment().year();
    return moment(`${year}-${this.event.month}-${this.event.day}`, ['YYYY-M-D']);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
