import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { BaseModule } from "../../../../../../libs/base/src/lib/base.module";
import { LayoutModule as LayoutLibModule } from "../../../../../../libs/layout/src/lib/layout.module";

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    BaseModule,
    LayoutRoutingModule,
    LayoutLibModule
  ]
})
export class LayoutModule { }
