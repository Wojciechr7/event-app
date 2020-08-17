import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { BaseModule } from "../../../../../../libs/base/src/lib/base.module";

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    BaseModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
