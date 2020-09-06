import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BaseModule } from "../../../base/src/lib/base.module";

@NgModule({
  imports: [
    CommonModule,
    BaseModule
  ],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class LayoutModule {}
