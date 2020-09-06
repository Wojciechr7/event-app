import { Component, Input, OnInit } from '@angular/core';
import { TableFieldModel } from "../../models/table-field.model";

@Component({
  selector: 'event-app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableFields: TableFieldModel[];
  @Input() data: any[];

  get GlobalFilterFields(): string[] {
    return this.tableFields.map(field => field.field);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
