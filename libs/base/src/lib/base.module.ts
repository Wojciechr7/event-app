import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

const BaseModules = [
  FlexLayoutModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...BaseModules
  ],
  exports: [
    ...BaseModules
  ]
})
export class BaseModule {
}
