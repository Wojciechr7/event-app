import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableComponent } from './components/table/table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from "primeng/dialog";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";

const BaseModules = [
  FlexLayoutModule,
  PaginatorModule,
  CardModule,
  ToolbarModule,
  ButtonModule,
  DialogModule,
  DynamicDialogModule
];

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ...BaseModules,
    InputTextModule
  ],
  exports: [
    ...BaseModules,
    TableComponent
  ],
  providers: [
    DialogService
  ]
})
export class BaseModule {
}
